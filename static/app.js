const drugs=[
['IFX','インフリキシマブ','抗TNF抗体','iv','UC,CD','ACT 1/2・ACCENT I/II'],['ADA','アダリムマブ','抗TNF抗体','sc','UC,CD','ULTRA 2・CLASSIC I・CHARM'],['GLM','ゴリムマブ','抗TNF抗体','sc','UC','PURSUIT-SC・PURSUIT-J'],['VED','ベドリズマブ','抗α4β7インテグリン抗体','iv','UC,CD','GEMINI 1/2'],['UST','ウステキヌマブ','抗IL-12/23p40抗体','sc','UC,CD','UNIFI・UNITI・IM-UNITI'],['RIS','リサンキズマブ','抗IL-23p19抗体','sc','UC,CD','INSPIRE・COMMAND・ADVANCE・MOTIVATE・FORTIFY'],['MIRI','ミリキズマブ','抗IL-23p19抗体','sc','UC,CD','LUCENT・VIVID-1・VIVID-2'],['GUS','グセルクマブ','抗IL-23p19抗体','sc','UC,CD','QUASAR・ASTRO・GALAXI'],['OZA','オザニモド','S1P受容体調節薬','oral','UC','True North'],['ETR','エトラシモド','S1P受容体調節薬','oral','UC','ELEVATE'],['TOF','トファシチニブ','JAK阻害薬','oral','UC','OCTAVE'],['FIL','フィルゴチニブ','JAK1阻害薬','oral','UC','SELECTION'],['UPA','ウパダシチニブ','JAK1阻害薬','oral','UC,CD','U-ACHIEVE・U-ACCOMPLISH・U-EXCEL・U-EXCEED・U-ENDURE']
].map(([id,name,cls,route,diseases,trials])=>({id,name,cls,route,diseases:diseases.split(','),trials}));

const evidence={
UST:{trial:'UNIFI（UC）',endpoint:'臨床的寛解',periods:[['導入期 Week 8',15.6,5.3],['維持期 Week 44',43.8,24.0]],source:'https://www.nejm.org/doi/10.1056/NEJMoa1900750'},
GLM:{trial:'PURSUIT-SC / PURSUIT-J（UC）',endpoint:'主要有効性評価（%）',periods:[['PURSUIT-SC Week 6：臨床的反応（200/100 mg）',51.0,30.3],['PURSUIT-SC Week 6：臨床的寛解',17.8,6.4],['PURSUIT-J Week 54：臨床的反応維持',56.3,19.4],['PURSUIT-J Week 54：臨床的寛解',50.0,6.5]],source:'https://pubmed.ncbi.nlm.nih.gov/23735746/',source2:'https://link.springer.com/article/10.1007/s00535-017-1326-1'},
MIRI:{trial:'LUCENT（UC）/ VIVID-1・2（CD）',endpoint:'主要有効性評価（%）',periods:[['LUCENT 導入期 Week 12：臨床的寛解',24.2,13.3],['LUCENT 維持期 Week 40：臨床的寛解',49.9,25.1],['VIVID-1 Week 12反応＋Week 52 CDAI寛解',45.4,19.6],['VIVID-1 Week 12反応＋Week 52内視鏡反応',38.0,9.0],['VIVID-2 Week 104：臨床的寛解',79.0,null],['VIVID-2 Week 104：内視鏡的反応',81.8,null]],source:'https://pubmed.ncbi.nlm.nih.gov/39581202/',source2:'https://www.cghjournal.org/article/S1542-3565(26)00155-2/fulltext'},
GUS:{trial:'ASTRO（UC）',endpoint:'皮下注導入・維持の主要結果（%）',periods:[['Week 12：臨床的寛解',28.0,6.0],['Week 24：臨床的寛解（100 mg q8w）',35.3,9.4],['Week 24：臨床的寛解（200 mg q4w）',36.4,9.4],['Week 24：内視鏡的改善（200 mg q4w）',45.0,12.2]],source:'https://pubmed.ncbi.nlm.nih.gov/41544637/'},
OZA:{trial:'True North（UC）',endpoint:'臨床的寛解',periods:[['導入期 Week 10',18.4,6.0],['維持期 Week 52',37.0,18.5]],source:'https://www.nejm.org/doi/10.1056/NEJMoa2033617'},
FIL:{trial:'SELECTION（UC）',endpoint:'臨床的寛解',periods:[['導入期 Week 10※',26.1,15.3],['維持期 Week 58',37.2,11.2]],source:'https://pubmed.ncbi.nlm.nih.gov/33657431/'}
};

