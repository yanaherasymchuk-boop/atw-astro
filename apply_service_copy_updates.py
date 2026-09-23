#!/usr/bin/env python3
from pathlib import Path

ROOT = Path.cwd()

def replace_exact(rel, old, new, count=1):
    path = ROOT / rel
    text = path.read_text(encoding="utf-8")
    found = text.count(old)
    if found < count:
        raise SystemExit(f"[STOP] {rel}: expected at least {count} occurrence(s), found {found}\nMissing block:\n{old[:300]}")
    text = text.replace(old, new, count)
    path.write_text(text, encoding="utf-8")
    print(f"[OK] {rel}")

paint = "src/pages/paint-correction-bonney-lake.astro"

replace_exact(
    paint,
    '''          <h1>Paint Correction<br /><span class="atw-gradient">Gloss With Real Improvement</span></h1>
          <p>Paint correction is for vehicles with swirl marks, oxidation, dullness, water-spot issues and light surface defects that regular washing will not fix. Correction level depends on the vehicle, the condition and the result you want.</p>''',
    '''          <h1>Paint Correction &amp; Polishing in Bonney Lake, WA</h1>
          <p>Machine polishing to improve gloss and reduce swirl marks, haze, oxidation and light clear-coat defects — right in your driveway.</p>'''
)

replace_exact(
    paint,
    '''          <div class="atw-btns">
            <a class="atw-btn atw-btn-cyan" href="/contact-us/">Request Paint Quote →</a>
            <a class="atw-btn atw-btn-violet" href={smsHref}>Text Photos for Review →</a>
          </div>
          <div class="atw-hero-mini">''',
    '''          <div class="atw-btns">
            <a class="atw-btn atw-btn-cyan" href="/contact-us/">Request Paint Quote →</a>
            <a class="atw-btn atw-btn-violet" href={smsHref}>Text Photos for Review →</a>
          </div>
          <p>Paint correction is machine polishing — not touch-up paint, chip repair, repainting or bodywork.</p>
          <div class="atw-hero-mini">'''
)

replace_exact(
    paint,
    '''          <p>Paint correction uses machine polishing to improve gloss, clarity and the appearance of paint defects. It is the right service when the problem is in the finish itself rather than just on top of it.</p>
          <p>Results depend on the paint condition, defect depth and the level of correction chosen. Some deeper scratches, etching or severe damage may remain even after correction.</p>
          <ul class="atw-checklist">
            <li>Improves gloss and clarity</li><li>Reduces light swirl marks and haze</li><li>Helps with dull or neglected finishes</li><li>Correction level is matched to the vehicle</li><li>Best quoted after photos or in-person review</li>
          </ul>''',
    '''          <p>Paint correction uses machine polishing to reduce defects in the clear coat and improve clarity, depth and gloss.</p>
          <ul class="atw-checklist">
            <li>Reduces swirl marks</li><li>Improves haze and oxidation</li><li>Can reduce light clear-coat scratches</li><li>Restores gloss and clarity</li>
          </ul>'''
)

replace_exact(
    paint,
    '''    </section>

    <section class="atw-section atw-section-dark">
      <div class="atw-container">
        <div class="atw-center" data-reveal="up">
          <div class="atw-eyebrow">Real Examples</div>''',
    '''    </section>

    <section class="atw-section atw-section-dark">
      <div class="atw-container">
        <div class="atw-center" data-reveal="up">
          <div class="atw-eyebrow">Service Limits</div>
          <h2 class="atw-title">What Paint Correction <span>Cannot Repair</span></h2>
        </div>
        <div class="atw-card" data-reveal="scale">
          <ul class="atw-checklist">
            <li>Rock chips</li>
            <li>Missing paint</li>
            <li>Scratches through the clear coat</li>
            <li>Peeling or failing paint</li>
            <li>Areas that need touch-up paint or repainting</li>
          </ul>
          <p>We do not perform paint touch-up, chip repair, bodywork or repainting. If paint is missing, polishing cannot put color back.</p>
        </div>
      </div>
    </section>

    <section class="atw-section">
      <div class="atw-container">
        <div class="atw-center" data-reveal="up">
          <div class="atw-eyebrow">Real Examples</div>'''
)

