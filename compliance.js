export async function onRequestPost({ request }) {
 const b=await request.json().catch(()=>({})); const url=String(b.url||'');
 const checks=[
  {id:'amazon-domain',label:'Direct Amazon domain',pass:/amazon\./i.test(url)},
  {id:'no-cloak',label:'No cloaking or unapproved shortener',pass:!/(bit\.ly|tinyurl|t\.co|goo\.gl|ow\.ly)/i.test(url)},
  {id:'disclosure',label:'Upfront affiliate disclosure',pass:/amazon associate|qualifying purchases/i.test(String(b.description||''))},
  {id:'claims',label:'Product claims require verification',pass:false,warning:true},
  {id:'images',label:'Use licensed/original visual assets',pass:false,warning:true}
 ];
 return new Response(JSON.stringify({ok:true,checks,disclaimer:'Compliance output is a review aid, not legal advice. Confirm current Amazon, FTC and Pinterest rules before publishing.'}),{headers:{'content-type':'application/json'}});
}
