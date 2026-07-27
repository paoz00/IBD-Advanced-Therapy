const drugs=[
['IFX','インフリキシマブ','抗TNF抗体','iv','UC,CD','ACT 1/2・ACCENT I/II・SONIC・UC-SUCCESS'],['ADA','アダリムマブ','抗TNF抗体','sc','UC,CD','ULTRA 2・CLASSIC I・CHARM'],['GLM','ゴリムマブ','抗TNF抗体','sc','UC','PURSUIT-SC・PURSUIT-J'],['VED','ベドリズマブ','抗α4β7インテグリン抗体','iv','UC,CD','GEMINI 1/2'],['UST','ウステキヌマブ','抗IL-12/23p40抗体','sc','UC,CD','UNIFI・UNITI・IM-UNITI'],['RIS','リサンキズマブ','抗IL-23p19抗体','sc','UC,CD','INSPIRE・COMMAND・ADVANCE・MOTIVATE・FORTIFY'],['MIRI','ミリキズマブ','抗IL-23p19抗体','sc','UC,CD','LUCENT・VIVID-1・VIVID-2'],['GUS','グセルクマブ','抗IL-23p19抗体','sc','UC,CD','QUASAR・ASTRO・GALAXI'],['OZA','オザニモド','S1P受容体調節薬','oral','UC','True North'],['ETR','エトラシモド','S1P受容体調節薬','oral','UC','ELEVATE'],['TOF','トファシチニブ','JAK阻害薬','oral','UC','OCTAVE'],['FIL','フィルゴチニブ','JAK1阻害薬','oral','UC','SELECTION'],['UPA','ウパダシチニブ','JAK1阻害薬','oral','UC,CD','U-ACHIEVE・U-ACCOMPLISH・U-EXCEL・U-EXCEED・U-ENDURE']
].map(([id,name,cls,route,diseases,trials])=>({id,name,cls,route,diseases:diseases.split(','),trials}));

const regimenData={
  IFX:{induction:['iv'],maintenance:['iv'],label:'導入：点滴 → 維持：点滴',optimization:{kind:'intensify',points:3,label:'CDでは増量・投与間隔短縮の選択肢',diseases:['CD']}},
  ADA:{induction:['sc'],maintenance:['sc'],label:'導入：皮下注 → 維持：皮下注',optimization:{kind:'intensify',points:2,label:'増量・投与強化の選択肢',diseases:['UC','CD']}},
  GLM:{induction:['sc'],maintenance:['sc'],label:'導入：皮下注 → 維持：皮下注'},
  VED:{induction:['iv'],maintenance:['iv','sc'],label:'導入：点滴 → 維持：点滴／皮下注'},
  UST:{induction:['iv'],maintenance:['sc'],label:'導入：点滴 → 維持：皮下注',optimization:{kind:'intensify',points:2,label:'Q12WからQ8Wへの短縮選択肢',diseases:['UC','CD']}},
  RIS:{induction:['iv'],maintenance:['sc'],label:'導入：点滴 → 維持：皮下注',optimization:{kind:'rescue',points:2,label:'追加・延長導入の選択肢',diseases:['UC','CD']}},
  MIRI:{induction:['iv'],maintenance:['sc'],label:'導入：点滴 → 維持：皮下注',optimization:{kind:'rescue',points:2,label:'追加・再導入の選択肢',diseases:['UC','CD']}},
  GUS:{induction:['iv','sc'],maintenance:['sc'],label:'導入：点滴／皮下注 → 維持：皮下注',optimization:{kind:'intensify',points:2,label:'Q8WからQ4Wへの変更選択肢',diseases:['UC','CD']}},
  OZA:{induction:['oral'],maintenance:['oral'],label:'導入：内服 → 維持：内服'},
  ETR:{induction:['oral'],maintenance:['oral'],label:'導入：内服 → 維持：内服'},
  TOF:{induction:['oral'],maintenance:['oral'],label:'導入：内服 → 維持：内服'},
  FIL:{induction:['oral'],maintenance:['oral'],label:'導入：内服 → 維持：内服'},
  UPA:{induction:['oral'],maintenance:['oral'],label:'導入：内服 → 維持：内服',optimization:{kind:'intensify',points:2,label:'維持療法15mgから30mgへの増量選択肢',diseases:['UC','CD']}}
};
drugs.forEach(d=>Object.assign(d,regimenData[d.id]));