replace_exact(
    paint,
    '''            <p>Best when the goal is a cleaner, glossier finish with improvement in light swirls, haze and overall dullness, without chasing heavier correction.</p>''',
    '''            <p>Best for restoring gloss and reducing lighter swirl marks, haze and minor clear-coat defects.</p>'''
)

replace_exact(
    paint,
    '''            <p>Better for vehicles with more visible swirls, oxidation or paint defects where a more involved correction process is needed.</p>''',
    '''            <p>A more intensive correction process for heavier swirl marks, oxidation and more noticeable clear-coat defects.</p>'''
)

replace_exact(
    paint,
    '''    <section class="atw-section atw-section-dark">
      <div class="atw-container">
        <div class="atw-center" data-reveal="up">
          <div class="atw-eyebrow">Paint Correction Pricing</div>''',
    '''    <section class="atw-section atw-section-dark">
      <div class="atw-container">
        <div class="atw-center" data-reveal="up">
          <div class="atw-eyebrow">Correction, Not Cover-Up</div>
          <h2 class="atw-title">Improve the Paint <span>Safely</span></h2>
          <p class="atw-lead">Our goal is to improve the paint through machine polishing, not simply hide defects with temporary fillers. Some defects can be significantly reduced or removed; deeper damage may remain if correcting it further would be unsafe for the clear coat.</p>
        </div>
      </div>
    </section>

    <section class="atw-section">
      <div class="atw-container">
        <div class="atw-center" data-reveal="up">
          <div class="atw-eyebrow">Paint Correction Pricing</div>'''
)

replace_exact(
    paint,
    '''  ["Will paint correction remove all scratches?","Not always. Paint correction can improve many swirls, haze and light defects, but deeper scratches, etched damage or defects that go beyond a safe correction level may remain."],''',
    '''  ["Will paint correction remove all scratches?","Not always. Paint correction can improve many swirls, haze and light defects, but deeper scratches, etched damage or defects that go beyond a safe correction level may remain."],
  ["Can this scratch be polished out?","Light clear-coat scratches may improve with polishing. Deep scratches, rock chips and areas with missing paint require paint repair, which we do not provide."],'''
)

replace_exact(
    paint,
    '''        <p>Send photos for review and we will point you toward the right correction level.</p>''',
    '''        <p>Send your year, make, model and several photos of the paint. We’ll recommend the right level of correction.</p>'''
)

interior_page = "src/pages/interior-detailing.astro"
replace_exact(
    interior_page,
    '''  {
  question: "Do you normally use steam cleaning?",
  answer:
    "No. Steam is not our standard method. We primarily use professional cleaning products, agitation, vacuuming and extraction when deeper fabric cleaning is needed.",
},''',
    '''  {
  question: "Do you use steam cleaning?",
  answer:
    "Yes, where appropriate. Steam may be used on selected hard surfaces, seams and problem areas when it is suitable for the material. We also use professional cleaners, agitation, vacuuming and extraction depending on the surface and condition.",
},'''
)

hero = "src/components/interior/InteriorHero.astro"
replace_exact(
    hero,
    '''      <div class="interior-hero__mini">
        <span>From $200</span>
        <span>Mobile Service</span>
        <span>Extraction Available</span>
        <span>Pet Hair &amp; Stains</span>
      </div>''',
    '''      <div class="interior-hero__mini">
        <span>From $200</span>
        <span>Mobile Service</span>
        <span>Extraction Available</span>
        <span>Pet Hair &amp; Stains</span>
      </div>

      <p class="interior-hero__scope-note">
        Standard Interior Detail does not automatically include deep fabric extraction or intensive stain treatment.
      </p>'''
)

replace_exact(
    hero,
    '''  .interior-hero__mini span:hover {
    transform: translateY(-2px);

    border-color: rgba(8, 215, 223, 0.4);
    background: rgba(8, 215, 223, 0.08);
  }''',
    '''  .interior-hero__mini span:hover {
    transform: translateY(-2px);

    border-color: rgba(8, 215, 223, 0.4);
    background: rgba(8, 215, 223, 0.08);
  }

  .interior-hero__scope-note {
    margin-top: 16px;
    margin-bottom: 0;
    font-size: 13px;
    line-height: 1.6;
    color: #bfc3d5;
  }'''
)

