const drugs=[
['IFX','インフリキシマブ','抗TNFα抗体','iv','UC,CD','ACT 1/2・ACCENT I/II・SONIC・UC-SUCCESS'],['ADA','アダリムマブ','抗TNFα抗体','sc','UC,CD','ULTRA 2・CLASSIC I・CHARM'],['GLM','ゴリムマブ','抗TNFα抗体','sc','UC','PURSUIT-SC・PURSUIT-J'],['VED','ベドリズマブ','抗α4β7インテグリン抗体','iv','UC,CD','GEMINI 1/2'],['UST','ウステキヌマブ','抗IL-12/23p40抗体','sc','UC,CD','UNIFI・UNITI・IM-UNITI'],['RIS','リサンキズマブ','抗IL-23p19抗体','sc','UC,CD','INSPIRE・COMMAND・ADVANCE・MOTIVATE・FORTIFY'],['MIRI','ミリキズマブ','抗IL-23p19抗体','sc','UC,CD','LUCENT-1/2/3・VIVID-1/2'],['GUS','グセルクマブ','抗IL-23p19抗体','sc','UC,CD','QUASAR・ASTRO・GALAXI'],['OZA','オザニモド','S1P受容体調節薬','oral','UC','True North'],['ETR','エトラシモド','S1P受容体調節薬','oral','UC','ELEVATE'],['TOF','トファシチニブ','JAK阻害薬','oral','UC','OCTAVE'],['FIL','フィルゴチニブ','JAK阻害薬','oral','UC','SELECTION'],['UPA','ウパダシチニブ','JAK阻害薬','oral','UC,CD','U-ACHIEVE・U-ACCOMPLISH・U-EXCEL・U-EXCEED・U-ENDURE']
].map(([id,name,cls,route,diseases,trials])=>({id,name,cls,route,diseases:diseases.split(','),trials}));

const regimenData={
  IFX:{induction:['iv'],maintenance:['iv'],label:'導入：点滴 → 維持：点滴',optimization:{kind:'intensify',points:3,label:'CDでは増量・投与間隔短縮の選択肢',diseases:['CD']}},
  ADA:{induction:['sc'],maintenance:['sc'],label:'導入：皮下注 → 維持：皮下注',optimization:{kind:'intensify',points:2,label:'増量・投与強化の選択肢',diseases:['UC','CD']}},
  GLM:{induction:['sc'],maintenance:['sc'],label:'導入：皮下注 → 維持：皮下注'},
  VED:{induction:['iv'],maintenance:['iv','sc'],label:'導入：点滴 → 維持：点滴／皮下注'},
  UST:{induction:['iv'],maintenance:['sc'],label:'導入：点滴 → 維持：皮下注',optimization:{kind:'intensify',points:2,label:'Q12WからQ8Wへの短縮選択肢',diseases:['UC','CD']}},
  RIS:{induction:['iv'],maintenance:['sc'],label:'導入：点滴 → 維持：皮下注',optimization:{kind:'rescue',points:2,label:'皮下維持療法開始16週以降の効果減弱時に1200mg単回追加点滴の選択肢',diseases:['UC','CD']}},
  MIRI:{induction:['iv'],maintenance:['sc'],label:'導入：点滴 → 維持：皮下注',optimization:{kind:'rescue',points:2,label:'追加・再導入の選択肢',diseases:['UC','CD']}},
  GUS:{induction:['iv','sc'],maintenance:['sc'],label:'導入：点滴／皮下注 → 維持：皮下注',optimization:{kind:'intensify',points:2,label:'100mg・8週間隔から200mg・4週間隔への変更選択肢',diseases:['UC','CD']}},
  OZA:{induction:['oral'],maintenance:['oral'],label:'導入：内服 → 維持：内服'},
  ETR:{induction:['oral'],maintenance:['oral'],label:'導入：内服 → 維持：内服'},
  TOF:{induction:['oral'],maintenance:['oral'],label:'導入：内服 → 維持：内服',optimization:{kind:'intensify',points:2,label:'維持療法中の効果減弱時に5mg・1日2回から10mg・1日2回への増量選択肢',diseases:['UC']}},
  FIL:{induction:['oral'],maintenance:['oral'],label:'導入：内服 → 維持：内服'},
  UPA:{induction:['oral'],maintenance:['oral'],label:'導入：内服 → 維持：内服',optimization:{kind:'intensify',points:2,label:'維持療法15mgから30mgへの増量選択肢',diseases:['UC','CD']}}
};
drugs.forEach(d=>Object.assign(d,regimenData[d.id]));