const form=document.querySelector('#patientForm'),female=document.querySelector('#femaleSection'),pregnancy=document.querySelector('#pregnancyFields'),cd=document.querySelector('#cdChecks'),results=document.querySelector('#results'),usedRoot=document.querySelector('#usedDrugs');
const checks=(root,items)=>root.innerHTML=items.map(([n,l])=>`<label class="check"><input name="${n}" type="checkbox"><span>${l}</span></label>`).join('');
checks(document.querySelector('#riskChecks'),[['steroid','ステロイド依存・抵抗性'],['infection','重篤感染症リスク'],['malignancy','悪性腫瘍の既往・リスク'],['vte','血栓塞栓症リスク'],['adherence','内服アドヒアランス懸念']]);
checks(cd,[['cdst','CDST関連入力あり'],['perianal','肛門病変・瘻孔あり']]);
const data=()=>Object.fromEntries(new FormData(form));
const yes=n=>form.elements[n]?.checked;
const used=()=>[...form.querySelectorAll('input[name="usedDrug"]:checked')].map(x=>x.value);

function renderUsed(disease){
  usedRoot.innerHTML=disease?drugs.filter(d=>d.diseases.includes(disease)).map(d=>`<label class="check used"><input name="usedDrug" value="${d.id}" type="checkbox"><span>${d.name}（${d.cls}）</span></label>`).join(''):'<p class="hint">先に疾患を選択してください。</p>';
}
function conditional(changed){
  const f=data(); female.hidden=f.sex!=='female'; cd.hidden=f.disease!=='CD';
  if(changed==='disease')renderUsed(f.disease);
  if(f.sex!=='female')for(const n of ['lifeNone','menopause','pregnancyPlan','pregnant','nursing'])form.elements[n].checked=false;
  pregnancy.hidden=yes('lifeNone')||yes('menopause');
}
form.addEventListener('change',e=>{
  const n=e.target.name;
  if(n==='lifeNone'&&e.target.checked)for(const x of ['menopause','pregnancyPlan','pregnant','nursing'])form.elements[x].checked=false;
  if(['menopause','pregnancyPlan','pregnant','nursing'].includes(n)&&e.target.checked)form.elements.lifeNone.checked=false;
  if(n==='menopause'&&e.target.checked)for(const x of ['pregnancyPlan','pregnant','nursing'])form.elements[x].checked=false;
  conditional(n); results.hidden=true;
});

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
    if(f.disease==='CD'&&yes('cdst')&&['UST','RIS','GUS'].includes(d.id))add(6,'CDST関連の層別化');
    if(f.route!=='any')d.route===f.route?add(6,'希望する投与経路'):add(-4,'希望経路と不一致');
    if(yes('adherence')&&d.route==='oral')add(-8,'内服アドヒアランス懸念');
    if((+f.age>=65||yes('infection')||yes('malignancy'))&&['TOF','FIL','UPA'].includes(d.id))add(-12,'年齢・感染症・悪性腫瘍リスク');
    if(yes('vte')&&['TOF','FIL','UPA'].includes(d.id))add(-15,'血栓塞栓症リスク');
    if((yes('pregnancyPlan')||yes('pregnant')||yes('nursing'))&&['TOF','FIL','UPA','OZA','ETR'].includes(d.id))add(-20,'妊娠・授乳関連の安全性');
    return {...d,score,reasons};
  }).sort((a,b)=>b.score-a.score||a.name.localeCompare(b.name,'ja')).map((d,i,a)=>({...d,rank:a.findIndex(x=>x.score===d.score)+1}));
}
form.addEventListener('submit',e=>{
  e.preventDefault(); if(!form.reportValidity())return;
  const rows=calculate(data()),error=document.querySelector('#error');
  if(!rows.length){error.textContent='使用済み薬剤以外に候補がありません。選択内容を確認してください。';return}
  error.textContent=''; const top=rows[0].score,names=rows.filter(x=>x.rank===1).map(x=>x.name).join('、');
  document.querySelector('#summary').innerHTML=`<strong>${names}</strong>${rows.filter(x=>x.rank===1).length>1?' は同点で、いずれも第一選択候補です。':' を第一選択候補として提示します。'} 最終決定は適応・禁忌・最新の添付文書と患者希望を確認してください。`;
  document.querySelector('#cards').innerHTML=rows.map(r=>`<article class="${r.rank===1?'best':''}"><div class="rank"><strong>${r.rank}</strong><small>位</small></div><div class="drug"><h3>${r.name}</h3><p>${r.cls} / ${{oral:'内服',sc:'皮下注',iv:'点滴静注'}[r.route]}</p></div><div class="score"><strong>${r.score}</strong><small>点 ${r.score===top?'TOP':`-${top-r.score}`}</small></div><details><summary>評価の内訳</summary>${r.reasons.length?`<ul>${r.reasons.map(x=>`<li>${x}</li>`).join('')}</ul>`:'<p>基本点のみ</p>'}</details></article>`).join('');
  results.hidden=false; results.scrollIntoView({behavior:'smooth'});
});
document.querySelector('#edit').onclick=()=>{results.hidden=true;scrollTo({top:0,behavior:'smooth'})};
document.querySelector('#restart').onclick=()=>{form.reset();renderUsed('');conditional();results.hidden=true;scrollTo({top:0,behavior:'smooth'})};

