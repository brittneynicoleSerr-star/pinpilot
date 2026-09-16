export async function onRequestPost({ request, env }) {
  if (!env.ANTHROPIC_API_KEY) return new Response(JSON.stringify({error:'ANTHROPIC_API_KEY is not configured.'}),{status:503,headers:{'content-type':'application/json'}});
  let body; try { body=await request.json(); } catch { return new Response(JSON.stringify({error:'Invalid JSON.'}),{status:400,headers:{'content-type':'application/json'}}); }
  const prompt = `You are PinPilot, an Amazon Associates/Pinterest marketing assistant. Do not invent product facts, trends, prices, or compliance approvals. Refine the supplied campaign while preserving upfront disclosure, exactly 3-5 hashtags, rights warnings, and human verification. Return concise labeled sections.\n${JSON.stringify(body)}`;
  const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'content-type':'application/json','x-api-key':env.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01'},body:JSON.stringify({model:env.ANTHROPIC_MODEL||'claude-3-5-sonnet-latest',max_tokens:1800,messages:[{role:'user',content:prompt}]})});
  const data=await r.json(); if(!r.ok) return new Response(JSON.stringify({error:data?.error?.message||'Anthropic request failed.'}),{status:r.status,headers:{'content-type':'application/json'}});
  const text=(data.content||[]).map(x=>x.text||'').join('\n'); return new Response(JSON.stringify({text}),{headers:{'content-type':'application/json'}});
}