const evidence={
IFX:{studies:[
 {trial:'ACT 1 / 2（UC）',endpoint:'臨床的反応・寛解（%）',periods:[['ACT 1 Week 8：臨床的反応',69.4,37.2],['ACT 1 Week 8：臨床的寛解',38.8,14.9],['ACT 2 Week 30：臨床的寛解',25.6,10.6]],source:'https://www.nejm.org/doi/10.1056/NEJMoa050516'},
 {trial:'ACCENT I（CD）',endpoint:'CDAI臨床的寛解（%）',periods:[['Week 30：臨床的寛解',39.0,21.0],['Week 54：臨床的寛解',29.0,9.0]],source:'https://pubmed.ncbi.nlm.nih.gov/12091826/'},
 {trial:'ACCENT II（瘻孔型CD）',endpoint:'完全瘻孔閉鎖（%）',periods:[['Week 54：完全瘻孔閉鎖',36.0,19.0]],source:'https://www.nejm.org/doi/10.1056/NEJMoa030815'},
 {trial:'SONIC（CD）',endpoint:'IFX＋AZA併用とIFX単独の比較（%）',activeLabel:'IFX＋AZA',controlLabel:'IFX単独',periods:[['Week 26：ステロイドフリー寛解',56.8,44.4],['Week 26：粘膜治癒',43.9,30.1]],source:'https://www.nejm.org/doi/full/10.1056/NEJMoa0904492'},
 {trial:'UC-SUCCESS（UC）',endpoint:'IFX＋AZA併用とIFX単独の比較（%）',activeLabel:'IFX＋AZA',controlLabel:'IFX単独',periods:[['Week 16：ステロイドフリー寛解',39.7,22.1],['Week 16：粘膜治癒',62.8,54.6]],source:'https://pubmed.ncbi.nlm.nih.gov/24512909/'}
]},
ADA:{studies:[
 {trial:'ULTRA 2（UC）',endpoint:'臨床的寛解（%）',periods:[['Week 8：臨床的寛解',16.5,9.3],['Week 52：臨床的寛解',17.3,8.5]],source:'https://pubmed.ncbi.nlm.nih.gov/22062358/'},
 {trial:'CLASSIC I（CD）',endpoint:'CDAI臨床的寛解（%）',periods:[['Week 4：臨床的寛解（160/80 mg）',36.0,12.0]],source:'https://pubmed.ncbi.nlm.nih.gov/16469680/'},
 {trial:'CHARM（CD）',endpoint:'CDAI臨床的寛解（%）',periods:[['Week 26：臨床的寛解（隔週）',40.0,17.0],['Week 56：臨床的寛解（隔週）',36.0,12.0]],source:'https://pubmed.ncbi.nlm.nih.gov/17030176/'}
]},
VED:{studies:[
 {trial:'GEMINI 1（UC）',endpoint:'臨床的反応・寛解（%）',periods:[['Week 6：臨床的反応',47.1,25.5],['Week 6：臨床的寛解',16.9,5.4],['Week 52：臨床的寛解（q8w）',41.8,15.9],['Week 52：臨床的寛解（q4w）',44.8,15.9]],source:'https://www.nejm.org/doi/10.1056/NEJMoa1215734'},
 {trial:'GEMINI 2（CD）',endpoint:'CDAI臨床的寛解（%）',periods:[['Week 6：臨床的寛解',14.5,6.8],['Week 52：臨床的寛解（q8w）',39.0,21.6]],source:'https://www.nejm.org/doi/10.1056/NEJMoa1215739'}
]},
UST:{trial:'UNIFI（UC）',endpoint:'臨床的寛解',periods:[['導入期 Week 8',15.6,5.3],['維持期 Week 44',43.8,24.0]],source:'https://www.nejm.org/doi/10.1056/NEJMoa1900750'},
GLM:{trial:'PURSUIT-SC / PURSUIT-J（UC）',endpoint:'主要有効性評価（%）',periods:[['PURSUIT-SC Week 6：臨床的反応（200/100 mg）',51.0,30.3],['PURSUIT-SC Week 6：臨床的寛解',17.8,6.4],['PURSUIT-J Week 54：臨床的反応維持',56.3,19.4],['PURSUIT-J Week 54：臨床的寛解',50.0,6.5]],source:'https://pubmed.ncbi.nlm.nih.gov/23735746/',source2:'https://link.springer.com/article/10.1007/s00535-017-1326-1'},
MIRI:{trial:'LUCENT（UC）/ VIVID-1・2（CD）',endpoint:'主要有効性評価（%）',periods:[['LUCENT 導入期 Week 12：臨床的寛解',24.2,13.3],['LUCENT 維持期 Week 40：臨床的寛解',49.9,25.1],['VIVID-1 Week 12反応＋Week 52 CDAI寛解',45.4,19.6],['VIVID-1 Week 12反応＋Week 52内視鏡反応',38.0,9.0],['VIVID-2 Week 104：臨床的寛解',79.0,null],['VIVID-2 Week 104：内視鏡的反応',81.8,null]],source:'https://pubmed.ncbi.nlm.nih.gov/39581202/',source2:'https://www.cghjournal.org/article/S1542-3565(26)00155-2/fulltext'},
RIS:{studies:[
 {trial:'INSPIRE（UC）',endpoint:'Week 12導入結果（%）',periods:[['臨床的寛解',20.3,6.2],['内視鏡的改善',36.5,12.1]],source:'https://pmc.ncbi.nlm.nih.gov/articles/PMC11772864/'},
 {trial:'COMMAND（UC）',endpoint:'Week 52維持結果（%）',periods:[['臨床的寛解（180 mg q8w）',40.2,25.1],['臨床的寛解（360 mg q8w）',37.6,25.1]],source:'https://pmc.ncbi.nlm.nih.gov/articles/PMC11772864/'},
 {trial:'ADVANCE（CD）',endpoint:'Week 12導入結果（%）',periods:[['CDAI臨床的寛解（600 mg）',45.2,25.2],['内視鏡的反応（600 mg）',40.2,12.0]],source:'https://pubmed.ncbi.nlm.nih.gov/35644154/'},
 {trial:'MOTIVATE（CD）',endpoint:'Week 12導入結果（%）',periods:[['CDAI臨床的寛解（600 mg）',41.9,19.8],['内視鏡的反応（600 mg）',28.8,11.2]],source:'https://pubmed.ncbi.nlm.nih.gov/35644154/'},
 {trial:'FORTIFY（CD）',endpoint:'Week 52維持結果（%）',periods:[['CDAI臨床的寛解（360 mg）',52.2,40.9],['内視鏡的反応（360 mg）',47.1,22.0]],source:'https://pubmed.ncbi.nlm.nih.gov/35644155/'}
]},
GUS:{studies:[
 {trial:'QUASAR（UC）',endpoint:'静注導入・皮下注維持（%）',periods:[['導入 Week 12：臨床的寛解',23.0,8.0],['維持 Week 44：臨床的寛解（200 mg q4w）',50.0,18.9]],source:'https://pubmed.ncbi.nlm.nih.gov/38104586/'},
 {trial:'ASTRO（UC）',endpoint:'皮下注導入・維持（%）',periods:[['Week 12：臨床的寛解',28.0,6.0],['Week 24：臨床的寛解（100 mg q8w）',35.3,9.4],['Week 24：臨床的寛解（200 mg q4w）',36.4,9.4],['Week 24：内視鏡的改善（200 mg q4w）',45.0,12.2]],source:'https://pubmed.ncbi.nlm.nih.gov/41544637/'},
 {trial:'GALAXI 2 / 3（CD）',endpoint:'Week 48の臨床・内視鏡評価（%）',activeLabel:'GUS',controlLabel:'UST',periods:[['臨床的寛解（200 mg q4w）',58.0,52.4],['内視鏡的反応（200 mg q4w）',51.3,30.8]],source:'https://pubmed.ncbi.nlm.nih.gov/39581203/'}
]},
OZA:{trial:'True North（UC）',endpoint:'臨床的寛解',periods:[['導入期 Week 10',18.4,6.0],['維持期 Week 52',37.0,18.5]],source:'https://www.nejm.org/doi/10.1056/NEJMoa2033617'},
ETR:{studies:[
 {trial:'ELEVATE UC 12（UC）',endpoint:'Week 12導入結果（%）',periods:[['臨床的寛解',24.8,15.2],['内視鏡的改善',30.6,18.8]],source:'https://pubmed.ncbi.nlm.nih.gov/36871574/'},
 {trial:'ELEVATE UC 52（UC）',endpoint:'Treat-through結果（%）',periods:[['Week 12：臨床的寛解',27.0,7.4],['Week 52：臨床的寛解',32.1,6.7]],source:'https://pubmed.ncbi.nlm.nih.gov/36871574/'}
]},
TOF:{studies:[
 {trial:'OCTAVE Induction 1（UC）',endpoint:'Week 8臨床的寛解（%）',periods:[['臨床的寛解',18.5,8.2]],source:'https://www.nejm.org/doi/10.1056/NEJMoa1606910'},
 {trial:'OCTAVE Induction 2（UC）',endpoint:'Week 8臨床的寛解（%）',periods:[['臨床的寛解',16.6,3.6]],source:'https://www.nejm.org/doi/10.1056/NEJMoa1606910'},
 {trial:'OCTAVE Sustain（UC）',endpoint:'Week 52臨床的寛解（%）',periods:[['5 mg 1日2回',34.3,11.1],['10 mg 1日2回',40.6,11.1]],source:'https://www.nejm.org/doi/10.1056/NEJMoa1606910'}
]},
FIL:{trial:'SELECTION（UC）',endpoint:'臨床的寛解',periods:[['導入期 Week 10※',26.1,15.3],['維持期 Week 58',37.2,11.2]],source:'https://pubmed.ncbi.nlm.nih.gov/33657431/'}
,
UPA:{studies:[
 {trial:'U-ACHIEVE Induction（UC）',endpoint:'Week 8臨床的寛解（%）',periods:[['臨床的寛解',26.0,5.0]],source:'https://pubmed.ncbi.nlm.nih.gov/35644166/'},
 {trial:'U-ACCOMPLISH（UC）',endpoint:'Week 8臨床的寛解（%）',periods:[['臨床的寛解',34.0,4.0]],source:'https://pubmed.ncbi.nlm.nih.gov/35644166/'},
 {trial:'U-ACHIEVE Maintenance（UC）',endpoint:'Week 52臨床的寛解（%）',periods:[['15 mg',42.0,12.0],['30 mg',52.0,12.0]],source:'https://pubmed.ncbi.nlm.nih.gov/35644166/'},
 {trial:'U-EXCEL / U-EXCEED（CD）',endpoint:'Week 12導入結果（%）',periods:[['U-EXCEL：CDAI寛解',49.5,29.1],['U-EXCEL：内視鏡的反応',45.5,13.1],['U-EXCEED：CDAI寛解',38.9,21.1],['U-EXCEED：内視鏡的反応',34.6,3.5]],source:'https://pubmed.ncbi.nlm.nih.gov/37224198/'},
 {trial:'U-ENDURE（CD）',endpoint:'Week 52維持結果（%）',periods:[['CDAI寛解（15 mg）',37.3,15.1],['CDAI寛解（30 mg）',47.6,15.1],['内視鏡的反応（30 mg）',40.1,7.3]],source:'https://pubmed.ncbi.nlm.nih.gov/37224198/'}
]}
};

