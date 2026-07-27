const drugs=[
['IFX','インフリキシマブ','抗TNF抗体','iv','UC,CD','ACT 1/2・ACCENT I/II'],['ADA','アダリムマブ','抗TNF抗体','sc','UC,CD','ULTRA 2・CLASSIC I・CHARM'],['GLM','ゴリムマブ','抗TNF抗体','sc','UC','PURSUIT-SC・PURSUIT-J'],['VED','ベドリズマブ','抗α4β7インテグリン抗体','iv','UC,CD','GEMINI 1/2'],['UST','ウステキヌマブ','抗IL-12/23p40抗体','sc','UC,CD','UNIFI・UNITI・IM-UNITI'],['RIS','リサンキズマブ','抗IL-23p19抗体','sc','UC,CD','INSPIRE・COMMAND・ADVANCE・MOTIVATE・FORTIFY'],['MIRI','ミリキズマブ','抗IL-23p19抗体','sc','UC,CD','LUCENT・VIVID-1・VIVID-2'],['GUS','グセルクマブ','抗IL-23p19抗体','sc','UC,CD','QUASAR・ASTRO・GALAXI'],['OZA','オザニモド','S1P受容体調節薬','oral','UC','True North'],['ETR','エトラシモド','S1P受容体調節薬','oral','UC','ELEVATE'],['TOF','トファシチニブ','JAK阻害薬','oral','UC','OCTAVE'],['FIL','フィルゴチニブ','JAK1阻害薬','oral','UC','SELECTION'],['UPA','ウパダシチニブ','JAK1阻害薬','oral','UC,CD','U-ACHIEVE・U-ACCOMPLISH・U-EXCEL・U-EXCEED・U-ENDURE']
].map(([id,name,cls,route,diseases,trials])=>({id,name,cls,route,diseases:diseases.split(','),trials}));