const scheduleData={
  IFX:{steps:[['0週','点滴導入','5mg/kg'],['2週','点滴','5mg/kg'],['6週','点滴','5mg/kg'],['以後','通常8週ごとに点滴','5mg/kg']],optimization:{CD:['効果不十分時の増量','10mg/kgを8週ごとに点滴'],CD2:['効果不十分時の間隔短縮','5mg/kgを4週ごとに点滴']}},
  ADA:{steps:[['0週','皮下注導入','160mg（80mg製剤×2本）',2],['2週','皮下注','80mg（80mg製剤×1本）',1],['4週以後','通常2週ごとに皮下注','40mg（40mg製剤×1本）',1]],optimization:{UC:['効果不十分時の増量','80mgを2週ごとに皮下注（80mg製剤×1本）',1],CD:['効果不十分時の増量','80mgを2週ごとに皮下注（80mg製剤×1本）',1]}},
  GLM:{steps:[['0週','皮下注導入','200mg（100mg製剤×2本）',2],['2週','皮下注','100mg（100mg製剤×1本）',1],['以後','4週ごとに皮下注','100mg（100mg製剤×1本）',1]]},
  VED:{steps:[['0週','点滴導入','300mg'],['2週','点滴','300mg'],['6週','点滴','300mg'],['維持期','点滴8週ごと／皮下注へ移行可','点滴300mg／皮下注108mg（1本）',1]]},
  UST:{steps:[['0週','体重別用量で点滴導入','約6mg/kg'],['8週','皮下注','90mg（45mgシリンジ×2本）',2],['以後','通常12週ごとに皮下注','90mg（45mgシリンジ×2本）',2]],optimization:{UC:['効果減弱時の間隔短縮','12週ごとから8週ごとへ短縮（1回90mg＝45mgシリンジ×2本）',2],CD:['効果減弱時の間隔短縮','12週ごとから8週ごとへ短縮（1回90mg＝45mgシリンジ×2本）',2]}},
  RIS:{
    UC:[['0週','点滴導入','1200mg'],['4週','点滴','1200mg'],['8週','点滴','1200mg'],['12週以後','皮下注8週ごと','180mgまたは360mg（オートドーザー×1本）',1]],
    CD:[['0週','点滴導入','600mg'],['4週','点滴','600mg'],['8週','点滴','600mg'],['12週以後','皮下注8週ごと','360mg（オートドーザー×1本）',1]],
    optimization:{
      UC:['維持療法中の効果減弱時に追加点滴の選択肢','皮下維持療法開始16週以降に効果が減弱した場合、1200mgを単回点滴静注できる。点滴8週後から皮下投与を再開する。再投与時は前回の点滴から16週以上あけ、必要性を慎重に検討し、漫然と繰り返さない。'],
      CD:['維持療法中の効果減弱時に追加点滴の選択肢','皮下維持療法開始16週以降に効果が減弱した場合、1200mgを単回点滴静注できる。点滴8週後から皮下投与を再開する。再投与時は前回の点滴から16週以上あけ、必要性を慎重に検討し、漫然と繰り返さない。']
    }
  },
  MIRI:{
    UC:[['0週','点滴導入','300mg'],['4週','点滴','300mg'],['8週','点滴','300mg'],['12週以後','皮下注4週ごと','200mg（100mg製剤×2本）',2]],
    CD:[['0週','点滴導入','900mg'],['4週','点滴','900mg'],['8週','点滴','900mg'],['12週以後','皮下注4週ごと','300mg（100mg＋200mg製剤、計2本）',2]],
    optimization:{UC:['維持期の効果減弱時','300mg点滴を4週ごとに計3回、その4週後から皮下注200mgを再開'],CD:['維持期の効果減弱時','900mg点滴による再導入を検討（承認用法と適用条件を確認）']}
  },
  GUS:{steps:[
    ['0週','皮下注または点滴静注で導入','皮下注400mg（200mg製剤×2本）／点滴静注200mg',2],
    ['4週','皮下注または点滴静注で導入','皮下注400mg（200mg製剤×2本）／点滴静注200mg',2],
    ['8週','皮下注または点滴静注で導入','皮下注400mg（200mg製剤×2本）／点滴静注200mg',2],
    ['投与開始12週後以降','患者の状態に応じた維持療法','皮下注200mgを4週間隔（200mg製剤×1本）',1],
    ['投与開始16週後から','通常の維持療法','皮下注100mgを8週間隔（100mg製剤×1本）',1]
  ],optimization:{UC:['用量・投与間隔の変更選択肢','100mg・8週間隔から200mg・4週間隔へ変更（1回200mg製剤×1本）',1],CD:['用量・投与間隔の変更選択肢','100mg・8週間隔から200mg・4週間隔へ変更（1回200mg製剤×1本）',1]}},
  OZA:{steps:[['1～4日目','スターターパックで内服','0.23mg 1日1回'],['5～7日目','段階的に増量して内服','0.46mg 1日1回'],['8日目以後','維持内服','0.92mg 1日1回']]},
  ETR:{steps:[['1日目','内服開始','2mg'],['以後','1日1回内服','2mg 1日1回']]},
  TOF:{
    steps:[
      ['導入療法 8週間','1日2回内服','10mgを1日2回'],
      ['導入8週で効果不十分の場合','1日2回内服を延長','10mgを1日2回、さらに8週間投与可能（導入は最長計16週間）'],
      ['維持療法','通常は1日2回内服','通常5mgを1日2回'],
      ['効果減弱例・難治例','安全性を評価した上で高用量を1日2回内服','10mgを1日2回とする場合がある']
    ],
    optimization:{UC:['維持療法中の効果減弱時の増量選択肢','5mg・1日2回から10mg・1日2回への増量を検討。ただし高用量の必要性と安全性を十分に評価する。']},
    warning:'10mg・1日2回の高用量では、心血管イベント、静脈血栓塞栓症、重篤な感染症、悪性腫瘍などのリスクを特に慎重に評価してください。高用量を漫然と継続せず、治療反応が得られた場合は減量を検討します。'
  },
  FIL:{
    steps:[['導入療法','1日1回内服','200mgを1日1回'],['維持療法','通常は1日1回内服','通常200mgを1日1回。患者の状態に応じて100mgを1日1回に減量できる']],
    warning:'投与前に腎機能（eGFR）を確認してください。中等度・重度腎機能障害（15≦eGFR＜60）では100mgを1日1回とし、重度では投与の適否を慎重に検討します。末期腎不全（eGFR＜15）には投与しません。'
  },
  UPA:{UC:[['導入期 8週','1日1回内服','45mg 1日1回'],['維持期','1日1回内服','15mgまたは30mg 1日1回']],CD:[['導入期 12週','1日1回内服','45mg 1日1回'],['維持期','1日1回内服','15mgまたは30mg 1日1回']],optimization:{UC:['維持期の効果不十分時','15mg 1日1回から30mg 1日1回への増量を検討'],CD:['維持期の効果不十分時','15mg 1日1回から30mg 1日1回への増量を検討']}}
};
function scheduleSteps(d,disease){
  const schedule=scheduleData[d.id];
  return schedule?.steps||schedule?.[disease]||[];
}
const scheduleIcons={
  iv:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M18 4h12v6H18zM16 10h16v22a8 8 0 0 1-16 0z"/><path d="M20 16h8M24 16v9M20 21h8M24 40v4M24 44h8"/></svg>',
  sc:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="m8 36 8 4 4-8-8-4zM16 32l17-17M28 11l9 9M33 8l7 7M20 28l-4-4M38 10l4-4"/></svg>',
  oral:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M12 12a10 10 0 0 1 14 0l10 10a10 10 0 0 1-14 14L12 26a10 10 0 0 1 0-14zM17 31l14-14"/></svg>'
};
function routeKinds(label){
  const kinds=[];
  if(label.includes('点滴'))kinds.push('iv');
  if(label.includes('皮下注'))kinds.push('sc');
  if(label.includes('内服')||label.includes('スターターパック')||label.includes('増量'))kinds.push('oral');
  return kinds;
}
function routeIconMarkup(label,devices=1){
  const names={iv:'点滴',sc:'皮下注',oral:'内服'};
  return `<div class="schedule-icons">${routeKinds(label).map(kind=>kind==='sc'
    ?`<span class="schedule-icon schedule-${kind} multi-device" title="${names[kind]}"><span class="syringe-pictures">${Array.from({length:Math.max(1,devices)},()=>scheduleIcons[kind]).join('')}</span><em>${names[kind]}${devices>1?` ×${devices}本`:' ×1本'}</em></span>`
    :`<span class="schedule-icon schedule-${kind}" title="${names[kind]}">${scheduleIcons[kind]}<em>${names[kind]}</em></span>`).join('')}</div>`;
}
function scheduleMarkup(d,disease){
  const steps=scheduleSteps(d,disease);
  if(!steps.length)return '';
  const schedule=scheduleData[d.id],optimization=schedule.optimization?.[disease],optimization2=schedule.optimization?.[`${disease}2`],warning=schedule.warning?.[disease]||schedule.warning;
  const optimizationMarkup=[optimization,optimization2].filter(Boolean).map(([title,text,devices])=>`<div class="schedule-optimization"><b>${title}</b>${routeIconMarkup(text,devices)}<span>${text}</span></div>`).join('');
  return `<details class="schedule-details"><summary>投与スケジュールを見る</summary><div class="schedule-timeline">${steps.map(([time,label,dose,devices],i)=>`<div class="schedule-step"><span>${i+1}</span><b>${time}</b>${routeIconMarkup(label,devices)}<small>${label}</small><strong class="schedule-dose">${dose||''}</strong></div>`).join('')}</div>${optimizationMarkup?`<div class="optimization-schedule"><h4>効果不十分・効果減弱時の選択肢</h4>${optimizationMarkup}<p>患者ごとの反応と安全性を再評価し、承認された適用条件・最新の電子添文を確認してください。適応外の最適化を推奨する表示ではありません。</p></div>`:''}${warning?`<p class="schedule-warning"><strong>注意</strong>${warning}</p>`:''}<p class="schedule-note">概略図です。本数は記載した製剤規格を使用した場合の目安です。実際の製剤、用量、投与間隔、増量・短縮は疾患、反応、安全性および最新の電子添文に従って確認してください。</p></details>`;
}

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
 {trial:'VARSITY（UC）',phase:'第3b相',phase3bH2H:true,headToHead:true,controlColor:'#b84a4a',endpoint:'VDZとADAの直接比較（%）',activeLabel:'VDZ',controlLabel:'ADA',periods:[['Week 52：臨床的寛解',31.3,22.5],['Week 52：内視鏡的改善',39.7,27.7]],source:'https://www.nejm.org/doi/full/10.1056/NEJMoa1905725'},
 {trial:'GEMINI 2（CD）',endpoint:'CDAI臨床的寛解（%）',periods:[['Week 6：臨床的寛解',14.5,6.8],['Week 52：臨床的寛解（q8w）',39.0,21.6]],source:'https://www.nejm.org/doi/10.1056/NEJMoa1215739'},
 {trial:'VERSIFY（CD）',phase:'第3b相',endpoint:'ベドリズマブ単群での内視鏡的・画像的・組織学的治癒（%）',periods:[['Week 26：内視鏡的寛解',11.9,null],['Week 52：内視鏡的寛解（サブ試験）',17.9,null]],source:'https://pubmed.ncbi.nlm.nih.gov/31279871/'}
]},
UST:{studies:[
 {trial:'UNIFI（UC）',endpoint:'臨床的寛解',periods:[['導入期 Week 8',15.6,5.3],['維持期 Week 44',43.8,24.0]],source:'https://www.nejm.org/doi/10.1056/NEJMoa1900750'},
 {trial:'UNITI-1（CD）',endpoint:'抗TNFα抗体不応・不耐例の導入期臨床的反応（%）',activeLabel:'UST 約6 mg/kg',controlLabel:'プラセボ',periods:[['Week 6：臨床的反応',33.7,21.5]],source:'https://pubmed.ncbi.nlm.nih.gov/27959607/'},
 {trial:'UNITI-2（CD）',endpoint:'既存治療不応・不耐例の導入期臨床的反応（%）',activeLabel:'UST 約6 mg/kg',controlLabel:'プラセボ',periods:[['Week 6：臨床的反応',55.5,28.7]],source:'https://pubmed.ncbi.nlm.nih.gov/27959607/'},
 {trial:'IM-UNITI（CD）',endpoint:'UST導入反応例を再ランダム化した維持期臨床的寛解（%）',activeLabel:'UST',controlLabel:'プラセボ',periods:[['Week 44：臨床的寛解（90 mg q8w）',53.1,35.9],['Week 44：臨床的寛解（90 mg q12w）',48.8,35.9]],significance:['P=0.005','P=0.04'],ci:['群間差17.2ポイント（95% CI 5.3–29.2）','群間差13.0ポイント（95% CI 1.1–24.9）'],source:'https://pubmed.ncbi.nlm.nih.gov/27959607/'},
 {trial:'SEAVUE（CD）',phase:'第3b相',phase3bH2H:true,headToHead:true,controlColor:'#b84a4a',endpoint:'生物学的製剤未使用例の直接比較（%）',activeLabel:'UST',controlLabel:'ADA',periods:[['Week 52：臨床的寛解（有意差なし）',65.0,61.0]],source:'https://pubmed.ncbi.nlm.nih.gov/35691323/'},
 {trial:'STARDUST（CD）',phase:'第3b相',endpoint:'ウステキヌマブ治療におけるTreat-to-Target戦略と標準診療の比較（%）',activeLabel:'ウステキヌマブ（Treat-to-Target）',controlLabel:'ウステキヌマブ（標準診療）',periods:[['Week 48：内視鏡的反応（有意差なし）',38.0,30.0],['Week 48：内視鏡的寛解（有意差なし）',11.0,15.0]],secondaryEndpoints:[{label:'Week 48：臨床的寛解',active:62.0,control:70.0}],adverseEvents:[{label:'鼻咽頭炎',value:'Treat-to-Target 13% ／ 標準診療 13%'},{label:'腹痛',value:'11% ／ 9%'},{label:'関節痛',value:'11% ／ 9%'},{label:'頭痛',value:'11% ／ 10%'}],source:'https://pubmed.ncbi.nlm.nih.gov/35120656/'}
]},
GLM:{trial:'PURSUIT-SC / PURSUIT-J（UC）',endpoint:'主要有効性評価（%）',periods:[['PURSUIT-SC Week 6：臨床的反応（200/100 mg）',51.0,30.3],['PURSUIT-SC Week 6：臨床的寛解',17.8,6.4],['PURSUIT-J Week 54：臨床的反応維持',56.3,19.4],['PURSUIT-J Week 54：臨床的寛解',50.0,6.5]],source:'https://pubmed.ncbi.nlm.nih.gov/23735746/',source2:'https://link.springer.com/article/10.1007/s00535-017-1326-1'},
MIRI:{studies:[
 {trial:'LUCENT-1 / LUCENT-2（UC）',endpoint:'導入・維持の主要有効性評価（%）',periods:[['LUCENT-1 Week 12：臨床的寛解',24.2,13.3],['LUCENT-2 Week 40（通算52週）：臨床的寛解',49.9,25.1]],source:'https://www.nejm.org/doi/full/10.1056/NEJMoa2207940'},
 {trial:'LUCENT-3（UC）',endpoint:'非盲検長期継続試験（観察例解析、%）',periods:[['Week 152：臨床的寛解（Week 52 responder）',56.1,null],['Week 152：内視鏡的寛解（Week 52 responder）',61.0,null],['Week 152：臨床的寛解（Week 52 remitter）',70.1,null]],source:'https://pubmed.ncbi.nlm.nih.gov/39448057/'},
 {trial:'VIVID-1・VIVID-2（CD）',endpoint:'主要有効性評価（%）',periods:[['VIVID-1 Week 12反応＋Week 52 CDAI寛解',45.4,19.6],['VIVID-1 Week 12反応＋Week 52内視鏡反応',38.0,9.0],['VIVID-2 Week 104：臨床的寛解',79.0,null],['VIVID-2 Week 104：内視鏡的反応',81.8,null]],source:'https://pubmed.ncbi.nlm.nih.gov/39581202/',source2:'https://www.cghjournal.org/article/S1542-3565(26)00155-2/fulltext'}
]},
RIS:{studies:[
 {trial:'INSPIRE（UC）',endpoint:'Week 12導入結果（%）',periods:[['臨床的寛解',20.3,6.2],['内視鏡的改善',36.5,12.1]],source:'https://pmc.ncbi.nlm.nih.gov/articles/PMC11772864/'},
 {trial:'COMMAND（UC）',endpoint:'Week 52維持結果（%）',periods:[['臨床的寛解（180 mg q8w）',40.2,25.1],['臨床的寛解（360 mg q8w）',37.6,25.1]],source:'https://pmc.ncbi.nlm.nih.gov/articles/PMC11772864/'},
 {trial:'ADVANCE（CD）',endpoint:'Week 12導入結果（%）',periods:[['CDAI臨床的寛解（600 mg）',45.2,25.2],['内視鏡的反応（600 mg）',40.2,12.0]],source:'https://pubmed.ncbi.nlm.nih.gov/35644154/'},
 {trial:'MOTIVATE（CD）',endpoint:'Week 12導入結果（%）',periods:[['CDAI臨床的寛解（600 mg）',41.9,19.8],['内視鏡的反応（600 mg）',28.8,11.2]],source:'https://pubmed.ncbi.nlm.nih.gov/35644154/'},
 {trial:'FORTIFY（CD）',endpoint:'Week 52維持結果（%）',periods:[['CDAI臨床的寛解（360 mg）',52.2,40.9],['内視鏡的反応（360 mg）',47.1,22.0]],source:'https://pubmed.ncbi.nlm.nih.gov/35644155/'}
 ,{trial:'SEQUENCE（CD）',phase:'第3b相',phase3bH2H:true,headToHead:true,controlColor:'#7655a8',endpoint:'抗TNFα抗体不応・不耐例におけるRISとUSTの直接比較（%）',activeLabel:'RIS',controlLabel:'UST',periods:[['Week 24：臨床的寛解（非劣性）',58.6,39.5],['Week 48：内視鏡的寛解（優越性）',31.8,16.2]],secondaryEndpoints:[{label:'Week 48：内視鏡的寛解',active:31.8,control:16.2}],source:'https://www.nejm.org/doi/full/10.1056/NEJMoa2314585'}
]},
GUS:{studies:[
 {trial:'QUASAR（UC）',endpoint:'静注導入・皮下注維持（%）',analysisPopulation:'導入：中等症～重症活動期UCの無作為化治療例701例（GUS 421例、プラセボ280例）。維持：GUS静注導入にWeek 12で臨床的反応を示した568例を再無作為化。',definition:'主要評価項目は導入Week 12および維持Week 44の臨床的寛解。modified Mayo scoreに基づく試験規定の定義を使用。',maintenanceDesign:'re-randomized responder型：GUS導入反応例を200 mg q4w、100 mg q8w、GUS中止プラセボへ1:1:1で再無作為化。維持期の割合を導入時全患者の寛解率として解釈しないでください。',imputation:'主要解析は試験規定の欠測・治療失敗ルールを適用。詳細は一次論文および統計解析計画を確認してください。',summary:'GUS 200 mg静注導入はWeek 12臨床的寛解でプラセボを上回りました。導入反応例では、100 mg q8wと200 mg q4wの両維持用量がGUS中止群を上回りましたが、2用量間の優越性を示す直接比較結果ではありません。',periods:[['導入 Week 12：臨床的寛解',23.0,8.0],['維持 Week 44：臨床的寛解（200 mg q4w）',50.0,19.0],['維持 Week 44：臨床的寛解（100 mg q8w）',45.0,19.0]],secondaryEndpoints:[{label:'導入 Week 12：臨床的反応',value:'GUS 61.5%（259/421）／プラセボ 27.9%（78/280）、調整群間差34%（95% CI 27–41）'},{label:'導入 Week 12：内視鏡的改善',value:'GUS 30%／プラセボ14%、調整群間差16%（95% CI 11–21）'},{label:'導入 Week 12：組織学的・内視鏡的粘膜改善',value:'GUS 23.5%（99/421）／プラセボ7.5%（21/280）、調整群間差16%（95% CI 11–21）'},{label:'導入 Week 12：内視鏡的寛解（正常化）',value:'GUS 15.0%（63/421）／プラセボ5.0%（14/280）、調整群間差10%（95% CI 6–14、検定階層上は名目P<0.0001）'},{label:'導入 Week 12：IBDQ寛解',value:'調整群間差22%（95% CI 15–29）'},{label:'導入 Week 12：疲労反応',value:'調整群間差20%（95% CI 13–26）'},{label:'導入 Week 12：症候性寛解',value:'調整群間差29%（95% CI 23–36）。Week 2は有意差なし（P=0.21）'},{label:'維持 Week 44：ステロイドフリー臨床的寛解',value:'GUS 100 mg q8w 45.2%（85/188）／200 mg q4w 48.9%（93/190）／GUS中止18.4%（35/190）'},{label:'維持 Week 44：臨床的寛解の維持',value:'GUS 100 mg q8w 60.6%（40/66）／200 mg q4w 72.5%（50/69）／GUS中止33.9%（20/59）'},{label:'維持 Week 44：臨床的反応の維持',value:'GUS 100 mg q8w 77.7%（146/188）／200 mg q4w 74.7%（142/190）／GUS中止43.2%（82/190）'},{label:'維持 Week 44：症候性寛解',value:'GUS 100 mg q8w 70.2%（132/188）／200 mg q4w 68.9%（131/190）／GUS中止37.4%（71/190）'},{label:'維持 Week 44：内視鏡的改善',value:'GUS 100 mg q8w 49.5%（93/188）／200 mg q4w 51.6%（98/190）／GUS中止18.9%（36/190）、両用量P<0.001'},{label:'維持 Week 44：組織学的・内視鏡的粘膜改善',value:'GUS 100 mg q8w 43.6%（82/188）／200 mg q4w 47.9%（91/190）／GUS中止16.8%（32/190）、両用量P<0.001'},{label:'維持 Week 44：内視鏡的寛解（正常化）',value:'GUS 100 mg q8w 34.6%（65/188）／200 mg q4w 33.7%（64/190）／GUS中止15.3%（29/190）、両用量P<0.001'},{label:'維持 Week 44：IBDQ寛解',value:'GUS 100 mg q8w 64.4%（121/188）／200 mg q4w 64.2%（122/190）／GUS中止37.4%（71/190）、両用量P<0.001'},{label:'維持 Week 44：疲労反応',value:'GUS 100 mg q8w 50.5%（95/188）／200 mg q4w 43.2%（82/190）／GUS中止29.5%（56/190）；P<0.001、P=0.009'}],adverseEvents:[{label:'導入期：全有害事象',value:'GUS 49%（208/421）／プラセボ49%（138/280）'},{label:'導入期：重篤有害事象',value:'GUS 3%（12/421）／プラセボ7%（20/280）'},{label:'導入期：有害事象による中止',value:'GUS 2%（7/421）／プラセボ4%（11/280）'},{label:'導入期：主な有害事象',value:'UC悪化、貧血、COVID-19（いずれかの群で5%以上）'},{label:'導入期：非黒色腫皮膚癌',value:'GUS 2例／プラセボ0例'},{label:'導入期：主要心血管イベント',value:'GUS 2例（死亡1例）／プラセボ2例（死亡2例）。死亡はいずれも治療関連とは判断されず'},{label:'維持期：全有害事象',value:'GUS 100 mg q8w 65%（120/186）／200 mg q4w 70%（133/190）／GUS中止68%（131/192）'},{label:'維持期：重篤有害事象',value:'GUS 100 mg q8w 3%（5/186）／200 mg q4w 6%（12/190）／GUS中止1%（1/192）'},{label:'維持期：有害事象による中止',value:'GUS 100 mg q8w 4%（7/186）／200 mg q4w 3%（5/190）／GUS中止7%（13/192）'},{label:'維持期：主な有害事象',value:'UC悪化、COVID-19、関節痛、頭痛、上気道感染'},{label:'維持期：悪性腫瘍',value:'非黒色腫皮膚癌2例（ともにGUS中止群）、その他の悪性腫瘍3例（GUS中止群2例、200 mg q4w群1例）'},{label:'維持期：主要心血管イベント・静脈血栓塞栓症',value:'200 mg q4w群で各1例（0.5%）。維持期の死亡報告なし'},{label:'特定の重要事象',value:'GUS投与例で活動性結核、アナフィラキシー、血清病、Hy\'s Lawまたは臨床的に重要な肝障害の報告なし'}],source:'https://pubmed.ncbi.nlm.nih.gov/39706209/',source2:'https://pmc.ncbi.nlm.nih.gov/articles/PMC11345979/',source3:'https://clinicaltrials.gov/study/NCT04033445?tab=results'},
 {trial:'ASTRO（UC）',endpoint:'皮下注導入・維持（%）',periods:[['Week 12：臨床的寛解',28.0,6.0],['Week 24：臨床的寛解（100 mg q8w）',35.3,9.4],['Week 24：臨床的寛解（200 mg q4w）',36.4,9.4],['Week 24：内視鏡的改善（200 mg q4w）',45.0,12.2]],source:'https://pubmed.ncbi.nlm.nih.gov/41544637/'},
 {trial:'GALAXI 2 / 3（CD）',headToHead:true,controlColor:'#7655a8',endpoint:'Week 48のGUSとUSTの直接比較（%）',activeLabel:'GUS',controlLabel:'UST',periods:[['臨床的寛解（200 mg q4w）',58.0,52.4],['内視鏡的反応（200 mg q4w）',51.3,30.8]],source:'https://pubmed.ncbi.nlm.nih.gov/40684778/'}
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
FIL:{trial:'SELECTION（UC）',endpoint:'臨床的寛解',periods:[['導入期 Week 10',26.1,15.3],['維持期 Week 58',37.2,11.2]],source:'https://pubmed.ncbi.nlm.nih.gov/33657431/'}
,
UPA:{studies:[
 {trial:'U-ACHIEVE Induction（UC）',endpoint:'Week 8臨床的寛解（%）',periods:[['臨床的寛解',26.0,5.0]],source:'https://pubmed.ncbi.nlm.nih.gov/35644166/'},
 {trial:'U-ACCOMPLISH（UC）',endpoint:'Week 8臨床的寛解（%）',periods:[['臨床的寛解',34.0,4.0]],source:'https://pubmed.ncbi.nlm.nih.gov/35644166/'},
 {trial:'U-ACHIEVE Maintenance（UC）',endpoint:'Week 52臨床的寛解（%）',periods:[['15 mg',42.0,12.0],['30 mg',52.0,12.0]],source:'https://pubmed.ncbi.nlm.nih.gov/35644166/'},
 {trial:'U-EXCEL / U-EXCEED（CD）',endpoint:'Week 12導入結果（%）',periods:[['U-EXCEL：CDAI寛解',49.5,29.1],['U-EXCEL：内視鏡的反応',45.5,13.1],['U-EXCEED：CDAI寛解',38.9,21.1],['U-EXCEED：内視鏡的反応',34.6,3.5]],source:'https://pubmed.ncbi.nlm.nih.gov/37224198/'},
 {trial:'U-ENDURE（CD）',endpoint:'Week 52維持結果（%）',periods:[['CDAI寛解（15 mg）',37.3,15.1],['CDAI寛解（30 mg）',47.6,15.1],['内視鏡的反応（30 mg）',40.1,7.3]],source:'https://pubmed.ncbi.nlm.nih.gov/37224198/'}
]}
};

const drugTrialLabels={
  IFX:'インフリキシマブ',ADA:'アダリムマブ',VED:'ベドリズマブ',UST:'ウステキヌマブ',GLM:'ゴリムマブ',
  MIRI:'ミリキズマブ',RIS:'リサンキズマブ',GUS:'グセルクマブ',OZA:'オザニモド',ETR:'エトラシモド',
  TOF:'トファシチニブ',FIL:'フィルゴチニブ',UPA:'ウパダシチニブ'
};
const explicitTrialLabels={
  'SONIC（CD）':['インフリキシマブ＋アザチオプリン','インフリキシマブ単独'],
  'UC-SUCCESS（UC）':['インフリキシマブ＋アザチオプリン','インフリキシマブ単独'],
  'VARSITY（UC）':['ベドリズマブ','アダリムマブ'],
  'SEAVUE（CD）':['ウステキヌマブ','アダリムマブ'],
  'GALAXI 2 / 3（CD）':['グセルクマブ','ウステキヌマブ'],
  'SEQUENCE（CD）':['リサンキズマブ','ウステキヌマブ'],
  'STARDUST（CD）':['ウステキヌマブ（Treat-to-Target）','ウステキヌマブ（標準診療）']
};
const comparisonTrialTypes={
  'SONIC（CD）':'併用療法比較','UC-SUCCESS（UC）':'併用療法比較',
  'VARSITY（UC）':'Head-to-Head','SEAVUE（CD）':'Head-to-Head','GALAXI 2 / 3（CD）':'Head-to-Head',
  'SEQUENCE（CD）':'Head-to-Head','STARDUST（CD）':'治療戦略比較',
  'VIVID-1・VIVID-2（CD）':'実薬対照を含む比較試験'
};
const comparisonTrialGroups={
  'SONIC（CD）':['インフリキシマブ＋アザチオプリン','インフリキシマブ単独','アザチオプリン単独'],
  'UC-SUCCESS（UC）':['インフリキシマブ＋アザチオプリン','インフリキシマブ単独','アザチオプリン単独'],
  'VARSITY（UC）':['ベドリズマブ','アダリムマブ'],
  'SEAVUE（CD）':['ウステキヌマブ','アダリムマブ'],
  'GALAXI 2 / 3（CD）':['グセルクマブ','ウステキヌマブ','プラセボ'],
  'VIVID-1・VIVID-2（CD）':['ミリキズマブ','ウステキヌマブ','プラセボ'],
  'SEQUENCE（CD）':['リサンキズマブ','ウステキヌマブ'],
  'STARDUST（CD）':['ウステキヌマブ（Treat-to-Target）','ウステキヌマブ（標準診療）']
};
const secondaryEndpointCatalog={
  'ACT 1 / 2（UC）':['ACT 1 Week 8：臨床的寛解','粘膜治癒','ステロイドフリー臨床的寛解'],
  'ACCENT I（CD）':['Week 30：臨床的寛解','Week 54：臨床的寛解','ステロイド中止を伴う臨床的寛解'],
  'ACCENT II（瘻孔型CD）':['Week 54：完全瘻孔閉鎖','瘻孔反応の持続'],
  'SONIC（CD）':['Week 26：粘膜治癒','臨床的反応','重篤な感染症'],
  'UC-SUCCESS（UC）':['Week 16：粘膜治癒','臨床的反応'],
  'ULTRA 2（UC）':['臨床的反応','粘膜治癒','ステロイドフリー寛解'],
  'CLASSIC I（CD）':['Week 4臨床的反応（CDAI-70／CDAI-100）'],
  'CHARM（CD）':['Week 56：臨床的寛解（隔週）','ステロイドフリー寛解','瘻孔寛解'],
  'GEMINI 1（UC）':['Week 6：臨床的寛解','持続的臨床的反応','粘膜治癒','ステロイドフリー寛解'],
  'VARSITY（UC）':['Week 52：内視鏡的改善','ステロイドフリー臨床的寛解'],
  'GEMINI 2（CD）':['Week 52：臨床的寛解（q8w）','CDAI-100反応','ステロイドフリー寛解'],
  'VERSIFY（CD）':['Week 52：内視鏡的寛解（サブ試験）','内視鏡的反応','組織学的治癒','画像的寛解'],
  'UNIFI（UC）':['臨床的反応','内視鏡的改善','ステロイドフリー臨床的寛解'],
  'UNITI-1（CD）':['Week 8臨床的寛解','Week 8臨床的反応'],
  'UNITI-2（CD）':['Week 8臨床的寛解','Week 8臨床的反応'],
  'IM-UNITI（CD）':['Week 44：臨床的寛解（90 mg q12w）','臨床的反応','ステロイドフリー寛解'],
  'SEAVUE（CD）':['ステロイドフリー臨床的寛解','臨床的反応','内視鏡的寛解'],
  'STARDUST（CD）':['Week 48：内視鏡的寛解（有意差なし）','Week 48：臨床的寛解','粘膜治癒','バイオマーカー寛解'],
  'PURSUIT-SC / PURSUIT-J（UC）':['PURSUIT-SC Week 6：臨床的寛解','粘膜治癒','PURSUIT-J Week 54：臨床的寛解'],
  'LUCENT-1 / LUCENT-2（UC）':['臨床的反応','内視鏡的改善','ステロイドフリー臨床的寛解','便意切迫感の改善'],
  'LUCENT-3（UC）':['Week 152：内視鏡的寛解（Week 52 responder）','ステロイドフリー臨床的寛解','症状寛解'],
  'VIVID-1・VIVID-2（CD）':['VIVID-1 Week 12反応＋Week 52内視鏡反応','内視鏡的寛解','ステロイドフリー臨床的寛解'],
  'INSPIRE（UC）':['内視鏡的改善','臨床的反応','内視鏡的寛解'],
  'COMMAND（UC）':['内視鏡的改善','ステロイドフリー臨床的寛解','症状寛解'],
  'ADVANCE（CD）':['内視鏡的反応（600 mg）','臨床的反応','内視鏡的寛解'],
  'MOTIVATE（CD）':['内視鏡的反応（600 mg）','臨床的反応','内視鏡的寛解'],
  'FORTIFY（CD）':['内視鏡的反応（360 mg）','ステロイドフリー臨床的寛解','内視鏡的寛解'],
  'SEQUENCE（CD）':['Week 48：内視鏡的寛解（優越性）','ステロイドフリー臨床的寛解','内視鏡的反応'],
  'QUASAR（UC）':['臨床的反応','内視鏡的改善','ステロイドフリー臨床的寛解'],
  'ASTRO（UC）':['Week 24：内視鏡的改善（200 mg q4w）','臨床的反応','内視鏡的寛解'],
  'GALAXI 2 / 3（CD）':['内視鏡的反応（200 mg q4w）','内視鏡的寛解','ステロイドフリー臨床的寛解'],
  'True North（UC）':['臨床的反応','内視鏡的改善','ステロイドフリー臨床的寛解'],
  'ELEVATE UC 12（UC）':['内視鏡的改善','臨床的反応','症状寛解'],
  'ELEVATE UC 52（UC）':['Week 52：臨床的寛解','内視鏡的改善','ステロイドフリー臨床的寛解'],
  'OCTAVE Induction 1（UC）':['臨床的反応','粘膜治癒'],
  'OCTAVE Induction 2（UC）':['臨床的反応','粘膜治癒'],
  'OCTAVE Sustain（UC）':['粘膜治癒','持続的ステロイドフリー寛解'],
  'SELECTION（UC）':['臨床的反応','内視鏡的改善','持続的ステロイドフリー寛解'],
  'U-ACHIEVE Induction（UC）':['臨床的反応','内視鏡的改善','症状寛解'],
  'U-ACCOMPLISH（UC）':['臨床的反応','内視鏡的改善','症状寛解'],
  'U-ACHIEVE Maintenance（UC）':['内視鏡的改善','ステロイドフリー臨床的寛解','持続的臨床的寛解'],
  'U-EXCEL / U-EXCEED（CD）':['U-EXCEL：内視鏡的反応','U-EXCEED：内視鏡的反応','ステロイドフリー臨床的寛解'],
  'U-ENDURE（CD）':['内視鏡的反応（30 mg）','ステロイドフリー臨床的寛解','内視鏡的寛解']
};
const commonAdverseEventDomains=['全有害事象','重篤有害事象','重篤感染症','有害事象による治療中止'];
const drugSpecificAdverseEventDomains={
  IFX:['感染症','点滴時反応・過敏反応'],
  ADA:['感染症','注射部位反応'],
  GLM:['感染症','注射部位反応'],
  VED:['感染症','点滴時反応','頭痛・関節痛'],
  UST:['感染症','注射部位反応・過敏反応'],
  RIS:['感染症','肝機能検査値異常','注射部位反応'],
  MIRI:['感染症','注射部位反応','肝機能検査値異常'],
  GUS:['感染症','注射部位反応','肝機能検査値異常'],
  OZA:['徐脈・房室伝導遅延','肝機能検査値異常','リンパ球減少','黄斑浮腫'],
  ETR:['徐脈・房室伝導遅延','肝機能検査値異常','リンパ球減少','黄斑浮腫'],
  TOF:['重篤感染症・帯状疱疹','静脈血栓塞栓症','主要心血管イベント','悪性腫瘍・臨床検査値異常'],
  FIL:['重篤感染症・帯状疱疹','静脈血栓塞栓症','主要心血管イベント','悪性腫瘍・臨床検査値異常'],
  UPA:['重篤感染症・帯状疱疹','静脈血栓塞栓症','主要心血管イベント','悪性腫瘍・臨床検査値異常']
};
const verifiedTrialAdverseEvents={
  'STARDUST（CD）':[{label:'鼻咽頭炎',value:'Treat-to-Target 13% ／ 標準診療 13%'},{label:'腹痛',value:'11% ／ 9%'},{label:'関節痛',value:'11% ／ 9%'},{label:'頭痛',value:'11% ／ 10%'}],
  'GALAXI 2 / 3（CD）':[{label:'重篤有害事象',value:'GUS 200 mg群 7% ／ GUS 100 mg群 11% ／ UST群 12% ／プラセボ群 15%'},{label:'死亡',value:'報告なし'}],
  'SEQUENCE（CD）':[{label:'CD悪化による治療中止',value:'リサンキズマブ 1.5% ／ ウステキヌマブ 3.4%'}]
};
const trialSupplementalEvidence={
  'ULTRA 2（UC）':{
    secondaryEndpoints:[{label:'Week 52：Week 8反応例の臨床的寛解',value:'ADA 30.9%（Week 8反応例123例）'},{label:'Week 52：Week 8反応例の臨床的反応',value:'ADA 49.6%'},{label:'Week 52：Week 8反応例の粘膜治癒',value:'ADA 43.1%'},{label:'Week 52：ステロイドフリー寛解',value:'ベースライン時ステロイド使用かつWeek 8反応例の21.1%'}],
    adverseEvents:[{label:'重篤有害事象',value:'ADA 12%／プラセボ12%'},{label:'重篤感染症',value:'ADA 1.6%／プラセボ1.9%'},{label:'悪性腫瘍',value:'ADA群で扁平上皮癌1例、胃癌1例'}],
    source2:'https://pubmed.ncbi.nlm.nih.gov/23173821/'
  },
  'UNIFI（UC）':{
    secondaryEndpoints:[{label:'導入期：臨床的反応・内視鏡的改善',value:'いずれもUST群がプラセボ群を上回った（多重性調整済み解析は一次論文参照）'},{label:'維持期：ステロイドフリー臨床的寛解・反応維持',value:'UST q8w・q12wの両群で評価'},{label:'長期継続 Week 92：症候性寛解',value:'UST q12w 64.5%／q8w 67.6%（当初の維持期無作為化集団）'}],
    adverseEvents:[{label:'長期継続 Week 44–96：全有害事象',value:'UST 255.68／プラセボ267.93（100人年当たり）'},{label:'重篤有害事象',value:'UST 9.34／プラセボ12.69（100人年当たり）'},{label:'重篤感染症',value:'UST 2.33／プラセボ2.99（100人年当たり）'},{label:'悪性腫瘍（非黒色腫皮膚癌を含む）',value:'UST 0.93／プラセボ1.49（100人年当たり）'}],
    source2:'https://pubmed.ncbi.nlm.nih.gov/33086438/'
  },
  'LUCENT-1 / LUCENT-2（UC）':{
    secondaryEndpoints:[{label:'導入期：臨床的反応',value:'MIRI群がプラセボ群を上回った（P<0.001）'},{label:'導入期：内視鏡的寛解・組織学的内視鏡的粘膜改善',value:'MIRI群がプラセボ群を上回った（P<0.001）'},{label:'導入期：Week 4・12症状寛解',value:'MIRI群がプラセボ群を上回った（P<0.001）'},{label:'便意切迫感の改善',value:'MIRI群がプラセボ群を上回った（P<0.001）'}],
    adverseEvents:[{label:'導入期：重篤有害事象（UC悪化を除く）',value:'MIRI 2.2%／プラセボ2.1%'},{label:'維持期：重篤有害事象（UC悪化を除く）',value:'MIRI 5.2%／プラセボ3.3%'},{label:'重要な注意',value:'肝機能異常、感染症、注射部位反応などは最新の電子添文も確認'}],
    source2:'https://clinicaltrials.gov/study/NCT03518086?tab=results'
  },
  'INSPIRE（UC）':{
    secondaryEndpoints:[{label:'Week 12：臨床的反応',value:'RIS群がプラセボ群を上回った'},{label:'Week 12：内視鏡的改善・内視鏡的寛解',value:'RIS群がプラセボ群を上回った'},{label:'Week 12：組織学的内視鏡的粘膜改善',value:'RIS群がプラセボ群を上回った'}],
    adverseEvents:[{label:'安全性解析',value:'12週間の治療下有害事象、重篤有害事象、感染症および肝関連検査値を評価。詳細はJAMA本文・補足表7–10を参照'}],
    source2:'https://jamanetwork.com/journals/jama/fullarticle/2821291'
  },
  'COMMAND（UC）':{
    secondaryEndpoints:[{label:'Week 52：臨床的反応・内視鏡的改善',value:'RIS 180 mg q8wおよび360 mg q8wについて評価'},{label:'Week 52：ステロイドフリー臨床的寛解',value:'導入反応例の再ランダム化集団で評価'},{label:'Week 52：組織学的内視鏡的粘膜改善',value:'両維持用量について評価'}],
    adverseEvents:[{label:'安全性解析',value:'維持52週間の曝露調整発現率、重篤有害事象、感染症、肝関連検査値を評価。詳細はJAMA本文・補足表7–10を参照'}],
    source2:'https://jamanetwork.com/journals/jama/fullarticle/2821291'
  },
  'True North（UC）':{
    secondaryEndpoints:[{label:'臨床的反応',value:'Week 10・52ともOZA群がプラセボ群を上回った'},{label:'内視鏡的改善・組織学的内視鏡的粘膜改善',value:'Week 10・52で評価し、主要な副次評価項目はOZA群が上回った'},{label:'ステロイドフリー臨床的寛解',value:'維持Week 52で評価'}],
    adverseEvents:[{label:'注目すべき安全性項目',value:'徐脈・伝導障害、黄斑浮腫、感染症、肝機能、肺機能、悪性腫瘍を評価'},{label:'死亡',value:'非盲検コホートで1例（虚血性心筋症・喫煙歴を有し、インフルエンザとARDSを発症）'}],
    source2:'https://clinicaltrials.gov/study/NCT02435992?tab=results'
  },
  'ELEVATE UC 12（UC）':{
    secondaryEndpoints:[{label:'Week 12：内視鏡的改善',value:'ETR 30.6%／プラセボ18.8%、群間差12.1%（95% CI 3.0–21.2、P=0.009）'},{label:'Week 12：IBDQ総スコア変化',value:'ETR 45.5／プラセボ30.4、群間差17.3（95% CI 8.5–26.2、P<0.001）'}],
    adverseEvents:[{label:'全治療下有害事象',value:'ETR 47.1%／プラセボ46.6%'},{label:'重篤有害事象',value:'ETR 2.5%／プラセボ1.7%'},{label:'有害事象による中止',value:'ETR 5.5%／プラセボ0.9%'},{label:'主な有害事象',value:'貧血5.9%／6.9%、頭痛4.6%／1.7%、悪心4.2%／1.7%'},{label:'死亡',value:'報告なし'}],
    source2:'https://www.ncbi.nlm.nih.gov/books/NBK611318/'
  },
  'ELEVATE UC 52（UC）':{
    secondaryEndpoints:[{label:'Week 52：IBDQ総スコア変化',value:'ETR 66.6／プラセボ52.5、群間差17.7（95% CI 6.6–28.8、P=0.002）'},{label:'内視鏡的改善・症候性寛解・組織学的寛解',value:'Week 12および52で評価'}],
    adverseEvents:[{label:'全治療下有害事象',value:'ETR 71.3%／プラセボ56.3%'},{label:'重篤有害事象',value:'ETR 6.9%／プラセボ6.3%'},{label:'有害事象による中止',value:'ETR 4.2%／プラセボ4.9%'},{label:'主な有害事象',value:'貧血8.3%／9.7%、頭痛8.3%／4.9%、UC悪化7.6%／9.0%、COVID-19 6.9%／6.3%'},{label:'注目すべき事象',value:'心血管イベント4.2%／0%、黄斑浮腫ETR群1例（0.3%）'},{label:'死亡',value:'報告なし'}],
    source2:'https://www.ncbi.nlm.nih.gov/books/NBK611318/'
  },
  'OCTAVE Induction 1（UC）':{
    secondaryEndpoints:[{label:'Week 8：臨床的反応',value:'TOF 10 mg 1日2回群とプラセボ群で比較'},{label:'Week 8：粘膜治癒',value:'Mayo内視鏡サブスコア0または1で評価'}],
    adverseEvents:[{label:'重篤有害事象',value:'TOF 3.4%／プラセボ4.1%'},{label:'注目すべき事象',value:'感染症・帯状疱疹、脂質・肝機能・血球数、悪性腫瘍、心血管・血栓塞栓症は電子添文も確認'}],
    source2:'https://www.ncbi.nlm.nih.gov/books/NBK572265/'
  },
  'OCTAVE Induction 2（UC）':{
    secondaryEndpoints:[{label:'Week 8：臨床的反応',value:'TOF 10 mg 1日2回群とプラセボ群で比較'},{label:'Week 8：粘膜治癒',value:'Mayo内視鏡サブスコア0または1で評価'}],
    adverseEvents:[{label:'重篤有害事象',value:'TOF 4.2%／プラセボ8.0%'},{label:'注目すべき事象',value:'感染症・帯状疱疹、脂質・肝機能・血球数、悪性腫瘍、心血管・血栓塞栓症は電子添文も確認'}],
    source2:'https://www.ncbi.nlm.nih.gov/books/NBK572265/'
  },
  'OCTAVE Sustain（UC）':{
    secondaryEndpoints:[{label:'Week 52：粘膜治癒',value:'TOF 5 mg・10 mg 1日2回の各群とプラセボ群で評価'},{label:'持続的ステロイドフリー寛解',value:'維持期の階層化された副次評価項目として評価'}],
    adverseEvents:[{label:'重篤有害事象',value:'TOF 5 mg 5.1%／10 mg 5.6%／プラセボ6.6%'},{label:'UC悪化',value:'TOF 5 mg 1.0%／10 mg 0.5%／プラセボ4.0%'},{label:'帯状疱疹',value:'報告例はいずれも重篤ではなく、治療中止に至らず'}],
    source2:'https://www.ncbi.nlm.nih.gov/books/NBK572265/'
  },
  'SELECTION（UC）':{
    secondaryEndpoints:[{label:'臨床的反応・内視鏡的改善',value:'導入Week 10および維持Week 58で評価'},{label:'持続的ステロイドフリー臨床的寛解',value:'維持試験の主要な副次評価項目として評価'}],
    adverseEvents:[{label:'全有害事象・重篤有害事象・中止',value:'維持期の各群で概ね同程度'},{label:'重篤感染症',value:'FIL投与例で2%未満'},{label:'帯状疱疹',value:'FIL投与例で1%未満'},{label:'重要な注意',value:'感染症、血栓塞栓症、心血管イベント、悪性腫瘍、血球・肝腎機能は電子添文も確認'}],
    source2:'https://pmc.ncbi.nlm.nih.gov/articles/PMC7958748/'
  },
  'U-ACHIEVE Induction（UC）':{
    secondaryEndpoints:[{label:'Week 2：早期臨床的反応',value:'統合解析でUPA 60%／プラセボ27%'},{label:'Week 8：内視鏡的改善・症候性寛解',value:'UPA群がプラセボ群を上回った'}],
    adverseEvents:[{label:'重篤有害事象',value:'UPA 2.5%／プラセボ5.8%'},{label:'JAK阻害薬関連事象',value:'重篤感染症、帯状疱疹、血球減少、CK上昇、心血管・血栓塞栓症を評価'}],
    source2:'https://pmc.ncbi.nlm.nih.gov/articles/PMC10007976/'
  },
  'U-ACCOMPLISH（UC）':{
    secondaryEndpoints:[{label:'Week 2：早期臨床的反応',value:'統合解析でUPA 60%／プラセボ27%'},{label:'Week 8：内視鏡的改善・症候性寛解',value:'UPA群がプラセボ群を上回った'}],
    adverseEvents:[{label:'重篤有害事象',value:'UPA 3.2%／プラセボ4.5%'},{label:'JAK阻害薬関連事象',value:'重篤感染症、帯状疱疹、血球減少、CK上昇、心血管・血栓塞栓症を評価'}],
    source2:'https://pmc.ncbi.nlm.nih.gov/articles/PMC10007976/'
  },
  'U-ACHIEVE Maintenance（UC）':{
    secondaryEndpoints:[{label:'Week 52：内視鏡的改善・内視鏡的寛解',value:'UPA 15 mg・30 mgの各群とプラセボ群で評価'},{label:'Week 52：ステロイドフリー・持続的臨床的寛解',value:'両維持用量で評価'}],
    adverseEvents:[{label:'重篤有害事象',value:'UPA 15 mg 6.8%／30 mg 5.8%／プラセボ12.8%'},{label:'非黒色腫皮膚癌',value:'UPA 30 mg群で2例、他群では報告なし'},{label:'JAK阻害薬関連事象',value:'重篤感染症、帯状疱疹、悪性腫瘍、主要心血管イベント、静脈血栓塞栓症を評価'}],
    source2:'https://pmc.ncbi.nlm.nih.gov/articles/PMC10007976/'
  },
  'U-EXCEL / U-EXCEED（CD）':{
    secondaryEndpoints:[{label:'ステロイドフリー臨床的寛解',value:'導入期の強制ステロイド漸減下で評価'},{label:'深い寛解・QOL・バイオマーカー',value:'臨床、内視鏡、IBDQ、CRP、便中カルプロテクチンを評価'}],
    adverseEvents:[{label:'U-EXCEL：主な有害事象',value:'ざ瘡6.9%、貧血6.3%（UPA 45 mg群）'},{label:'U-EXCEED：主な有害事象',value:'鼻咽頭炎7.1%、頭痛6.2%、CD悪化5.9%、上気道感染5.2%（UPA 45 mg群）'},{label:'JAK阻害薬関連事象',value:'重篤・日和見感染症、貧血、好中球減少、CK上昇がプラセボより多く観察'}],
    source2:'https://www.nejm.org/doi/full/10.1056/NEJMoa2212728'
  },
  'U-ENDURE（CD）':{
    secondaryEndpoints:[{label:'Week 52：深い寛解',value:'CDAI臨床的寛解と内視鏡的寛解の両方で評価'},{label:'臨床的寛解維持・ステロイドフリー寛解',value:'導入反応例の再ランダム化集団で評価'}],
    adverseEvents:[{label:'CD悪化（100人年当たり）',value:'UPA 15 mg 29.7／30 mg 12.0／プラセボ58.0'},{label:'JAK阻害薬関連事象',value:'重篤・日和見感染症、貧血、好中球減少、CK上昇、悪性腫瘍、心血管・血栓塞栓症を評価'}],
    source2:'https://www.nejm.org/doi/full/10.1056/NEJMoa2212728'
  }
};
Object.entries(evidence).forEach(([drugId,item])=>(item.studies||[item]).forEach(study=>{
  const [n,ci,p]=globalThis.primaryStatistics?.[study.trial]||['一次論文の主要解析集団を確認してください','一次論文で主要評価項目の95%CIを確認してください','一次論文で統計解析結果を確認してください'];
  const labels=explicitTrialLabels[study.trial];
  const safetyDomains=[...commonAdverseEventDomains,...(drugSpecificAdverseEventDomains[drugId]||[])];
  const supplemental=trialSupplementalEvidence[study.trial]||{};
  Object.assign(study,{primaryN:n,primaryCI:ci,primaryP:p,activeLabel:labels?.[0]||drugTrialLabels[drugId]||study.activeLabel,controlLabel:labels?.[1]||study.controlLabel||'プラセボ',comparisonType:comparisonTrialTypes[study.trial]||'',comparisonGroups:comparisonTrialGroups[study.trial]||[],secondaryEndpoints:study.secondaryEndpoints||supplemental.secondaryEndpoints||secondaryEndpointCatalog[study.trial]||[],adverseEvents:study.adverseEvents||supplemental.adverseEvents||verifiedTrialAdverseEvents[study.trial]||[],safetyDomains,source2:study.source2||supplemental.source2,source3:study.source3||supplemental.source3});
}));

const form=document.querySelector('#patientForm'),female=document.querySelector('#femaleSection'),pregnancy=document.querySelector('#pregnancyFields'),cd=document.querySelector('#cdGroup'),results=document.querySelector('#results'),usedRoot=document.querySelector('#usedDrugs');
const checks=(root,items)=>root.innerHTML=items.map(([n,l])=>`<label class="check"><input name="${n}" type="checkbox"><span>${l}</span></label>`).join('');
checks(document.querySelector('#riskChecks'),[['steroid','ステロイド依存・抵抗性'],['aza','AZA／6-MP内服中'],['infection','重篤感染症リスク'],['cvRisk','心血管リスク（喫煙・高血圧・糖尿病・心血管疾患既往など）'],['malignancy','悪性腫瘍の既往あり'],['vte','血栓塞栓症リスク'],['adherence','内服アドヒアランス懸念']]);
checks(document.querySelector('#safetyGateChecks'),[['currentSeriousInfection','現在の重篤な感染症'],['activeTb','活動性結核'],['severeCytopenia','重大な血球減少'],['severeLiver','重度肝機能障害'],['strongImmunosuppressant','強力な免疫抑制薬を併用中（AZA／6-MP以外）'],['urgentComplication','脱水・膿瘍・腸閉塞など、治療選択より先に対応が必要'],['asuc','急性重症潰瘍性大腸炎（ASUC）または入院治療が必要']]);
checks(document.querySelector('#cdChecks'),[['cdstSurgery','腸管手術歴あり'],['cdstFistula','瘻孔型病変の既往あり'],['perianal','現在、肛門病変・瘻孔あり']]);
checks(document.querySelector('#optimizationChecks'),[['secondaryLoss','過去に二次無効・効果減弱があった'],['optimizeSame','同じ薬剤で増量・間隔短縮できることを重視'],['rescueOption','追加導入・再導入できることを重視'],['mechanismSwitch','最適化より作用機序変更を優先'],['applyHeadToHead','第3b相Head-to-Head試験の結果を適合度に反映する']]);
checks(document.querySelector('#burdenChecks'),[['visitIncrease','通院回数が増えてもよい'],['infusionTime','点滴時間を許容できる'],['selfInjection','自己注射が可能'],['injectionIncrease','注射回数が増えてもよい'],['adherenceOk','服薬管理に問題がない']]);
const data=()=>Object.fromEntries(new FormData(form));
const yes=n=>form.elements[n]?.checked;
const used=()=>[...form.querySelectorAll('input[name="usedDrug"]:checked')].map(x=>x.value);
const selected=n=>[...form.querySelectorAll(`input[name="${n}"]:checked`)].map(x=>x.value);
const toast=document.querySelector('#toast');
const inlineError=document.querySelector('#error');
let toastTimer;
let inlineErrorTimer;
let menopauseAuto=false;
function showToast(message){toast.textContent=message;toast.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.hidden=true,4500)}
function showInlineError(message){
  inlineError.textContent=message;
  clearTimeout(inlineErrorTimer);
  inlineErrorTimer=setTimeout(()=>inlineError.textContent='',5000);
}
function calculateVdzCdst(){
  const f=data(),output=document.querySelector('#cdstResult');
  if(used().includes('VED'))return null;
  if(f.disease!=='CD'||f.cdstAlbumin===''||f.cdstCrp===''){
    output.className='cdst-result';output.innerHTML='<strong>VDZ-CDST</strong><span>アルブミンとCRPを入力してください</span>';return null;
  }
  const albuminGdl=Number(f.cdstAlbumin),albuminGl=albuminGdl*10,crpMgdl=Number(f.cdstCrp),crpMgl=crpMgdl*10;
  if(!Number.isFinite(albuminGdl)||!Number.isFinite(crpMgdl)||albuminGdl<1||albuminGdl>6||crpMgdl<0||crpMgdl>50)return null;
  const priorAntiTnf=used().some(id=>['IFX','ADA'].includes(id));
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
  if(f.disease==='CD'&&!used().includes('VED')){
    if(f.cdstAlbumin!==''&&(+f.cdstAlbumin<1||+f.cdstAlbumin>6))errors.push([form.elements.cdstAlbumin,'アルブミンは1.0〜6.0 g/dLで入力してください']);
    if(f.cdstCrp!==''&&(+f.cdstCrp<0||+f.cdstCrp>50))errors.push([form.elements.cdstCrp,'CRPは0〜50 mg/dLで入力してください']);
  }
  if(errors.length){
    errors.forEach(([el])=>el.closest('.field,.used-reason')?.classList.add('invalid'));
    const requiredMissing=['disease','ageGroup','sex','severity'].some(name=>!f[name]);
    showInlineError(requiredMissing?'必須項目を選択してください':errors[0][1]);
    showToast(errors.map(x=>x[1]).join('／'));
    errors[0][0].scrollIntoView({behavior:'smooth',block:'center'});errors[0][0].focus();return false;
  }
  inlineError.textContent='';
  return true;
}
function resultTags(reasons){
  const tags=[];
  if(reasons.some(x=>x.includes('有効性')))tags.push('有効性重視');
  if(reasons.some(x=>x.includes('安全性')||x.includes('感染症')||x.includes('悪性腫瘍')||x.includes('高齢者')||x.includes('心血管')||x.includes('血栓')))tags.push('安全性重視');
  if(reasons.some(x=>x.includes('希望投与経路')&&x.includes('一致')))tags.push('希望経路一致');
  if(reasons.some(x=>x.includes('作用機序変更')))tags.push('作用機序変更');
  if(reasons.some(x=>x.includes('肛門病変')||x.includes('瘻孔')))tags.push('肛門病変');
  if(reasons.some(x=>x.includes('治療最適化')))tags.push('最適化可能');
  if(reasons.some(x=>x.includes('Head-to-Head')))tags.push('直接比較データ');
  if(reasons.some(x=>x.includes('投与負担')))tags.push('投与負担あり');
  if(reasons.some(x=>x.includes('AZA併用注意')))tags.push('AZA併用注意');
  else if(reasons.some(x=>x.includes('AZA併用')))tags.push('AZA併用');
  return tags.slice(0,3);
}
function blockingConditions(f){
  const items=[];
  if(yes('currentSeriousInfection'))items.push('現在の重篤な感染症');
  if(yes('activeTb'))items.push('活動性結核');
  if(yes('urgentComplication'))items.push('脱水・膿瘍・腸閉塞などの緊急合併症');
  if(f.disease==='UC'&&yes('asuc'))items.push('ASUCまたは入院治療が必要な状態');
  if(f.cmvStatus==='suspected')items.push('CMV腸炎の疑い・検査中（組織IHCを基本に、必要に応じて組織PCRを確認）');
  if(f.cmvStatus==='colitis')items.push('組織検査で確認されたCMV腸炎（抗ウイルス療法、ステロイド減量、先進治療の時期を専門的に判断）');
  if(f.cmvStatus==='disseminated')items.push('症候性の播種性CMV感染（入院評価と感染症専門医への相談を優先）');
  return items;
}
function safetyClassification(d,f){
  const jak=['TOF','FIL','UPA'].includes(d.id),reasons=[];
  let level='eligible';
  const review=reason=>{if(level!=='excluded')level='review';reasons.push(reason)};
  const exclude=reason=>{level='excluded';reasons.push(reason)};
  if(jak&&yes('pregnant'))exclude('妊娠中または妊娠の可能性：JAK阻害薬は選択対象外／禁忌に該当する可能性');
  if(jak&&yes('severeCytopenia'))exclude('重大な血球減少：血球数の基準確認と回復を優先');
  if(jak&&yes('severeLiver'))exclude('重度肝機能障害：禁忌または投与非推奨に該当する可能性');
  if(jak&&(yes('aza')||yes('strongImmunosuppressant')))exclude('AZA／6-MPまたは強力な免疫抑制薬との併用可否を薬剤別に確認');
  if(d.id==='FIL'&&f.renalFunction==='under15')exclude('eGFR 15未満：フィルゴチニブの腎機能制限に該当する可能性');
  else if(d.id==='FIL'&&['30-59','15-29'].includes(f.renalFunction))review('腎機能低下：フィルゴチニブ100 mg 1日1回への用量調整を確認');
  else if(d.id==='FIL'&&f.renalFunction==='unknown')review('腎機能未評価：開始前にeGFRと用量を確認');
  if(['TOF','UPA'].includes(d.id)&&['30-59','15-29','under15'].includes(f.renalFunction))review('腎機能低下：開始可否・用量を最新の電子添文で確認');
  if(jak&&(yes('vte')||yes('cvRisk')))review('血栓塞栓症・心血管リスクを評価し、代替治療を含め専門的に判断');
  if(jak&&yes('pregnancyPlan'))review('妊娠希望あり：避妊期間・妊娠計画と薬剤選択を専門的に確認');
  if(!jak&&yes('severeCytopenia'))review('重大な血球減少：原因精査と開始可否の専門的判断が必要');
  if(!jak&&yes('severeLiver'))review('重度肝機能障害：薬剤別の使用可否・用量を確認');
  if(!jak&&yes('strongImmunosuppressant'))review('強力な免疫抑制薬併用中：重複免疫抑制と感染症リスクを確認');
  return {level,reasons};
}