const trialRoot=document.querySelector('#trials'),dialog=document.querySelector('#trialDialog'),detail=document.querySelector('#trialDetail');
trialRoot.innerHTML=drugs.map(d=>`<button type="button" class="trial-card" data-drug="${d.id}" aria-label="${d.name}の臨床試験結果を見る"><span>${d.cls}</span><strong>${d.name}</strong><small>${d.trials}</small><em>${evidence[d.id]?'結果グラフを見る':'試験名を確認'}</em></button>`).join('');
trialRoot.addEventListener('click',e=>{
  const card=e.target.closest('[data-drug]'); if(!card)return; const d=drugs.find(x=>x.id===card.dataset.drug),ev=evidence[d.id];
  detail.innerHTML=ev?`<span class="eyebrow">CLINICAL TRIAL</span><h2>${ev.trial}</h2><p>${ev.endpoint}</p>${ev.periods.map(([label,active,control])=>`<div class="chart"><b>${label}</b><div class="barrow"><span>${control==null?'継続投与群':'実薬'} ${active}%</span><i style="width:${active}%"></i></div>${control==null?'':`<div class="barrow control"><span>対照 ${control}%</span><i style="width:${control}%"></i></div>`}</div>`).join('')}<p class="trial-note">※ 対象集団・再ランダム化条件・評価時点は試験ごとに異なります。試験間の数値を直接比較しないでください。VIVID-2は非盲検延長試験であり、表示値はmodified non-responder imputationによる継続投与群の結果です。</p><a href="${ev.source}" target="_blank" rel="noopener">一次資料を開く</a>${ev.source2?`　<a href="${ev.source2}" target="_blank" rel="noopener">関連試験資料を開く</a>`:''}`:`<h2>${d.name}</h2><p>${d.trials}</p><p>グラフ用の検証済み数値は次版で追加予定です。</p>`;
  if(typeof dialog.showModal==='function')dialog.showModal();else{dialog.setAttribute('open','');dialog.scrollIntoView({behavior:'smooth',block:'center'})}
});
const closeDialog=()=>typeof dialog.close==='function'?dialog.close():dialog.removeAttribute('open');
document.querySelector('#closeTrial').onclick=closeDialog;
dialog.addEventListener('click',e=>{if(e.target===dialog)closeDialog()});
renderUsed(''); conditional();