const form=document.querySelector('#patientForm'),female=document.querySelector('#femaleSection'),pregnancy=document.querySelector('#pregnancyFields'),cd=document.querySelector('#cdGroup'),results=document.querySelector('#results'),usedRoot=document.querySelector('#usedDrugs');
const checks=(root,items)=>root.innerHTML=items.map(([n,l])=>`<label class="check"><input name="${n}" type="checkbox"><span>${l}</span></label>`).join('');
checks(document.querySelector('#riskChecks'),[['steroid','ステロイド依存・抵抗性'],['aza','AZA／6-MP内服中'],['infection','重篤感染症リスク'],['cvRisk','心血管リスク（喫煙・高血圧・糖尿病・心血管疾患既往など）'],['malignancy','悪性腫瘍の既往（治療後）'],['vte','血栓塞栓症リスク'],['adherence','内服アドヒアランス懸念']]);
checks(document.querySelector('#cdChecks'),[['cdstSurgery','腸管手術歴あり'],['cdstFistula','瘻孔型病変の既往あり'],['perianal','現在、肛門病変・瘻孔あり']]);
checks(document.querySelector('#optimizationChecks'),[['secondaryLoss','過去に二次無効・効果減弱があった'],['optimizeSame','同じ薬剤で増量・間隔短縮できることを重視'],['rescueOption','追加導入・再導入できることを重視'],['mechanismSwitch','最適化より作用機序変更を優先'],['optimizationNone','どれにも当てはまらない']]);
checks(document.querySelector('#burdenChecks'),[['visitIncrease','通院回数が増えてもよい'],['infusionTime','点滴時間を許容できる'],['selfInjection','自己注射が可能'],['injectionIncrease','注射回数が増えてもよい'],['adherenceOk','服薬管理に問題がない']]);
const data=()=>Object.fromEntries(new FormData(form));
const yes=n=>form.elements[n]?.checked;
const used=()=>[...form.querySelectorAll('input[name="usedDrug"]:checked')].map(x=>x.value);
const selected=n=>[...form.querySelectorAll(`input[name="${n}"]:checked`)].map(x=>x.value);
const toast=document.querySelector('#toast');
let toastTimer;
let menopauseAuto=false;
function showToast(message){toast.textContent=message;toast.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.hidden=true,4500)}
function calculateVdzCdst(){
  const f=data(),output=document.querySelector('#cdstResult');
  if(f.disease!=='CD'||f.cdstAlbumin===''||f.cdstCrp===''){
    output.className='cdst-result';output.innerHTML='<strong>VDZ-CDST</strong><span>アルブミンとCRPを入力してください</span>';return null;
  }
  const albuminGdl=Number(f.cdstAlbumin),albuminGl=albuminGdl*10,crpMgdl=Number(f.cdstCrp),crpMgl=crpMgdl*10;
  if(!Number.isFinite(albuminGdl)||!Number.isFinite(crpMgdl)||albuminGdl<1||albuminGdl>6||crpMgdl<0||crpMgdl>50)return null;
  const priorAntiTnf=used().some(id=>['IFX','ADA','GLM'].includes(id));
  let score=(yes('cdstSurgery')?0:2)+(priorAntiTnf?0:3)+(yes('cdstFistula')?0:2)+(albuminGl*0.4);
  score+=crpMgl<3?0:crpMgl<=10?-0.5:-3;
  score=Math.round(score*10)/10;
  const category=score<=13?'低':score<=19?'中間':'高';
  output.className=`cdst-result cdst-${category==='高'?'high':category==='中間'?'mid':'low'}`;
  output.innerHTML=`<strong>VDZ-CDST ${score}点</strong><span>ベドリズマブ反応可能性：${category}</span>`;
  return {score,category};
}
function validateForm(){
  form.querySelectorAll('.field.invalid,.used-reason.invalid').forEach(x=>x.classList.remove('invalid'));
  const f=data(),errors=[];
  if(!f.disease)errors.push([form.elements.disease,'疾患を選択してください']);
  if(!f.sex)errors.push([form.elements.sex,'性別を選択してください']);
  if(!f.ageGroup)errors.push([form.elements.ageGroup,'年齢区分を選択してください']);
  if(!f.severity)errors.push([form.elements.severity,'活動性を選択してください']);
  used().forEach(id=>{if(!form.elements[`usedReason_${id}`].value)errors.push([form.elements[`usedReason_${id}`],`${drugs.find(d=>d.id===id).name}の使用後の経過を選択してください`])});
  if(f.disease==='CD'){
    if(f.cdstAlbumin==='')errors.push([form.elements.cdstAlbumin,'CDST計算用のアルブミンを入力してください']);
    else if(+f.cdstAlbumin<1||+f.cdstAlbumin>6)errors.push([form.elements.cdstAlbumin,'アルブミンは1.0〜6.0 g/dLで入力してください']);
    if(f.cdstCrp==='')errors.push([form.elements.cdstCrp,'CDST計算用のCRPを入力してください']);
    else if(+f.cdstCrp<0||+f.cdstCrp>50)errors.push([form.elements.cdstCrp,'CRPは0〜50 mg/dLで入力してください']);
  }
  if(errors.length){errors.forEach(([el])=>el.closest('.field,.used-reason')?.classList.add('invalid'));showToast(errors.map(x=>x[1]).join('／'));errors[0][0].scrollIntoView({behavior:'smooth',block:'center'});errors[0][0].focus();return false}
  return true;
}
function resultTags(reasons){
  const tags=[];
  if(reasons.some(x=>x.includes('有効性')||x.includes('高度活動性')))tags.push('有効性重視');
  if(reasons.some(x=>x.includes('安全性')||x.includes('感染症')||x.includes('悪性腫瘍')||x.includes('高齢者')||x.includes('心血管')||x.includes('血栓')))tags.push('安全性重視');
  if(reasons.some(x=>x.includes('希望投与経路')&&x.includes('一致')))tags.push('希望経路一致');
  if(reasons.some(x=>x.includes('作用機序変更')))tags.push('作用機序変更');
  if(reasons.some(x=>x.includes('肛門病変')||x.includes('瘻孔')))tags.push('肛門病変');
  if(reasons.some(x=>x.includes('治療最適化')))tags.push('最適化可能');
  if(reasons.some(x=>x.includes('AZA併用注意')))tags.push('AZA併用注意');
  else if(reasons.some(x=>x.includes('AZA併用')))tags.push('AZA併用');
  return tags.slice(0,3);
}