treatment = "src/components/interior/InteriorTreatment.astro"
replace_exact(
    treatment,
    '''              <li>One seat or several seats can be quoted separately</li>
              <li>Steam is not our standard cleaning method</li>
            </ul>''',
    '''              <li>One seat or several seats can be quoted separately</li>
            </ul>

            <h3>Steam Cleaning Where Appropriate</h3>
            <p>
              Steam may be used on selected hard surfaces, seams and problem areas
              when heat and steam are suitable for the material. It is not used automatically on every surface.
            </p>

            <p>
              Seat extraction and deeper fabric cleaning are available when needed
              and are not automatically included in the standard Interior Detail.
            </p>'''
)

full = "src/components/full-detail/FullDetailMain.astro"
replace_exact(full, "<li>Complete interior deep cleaning</li>", "<li>Complete interior cleaning</li>")
replace_exact(full, "<li>Carpet & fabric shampoo/agitation as needed</li>", "<li>Standard carpet and fabric cleaning</li>", count=1)

replace_exact(
    full,
    '''          <li>Paint sealant and UV protection</li>
        </ul>''',
    '''          <li>Paint sealant and UV protection</li>
        </ul>
        <p>Deeper extraction and Intensive Seat Treatment are available when needed.</p>''',
    count=1
)

replace_exact(
    full,
    '''            <li>Carpet & fabric shampoo/agitation as needed</li>''',
    '''            <li>Standard carpet and fabric cleaning</li>'''
)

replace_exact(
    full,
    '''          <li>Carpet & fabric shampoo/agitation as needed</li>
          <li>Paint sealant and UV protection</li>''',
    '''          <li>Standard carpet and fabric cleaning</li>
          <li>Paint sealant and UV protection</li>'''
)

replace_exact(
    full,
    '''          Useful before selling, returning to regular use,
          or simply getting the vehicle back into clean condition.''',
    '''          Useful before selling or trading in the vehicle, especially before
          listing photos, appraisal or buyer viewings.'''
)

replace_exact(
    full,
    '''              Full Package plus one-step machine polishing for added gloss
              and improvement of light defects.''',
    '''              Full Detail plus a 1-Step Paint Polish for added gloss
              and reduction of light clear-coat defects.'''
)

replace_exact(
    full,
    '''              For vehicles that need more focused correction
              of swirl marks and paint defects.''',
    '''              For heavier swirl marks, haze, oxidation and
              more noticeable clear-coat defects.'''
)

replace_exact(
    full,
    '''          </div>


          <div class="atw-path">

            <strong>Ceramic Coating</strong>''',
    '''          </div>

          <p class="atw-note">
            Paint correction does not include touch-up paint, chip repair or repainting.
          </p>

          <div class="atw-path">

            <strong>Ceramic Coating</strong>'''
)

replace_exact(
    full,
    '''          Full Package combines complete Interior Detailing and Exterior Detailing
          in one appointment, including carpet & fabric shampoo/agitation and exterior paint sealant.''',
    '''          Full Package combines complete Interior Detailing and Exterior Detailing
          in one appointment, including standard carpet and fabric cleaning and exterior paint sealant.'''
)

replace_exact(
    full,
    '''          Carpet & fabric shampoo/agitation is included as needed. Deeper Seat Extraction is an optional upgrade:
          +$100 for Standard vehicles and +$175 for Large vehicles. Van or oversized configurations require a quote.''',
    '''          Standard carpet and fabric cleaning is included. Deeper Seat Extraction is an optional upgrade:
          +$100 for Standard vehicles and +$175 for Large vehicles. Van or oversized configurations require a quote.'''
)

print("\nAll requested copy updates applied.")
print("Next:")
print("  npm run build")
print("  git diff --check")
print("  git diff -- src/pages/paint-correction-bonney-lake.astro src/pages/interior-detailing.astro src/components/interior/InteriorHero.astro src/components/interior/InteriorTreatment.astro src/components/full-detail/FullDetailMain.astro")
