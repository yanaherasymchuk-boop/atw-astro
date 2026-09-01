(function(){
  const root=document.querySelector('[data-atw-estimator]'); if(!root) return;
  const $=(s,c=root)=>c.querySelector(s), $$=(s,c=root)=>Array.from(c.querySelectorAll(s));
  const vehicles=window.ATW_VEHICLES||[];
  const COMMERCIAL=['Cargo Van','Sprinter / High Roof','Passenger Van','Box Truck','Semi Truck Day Cab','Semi Truck Sleeper'];
  const INTERIOR_PACKAGE_SERVICES=['deep','full','elite','interior'];
  const EXTRACTION_SERVICES=['seat_only','carpet_only','seats_carpet'];

  const pricing={
    standard:{
      services:{
        interior:{name:'Interior Detailing',desc:'Vacuum, plastics, leather care and light spot treatment',prices:{'Sedan/Coupe':200,'SUV':225,'LARGE':250,'VAN':300}},
        exterior:{name:'Exterior Detailing',desc:'Scratch-free wash, wheels, decon, trim cleaning & dressing, sealant',prices:{'Sedan/Coupe':100,'SUV':125,'LARGE':150,'VAN':200}},
        deep:{name:'Full Detail',desc:'Interior + exterior deep cleaning',prices:{'Sedan/Coupe':280,'SUV':330,'LARGE':380,'VAN':480}},
        full:{name:'Restore Package',desc:'Full Detail + 1-step paint polishing',prices:{'Sedan/Coupe':570,'SUV':700,'LARGE':850,'VAN':null}},
        elite:{name:'Elite Package',desc:'Restore Package + professional ceramic coating',prices:{'Sedan/Coupe':850,'SUV':950,'LARGE':1000,'VAN':null}},
        outside_elite:{name:'Outside Elite',desc:'Exterior + polishing + ceramic coating',prices:{'Sedan/Coupe':580,'SUV':650,'LARGE':780,'VAN':null}},
        seat_only:{name:'Seat Extraction — Standalone',desc:'Standalone intensive treatment for all cloth seats. Interior Detail is not included.',prices:{'Sedan/Coupe':250,'SUV':250,'LARGE':350,'VAN':null}},
        
        carpet_only:{name:'Carpeted Floor Extraction Only',desc:'Standalone mobile extraction cleaning for carpeted floor areas and fabric mats',prices:{'Sedan/Coupe':215,'SUV':215,'LARGE':275,'VAN':null}},
        seats_carpet:{name:'Seats + Carpet Extraction — Standalone',desc:'Standalone seat extraction plus carpet/floor extraction. Interior Detail is not included.',prices:{'Sedan/Coupe':350,'SUV':350,'LARGE':450,'VAN':null}}
      },
      addons:[
        {id:'seat_upgrade',name:'Seat Extraction Upgrade',desc:'Full shampoo and extraction cycle for all cloth seats when added to Interior or Full Detail.',dynamic:{'Sedan/Coupe':100,'SUV':100,'LARGE':175,'VAN':null},allowed:INTERIOR_PACKAGE_SERVICES},
        {id:'headliner',name:'Headliner Spot Cleaning',price:100,from:true,allowed:INTERIOR_PACKAGE_SERVICES},
        {id:'trunk',name:'Trunk / Cargo Area Extraction',price:100,from:true,allowed:INTERIOR_PACKAGE_SERVICES}
      ],
      conditions:[
        {id:'pet',name:'Pet Hair',choices:[
          {id:'none',label:'None',price:0},{id:'light',label:'Light',price:0},{id:'moderate',label:'Moderate',price:30},{id:'heavy',label:'Heavy',price:50},{id:'extreme',label:'Extreme',price:null}
        ]},
        {id:'stains',name:'Visible Stains / Spot Treatment',choices:[
          {id:'none',label:'None',price:0},{id:'light',label:'Light / Few small stains',price:0},{id:'moderate',label:'Moderate',price:30},{id:'heavy',label:'Heavy / Multiple stains',price:50},{id:'extreme',label:'Extreme / Unknown origin',price:null}
        ]},
        {id:'odor',name:'Odor Treatment',choices:[
          {id:'none',label:'No',price:0},{id:'yes',label:'Yes — ozone treatment',price:80}
        ]},
        {id:'work',name:'Work Vehicle / Excessive Debris',choices:[
          {id:'none',label:'No',price:0},{id:'yes',label:'Yes — construction / job-site level debris',price:40}
        ]}
      ]
    },
    commercial:{
      services:{
        deep:{
          name:'Full Detail',
          desc:'Interior + exterior detailing for commercial vehicles. Scope varies by vehicle size, configuration and condition. Starting price shown below; final price is confirmed by a manager after photo review.',
          prices:{'Cargo Van':480,'Sprinter / High Roof':550,'Passenger Van':550,'Box Truck':680,'Semi Truck Day Cab':750,'Semi Truck Sleeper':900}
        },
        full:{
          name:'Restore Package',
          desc:'Includes Full Detail plus 1-step machine polishing to improve gloss, clarity, and reduce light swirl marks and minor paint defects.',
          prices:{'Cargo Van':780,'Sprinter / High Roof':900,'Passenger Van':900,'Box Truck':1100,'Semi Truck Day Cab':1150,'Semi Truck Sleeper':1350}
        },
        elite:{
          name:'Elite Package',
          desc:'Includes Restore Package plus professional ceramic coating for long-term paint protection, enhanced gloss, and hydrophobic performance.',
          prices:{'Cargo Van':1080,'Sprinter / High Roof':1300,'Passenger Van':1300,'Box Truck':1600,'Semi Truck Day Cab':1650,'Semi Truck Sleeper':1950}
        },
        exterior:{
          name:'Exterior Detailing',
          desc:'Scratch-free hand wash and dry, deep cleaning of wheels, tires and wheel wells, chemical decontamination as needed, trim cleaning, and paint protection for added gloss and UV resistance.',
          prices:{'Cargo Van':200,'Sprinter / High Roof':230,'Passenger Van':230,'Box Truck':280,'Semi Truck Day Cab':400,'Semi Truck Sleeper':500}
        },
        interior:{
          name:'Interior Detailing',
          desc:'Interior detailing for commercial vehicles. Scope varies by vehicle configuration, seating or cargo layout and condition. Starting price shown below; final price is confirmed by a manager after photo review.',
          prices:{'Cargo Van':300,'Sprinter / High Roof':350,'Passenger Van':350,'Box Truck':420,'Semi Truck Day Cab':400,'Semi Truck Sleeper':550}
        },
        outside_elite:{
          name:'Outside Elite',
          desc:'Exterior detailing plus 1-step machine polishing and professional ceramic coating for long-term paint protection and enhanced gloss.',
          prices:{'Cargo Van':780,'Sprinter / High Roof':900,'Passenger Van':900,'Box Truck':1100,'Semi Truck Day Cab':null,'Semi Truck Sleeper':null}
        }
      },
      addons:[
        {
          id:'seat_single',
          group:'seat_treatment',
          name:'Intensive Seat Treatment — Single Seat',
          desc:'Fabric: shampoo and extraction. Leather: multi-step cleaning followed by leather conditioner.',
          price:80,
          from:true
        },
        {
          id:'seat_cab',
          group:'seat_treatment',
          name:'Intensive Seat Treatment — Full Cab Seats',
          desc:'Intensive treatment of all cab seats. Final price depends on seat material, number of seats and condition.',
          price:180,
          from:true
        },
        {
          id:'seat_sleeper',
          group:'seat_treatment',
          name:'Intensive Seat Treatment — Sleeper + Fabric Areas',
          desc:'For sleeper configurations with additional seat or fabric areas requiring intensive treatment.',
          price:280,
          from:true,
          allowedCategories:['Semi Truck Sleeper']
        },
        {
          id:'floor',
          group:'interior_upgrade',
          name:'Intensive Floor Extraction — Cab / Sleeper Only',
          desc:'Deep extraction cleaning for cab or sleeper carpets and fabric mats. Cargo and box interiors are not included.',
          from:true,
          dynamic:{'Cargo Van':180,'Sprinter / High Roof':220,'Passenger Van':220,'Box Truck':250,'Semi Truck Day Cab':280,'Semi Truck Sleeper':280}
        },
        {
          id:'ceramic',
          group:'paint_service',
          name:'Ceramic Coating',
          desc:'Professional ceramic coating for long-term paint protection, enhanced gloss, and hydrophobic performance. Final price after inspection.',
          price:null
        },
        {
          id:'polish1',
          group:'paint_service',
          name:'1-Step Paint Polishing',
          desc:'Machine polishing to improve paint gloss and clarity and reduce light swirl marks and minor defects. Final price after inspection.',
          price:null
        },
        {
          id:'polish2',
          group:'paint_service',
          name:'2-Step Paint Correction',
          desc:'Multi-stage paint correction to reduce heavier defects and improve paint clarity and gloss. Final price after inspection.',
          price:null
        }
      ],
      conditions:[
        {
          id:'pet',
          name:'Pet Hair Removal',
          choices:[
            {id:'none',label:'None',price:0},
            {id:'yes',label:'Add pet hair removal',from:true,dynamic:{'Cargo Van':90,'Sprinter / High Roof':120,'Passenger Van':120,'Box Truck':150,'Semi Truck Day Cab':120,'Semi Truck Sleeper':120}}
          ]
        },
        {
          id:'stains',
          name:'Stain Removal',
          choices:[
            {id:'none',label:'None',price:0},
            {id:'yes',label:'Add targeted stain treatment',from:true,dynamic:{'Cargo Van':50,'Sprinter / High Roof':70,'Passenger Van':70,'Box Truck':90,'Semi Truck Day Cab':80,'Semi Truck Sleeper':80}}
          ]
        },
        {
          id:'odor',
          name:'Odor Elimination',
          choices:[
            {id:'none',label:'No',price:0},
            {id:'yes',label:'Add odor treatment',from:true,dynamic:{'Cargo Van':80,'Sprinter / High Roof':100,'Passenger Van':100,'Box Truck':120,'Semi Truck Day Cab':120,'Semi Truck Sleeper':120}}
          ]
        }
      ]
    }  };

  const state={vehicle:null,mode:'standard',category:null,pickupCab:null,service:'deep',addons:new Set(),conditions:{pet:'none',stains:'none',odor:'none',work:'none'}};
  const search=$('[data-vehicle-search]'), results=$('[data-vehicle-results]'), selected=$('[data-selected-vehicle]'), summary=$('[data-summary]'), priceEl=$('[data-estimate-price]'), payload=$('[data-atw-payload]'), alert=$('[data-alert]');
  const icons={vehicle:'▱',service:'✧',contamination:'◒',addons:'+',category:'⌁'};

  function money(n){return n==null?'Inspection':('$'+Math.round(n).toLocaleString());}
  function displayMoney(n,{commercial=state.mode==='commercial',from=false}={}){
    if(n==null) return 'After inspection';
    return `${commercial||from?'from ':''}${money(n)}`;
  }
  function currentSet(){return pricing[state.mode||'standard'];}
  function currentServices(){return currentSet().services;}
  function isPickup(){return state.mode==='standard' && state.vehicle && state.vehicle.vehicleType==='pickup';}
  function pickupInteriorCategory(){
    if(!isPickup()) return state.category;
    if(state.pickupCab==='regular') return 'Sedan/Coupe';
    if(state.pickupCab==='double') return 'SUV';
    if(state.pickupCab==='crew') return 'LARGE';
    return null;
  }
  function priceCategory(serviceId=state.service){
    if(state.mode==='commercial') return state.category;
    if(isPickup()){
      if(['interior','seat_only','carpet_only','seats_carpet'].includes(serviceId)) return pickupInteriorCategory();
      return 'LARGE';
    }
    return state.category;
  }
  function categoryLabel(){
    if(state.mode==='commercial') return state.category||'Not selected';
    if(isPickup()){
      const cab=state.pickupCab==='regular'?'Regular Cab':state.pickupCab==='double'?'Double Cab':state.pickupCab==='crew'?'Crew Cab':'Cab type needed';
      return `Pickup · ${cab}`;
    }
    if(state.category==='LARGE') return state.vehicle&&state.vehicle.vehicleType==='minivan'?'Large / 3-Row / Minivan':'Large SUV / 3-Row';
    if(state.category==='VAN') return 'Van / Oversized';
    return state.category||'Not selected';
  }
  function isInteriorPackage(){return state.mode==='standard' && INTERIOR_PACKAGE_SERVICES.includes(state.service);}
  function isExtractionService(){return state.mode==='standard' && EXTRACTION_SERVICES.includes(state.service);}
  function hasSeatExtraction(){return isExtractionService() || state.addons.has('seat_upgrade');}
  function isExteriorOnly(){return ['exterior','outside_elite'].includes(state.service);}
  function addonAllowed(a){if(a.allowed&&!a.allowed.includes(state.service)) return false; if(a.allowedCategories&&state.category&&!a.allowedCategories.includes(state.category)) return false; return true;}
  function addonPrice(a){const cat=a.id==='seat_upgrade'?priceCategory('interior'):priceCategory(); return a.dynamic ? (a.dynamic[cat] ?? a.dynamic[state.category] ?? null) : a.price;}
  function activeAddons(){return currentSet().addons.filter(a=>state.addons.has(a.id) && addonAllowed(a));}
  function serviceBase(){const svc=currentServices()[state.service]; const cat=priceCategory(); return svc ? (svc.prices[cat] ?? svc.prices[state.category] ?? null) : null;}
  function conditionChoice(group){return group.choices.find(c=>c.id===(state.conditions[group.id]||'none')) || group.choices[0];}
  function conditionPrice(group){
    const choice=conditionChoice(group);
    if(group.id==='stains' && hasSeatExtraction()) return 0;
    if(isExteriorOnly()) return 0;
    if(choice.dynamic){
      const cat=priceCategory();
      return choice.dynamic[cat] ?? choice.dynamic[state.category] ?? null;
    }
    return choice.price;
  }
  function activeConditions(){
    if(isExteriorOnly()) return [];
    return currentSet().conditions.map(group=>({group,choice:conditionChoice(group),price:conditionPrice(group)})).filter(x=>x.choice.id!=='none');
  }
  function addonTotal(){return activeAddons().reduce((sum,a)=>sum+(addonPrice(a)||0),0);}
  function conditionTotal(){return activeConditions().reduce((sum,x)=>sum+(x.price||0),0);}
  function priceTotal(base){
    if(!state.category) return 'Select your vehicle';
    if(isPickup()&&!state.pickupCab) return 'Select pickup cab';
    if(base==null) return 'After Inspection';

    const inspection=
      activeAddons().some(a=>addonPrice(a)==null)||
      activeConditions().some(x=>x.price==null);

    if(inspection) return 'After Inspection';

    const total=base+addonTotal()+conditionTotal();
    return state.mode==='commercial' ? `from ${money(total)}` : money(total);
  }
  function resetSelections(){state.addons.clear(); state.conditions={pet:'none',stains:'none',odor:'none',work:'none'};}
  function setProgress(step){const order=['vehicle','service','condition','addons','contact']; const idx=order.indexOf(step); $$('[data-progress]').forEach((el,i)=>el.classList.toggle('is-active',i===idx)); $$('.atwq-step').forEach(el=>el.classList.toggle('is-active',el.dataset.step===step));}
  function showSelected(title,sub){selected.hidden=false; selected.innerHTML=`<b>${title}</b><span>${sub}</span>`;}
  function clearSelectedCards(){ $$('.atwq-type-card,.atwq-commercial-choice').forEach(x=>x.classList.remove('is-selected')); }

  function setVehicle(v){
    state.vehicle=v; state.mode=v.mode||'standard'; state.category=v.category; state.pickupCab=null; resetSelections();
    if(!currentServices()[state.service]) state.service='deep';
    clearSelectedCards(); showSelected(`${v.make} ${v.model}`,categoryLabel());
    search.value=`${v.make} ${v.model}${v.trim?' '+v.trim:''}`; results.classList.remove('is-open');
    const pickupBranch=$('[data-pickup-branch]');
    pickupBranch.hidden=!isPickup();
    renderServices(); renderAddons(); renderConditions(); update();
    setProgress(isPickup()?'vehicle':'service');
  }
  function setCategory(cat,label,el,vehicleType=''){
    state.vehicle={make:label||cat,model:'',trim:'',category:cat,mode:COMMERCIAL.includes(cat)?'commercial':'standard',vehicleType}; state.mode=state.vehicle.mode; state.category=cat; state.pickupCab=null; resetSelections();
    if(!currentServices()[state.service]) state.service='deep';
    clearSelectedCards(); if(el) el.classList.add('is-selected'); showSelected(label||cat,categoryLabel()); search.value=''; results.classList.remove('is-open');
    const pickupBranch=$('[data-pickup-branch]');
    pickupBranch.hidden=vehicleType!=='pickup';
    renderServices(); renderAddons(); renderConditions(); update(); setProgress(vehicleType==='pickup'?'vehicle':'service');
  }
  function renderResults(q){
    q=q.trim().toLowerCase(); results.innerHTML=''; if(q.length<2){results.classList.remove('is-open'); return;}
    const tokens=q.split(/\s+/).filter(Boolean);
    let found=vehicles.map(v=>{const hay=(v.make+' '+v.model+' '+(v.trim||'')+' '+(v.body||'')+' '+v.category).toLowerCase(); let score=tokens.reduce((s,t)=>s+(hay.includes(t)?1:0),0); if(hay.startsWith(q)) score+=4; if((v.make+' '+v.model).toLowerCase().startsWith(q)) score+=3; if(v.mode==='commercial') score+=.2; return {v,score};}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.v.make.localeCompare(b.v.make)).slice(0,14);
    if(!found.length){results.innerHTML='<div class="atwq-result"><span><strong>Vehicle not found</strong><small>Choose a vehicle type below or text us a photo.</small></span><span class="atwq-pill">Help</span></div>'; results.classList.add('is-open'); return;}
    found.forEach(({v})=>{const b=document.createElement('button'); b.type='button'; b.className='atwq-result'; b.innerHTML=`<span><strong>${v.make} ${v.model}</strong><small>${v.trim||v.body||'Vehicle'} · ${v.mode==='commercial'?v.category:(v.vehicleType==='pickup'?'Pickup':v.category==='LARGE'?(v.vehicleType==='minivan'?'Minivan / Large':'Large / 3-Row'):v.category==='VAN'?'Van / Oversized':v.category)}</small></span><span class="atwq-pill">${v.mode==='commercial'?'Commercial':'Standard'}</span>`; b.onclick=()=>setVehicle(v); results.appendChild(b);});
    results.classList.add('is-open');
  }
  function renderServices(){
    const box=$('[data-service-cards]'); box.innerHTML='';
    const services=currentServices();
    const makeCard=(id)=>{
      const svc=services[id];
      if(!svc) return;

      const cat=priceCategory(id);
      const base=state.category
        ? (svc.prices[cat] ?? svc.prices[state.category] ?? null)
        : null;

      const b=document.createElement('button');
      b.type='button';
      b.className='atwq-card'+(state.service===id?' is-selected':'');

      const priceText=!state.category
        ? 'Select vehicle first'
        : (isPickup()&&!state.pickupCab&&['interior','seat_only','carpet_only','seats_carpet'].includes(id))
          ? 'Select pickup cab'
          : displayMoney(base);

      b.innerHTML=
        `<strong>${svc.name}</strong>`+
        `<span>${svc.desc}</span>`+
        `<em>${priceText}</em>`;

      b.onclick=()=>{
        state.service=id;

        state.addons.forEach(addonId=>{
          const a=currentSet().addons.find(x=>x.id===addonId);
          if(a&&!addonAllowed(a)) state.addons.delete(addonId);
        });

        renderServices();
        renderAddons();
        renderConditions();
        update();
        setProgress('condition');
      };

      box.appendChild(b);
    };
    const addHeading=(text)=>{const h=document.createElement('div'); h.className='atwq-service-group-title'; h.textContent=text; box.appendChild(h);};
    if(state.mode==='standard'){
      addHeading('Individual Detailing Services'); ['interior','exterior'].forEach(makeCard);
      addHeading('Detail Packages'); ['deep','full','elite','outside_elite'].forEach(makeCard);
      addHeading('Standalone Extraction Services'); ['seat_only','carpet_only','seats_carpet'].forEach(makeCard);
    } else {
      addHeading('Individual Detailing Services'); ['interior','exterior'].forEach(makeCard);
      addHeading('Detail Packages'); ['deep','full','elite','outside_elite'].forEach(makeCard);
    }
  }
  function renderAddons(){
    const box=$('[data-addons]'); box.innerHTML='';
    const items=currentSet().addons.filter(addonAllowed);
    const addHeading=(text)=>{const h=document.createElement('div'); h.className='atwq-service-group-title atwq-addon-group-title'; h.textContent=text; box.appendChild(h);};
    const makeAddon=(a)=>{
      const p=addonPrice(a); const needsVehicle=!!a.dynamic&&!state.category;
      const priceText=needsVehicle
        ? 'Select vehicle first'
        : (p==null
          ? 'Inspection'
          : (state.mode==='commercial'
            ? `from ${money(p)}`
            : ((a.from?'from ':'+')+money(p))));
      const b=document.createElement('button'); b.type='button'; b.className='atwq-addon'+(state.addons.has(a.id)?' is-selected':'');
      b.innerHTML=`<div class="atwq-addon-copy"><strong>${a.name}</strong>${a.desc?`<small>${a.desc}</small>`:''}</div><span>${priceText}</span>`;
      b.onclick=()=>{
        if(needsVehicle) return;
        if(state.addons.has(a.id)){state.addons.delete(a.id);}
        else{
          if(a.group==='seat_treatment'){
            currentSet().addons.filter(x=>x.group==='seat_treatment').forEach(x=>state.addons.delete(x.id));
          }
          state.addons.add(a.id);
        }
        renderAddons(); renderConditions(); update(); setProgress('addons');
      };
      box.appendChild(b);
    };
    if(state.mode==='commercial'){
      const interior=items.filter(a=>a.group!=='paint_service');
      const paint=items.filter(a=>a.group==='paint_service');
      if(interior.length){addHeading('Interior Add-Ons'); interior.forEach(makeAddon);}
      if(paint.length){addHeading('Paint Services — Inspection Required'); paint.forEach(makeAddon);}
    } else {
      items.forEach(makeAddon);
    }
    if(!box.querySelector('.atwq-addon')) box.innerHTML='<div class="atwq-note">No additional upgrades are needed for this service.</div>';
  }
  function renderConditions(){
    const box=$('[data-contamination]'); if(!box) return; box.innerHTML='';
    if(isExteriorOnly()){box.innerHTML='<div class="atwq-note">No interior condition adjustments apply to this service.</div>'; return;}
    currentSet().conditions.forEach(group=>{
      const wrap=document.createElement('div'); wrap.className='atwq-condition-group';
      const title=document.createElement('div'); title.className='atwq-label'; title.textContent=group.name; wrap.appendChild(title);
      const choices=document.createElement('div'); choices.className='atwq-addons';
      group.choices.forEach(choice=>{
        const effectivePrice=(group.id==='stains'&&hasSeatExtraction())?0:(choice.dynamic ? (choice.dynamic[priceCategory()] ?? choice.dynamic[state.category] ?? null) : choice.price);
        const b=document.createElement('button'); b.type='button'; b.className='atwq-addon'+((state.conditions[group.id]||'none')===choice.id?' is-selected':'');
        let priceText=effectivePrice==null
          ? 'Inspection'
          : (effectivePrice===0
            ? '$0'
            : (state.mode==='commercial'
              ? `from ${money(effectivePrice)}`
              : ((choice.from?'from ':'+')+money(effectivePrice))));
        if(group.id==='stains'&&hasSeatExtraction()&&choice.id!=='none') priceText='Included';
        b.innerHTML=`<strong>${choice.label}</strong><span>${priceText}</span>`;
        b.onclick=()=>{state.conditions[group.id]=choice.id; renderConditions(); update(); setProgress('addons');}; choices.appendChild(b);
      });
      wrap.appendChild(choices); box.appendChild(wrap);
    });
  }
  function summaryRow(icon,title,sub,price){return `<div class="atwq-sum-row"><div class="atwq-sum-icon">${icon}</div><div class="atwq-sum-main"><b>${title}</b><span>${sub}</span></div><div class="atwq-sum-price">${price||''}</div></div>`;}
  function update(){
    const base=serviceBase(); priceEl.textContent=priceTotal(base);

    const mobileTotal=root.querySelector('[data-mobile-total]');
    const mobileTotalPrice=root.querySelector('[data-mobile-total-price]');
    const mobileTotalLabel=root.querySelector('[data-mobile-total-label]');
    const mobileTotalNote=root.querySelector('[data-mobile-total-note]');

    if(mobileTotal && mobileTotalPrice && mobileTotalLabel && mobileTotalNote){
      const currentPrice=priceEl.textContent.trim();

      mobileTotal.hidden=!state.category;

      if(state.mode==='commercial'){
        mobileTotalLabel.textContent='Starting estimate';
        mobileTotalPrice.textContent=currentPrice;
        mobileTotalNote.textContent='final price after manager photo review';
      }else if(currentPrice==='After Inspection' || currentPrice==='Inspection'){
        mobileTotalLabel.textContent='Final quote';
        mobileTotalPrice.textContent='After review';
        mobileTotalNote.textContent='photo review required';
      }else{
        mobileTotalLabel.textContent='Estimated total';
        mobileTotalPrice.textContent=currentPrice;
        mobileTotalNote.textContent='before WA sales tax';
      }
    } const svc=currentServices()[state.service];
    const regularAddons=activeAddons(); const conditions=activeConditions();
    const addonNames=regularAddons.map(a=>a.name).join(', ')||'None';
    const conditionNames=conditions.map(x=>`${x.group.name}: ${x.choice.label}${x.group.id==='stains'&&hasSeatExtraction()?' (included)':''}`).join(', ')||'None';
    summary.innerHTML=
      summaryRow(
        icons.vehicle,
        'Vehicle',
        state.vehicle?`${state.vehicle.make} ${state.vehicle.model}`:'Not selected',
        ''
      )+
      summaryRow(
        icons.category,
        'Category',
        categoryLabel(),
        ''
      )+
      summaryRow(
        icons.service,
        'Service',
        svc?svc.name:'Not selected',
        base==null?'':displayMoney(base)
      )+
      summaryRow(
        icons.contamination,
        'Vehicle condition',
        conditionNames,
        conditions.length&&conditionTotal()
          ? (state.mode==='commercial'
            ? `from ${money(conditionTotal())}`
            : money(conditionTotal()))
          : ''
      )+
      summaryRow(
        icons.addons,
        'Add-ons',
        addonNames,
        regularAddons.length
          ? (state.mode==='commercial'
            ? `from ${money(addonTotal())}`
            : money(addonTotal()))
          : ''
      );
    const isInspection=!!state.category && (base==null || regularAddons.some(a=>addonPrice(a)==null) || conditions.some(x=>x.price==null));
    if(state.mode==='commercial'){
      alert.hidden=false;
      alert.textContent='Commercial pricing is a starting estimate. Final price is confirmed by a manager after reviewing vehicle photos and scope of work.';
    }else{
      alert.hidden=!isInspection;
      alert.textContent=isInspection
        ? 'This selection needs final inspection before exact pricing. We can confirm quickly by photo or text.'
        : '';
    }
    const odorSelected=state.conditions.odor==='yes';
    const odorNote=odorSelected?'\nOdor note: ozone treatment is included. If the odor source is inside fabric or padding (for example milk, urine, vomit or another spill), extraction of the affected area may also be required.':'';
    const stainNote=state.conditions.stains!=='none'&&!hasSeatExtraction()?'\nStain note: targeted spot treatment only; complete stain removal is not guaranteed without full extraction cleaning.':'';
    const commercialNote=state.mode==='commercial'
      ? '\nCommercial note: starting estimate only. Final price requires manager review of vehicle photos and scope of work.'
      : '';

    payload.value=`Vehicle: ${state.vehicle?`${state.vehicle.make} ${state.vehicle.model} ${state.vehicle.trim||''}`:'Not selected'}\nCategory: ${categoryLabel()}\nService: ${svc?svc.name:''}\nVehicle condition: ${conditionNames}\nAdd-ons: ${addonNames}\nEstimate before WA sales tax: ${priceEl.textContent}${stainNote}${odorNote}${commercialNote}\nWashington State sales tax will be added as required by law.`;
  }

  search.addEventListener('input',e=>renderResults(e.target.value));
  document.addEventListener('click',e=>{if(!e.target.closest('.atwq-search-wrap')) results.classList.remove('is-open');});
  root.addEventListener('click',e=>{const typeCard=e.target.closest('[data-kind]'); if(typeCard&&root.contains(typeCard)){const branch=$('[data-commercial-branch]'); if(typeCard.dataset.kind==='commercial'){
      state.vehicle=null;
      state.mode='commercial';
      state.category=null;
      resetSelections();
      if(!currentServices()[state.service]) state.service='deep';
      clearSelectedCards();
      typeCard.classList.add('is-selected');
      branch.classList.add('is-open');
      selected.hidden=false;
      selected.innerHTML='<b>Commercial Vehicle</b><span>Select the commercial vehicle type below to see the correct pricing.</span>';
      search.value='';
      results.classList.remove('is-open');
      renderServices();
      renderAddons();
      renderConditions();
      update();
      setProgress('vehicle');
      return;
    }
    branch.classList.remove('is-open');
    if(typeCard.dataset.kind==='pickup'){setCategory('LARGE',typeCard.dataset.label||'Pickup',typeCard,'pickup'); return;}
    setCategory(typeCard.dataset.type,typeCard.dataset.label||typeCard.textContent.trim(),typeCard);
    return;
  }
  const pickupCab=e.target.closest('[data-pickup-cab]');
  if(pickupCab&&root.contains(pickupCab)){
    state.pickupCab=pickupCab.dataset.pickupCab;
    $$('[data-pickup-cab]').forEach(x=>x.classList.toggle('is-selected',x===pickupCab));
    showSelected(state.vehicle&&state.vehicle.model?`${state.vehicle.make} ${state.vehicle.model}`:'Pickup',categoryLabel());
    renderServices(); renderAddons(); renderConditions(); update(); setProgress('service');
    return;
  }
  const commercial=e.target.closest('[data-commercial]');
  if(commercial&&root.contains(commercial)){setCategory(commercial.dataset.commercial,commercial.dataset.label,commercial);}
});
  $('[data-contact-focus]')?.addEventListener('focus',()=>setProgress('contact'));

  function canvasFX(){
    const canvas=$('.atwq-canvas');
    if(!canvas) return;

    const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile=window.matchMedia('(max-width: 900px)').matches;

    if(reduceMotion||mobile){
      canvas.remove();
      return;
    }

    const ctx=canvas.getContext('2d');
    if(!ctx) return;

    let W=0,H=0,parts=[],raf=0,visible=true;

    function resize(){
      W=Math.max(root.clientWidth,1);
      H=Math.max(root.clientHeight,1);
      canvas.width=W;
      canvas.height=H;

      const count=Math.max(34,Math.min(54,Math.round(W/30)));

      parts=Array.from({length:count},()=>({
        x:Math.random()*W,
        y:Math.random()*H,
        s:Math.random()*1.3+.3,
        vx:(Math.random()-.5)*.18,
        vy:(Math.random()-.5)*.18,
        o:Math.random()*.30+.07,
        c:Math.random()>.52?'#0ad2d9':'#9b5de5'
      }));
    }

    function loop(){
      if(visible){
        ctx.clearRect(0,0,W,H);

        for(const p of parts){
          p.x+=p.vx;
          p.y+=p.vy;

          if(p.x<0)p.x=W;
          else if(p.x>W)p.x=0;

          if(p.y<0)p.y=H;
          else if(p.y>H)p.y=0;

          ctx.globalAlpha=p.o;
          ctx.fillStyle=p.c;
          ctx.beginPath();
          ctx.arc(p.x,p.y,p.s,0,Math.PI*2);
          ctx.fill();
        }

        ctx.globalAlpha=1;
      }

      raf=requestAnimationFrame(loop);
    }

    const observer=new IntersectionObserver(
      entries=>{
        visible=entries.some(entry=>entry.isIntersecting);
      },
      {rootMargin:'150px'}
    );

    observer.observe(root);

    let resizeTimer;

    window.addEventListener(
      'resize',
      ()=>{
        clearTimeout(resizeTimer);
        resizeTimer=setTimeout(resize,180);
      },
      {passive:true}
    );

    window.addEventListener(
      'pagehide',
      ()=>{
        cancelAnimationFrame(raf);
        observer.disconnect();
      },
      {once:true}
    );

    resize();
    loop();
  }

  renderServices(); renderAddons(); renderConditions(); update(); canvasFX();

  const form=document.getElementById('atw-estimate-form');
  const statusEl=document.getElementById('atw-estimate-status');
  const startedAt=$('[data-atw-started-at]');
  const dateInput=$('[data-atw-date]');

  if(startedAt){
    startedAt.value=String(Date.now());
  }

  if(dateInput){
    const now=new Date();
    const localDate=new Date(
      now.getTime()-now.getTimezoneOffset()*60000
    ).toISOString().slice(0,10);

    dateInput.min=localDate;
  }

  if(form instanceof HTMLFormElement && statusEl){
    form.addEventListener('submit',async(event)=>{
      event.preventDefault();

      if(!form.reportValidity()) return;

      statusEl.hidden=true;
      statusEl.className='atwq-submit-status';
      statusEl.textContent='';

      const submit=form.querySelector('.atwq-submit');

      if(submit instanceof HTMLButtonElement){
        submit.disabled=true;
        submit.dataset.originalHtml=submit.innerHTML;
        submit.textContent='Sending…';
      }

      try{
        const fd=new FormData(form);

        const name=String(fd.get('name')||'').trim();
        const phone=String(fd.get('phone')||'').trim();
        const email=String(fd.get('email')||'').trim();
        const preferredDate=String(fd.get('preferred_date')||'').trim();
        const notes=String(fd.get('notes')||'').trim();
        const quotePayload=String(fd.get('quote_payload')||'').trim();
        const company=String(fd.get('company')||'').trim();
        const started=String(fd.get('startedAt')||'').trim();

        const message=[
          'New ATW Estimate Request',
          '',
          phone?`Phone: ${phone}`:'',
          preferredDate?`Preferred date: ${preferredDate}`:'',
          '',
          quotePayload,
          notes?'':'',
          notes?'Notes:':'',
          notes
        ].filter(Boolean).join('\n');

        const response=await fetch(
          'https://forms.atwdetailing.com/contact.php',
          {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              name,
              phone,
              email,
              message,
              company,
              startedAt:started
            })
          }
        );

        const data=await response.json().catch(()=>({}));

        if(!response.ok){
          throw new Error(
            data?.error||'Could not send estimate request.'
          );
        }

        statusEl.innerHTML=
          '<strong>Request sent successfully.</strong>'+
          '<span>Thank you! We received your estimate request and will contact you shortly.</span>';

        statusEl.classList.add('is-success');
        statusEl.hidden=false;
      }catch(error){
        statusEl.innerHTML=
          '<strong>We couldn’t send your request.</strong>'+
          '<span>Please try again or text us directly.</span>';

        statusEl.classList.add('is-error');
        statusEl.hidden=false;
      }finally{
        if(submit instanceof HTMLButtonElement){
          submit.disabled=false;
          submit.innerHTML=
            submit.dataset.originalHtml||
            'Get My Estimate <span>→</span>';
        }
      }
    });
  }

})();
