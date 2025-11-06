let TAROT_DECK=null;
document.addEventListener('DOMContentLoaded',()=>{
 fetch('tarot_deck.json')
 .then(r=>r.json()).then(data=>{TAROT_DECK=data;init()})
 .catch(e=>alert('โหลด tarot_deck.json ไม่ได้'));
});
function init(){
 const c=document.getElementById('card-selects');
 ['อดีต','ปัจจุบัน','อนาคต'].forEach((label,i)=>{
  const div=document.createElement('div');
  div.className='col';
  const s=document.createElement('select');
  s.id='card'+i;
  const opt=document.createElement('option');
  opt.textContent='-- เลือกไพ่ --';opt.value='';s.appendChild(opt);
  TAROT_DECK.cards.forEach(card=>{
   const o=document.createElement('option');
   o.value=card.id;o.textContent=card.name_en;s.appendChild(o);
  });
  div.innerHTML='<label>'+label+'</label>';
  div.appendChild(s);
  c.appendChild(div);
 });
 document.getElementById('btn-random').onclick=()=>randomize();
 document.getElementById('btn-read').onclick=()=>read();
}
function randomize(){
 const all=TAROT_DECK.cards.sort(()=>Math.random()-0.5).slice(0,3);
 all.forEach((card,i)=>document.getElementById('card'+i).value=card.id);
}
function read(){
 const out=document.getElementById('reading-output');out.innerHTML='';
 for(let i=0;i<3;i++){
  const id=document.getElementById('card'+i).value;
  if(!id)continue;
  const card=TAROT_DECK.cards.find(c=>c.id===id);
  if(!card)continue;
  const m=card.meanings.upright;
  out.innerHTML+=`<div><h3>${card.name_en}</h3><p>${m.general||''}</p></div>`;
 }
}