function renderUsed(disease){
  usedRoot.innerHTML=disease?drugs.filter(d=>d.diseases.includes(disease)).map(d=>`<div class="used-history"><label class="check used"><input name="usedDrug" value="${d.id}" type="checkbox"><span>${d.name}（${d.cls}）</span></label><label class="used-reason" data-reason-for="${d.id}" hidden><span>使用後の経過</span><select name="usedReason_${d.id}"><option value="">選択してください</option><option value="primary">一次無効</option><option value="secondary">二次無効・効果減弱</option><option value="adverse">有害事象で中止</option><option value="remission">寛解後に中止</option><option value="other">その他</option></select></label></div>`).join(''):'<p class="hint">先に疾患を選択してください。</p>';
}
function updateOptimizationVisibility(){
  const routes=selected('inductionRoute'),any=yes('inductionAny'),hasUsedAt=used().length>0;
  const visibility={
    secondaryLoss:hasUsedAt,
    optimizeSame:any||routes.length>0,
    rescueOption:any||routes.includes('iv'),
    mechanismSwitch:hasUsedAt
  };
  Object.entries(visibility).forEach(([name,show])=>{
    const input=form.elements[name];input.closest('.check').hidden=!show;
    if(!show)input.checked=false;
  });
  const hasChoice=Object.values(visibility).some(Boolean);
  form.elements.optimizationNone.closest('.check').hidden=!hasChoice;
  if(!hasChoice)form.elements.optimizationNone.checked=false;
  document.querySelector('#optimizationBlock').hidden=!hasChoice;
}
function updateBurdenVisibility(routes,any,maintenanceVisible){
  const possible=new Set(any?['iv','sc','oral']:routes);
  if(maintenanceVisible){
    const value=form.elements.maintenanceRoute.value;
    if(value==='any'){
      [...form.elements.maintenanceRoute.options].filter(option=>option.value!=='any'&&!option.disabled).forEach(option=>possible.add(option.value));
    }else possible.add(value);
  }
  const visibility={
    visitIncrease:possible.has('iv')||possible.has('sc'),
    infusionTime:possible.has('iv'),
    selfInjection:possible.has('sc'),
    injectionIncrease:possible.has('sc'),
    adherenceOk:possible.has('oral')
  };
  document.querySelector('#burdenBlock').hidden=!Object.values(visibility).some(Boolean);
  Object.entries(visibility).forEach(([name,show])=>{
    const input=form.elements[name],label=input.closest('.check');
    label.hidden=!show;
    if(!show)input.checked=false;
  });
}
function updateRoutePreferences(changed){
  const routes=selected('inductionRoute'),any=yes('inductionAny'),field=document.querySelector('#maintenanceRouteField');
  const allowedMaintenance=new Set(any?['iv','sc','oral']:drugs.filter(d=>d.induction.some(route=>routes.includes(route))).flatMap(d=>d.maintenance));
  [...form.elements.maintenanceRoute.options].filter(option=>option.value!=='any').forEach(option=>{
    const allowed=allowedMaintenance.has(option.value);
    option.hidden=!allowed;option.disabled=!allowed;
  });
  const onlyRoute=allowedMaintenance.size===1?[...allowedMaintenance][0]:null;
  const show=!any&&allowedMaintenance.size>1;
  field.hidden=!show;
  if(changed==='inductionRoute'||changed==='inductionAny')form.elements.maintenanceRoute.value=onlyRoute||'any';
  if(form.elements.maintenanceRoute.selectedOptions[0]?.disabled)form.elements.maintenanceRoute.value=onlyRoute||'any';
  if(!routes.length&&!any)form.elements.maintenanceRoute.value='any';
  updateBurdenVisibility(routes,any,show);
}
function conditional(changed){
  const f=data(); female.hidden=f.sex!=='female'; cd.hidden=f.disease!=='CD';
  document.querySelector('#treatmentStepNumber').textContent=f.sex==='female'?'03':'02';
  document.querySelector('#routeStepNumber').textContent=f.disease==='CD'?'04':'03';
  if(changed==='disease')renderUsed(f.disease);
  updateOptimizationVisibility();
  if(f.sex!=='female')for(const n of ['lifeNone','menopause','pregnancyPlan','pregnant','nursing'])form.elements[n].checked=false;
  const autoMenopause=f.sex==='female'&&f.ageGroup==='75+';
  if(autoMenopause){
    form.elements.menopause.checked=true;
    form.elements.lifeNone.checked=false;
    for(const n of ['pregnancyPlan','pregnant','nursing'])form.elements[n].checked=false;
    menopauseAuto=true;
  }else if(menopauseAuto){
    form.elements.menopause.checked=false;
    menopauseAuto=false;
  }
  document.querySelector('#ageMenopauseNotice').hidden=!autoMenopause;
  pregnancy.hidden=yes('lifeNone')||yes('menopause');
  updateRoutePreferences(changed);
  calculateVdzCdst();
}
form.addEventListener('change',e=>{
  const n=e.target.name;
  if(n==='lifeNone'&&e.target.checked)for(const x of ['menopause','pregnancyPlan','pregnant','nursing'])form.elements[x].checked=false;
  if(['menopause','pregnancyPlan','pregnant','nursing'].includes(n)&&e.target.checked)form.elements.lifeNone.checked=false;
  if(n==='menopause'&&e.target.checked)for(const x of ['pregnancyPlan','pregnant','nursing'])form.elements[x].checked=false;
  if(n==='optimizationNone'&&e.target.checked)for(const x of ['secondaryLoss','optimizeSame','rescueOption','mechanismSwitch'])form.elements[x].checked=false;
  if(['secondaryLoss','optimizeSame','rescueOption','mechanismSwitch'].includes(n)&&e.target.checked)form.elements.optimizationNone.checked=false;
  if(n==='mechanismSwitch'&&e.target.checked)for(const x of ['optimizeSame','rescueOption'])form.elements[x].checked=false;
  if(['optimizeSame','rescueOption'].includes(n)&&e.target.checked)form.elements.mechanismSwitch.checked=false;
  if(n==='inductionAny'&&e.target.checked)form.querySelectorAll('input[name="inductionRoute"]').forEach(x=>x.checked=false);
  if(n==='inductionRoute'&&e.target.checked)form.elements.inductionAny.checked=false;
  if(n==='usedDrug'){
    const reason=form.querySelector(`[data-reason-for="${e.target.value}"]`);
    reason.hidden=!e.target.checked;
    if(!e.target.checked)reason.querySelector('select').value='';
  }
  if(n==='adherence'&&e.target.checked)form.elements.adherenceOk.checked=false;
  if(n==='adherenceOk'&&e.target.checked)form.elements.adherence.checked=false;
  e.target.closest('.field,.used-reason')?.classList.remove('invalid'); conditional(n); results.hidden=true;
});
form.addEventListener('input',e=>{e.target.closest('.field')?.classList.remove('invalid');calculateVdzCdst();results.hidden=true});