const evidence={
IFX:{studies:[
 {trial:'ACT 1 / 2（UC）',endpoint:'臨床的反応・寛解（%）',periods:[['ACT 1 Week 8：臨床的反応',69.4,37.2],['ACT 1 Week 8：臨床的寛解',38.8,14.9],['ACT 2 Week 30：臨床的寛解',25.6,10.6]],source:'https://www.nejm.org/doi/10.1056/NEJMoa050516'},
 {trial:'ACCENT I（CD）',endpoint:'CDAI臨床的寛解（%）',periods:[['Week 30：臨床的寛解',39.0,21.0],['Week 54：臨床的寛解',29.0,9.0]],source:'https://pubmed.ncbi.nlm.nih.gov/12091826/'},
 {trial:'ACCENT II（瘻孔型CD）',endpoint:'完全瘻孔閉鎖（%）',periods:[['Week 54：完全瘻孔閉鎖',36.0,19.0]],source:'https://www.nejm.org/doi/10.1056/NEJMoa030815'}
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
checks(document.querySelector('#riskChecks'),[['steroid','ステロイド依存・抵抗性'],['infection','重篤感染症リスク'],['cvRisk','心血管リスク（喫煙・高血圧・糖尿病・心血管疾患既往など）'],['malignancy','悪性腫瘍の既往（治療後）'],['vte','血栓塞栓症リスク'],['adherence','内服アドヒアランス懸念']]);
checks(document.querySelector('#cdChecks'),[['cdstSurgery','腸管手術歴あり'],['cdstFistula','瘻孔型病変の既往あり'],['perianal','現在、肛門病変・瘻孔あり']]);
const data=()=>Object.fromEntries(new FormData(form));
const yes=n=>form.elements[n]?.checked;
const used=()=>[...form.querySelectorAll('input[name="usedDrug"]:checked')].map(x=>x.value);
const toast=document.querySelector('#toast');
let toastTimer;
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
  form.querySelectorAll('.field.invalid').forEach(x=>x.classList.remove('invalid'));
  const f=data(),errors=[];
  if(!f.disease)errors.push([form.elements.disease,'疾患を選択してください']);
  if(!f.sex)errors.push([form.elements.sex,'性別を選択してください']);
  if(!f.ageGroup)errors.push([form.elements.ageGroup,'年齢区分を選択してください']);
  if(!f.severity)errors.push([form.elements.severity,'活動性を選択してください']);
  if(f.disease==='CD'){
    if(f.cdstAlbumin==='')errors.push([form.elements.cdstAlbumin,'CDST計算用のアルブミンを入力してください']);
    else if(+f.cdstAlbumin<1||+f.cdstAlbumin>6)errors.push([form.elements.cdstAlbumin,'アルブミンは1.0〜6.0 g/dLで入力してください']);
    if(f.cdstCrp==='')errors.push([form.elements.cdstCrp,'CDST計算用のCRPを入力してください']);
    else if(+f.cdstCrp<0||+f.cdstCrp>50)errors.push([form.elements.cdstCrp,'CRPは0〜50 mg/dLで入力してください']);
  }
  if(errors.length){errors.forEach(([el])=>el.closest('.field')?.classList.add('invalid'));showToast(errors.map(x=>x[1]).join('／'));errors[0][0].scrollIntoView({behavior:'smooth',block:'center'});errors[0][0].focus();return false}
  return true;
}
function resultTags(reasons){
  const tags=[];
  if(reasons.some(x=>x.includes('有効性')||x.includes('高度活動性')))tags.push('有効性重視');
  if(reasons.some(x=>x.includes('安全性')||x.includes('感染症')||x.includes('悪性腫瘍')||x.includes('高齢者')||x.includes('心血管')||x.includes('血栓')))tags.push('安全性重視');
  if(reasons.some(x=>x.includes('希望する投与経路')))tags.push('希望経路一致');
  if(reasons.some(x=>x.includes('作用機序変更')))tags.push('作用機序変更');
  if(reasons.some(x=>x.includes('肛門病変')||x.includes('瘻孔')))tags.push('肛門病変');
  return tags.slice(0,3);
}

function renderUsed(disease){
  usedRoot.innerHTML=disease?drugs.filter(d=>d.diseases.includes(disease)).map(d=>`<label class="check used"><input name="usedDrug" value="${d.id}" type="checkbox"><span>${d.name}（${d.cls}）</span></label>`).join(''):'<p class="hint">先に疾患を選択してください。</p>';
}
function conditional(changed){
  const f=data(); female.hidden=f.sex!=='female'; cd.hidden=f.disease!=='CD';
  if(changed==='disease')renderUsed(f.disease);
  if(f.sex!=='female')for(const n of ['lifeNone','menopause','pregnancyPlan','pregnant','nursing'])form.elements[n].checked=false;
  pregnancy.hidden=yes('lifeNone')||yes('menopause');
  calculateVdzCdst();
}
form.addEventListener('change',e=>{
  const n=e.target.name;
  if(n==='lifeNone'&&e.target.checked)for(const x of ['menopause','pregnancyPlan','pregnant','nursing'])form.elements[x].checked=false;
  if(['menopause','pregnancyPlan','pregnant','nursing'].includes(n)&&e.target.checked)form.elements.lifeNone.checked=false;
  if(n==='menopause'&&e.target.checked)for(const x of ['pregnancyPlan','pregnant','nursing'])form.elements[x].checked=false;
  e.target.closest('.field')?.classList.remove('invalid'); conditional(n); results.hidden=true;
});
form.addEventListener('input',e=>{e.target.closest('.field')?.classList.remove('invalid');calculateVdzCdst();results.hidden=true});

function calculate(f){
  const excluded=new Set(used());
  const usedClasses=drugs.filter(d=>excluded.has(d.id)).map(d=>d.cls);
  const historyType=!excluded.size?'none':usedClasses.includes('抗TNF抗体')?'antiTNF':'advanced';
  return drugs.filter(d=>d.diseases.includes(f.disease)&&!excluded.has(d.id)).map(d=>{
    let score=70,reasons=[]; const add=(n,s)=>{score+=n;reasons.push(`${n>0?'+':''}${n} ${s}`)};
    if(f.severity==='severe'&&['IFX','UPA','RIS'].includes(d.id))add(8,'高度活動性で有効性を重視');
    if(historyType==='antiTNF'&&d.cls!=='抗TNF抗体')add(7,'抗TNF既治療後の作用機序変更');
    if(historyType==='advanced'&&['UPA','RIS','MIRI','GUS'].includes(d.id))add(5,'高度治療既治療後の選択肢');
    if(yes('steroid')&&['UPA','IFX'].includes(d.id))add(4,'ステロイド依存・抵抗性');
    if(f.disease==='CD'&&yes('perianal')&&d.id==='IFX')add(12,'肛門病変・瘻孔のエビデンス');
    if(f.disease==='CD'&&d.id==='VED'){
      const cdstScore=calculateVdzCdst();
      if(cdstScore?.category==='高')add(8,`VDZ-CDST ${cdstScore.score}点：反応可能性 高`);
      else if(cdstScore?.category==='中間')add(3,`VDZ-CDST ${cdstScore.score}点：反応可能性 中間`);
      else if(cdstScore?.category==='低')add(-5,`VDZ-CDST ${cdstScore.score}点：反応可能性 低`);
    }
    if(f.route!=='any')d.route===f.route?add(6,'希望する投与経路'):add(-4,'希望経路と不一致');
    if(yes('adherence')&&d.route==='oral')add(-8,'内服アドヒアランス懸念');
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
  document.querySelector('#cards').innerHTML=rows.map(r=>{const tags=resultTags(r.reasons);return `<article class="${r.rank===1?'best':''}"><div class="rank"><strong>${r.rank}</strong><small>位</small></div><div class="drug"><h3>${r.name}</h3><p>${r.cls} / ${{oral:'内服',sc:'皮下注',iv:'点滴静注'}[r.route]}</p>${tags.length?`<div class="tags">${tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>`:''}<p class="reason-line">${r.reasons[0]?.replace(/^[+-]?\d+\s*/,'')||'標準条件による基本評価'}</p></div><div class="score"><strong>${r.score}</strong><small>点 ${r.score===top?'TOP':`-${top-r.score}`}</small></div><details><summary>評価の内訳</summary>${r.reasons.length?`<ul>${r.reasons.map(x=>`<li>${x}</li>`).join('')}</ul>`:'<p>基本点のみ</p>'}</details></article>`}).join('');
  results.hidden=false; results.scrollIntoView({behavior:'smooth'});
});
document.querySelector('#edit').onclick=()=>{results.hidden=true;scrollTo({top:0,behavior:'smooth'})};
document.querySelector('#restart').onclick=()=>{form.reset();renderUsed('');conditional();results.hidden=true;scrollTo({top:0,behavior:'smooth'})};

const trialRoot=document.querySelector('#trials'),dialog=document.querySelector('#trialDialog'),detail=document.querySelector('#trialDetail');
trialRoot.innerHTML=drugs.map(d=>`<button type="button" class="trial-card" data-drug="${d.id}" aria-label="${d.name}の臨床試験結果を見る"><span>${d.cls}</span><strong>${d.name}</strong><small>${d.trials}</small><em>${evidence[d.id]?'結果グラフを見る':'試験名を確認'}</em></button>`).join('');
function renderStudy(ev,index=0){
  const studies=ev.studies||[ev],study=studies[index];
  detail.innerHTML=`<span class="eyebrow">CLINICAL TRIAL</span>${studies.length>1?`<div class="study-tabs">${studies.map((s,i)=>`<button type="button" data-study="${i}" class="${i===index?'active':''}">${s.trial}</button>`).join('')}</div>`:''}<h2>${study.trial}</h2><p>${study.endpoint}</p>${study.periods.map(([label,active,control])=>`<div class="chart"><b>${label}</b><div class="barrow"><span>${control==null?'継続投与群':study.activeLabel||'実薬'} ${active}%</span><i style="width:${active}%"></i></div>${control==null?'':`<div class="barrow control"><span>${study.controlLabel||'対照'} ${control}%</span><i style="width:${control}%"></i></div>`}</div>`).join('')}<p class="trial-note">※ 対象集団、評価項目の定義、再ランダム化条件、評価時点は試験ごとに異なります。試験間の数値を直接比較しないでください。</p><a href="${study.source}" target="_blank" rel="noopener">一次資料を開く</a>${study.source2?`　<a href="${study.source2}" target="_blank" rel="noopener">関連試験資料を開く</a>`:''}`;
  detail.querySelectorAll('[data-study]').forEach(button=>button.addEventListener('click',()=>renderStudy(ev,Number(button.dataset.study))));
}
trialRoot.addEventListener('click',e=>{
  const card=e.target.closest('[data-drug]'); if(!card)return; const d=drugs.find(x=>x.id===card.dataset.drug),ev=evidence[d.id];
  if(ev){const studies=ev.studies||[ev],disease=data().disease,initial=Math.max(0,studies.findIndex(s=>s.trial.includes(`（${disease}）`)));renderStudy(ev,initial)}else detail.innerHTML=`<h2>${d.name}</h2><p>${d.trials}</p><p>グラフ用の検証済み数値は次版で追加予定です。</p>`;
  if(typeof dialog.showModal==='function')dialog.showModal();else{dialog.setAttribute('open','');dialog.scrollIntoView({behavior:'smooth',block:'center'})}
});
const closeDialog=()=>typeof dialog.close==='function'?dialog.close():dialog.removeAttribute('open');
document.querySelector('#closeTrial').onclick=closeDialog;
dialog.addEventListener('click',e=>{if(e.target===dialog)closeDialog()});
renderUsed(''); conditional();