function renderUsed(disease){
  usedRoot.innerHTML=disease?drugs.filter(d=>d.diseases.includes(disease)).map(d=>`<div class="used-history"><label class="check used"><input name="usedDrug" value="${d.id}" type="checkbox"><span>${d.name}（${d.cls}）</span></label><div class="used-reason" data-reason-for="${d.id}" hidden><label><span>使用後の経過</span><select name="usedReason_${d.id}"><option value="">選択してください</option><option value="primary">一次無効</option><option value="secondary">二次無効・効果減弱</option><option value="adverse">有害事象で中止</option><option value="remission">寛解後に中止</option><option value="other">その他</option></select></label><label class="reuse-option"><input name="allowReuse_${d.id}" type="checkbox"><span>再投与候補に含める</span><small>寛解後中止など、再投与を個別に検討する場合</small></label></div></div>`).join(''):'<p class="hint">先に疾患を選択してください。</p>';
}
function updateOptimizationVisibility(){
  const hasUsedAt=used().length>0;
  const visibility={
    secondaryLoss:hasUsedAt,
    optimizeSame:true,
    rescueOption:true,
    mechanismSwitch:hasUsedAt,
    applyHeadToHead:true
  };
  Object.entries(visibility).forEach(([name,show])=>{
    const input=form.elements[name];input.closest('.check').hidden=!show;
    if(!show)input.checked=false;
  });
  document.querySelector('#optimizationBlock').hidden=false;
}
function updateBurdenVisibility(routes,any,maintenanceVisible){
  const possible=new Set(any?['iv','sc','oral']:routes);
  if(maintenanceVisible){
    const value=form.elements.maintenanceRoute.value;
    if(value)possible.add(value);
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
  const routes=selected('inductionRoute'),field=document.querySelector('#maintenanceRouteField');
  const allowedMaintenance=new Set(drugs.filter(d=>d.induction.some(route=>routes.includes(route))).flatMap(d=>d.maintenance));
  [...form.elements.maintenanceRoute.options].filter(option=>option.value).forEach(option=>{
    const allowed=allowedMaintenance.has(option.value);
    option.hidden=!allowed;option.disabled=!allowed;
  });
  const onlyRoute=allowedMaintenance.size===1?[...allowedMaintenance][0]:null;
  const show=allowedMaintenance.size>1;
  field.hidden=!show;
  if(changed==='inductionRoute')form.elements.maintenanceRoute.value=onlyRoute||'';
  if(form.elements.maintenanceRoute.selectedOptions[0]?.disabled)form.elements.maintenanceRoute.value=onlyRoute||'';
  if(!routes.length)form.elements.maintenanceRoute.value='';
  updateBurdenVisibility(routes,false,show);
}
function conditional(changed){
  const f=data(),autoMenopause=f.sex==='female'&&['65-74','75+'].includes(f.ageGroup);
  female.hidden=f.sex!=='female'||autoMenopause; cd.hidden=f.disease!=='CD';
  const priorVed=used().includes('VED'),cdstAssessment=document.querySelector('#cdstAssessment');
  cdstAssessment.hidden=f.disease!=='CD'||priorVed;
  if(priorVed){
    form.elements.cdstAlbumin.value='';
    form.elements.cdstCrp.value='';
    document.querySelector('#cdstResult').className='cdst-result';
    document.querySelector('#cdstResult').innerHTML='<strong>VDZ-CDST</strong><span>ベドリズマブ使用歴があるため測定不要</span>';
  }
  document.querySelector('#treatmentStepNumber').textContent=f.sex==='female'&&!autoMenopause?'03':'02';
  document.querySelector('#routeStepNumber').textContent=f.disease==='CD'?'04':'03';
  form.elements.asuc.closest('.check').hidden=f.disease!=='UC';
  if(f.disease!=='UC')form.elements.asuc.checked=false;
  const cmvActive=['suspected','colitis','disseminated'].includes(f.cmvStatus);
  document.querySelector('#cmvDetails').hidden=!cmvActive;
  document.querySelector('#c7PositiveFields').hidden=!cmvActive||f.c7hrp!=='positive';
  if(!cmvActive){
    form.elements.c7hrp.value='notDone';
    form.elements.cmvIhc.value='notDone';
    form.elements.cmvTissuePcr.value='notDone';
    for(const n of ['c7PositiveCount','c7Denominator','c7TestDate'])form.elements[n].value='';
  }else if(f.c7hrp!=='positive'){
    for(const n of ['c7PositiveCount','c7Denominator'])form.elements[n].value='';
  }
  if(changed==='disease'){
    renderUsed(f.disease);
    renderTrialCards(f.disease);
  }
  updateOptimizationVisibility();
  if(f.sex!=='female')for(const n of ['lifeNone','menopause','pregnancyPlan','pregnant','nursing'])form.elements[n].checked=false;
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
  if(n==='mechanismSwitch'&&e.target.checked)for(const x of ['optimizeSame','rescueOption'])form.elements[x].checked=false;
  if(['optimizeSame','rescueOption'].includes(n)&&e.target.checked)form.elements.mechanismSwitch.checked=false;
  if(n==='usedDrug'){
    const reason=form.querySelector(`[data-reason-for="${e.target.value}"]`);
    reason.hidden=!e.target.checked;
    if(!e.target.checked){
      reason.querySelector('select').value='';
      reason.querySelector(`[name="allowReuse_${e.target.value}"]`).checked=false;
    }
  }
  if(n==='adherence'&&e.target.checked)form.elements.adherenceOk.checked=false;
  if(n==='adherenceOk'&&e.target.checked)form.elements.adherence.checked=false;
  e.target.closest('.field,.used-reason')?.classList.remove('invalid'); conditional(n); results.hidden=true;
});
form.addEventListener('input',e=>{e.target.closest('.field')?.classList.remove('invalid');calculateVdzCdst();results.hidden=true});