function calculate(f){
  const excluded=new Set(used());
  const historyEntries=[...excluded].map(id=>({drug:drugs.find(d=>d.id===id),reason:form.elements[`usedReason_${id}`]?.value||''}));
  const usedClasses=drugs.filter(d=>excluded.has(d.id)).map(d=>d.cls);
  const historyType=!excluded.size?'none':usedClasses.includes('抗TNF抗体')?'antiTNF':'advanced';
  const inductionPreferences=selected('inductionRoute');
  return drugs.filter(d=>d.diseases.includes(f.disease)&&!excluded.has(d.id)).map(d=>{
    let score=70,reasons=[]; const add=(n,s)=>{score+=n;reasons.push(`${n>0?'+':''}${n} ${s}`)};
    if(f.severity==='severe'&&['IFX','UPA','RIS'].includes(d.id))add(8,'高度活動性で有効性を重視');
    if(historyType==='antiTNF'&&d.cls!=='抗TNF抗体')add(7,'抗TNF既治療後の作用機序変更');
    if(historyType==='advanced'&&['UPA','RIS','MIRI','GUS'].includes(d.id))add(5,'高度治療既治療後の選択肢');
    const primaryFailures=historyEntries.filter(entry=>entry.reason==='primary');
    if(primaryFailures.some(entry=>entry.drug.cls===d.cls))add(-6,'同一作用機序で一次無効歴あり');
    else if(primaryFailures.length)add(3,'一次無効後の作用機序変更');
    if(historyEntries.some(entry=>entry.reason==='adverse'&&entry.drug.cls===d.cls))add(-3,'同一作用機序で有害事象中止歴あり');
    if(yes('steroid')&&['UPA','IFX'].includes(d.id))add(4,'ステロイド依存・抵抗性');
    if(yes('aza')&&d.id==='IFX'){
      if(f.ageGroup==='75+'||yes('infection')||yes('malignancy'))add(0,'AZA併用注意：年齢・感染症・悪性腫瘍リスクを優先評価');
      else add(4,'AZA併用による有効性・免疫原性抑制のエビデンス');
    }
    if(f.disease==='CD'&&yes('perianal')&&d.id==='IFX')add(12,'肛門病変・瘻孔のエビデンス');
    if(f.disease==='CD'&&d.id==='VED'){
      const cdstScore=calculateVdzCdst();
      if(cdstScore?.category==='高')add(8,`VDZ-CDST ${cdstScore.score}点：反応可能性 高`);
      else if(cdstScore?.category==='中間')add(3,`VDZ-CDST ${cdstScore.score}点：反応可能性 中間`);
      else if(cdstScore?.category==='低')add(-5,`VDZ-CDST ${cdstScore.score}点：反応可能性 低`);
    }
    if(inductionPreferences.length)inductionPreferences.some(route=>d.induction.includes(route))?add(2,'導入期に許容できる投与経路と一致'):add(-2,'導入期に許容できる投与経路と不一致');
    if(f.maintenanceRoute!=='any')d.maintenance.includes(f.maintenanceRoute)?add(6,'維持期の希望投与経路と一致'):add(-4,'維持期の希望投与経路と不一致');
    if(yes('infusionTime')&&d.induction.includes('iv'))add(1,'点滴時間を許容');
    if(yes('selfInjection')&&d.maintenance.includes('sc'))add(1,'自己注射が可能');
    if(yes('adherenceOk')&&d.maintenance.includes('oral'))add(1,'服薬管理に問題なし');
    if(yes('adherence')&&d.maintenance.includes('oral'))add(-8,'内服アドヒアランス懸念');
    if(d.optimization&&d.optimization.diseases.includes(f.disease)&&!yes('mechanismSwitch')){
      const hasSecondaryHistory=historyEntries.some(entry=>entry.reason==='secondary');
      const wanted=yes('secondaryLoss')||hasSecondaryHistory||(d.optimization.kind==='intensify'&&yes('optimizeSame'))||(d.optimization.kind==='rescue'&&yes('rescueOption'));
      if(wanted){
        add(d.optimization.points,`治療最適化：${d.optimization.label}`);
        if(yes('visitIncrease')&&['IFX','RIS','MIRI'].includes(d.id))add(0,'治療最適化に伴う通院増加を許容');
        if(yes('injectionIncrease')&&['ADA','UST','GUS'].includes(d.id))add(0,'治療最適化に伴う注射回数増加を許容');
      }
    }
    if(f.ageGroup==='65-74'){
      if(d.id==='VED')add(6,'高齢者で腸管選択性を考慮');
      else if(d.id==='UST')add(4,'高齢者で安全性プロファイルを考慮');
      else if(['RIS','MIRI','GUS'].includes(d.id))add(3,'高齢者でIL-23選択性を考慮');
      else if(['TOF','FIL','UPA'].includes(d.id))add(-10,'高齢者でJAK阻害薬の安全性を慎重評価');
    }
    if(f.ageGroup==='75+'){
      if(d.id==='VED')add(8,'75歳以上で腸管選択性を重視');
      else if(d.id==='UST')add(6,'75歳以上で安全性プロファイルを重視');
      else if(['RIS','MIRI','GUS'].includes(d.id))add(4,'75歳以上でIL-23選択性を考慮');
      else if(['TOF','FIL','UPA'].includes(d.id))add(-15,'75歳以上でJAK阻害薬の安全性をより慎重に評価');
      if(yes('infection')){
        if(['TOF','FIL','UPA'].includes(d.id))add(-5,'75歳以上かつ重篤感染症リスク');
        else if(['IFX','ADA','GLM'].includes(d.id))add(-3,'75歳以上かつ重篤感染症リスク');
      }
      if(yes('vte')&&['TOF','FIL','UPA'].includes(d.id))add(-5,'75歳以上かつ血栓塞栓症リスク');
    }
    if(yes('cvRisk')){
      if(['TOF','FIL','UPA'].includes(d.id))add(f.ageGroup==='75+'?-12:-8,`${f.ageGroup==='75+'?'75歳以上かつ':''}心血管リスク`);
      else if(d.id==='VED')add(3,'心血管リスクを踏まえ腸管選択性を考慮');
      else if(['UST','RIS','MIRI','GUS'].includes(d.id))add(2,'心血管リスクを踏まえ安全性を考慮');
    }
    if(yes('infection')){
      if(d.id==='VED')add(8,'重篤感染症リスクで腸管選択性を考慮');
      else if(['UST','RIS','MIRI','GUS'].includes(d.id))add(4,'感染症リスクを考慮した作用機序');
      else if(['IFX','ADA','GLM'].includes(d.id))add(-6,'重篤感染症リスクで抗TNF抗体を慎重評価');
      else if(['TOF','FIL','UPA'].includes(d.id))add(-12,'重篤感染症リスクでJAK阻害薬を慎重評価');
    }
    if(yes('malignancy')){
      if(d.id==='VED')add(10,'悪性腫瘍既往で既存の再発安全性データを考慮');
      else if(d.id==='UST')add(8,'悪性腫瘍既往で既存の再発安全性データを考慮');
      else if(['RIS','MIRI','GUS'].includes(d.id))add(4,'悪性腫瘍既往で現時点の安全性情報を考慮');
      else if(['TOF','FIL','UPA'].includes(d.id))add(-12,'悪性腫瘍既往ではJAK阻害薬の根拠が不十分');
    }
    if(yes('vte')&&['TOF','FIL','UPA'].includes(d.id))add(-15,'血栓塞栓症リスク');
    if((yes('pregnancyPlan')||yes('pregnant')||yes('nursing'))&&['TOF','FIL','UPA','OZA','ETR'].includes(d.id))add(-20,'妊娠・授乳関連の安全性');
    return {...d,score,reasons};
  }).sort((a,b)=>b.score-a.score||a.name.localeCompare(b.name,'ja')).map((d,i,a)=>({...d,rank:a.findIndex(x=>x.score===d.score)+1}));
}
form.addEventListener('submit',e=>{
  e.preventDefault(); if(!validateForm())return;
  const rows=calculate(data()),error=document.querySelector('#error');
  if(!rows.length){error.textContent='使用済み薬剤以外に候補がありません。選択内容を確認してください。';return}
  error.textContent=''; const top=rows[0].score,names=rows.filter(x=>x.rank===1).map(x=>x.name).join('、');
  document.querySelector('#summary').innerHTML=`<strong>${names}</strong>${rows.filter(x=>x.rank===1).length>1?' は同点で、いずれも第一選択候補です。':' を第一選択候補として提示します。'} 最終決定は適応・禁忌・最新の添付文書と患者希望を確認してください。`;
  document.querySelector('#cards').innerHTML=rows.map(r=>{const tags=resultTags(r.reasons);return `<article class="${r.rank===1?'best':''}"><div class="rank"><strong>${r.rank}</strong><small>位</small></div><div class="drug"><h3>${r.name}</h3><p>${r.cls}</p><p class="regimen">${r.label}</p>${tags.length?`<div class="tags">${tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>`:''}<p class="reason-line">${r.reasons[0]?.replace(/^[+-]?\d+\s*/,'')||'標準条件による基本評価'}</p></div><div class="score"><strong>${r.score}</strong><small>点 ${r.score===top?'TOP':`-${top-r.score}`}</small></div><details><summary>評価の内訳</summary>${r.reasons.length?`<ul>${r.reasons.map(x=>`<li>${x}</li>`).join('')}</ul>`:'<p>基本点のみ</p>'}</details></article>`}).join('');
  results.hidden=false; results.scrollIntoView({behavior:'smooth'});
});
document.querySelector('#edit').onclick=()=>{results.hidden=true;scrollTo({top:0,behavior:'smooth'})};
document.querySelector('#restart').onclick=()=>{form.reset();renderUsed('');conditional();results.hidden=true;scrollTo({top:0,behavior:'smooth'})};

const trialRoot=document.querySelector('#trials'),dialog=document.querySelector('#trialDialog'),detail=document.querySelector('#trialDetail');
function mechanismGroup(d){
  if(d.cls.includes('抗TNF'))return 'tnf';
  if(d.cls.includes('インテグリン'))return 'integrin';
  if(d.cls.includes('IL-12/23'))return 'il12';
  if(d.cls.includes('IL-23'))return 'il23';
  if(d.cls.includes('JAK'))return 'jak';
  return 's1p';
}
trialRoot.innerHTML=drugs.map(d=>`<button type="button" class="trial-card trial-${mechanismGroup(d)}" data-drug="${d.id}" aria-label="${d.name}の臨床試験結果を見る"><span>${d.cls}</span><strong>${d.name}</strong><small>${d.trials}</small><em>${evidence[d.id]?'結果グラフを見る':'試験名を確認'}</em></button>`).join('');
function renderStudy(ev,index=0){
  const studies=ev.studies||[ev],study=studies[index];
  detail.innerHTML=`<span class="eyebrow">CLINICAL TRIAL</span>${studies.length>1?`<div class="study-tabs">${studies.map((s,i)=>`<button type="button" data-study="${i}" class="${i===index?'active':''}">${s.trial}</button>`).join('')}</div>`:''}<h2>${study.trial}</h2><p>${study.endpoint}</p>${study.periods.map(([label,active,control])=>`<div class="chart"><b>${label}</b><div class="barrow"><span>${control==null?'継続投与群':study.activeLabel||'実薬'} ${active}%</span><i style="width:${active}%"></i></div>${control==null?'':`<div class="barrow control"><span>${study.controlLabel||'対照'} ${control}%</span><i style="width:${control}%"></i></div>`}</div>`).join('')}<p class="trial-note">※ 対象集団、評価項目の定義、再ランダム化条件、評価時点は試験ごとに異なります。試験間の数値を直接比較しないでください。</p><a href="${study.source}" target="_blank" rel="noopener">一次資料を開く</a>${study.source2?`　<a href="${study.source2}" target="_blank" rel="noopener">関連試験資料を開く</a>`:''}`;
  detail.querySelectorAll('[data-study]').forEach(button=>button.addEventListener('click',()=>renderStudy(ev,Number(button.dataset.study))));
}
trialRoot.addEventListener('click',e=>{
  const card=e.target.closest('[data-drug]'); if(!card)return; const d=drugs.find(x=>x.id===card.dataset.drug),ev=evidence[d.id];
  dialog.className=`trial-${mechanismGroup(d)}`;
  if(ev){const studies=ev.studies||[ev],disease=data().disease,initial=Math.max(0,studies.findIndex(s=>s.trial.includes(`（${disease}）`)));renderStudy(ev,initial)}else detail.innerHTML=`<h2>${d.name}</h2><p>${d.trials}</p><p>グラフ用の検証済み数値は次版で追加予定です。</p>`;
  if(typeof dialog.showModal==='function')dialog.showModal();else{dialog.setAttribute('open','');dialog.scrollIntoView({behavior:'smooth',block:'center'})}
});
const closeDialog=()=>typeof dialog.close==='function'?dialog.close():dialog.removeAttribute('open');
document.querySelector('#closeTrial').onclick=closeDialog;
dialog.addEventListener('click',e=>{if(e.target===dialog)closeDialog()});
renderUsed(''); conditional();
