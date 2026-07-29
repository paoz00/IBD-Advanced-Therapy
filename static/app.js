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
 {trial:'VARSITY（UC）',headToHead:true,controlColor:'#b84a4a',endpoint:'VDZとADAの直接比較（%）',activeLabel:'VDZ',controlLabel:'ADA',periods:[['Week 52：臨床的寛解',31.3,22.5],['Week 52：内視鏡的改善',39.7,27.7]],source:'https://www.nejm.org/doi/full/10.1056/NEJMoa1905725'},
 {trial:'GEMINI 2（CD）',endpoint:'CDAI臨床的寛解（%）',periods:[['Week 6：臨床的寛解',14.5,6.8],['Week 52：臨床的寛解（q8w）',39.0,21.6]],source:'https://www.nejm.org/doi/10.1056/NEJMoa1215739'}
]},
UST:{studies:[
 {trial:'UNIFI（UC）',endpoint:'臨床的寛解',periods:[['導入期 Week 8',15.6,5.3],['維持期 Week 44',43.8,24.0]],source:'https://www.nejm.org/doi/10.1056/NEJMoa1900750'},
 {trial:'UNITI-1（CD）',endpoint:'抗TNFα抗体不応・不耐例の導入期臨床的反応（%）',activeLabel:'UST 約6 mg/kg',controlLabel:'プラセボ',periods:[['Week 6：臨床的反応',33.7,21.5]],source:'https://pubmed.ncbi.nlm.nih.gov/27959607/'},
 {trial:'UNITI-2（CD）',endpoint:'既存治療不応・不耐例の導入期臨床的反応（%）',activeLabel:'UST 約6 mg/kg',controlLabel:'プラセボ',periods:[['Week 6：臨床的反応',55.5,28.7]],source:'https://pubmed.ncbi.nlm.nih.gov/27959607/'},
 {trial:'IM-UNITI（CD）',endpoint:'UST導入反応例を再ランダム化した維持期臨床的寛解（%）',activeLabel:'UST',controlLabel:'プラセボ',periods:[['Week 44：臨床的寛解（90 mg q8w）',53.1,35.9],['Week 44：臨床的寛解（90 mg q12w）',48.8,35.9]],significance:['P=0.005','P=0.04'],ci:['群間差17.2ポイント（95% CI 5.3–29.2）','群間差13.0ポイント（95% CI 1.1–24.9）'],source:'https://pubmed.ncbi.nlm.nih.gov/27959607/'},
 {trial:'SEAVUE（CD）',headToHead:true,controlColor:'#b84a4a',endpoint:'生物学的製剤未使用例の直接比較（%）',activeLabel:'UST',controlLabel:'ADA',periods:[['Week 52：臨床的寛解（有意差なし）',65.0,61.0]],source:'https://pubmed.ncbi.nlm.nih.gov/35691323/'}
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
]},
GUS:{studies:[
 {trial:'QUASAR（UC）',endpoint:'静注導入・皮下注維持（%）',periods:[['導入 Week 12：臨床的寛解',23.0,8.0],['維持 Week 44：臨床的寛解（200 mg q4w）',50.0,18.9]],source:'https://pubmed.ncbi.nlm.nih.gov/38104586/'},
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

Object.values(evidence).flatMap(item=>item.studies||[item]).forEach(study=>{
  const [n,ci,p]=globalThis.primaryStatistics?.[study.trial]||['一次論文の主要解析集団を確認してください','一次論文で主要評価項目の95%CIを確認してください','一次論文で統計解析結果を確認してください'];
  Object.assign(study,{primaryN:n,primaryCI:ci,primaryP:p});
});

const form=document.querySelector('#patientForm'),female=document.querySelector('#femaleSection'),pregnancy=document.querySelector('#pregnancyFields'),cd=document.querySelector('#cdGroup'),results=document.querySelector('#results'),usedRoot=document.querySelector('#usedDrugs');
const checks=(root,items)=>root.innerHTML=items.map(([n,l])=>`<label class="check"><input name="${n}" type="checkbox"><span>${l}</span></label>`).join('');
checks(document.querySelector('#riskChecks'),[['steroid','ステロイド依存・抵抗性'],['aza','AZA／6-MP内服中'],['infection','重篤感染症リスク'],['cvRisk','心血管リスク（喫煙・高血圧・糖尿病・心血管疾患既往など）'],['malignancy','悪性腫瘍の既往あり'],['vte','血栓塞栓症リスク'],['adherence','内服アドヒアランス懸念']]);
checks(document.querySelector('#safetyGateChecks'),[['currentSeriousInfection','現在の重篤な感染症'],['activeTb','活動性結核'],['severeCytopenia','重大な血球減少'],['severeLiver','重度肝機能障害'],['strongImmunosuppressant','強力な免疫抑制薬を併用中（AZA／6-MP以外）'],['urgentComplication','脱水・膿瘍・腸閉塞など、治療選択より先に対応が必要'],['asuc','急性重症潰瘍性大腸炎（ASUC）または入院治療が必要']]);
checks(document.querySelector('#cdChecks'),[['cdstSurgery','腸管手術歴あり'],['cdstFistula','瘻孔型病変の既往あり'],['perianal','現在、肛門病変・瘻孔あり']]);
checks(document.querySelector('#optimizationChecks'),[['secondaryLoss','過去に二次無効・効果減弱があった'],['optimizeSame','同じ薬剤で増量・間隔短縮できることを重視'],['rescueOption','追加導入・再導入できることを重視'],['mechanismSwitch','最適化より作用機序変更を優先'],['optimizationNone','どれにも当てはまらない']]);
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
  if(n==='optimizationNone'&&e.target.checked)for(const x of ['secondaryLoss','optimizeSame','rescueOption','mechanismSwitch'])form.elements[x].checked=false;
  if(['secondaryLoss','optimizeSame','rescueOption','mechanismSwitch'].includes(n)&&e.target.checked)form.elements.optimizationNone.checked=false;
  if(n==='mechanismSwitch'&&e.target.checked)for(const x of ['optimizeSame','rescueOption'])form.elements[x].checked=false;
  if(['optimizeSame','rescueOption'].includes(n)&&e.target.checked)form.elements.mechanismSwitch.checked=false;
  if(n==='inductionAny'&&e.target.checked)form.querySelectorAll('input[name="inductionRoute"]').forEach(x=>x.checked=false);
  if(n==='inductionRoute'&&e.target.checked)form.elements.inductionAny.checked=false;
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
    if(f.disease==='UC'&&d.id==='VED')add(0,'Head-to-Head参考情報（VARSITY）：ADAとの直接比較結果。未比較の他薬剤に対する加点には使用しない');
    if(f.disease==='UC'&&d.id==='ADA')add(0,'Head-to-Head参考情報（VARSITY）：VDZとの直接比較結果。未比較の他薬剤に対する減点には使用しない');
    if(f.disease==='CD'&&d.id==='GUS')add(0,'Head-to-Head参考情報（GALAXI 2/3）：USTとの直接比較結果。未比較の他薬剤に対する加点には使用しない');
    if(f.disease==='CD'&&d.id==='UST')add(0,'Head-to-Head参考情報（GALAXI 2/3、SEAVUE）：比較対象薬との結果に限定し、他薬剤との差には換算しない');
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
  VED:{UC:'GEMINI 1・VARSITY［直接比較］',CD:'GEMINI 2'},
  UST:{UC:'UNIFI',CD:'UNITI・IM-UNITI・SEAVUE［直接比較］'},
  RIS:{UC:'INSPIRE・COMMAND',CD:'ADVANCE・MOTIVATE・FORTIFY'},
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
  const responderRerandomized=/ACCENT|CHARM|GEMINI|UNIFI|IM-UNITI|COMMAND|FORTIFY|LUCENT-2|QUASAR|True North|OCTAVE Sustain|SELECTION|U-ACHIEVE Maintenance|U-ENDURE/.test(name);
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
function renderStudy(ev,index=0){
  const studies=ev.studies||[ev],study=studies[index];
  const method=studyMethodology(study);
  detail.innerHTML=`<span class="eyebrow">CLINICAL TRIAL</span>${study.headToHead?'<span class="h2h-badge">HEAD-TO-HEAD 直接比較試験</span>':''}${studies.length>1?`<div class="study-tabs">${studies.map((s,i)=>`<button type="button" data-study="${i}" class="${i===index?'active':''}">${s.headToHead?'H2H｜':''}${s.trial}</button>`).join('')}</div>`:''}<h2>${study.trial}</h2><p>${study.endpoint}</p><div class="trial-method"><dl><div><dt>解析集団</dt><dd>${method.analysis}</dd></div><div><dt>評価項目の定義</dt><dd>${method.definition}</dd></div><div><dt>維持試験デザイン</dt><dd>${method.maintenance}</dd></div><div><dt>欠測値・未補完法</dt><dd>${method.imputation}</dd></div></dl></div><div class="primary-statistics"><strong>主要評価項目の統計情報</strong><dl><div><dt>症例数・解析集団</dt><dd>${study.primaryN}</dd></div><div><dt>95%信頼区間</dt><dd>${study.primaryCI}</dd></div><div><dt>統計学的有意差</dt><dd>${study.primaryP}</dd></div></dl></div>${study.periods.map(([label,active,control])=>`<div class="chart"><b>${label}</b><div class="barrow"><span>${control==null?'継続投与群':study.activeLabel||'実薬'} ${active}%</span><i style="width:${active}%"></i></div>${control==null?'':`<div class="barrow control${study.headToHead?' h2h-control':''}"${study.headToHead?` style="--control-color:${study.controlColor}"`:''}><span>${study.controlLabel||'対照'} ${control}%</span><i style="width:${control}%"></i></div>`}</div>`).join('')}<p class="trial-note">統計情報は各試験の主要評価項目に限定しています。グラフ中の副次評価項目には同じ95%信頼区間・P値を適用できません。導入試験と、導入反応例だけを再ランダム化した維持試験では分母・解析集団が異なるため、数値を同列に比較せず、一次文献・補足資料も確認してください。</p><a href="${study.source}" target="_blank" rel="noopener">一次資料を開く</a>${study.source2?`　<a href="${study.source2}" target="_blank" rel="noopener">関連試験資料を開く</a>`:''}`;
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
      for(const [url,label] of [[study.source,'一次文献'],[study.source2,'関連資料']]){
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