function calculate(f){
  const usedHistory=used();
  const excluded=new Set(usedHistory.filter(id=>!form.elements[`allowReuse_${id}`]?.checked));
  const historyEntries=usedHistory.map(id=>({drug:drugs.find(d=>d.id===id),reason:form.elements[`usedReason_${id}`]?.value||''}));
  const usedClasses=drugs.filter(d=>usedHistory.includes(d.id)).map(d=>d.cls);
  const historyType=!usedHistory.length?'none':usedClasses.includes('抗TNFα抗体')?'antiTNF':'advanced';
  const inductionPreferences=selected('inductionRoute');
  return drugs.filter(d=>d.diseases.includes(f.disease)&&!excluded.has(d.id)).map(d=>{
    let score=70,reasons=[]; const add=(n,s)=>{score+=n;reasons.push(`${n>0?'+':''}${n} ${s}`)};
    if(f.severity==='severe'&&['IFX','UPA','RIS'].includes(d.id))add(8,'重症で有効性を重視');
    if(f.disease==='UC'&&d.id==='VED')add(0,'Head-to-Head参考情報（VARSITY）：ADAとの直接比較結果');
    if(f.disease==='UC'&&d.id==='ADA')yes('applyHeadToHead')?add(-4,'第3b相Head-to-Head反映（VARSITY）：Week 52臨床的寛解でVDZがADAに優越'):add(0,'第3b相Head-to-Head参考情報（VARSITY）：チェック時のみ比較結果を減点へ反映');
    if(f.disease==='CD'&&d.id==='GUS')add(0,'第3相Head-to-Head参考情報（GALAXI 2/3）：採点対象外');
    if(f.disease==='CD'&&d.id==='RIS')add(0,'第3b相Head-to-Head参考情報（SEQUENCE）：抗TNFα抗体不応・不耐例でUSTと直接比較');
    if(f.disease==='CD'&&d.id==='UST'){
      if(yes('applyHeadToHead')&&historyType==='antiTNF')add(-4,'第3b相Head-to-Head反映（SEQUENCE）：抗TNFα抗体不応・不耐例のWeek 48内視鏡的寛解でRISがUSTに優越');
      else if(yes('applyHeadToHead'))add(0,'第3b相Head-to-Head：SEQUENCEの対象集団と異なるため減点なし');
      else add(0,'第3b相Head-to-Head参考情報（SEQUENCE、SEAVUE）：チェック時のみ対象集団に合う優越性結果を減点へ反映');
    }
    if(f.disease==='CD'&&d.id==='ADA'&&!excluded.size)add(0,'Head-to-Head参考情報（SEAVUE）：生物学的製剤未使用例でUSTと有意差なし。未比較薬との差には換算しない');
    if(f.disease==='CD'&&d.id==='MIRI'&&historyEntries.length)add(0,'Head-to-Head参考情報（VIVID-1）：USTとの直接比較結果。未比較の他薬剤に対する加点には使用しない');
    if(d.id==='OZA')add(-1,'投与負担：導入時にスターターパックによる7日間の漸増が必要');
    if(d.id==='TOF')add(-1,'投与負担：維持療法でも1日2回内服が必要');
    if(historyType==='antiTNF'&&d.cls!=='抗TNFα抗体')add(7,'抗TNFα既治療後の作用機序変更');
    if(historyType==='advanced'&&['UPA','RIS','MIRI','GUS'].includes(d.id))add(5,'先進治療既治療後の選択肢');
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
      else add(0,'VDZ-CDST未計算：アルブミン・CRPを入力すると補助評価を表示できます');
    }
    if(inductionPreferences.length)inductionPreferences.some(route=>d.induction.includes(route))?add(2,'導入期に許容できる投与経路と一致'):add(-2,'導入期に許容できる投与経路と不一致');
    if(f.maintenanceRoute)d.maintenance.includes(f.maintenanceRoute)?add(6,'維持期の希望投与経路と一致'):add(-4,'維持期の希望投与経路と不一致');
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
      else if(['IFX','ADA','GLM'].includes(d.id))add(-6,'重篤感染症リスクで抗TNFα抗体を慎重評価');
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
    const safety=safetyClassification(d,f);
    return {...d,score,reasons,status:safety.level,safetyReasons:safety.reasons};
  }).sort((a,b)=>({eligible:0,review:1,excluded:2}[a.status]-{eligible:0,review:1,excluded:2}[b.status])||b.score-a.score||a.name.localeCompare(b.name,'ja')).map((d,i,a)=>{
    if(d.status!=='eligible')return {...d,rank:null};
    const ranked=a.filter(x=>x.status==='eligible');
    return {...d,rank:ranked.findIndex(x=>x.score===d.score)+1};
  });
}
form.addEventListener('submit',e=>{
  e.preventDefault(); if(!validateForm())return;
  const blocks=blockingConditions(data());
  if(blocks.length){
    document.querySelector('#summary').className='summary urgent';
    document.querySelector('#summary').innerHTML=`<strong>治療選択前の対応が必要です</strong><p>${blocks.join('、')}が選択されています。適合度順による薬剤比較は行わず、感染症治療・緊急評価・入院治療経路を優先してください。</p>`;
    document.querySelector('#cards').innerHTML='<div class="hard-stop"><strong>適合度順の表示を停止しました</strong><span>状態の評価・対応後に入力を更新し、改めて適合度結果を確認してください。</span></div>';
    results.hidden=false;results.scrollIntoView({behavior:'smooth'});return;
  }
  const rows=calculate(data());
  if(!rows.length){showInlineError('使用済み薬剤以外に候補がありません。選択内容を確認してください。');return}
  inlineError.textContent=''; const candidates=rows.filter(x=>x.status==='eligible'),reviewRows=rows.filter(x=>x.status==='review'),leaders=candidates.filter((x,_,a)=>x.score===a[0]?.score),top=candidates[0]?.score,names=leaders.map(x=>x.name).join('、');
  document.querySelector('#summary').className='summary';
  document.querySelector('#summary').innerHTML=candidates.length?`<strong>${names}</strong>${leaders.length>1?' は同点で、入力条件との適合度が最も高い候補です。':' は入力条件との適合度が最も高い候補です。'} 最終決定は適応・禁忌・最新の電子添文と患者希望を確認してください。`:`<strong>通常の候補として表示できる薬剤はありません</strong><p>${reviewRows.map(x=>x.name).join('、')||'表示薬剤'}は専門的判断または禁忌確認が必要です。</p>`;
  const statusLabels={eligible:'条件との適合度が高い候補',review:'要専門的判断',excluded:'選択対象外／禁忌に該当する可能性'};
  document.querySelector('#cards').innerHTML=rows.map(r=>{const tags=resultTags(r.reasons);return `<article class="${r.rank===1&&r.status==='eligible'?'best ':''}status-${r.status}"><div class="rank">${r.rank?`<strong>${r.rank}</strong><small>位</small>`:'<strong>―</strong>'}</div><div class="drug"><span class="status-badge">${statusLabels[r.status]}</span><h3>${r.name}</h3><p>${r.cls}</p><p class="regimen">${r.label}</p>${r.safetyReasons.length?`<div class="safety-reasons">${r.safetyReasons.map(x=>`<p>${x}</p>`).join('')}</div>`:''}${tags.length?`<div class="tags">${tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>`:''}<p class="reason-line">${r.reasons[0]?.replace(/^[+-]?\d+\s*/,'')||'標準条件による基本評価'}</p></div><div class="score"><strong>${r.score}</strong><small>適合度点<br>${r.status==='eligible'?(r.score===top?'本ツール内TOP':`本ツール内 ${top-r.score}点差`):'参考値'}</small></div>${scheduleMarkup(r,data().disease)}<details><summary>適合度の内訳</summary>${r.safetyReasons.length?`<h4>安全性・要確認</h4><ul>${r.safetyReasons.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}${r.reasons.length?`<ul>${r.reasons.map(x=>`<li>${x}</li>`).join('')}</ul>`:'<p>基本点のみ</p>'}</details></article>`}).join('');
  results.hidden=false; results.scrollIntoView({behavior:'smooth'});
});
document.querySelector('#edit').onclick=()=>{results.hidden=true;scrollTo({top:0,behavior:'smooth'})};
document.querySelector('#restart').onclick=()=>{
  clearTimeout(toastTimer);clearTimeout(inlineErrorTimer);
  form.reset();
  menopauseAuto=false;
  form.querySelectorAll('.field.invalid,.used-reason.invalid').forEach(x=>x.classList.remove('invalid'));
  toast.hidden=true;toast.textContent='';
  inlineError.textContent='';
  document.querySelector('#summary').className='summary';
  document.querySelector('#summary').innerHTML='';
  document.querySelector('#cards').innerHTML='';
  renderUsed('');
  conditional('reset');
  results.hidden=true;
  scrollTo({top:0,behavior:'smooth'});
};

const trialRoot=document.querySelector('#trials'),dialog=document.querySelector('#trialDialog'),detail=document.querySelector('#trialDetail');
const trialNames={
  IFX:{UC:'ACT 1 / 2・UC-SUCCESS',CD:'ACCENT I / II・SONIC'},
  ADA:{UC:'ULTRA 2',CD:'CLASSIC I・CHARM'},
  GLM:{UC:'PURSUIT-SC・PURSUIT-J'},
  VED:{UC:'GEMINI 1・VARSITY［第3b相］',CD:'GEMINI 2・VERSIFY［第3b相］'},
  UST:{UC:'UNIFI',CD:'UNITI・IM-UNITI・SEAVUE・STARDUST［第3b相］'},
  RIS:{UC:'INSPIRE・COMMAND',CD:'ADVANCE・MOTIVATE・FORTIFY・SEQUENCE［第3b相］'},
  MIRI:{UC:'LUCENT-1・LUCENT-2・LUCENT-3',CD:'VIVID-1・VIVID-2'},
  GUS:{UC:'QUASAR・ASTRO',CD:'GALAXI 2 / 3［直接比較］'},
  OZA:{UC:'True North'},ETR:{UC:'ELEVATE UC 12 / 52'},
  TOF:{UC:'OCTAVE'},FIL:{UC:'SELECTION'},
  UPA:{UC:'U-ACHIEVE・U-ACCOMPLISH',CD:'U-EXCEL・U-EXCEED・U-ENDURE'}
};
function mechanismGroup(d){
  if(d.cls.includes('抗TNF'))return 'tnf';
  if(d.cls.includes('インテグリン'))return 'integrin';
  if(d.cls.includes('IL-12/23'))return 'il12';
  if(d.cls.includes('IL-23'))return 'il23';
  if(d.cls.includes('JAK'))return 'jak';
  return 's1p';
}
function studiesForDisease(ev,disease){
  if(!ev||!disease)return [];
  return (ev.studies||[ev]).filter(study=>study.trial.includes(`（${disease}）`)||(disease==='UC'&&study.trial.includes(' UC ')));
}
function renderTrialCards(disease){
  if(!disease){
    trialRoot.innerHTML='<p class="hint">疾患を選択すると、その疾患に関連する主要臨床試験を表示します。</p>';
    return;
  }
  trialRoot.innerHTML=drugs.filter(d=>d.diseases.includes(disease)).map(d=>{
    const studies=studiesForDisease(evidence[d.id],disease),label=trialNames[d.id]?.[disease]||'関連試験';
    return `<button type="button" class="trial-card trial-${mechanismGroup(d)}" data-drug="${d.id}" aria-label="${d.name}の${disease}臨床試験結果を見る"><span>${d.cls}</span><strong>${d.name}</strong><small>${label}</small><em>${studies.length?'結果グラフを見る':'試験名を確認'}</em></button>`;
  }).join('');
}
function studyMethodology(study){
  const name=study.trial;
  const responderRerandomized=/ACCENT|CHARM|GEMINI|UNIFI|IM-UNITI|COMMAND|FORTIFY|LUCENT-2|QUASAR|True North|OCTAVE Sustain|SELECTION|U-ACHIEVE Maintenance|U-ENDURE|STARDUST/.test(name);
  const treatThrough=/ULTRA 2|VARSITY|SEAVUE|ELEVATE UC 52|VIVID-1|GALAXI/.test(name);
  const extension=/LUCENT-3|VIVID-2/.test(name);
  const analysis=study.analysisPopulation||(extension?'先行試験の継続参加例。無作為化ITT集団とは異なります。':responderRerandomized?'導入反応例を対象とする維持期の再ランダム化集団を含みます。導入ITT集団とは分母が異なります。':treatThrough?'無作為化後を継続追跡するtreat-through／直接比較集団です。詳細な解析対象は一次文献を確認してください。':'無作為化ITTまたは試験で規定された主要解析集団。正確な定義は一次文献を確認してください。');
  const maintenance=study.maintenanceDesign||(extension?'長期継続試験（選択された継続例）':responderRerandomized?'re-randomized responder型：導入反応例を維持期に再ランダム化':treatThrough?'treat-through型または継続無作為化比較':'導入試験／単一評価時点。維持結果を含む場合は一次文献でデザインを確認');
  return {
    analysis,
    definition:study.definition||'試験ごとのプロトコル定義（Mayoスコア、CDAI、内視鏡評価など）を使用。完全な定義は一次文献・補足資料を確認してください。',
    maintenance,
    imputation:study.imputation||'欠測・中止・救済治療後の扱いは試験ごとに異なります。NRI等の詳細は一次文献の統計解析計画を確認してください。'
  };
}
function secondaryEndpointMarkup(study){
  const endpoints=study.secondaryEndpoints||[];
  if(!endpoints.length)return '<p class="trial-data-pending">検証済みの副次評価項目数値は未収載です。一次資料・補足資料を確認してください。</p>';
  return `<p class="trial-outcome-caption">代表的な副次評価項目です。階層検定、多重性調整、評価時点および解析集団は試験ごとに異なります。</p><div class="trial-outcome-list">${endpoints.map(entry=>{
    const item=typeof entry==='string'?{label:entry}:entry;
    const period=study.periods.find(([label])=>label===item.label);
    const active=item.active??period?.[1],control=item.control??period?.[2];
    const result=active==null?'結果数値・統計解析は一次資料を確認':`${study.activeLabel} ${active}%${control==null?'':` ／ ${study.controlLabel} ${control}%`}`;
    const value=item.value||result;
    const groups=[];
    if(active!=null){
      groups.push({label:study.activeLabel,value:Number(active)});
      if(control!=null)groups.push({label:study.controlLabel,value:Number(control)});
    }else if(item.value){
      const resultPart=item.value.split(/[、；]/)[0];
      resultPart.split('／').forEach(part=>{
        const match=part.match(/^(.+?)\s+(\d+(?:\.\d+)?)%/);
        if(match)groups.push({label:match[1].trim(),value:Number(match[2])});
      });
    }
    const graph=groups.length>=1?`<div class="secondary-chart" role="img" aria-label="${item.label}の比較グラフ">${groups.map((group,i)=>`<div class="secondary-bar group-${i+1}"><span>${group.label} ${group.value}%</span><i style="width:${Math.min(100,Math.max(0,group.value))}%"></i></div>`).join('')}</div>`:'';
    return `<div class="secondary-outcome"><strong>${item.label}</strong>${graph}<span>${value}</span></div>`;
  }).join('')}</div>`;
}
function adverseEventMarkup(study){
  const verified=study.adverseEvents?.length?`<h4>収載済みの試験結果</h4><div class="trial-outcome-list adverse-list">${study.adverseEvents.map(item=>`<div><strong>${item.label}</strong><span>${item.value}</span></div>`).join('')}</div>`:'<p class="trial-data-pending">検証済みの発現割合は未収載です。一次資料の安全性解析を確認してください。</p>';
  const domains=`<h4>安全性解析で確認する項目</h4><div class="safety-domain-list">${(study.safetyDomains||[]).map(label=>`<span>${label}</span>`).join('')}</div>`;
  return `<p class="trial-outcome-caption">試験期間と安全性解析集団に基づく結果です。電子添文に記載された発現率や市販後のリスクとは区別してください。</p>${verified}${domains}`;
}
function renderStudy(ev,index=0){
  const studies=ev.studies||[ev],study=studies[index];
  const method=studyMethodology(study);
  const comparison=study.comparisonType?`<div class="trial-comparison"><span>${study.comparisonType}</span>${study.comparisonGroups.map((group,i)=>`${i?'<b>vs</b>':''}<strong>${group}</strong>`).join('')}</div>`:'';
  const summary=study.summary?`<div class="trial-summary"><strong>試験要約</strong><p>${study.summary}</p></div>`:'';
  const primarySourceName=study.sourceName||`${study.trial} 一次論文`;
  const relatedSourceName=study.source2Name||`${study.trial} 関連論文・補足資料`;
  const registrySourceName=study.source3Name||`${study.trial} ClinicalTrials.gov結果登録`;
  detail.innerHTML=`<span class="eyebrow">CLINICAL TRIAL</span>${study.phase?`<span class="phase-badge">${study.phase}試験</span>`:''}${study.headToHead?'<span class="h2h-badge">HEAD-TO-HEAD 直接比較試験</span>':''}${studies.length>1?`<div class="study-tabs">${studies.map((s,i)=>`<button type="button" data-study="${i}" class="${i===index?'active':''}">${s.phase?`${s.phase}｜`:''}${s.comparisonType?`${s.trial}｜${s.comparisonGroups.join(' vs ')}`:s.trial}</button>`).join('')}</div>`:''}<h2>${study.trial}</h2>${comparison}<p>${study.endpoint}</p>${summary}<div class="trial-method"><dl><div><dt>解析集団</dt><dd>${method.analysis}</dd></div><div><dt>評価項目の定義</dt><dd>${method.definition}</dd></div><div><dt>維持試験デザイン</dt><dd>${method.maintenance}</dd></div><div><dt>欠測値・未補完法</dt><dd>${method.imputation}</dd></div></dl></div><div class="primary-statistics"><strong>主要評価項目の統計情報</strong><dl><div><dt>症例数・解析集団</dt><dd>${study.primaryN}</dd></div><div><dt>95%信頼区間</dt><dd>${study.primaryCI}</dd></div><div><dt>統計学的有意差</dt><dd>${study.primaryP}</dd></div></dl></div>${study.periods.map(([label,active,control])=>`<div class="chart"><b>${label}</b><div class="barrow"><span>${study.activeLabel} ${active}%</span><i style="width:${active}%"></i></div>${control==null?'':`<div class="barrow control${study.headToHead?' h2h-control':''}"${study.headToHead?` style="--control-color:${study.controlColor}"`:''}><span>${study.controlLabel} ${control}%</span><i style="width:${control}%"></i></div>`}</div>`).join('')}<details class="trial-outcomes"><summary>副次評価項目を見る</summary>${secondaryEndpointMarkup(study)}</details><details class="trial-outcomes adverse-outcomes"><summary>有害事象を見る</summary>${adverseEventMarkup(study)}</details><p class="trial-note">主要評価項目と副次評価項目では解析方法・多重性調整が異なる場合があります。有害事象は有効性の解析集団や評価期間と異なる場合があります。導入試験と、導入反応例だけを再ランダム化した維持試験では分母も異なるため、数値を同列に比較せず、一次文献・補足資料も確認してください。</p><div class="trial-sources"><strong>出典</strong><a href="${study.source}" target="_blank" rel="noopener">${primarySourceName}</a>${study.source2?`<a href="${study.source2}" target="_blank" rel="noopener">${relatedSourceName}</a>`:''}${study.source3?`<a href="${study.source3}" target="_blank" rel="noopener">${registrySourceName}</a>`:''}</div>`;
  detail.querySelectorAll('[data-study]').forEach(button=>button.addEventListener('click',()=>renderStudy(ev,Number(button.dataset.study))));
}
trialRoot.addEventListener('click',e=>{
  const card=e.target.closest('[data-drug]'); if(!card)return; const d=drugs.find(x=>x.id===card.dataset.drug),disease=data().disease,ev=evidence[d.id],studies=studiesForDisease(ev,disease);
  dialog.className=`trial-${mechanismGroup(d)}`;
  if(studies.length)renderStudy({studies});
  else detail.innerHTML=`<h2>${d.name}</h2><p>${trialNames[d.id]?.[disease]||'関連試験'}</p><p>${disease}に関連するグラフ用の検証済み数値は次版で追加予定です。</p>`;
  if(typeof dialog.showModal==='function')dialog.showModal();else{dialog.setAttribute('open','');dialog.scrollIntoView({behavior:'smooth',block:'center'})}
});
const closeDialog=()=>typeof dialog.close==='function'?dialog.close():dialog.removeAttribute('open');
document.querySelector('#closeTrial').onclick=closeDialog;
dialog.addEventListener('click',e=>{if(e.target===dialog)closeDialog()});
const versionButton=document.querySelector('#versionButton'),versionDialog=document.querySelector('#versionDialog');
const closeVersionDialog=()=>typeof versionDialog.close==='function'?versionDialog.close():versionDialog.removeAttribute('open');
versionButton.addEventListener('click',()=>{
  if(typeof versionDialog.showModal==='function')versionDialog.showModal();
  else{versionDialog.setAttribute('open','');versionDialog.scrollIntoView({behavior:'smooth',block:'center'})}
});
document.querySelector('#closeVersion').addEventListener('click',closeVersionDialog);
versionDialog.addEventListener('click',e=>{if(e.target===versionDialog)closeVersionDialog()});
const coreReferenceData=[
  ['ECCO感染症ガイドライン（IBD）','重篤感染症、結核、CMVなどの感染症評価','https://academic.oup.com/ecco-jcc/article/20/7/jjag071/8728072'],
  ['日本消化器病学会 IBD診療ガイドライン','UC・CD診療の国内ガイドライン一覧','https://www.jsge.or.jp/committees/guideline/guideline/ibd.html'],
  ['PMDA 医療用医薬品情報検索','各薬剤の最新電子添文を確認','https://www.pmda.go.jp/PmdaSearch/iyakuSearch/'],
  ['ウパダシチニブ電子添文（PMDA）','妊娠、血球減少、肝機能などの安全性条件','https://www.pmda.go.jp/drugs/2025/P20250718001/112130000_30200AMX00027_B100_1.pdf'],
  ['フィルゴチニブ電子添文（PMDA）','感染症、結核、妊娠、腎機能、併用条件','https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/230867_3999053F1023_1_05'],
  ['VDZ-CDST構成・検証資料','CDにおけるベドリズマブ反応可能性の補助評価','https://pmc.ncbi.nlm.nih.gov/articles/PMC9802432/'],
  ['VDZ-CDST外部評価','CDSTの薬剤特異性と適用限界','https://pubmed.ncbi.nlm.nih.gov/33847351/']
];
function renderReferenceLibrary(){
  document.querySelector('#coreReferences').innerHTML=coreReferenceData.map(([title,note,url])=>`<a href="${url}" target="_blank" rel="noopener"><strong>${title}</strong><span>${note}</span></a>`).join('');
  const seen=new Set(),items=[];
  for(const d of drugs){
    const studies=evidence[d.id]?.studies||[evidence[d.id]];
    for(const study of studies.filter(Boolean)){
      for(const [url,label] of [[study.source,study.sourceName||`${study.trial} 一次論文`],[study.source2,study.source2Name||`${study.trial} 関連論文・補足資料`],[study.source3,study.source3Name||`${study.trial} ClinicalTrials.gov結果登録`]]){
        if(!url||seen.has(url))continue;
        seen.add(url);
        items.push({drug:d.name,trial:study.trial,label,url});
      }
    }
  }
  document.querySelector('#trialReferences').innerHTML=items.map(item=>`<a href="${item.url}" target="_blank" rel="noopener"><strong>${item.drug}｜${item.trial}</strong><span>${item.label}</span></a>`).join('');
}
const methodButton=document.querySelector('#methodButton'),methodDialog=document.querySelector('#methodDialog');
const closeMethodDialog=()=>typeof methodDialog.close==='function'?methodDialog.close():methodDialog.removeAttribute('open');
methodButton.addEventListener('click',()=>{
  renderReferenceLibrary();
  if(typeof methodDialog.showModal==='function')methodDialog.showModal();
  else{methodDialog.setAttribute('open','');methodDialog.scrollIntoView({behavior:'smooth',block:'center'})}
});
document.querySelector('#closeMethod').addEventListener('click',closeMethodDialog);
methodDialog.addEventListener('click',e=>{if(e.target===methodDialog)closeMethodDialog()});
document.querySelector('#copyShareUrl').addEventListener('click',async()=>{
  const url=document.querySelector('#shareUrl').href,status=document.querySelector('#copyShareStatus');
  try{
    await navigator.clipboard.writeText(url);
    status.textContent='URLをコピーしました。';
  }catch{
    const input=document.createElement('input');
    input.value=url;document.body.append(input);input.select();
    const copied=document.execCommand('copy');input.remove();
    status.textContent=copied?'URLをコピーしました。':'URLを選択してコピーしてください。';
  }
});
renderUsed(''); renderTrialCards(''); conditional();
