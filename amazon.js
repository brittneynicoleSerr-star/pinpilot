export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => ({}));
  const url = String(body.url || '').trim();
  const m = url.match(/(?:dp|gp\/product|product)\/([A-Z0-9]{10})(?:[/?]|$)/i) || url.match(/\b([A-Z0-9]{10})\b/i);
  if (!/^https?:\/\/(?:www\.)?amazon\.[^/]+\//i.test(url) || !m) return new Response(JSON.stringify({ok:false,error:'Enter a valid Amazon product URL containing an ASIN.'}),{status:400,headers:{'content-type':'application/json'}});
  const asin=m[1].toUpperCase();
  return new Response(JSON.stringify({ok:true,asin,source:'url',notice:'Live product facts require an authorized Amazon Product Advertising API connection. No scraping is performed.'}),{headers:{'content-type':'application/json'}});
}
