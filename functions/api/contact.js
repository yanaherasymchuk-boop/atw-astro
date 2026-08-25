const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

const clean = (value, max) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[char]));

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get("origin");
  const expectedOrigin = env.SITE_ORIGIN || "https://atwdetailing.com";
  if (origin && origin !== expectedOrigin) {
    return json({ error: "Invalid request origin." }, 403);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid form data." }, 400);
  }

  if (clean(body.company, 100)) return json({ ok: true });

  const name = clean(body.name, 80);
  const email = clean(body.email, 160);
  const message = clean(body.message, 3000);
  const startedAt = Number(body.startedAt || 0);

  if (!name || !email || !message) {
    return json({ error: "Please complete all required fields." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Please enter a valid email address." }, 400);
  }
  if (startedAt && Date.now() - startedAt < 2500) {
    return json({ error: "Please wait a moment and try again." }, 429);
  }

  const accountId = env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = env.CLOUDFLARE_EMAIL_API_TOKEN;
  const recipient = env.CONTACT_RECIPIENT || "atwcardetailing@gmail.com";
  const sender = env.CONTACT_SENDER || "website@atwdetailing.com";

  if (!accountId || !apiToken) {
    return json({
      error: "Message service is not configured yet. Please text or email us instead."
    }, 503);
  }

  const subject = `ATW Website Contact — ${name}`;
  const text = `New contact form message\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`;
  const html = `
    <h2>New ATW website contact</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
  `;

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: recipient,
        reply_to: email,
        subject,
        text,
        html,
      }),
    },
  );

  const result = await response.json().catch(() => null);
  if (!response.ok || result?.success === false) {
    console.error("Cloudflare Email Service error", result);
    return json({ error: "Could not send message. Please text or email us instead." }, 502);
  }

  return json({ ok: true });
}

export function onRequest() {
  return json({ error: "Method not allowed." }, 405);
}
