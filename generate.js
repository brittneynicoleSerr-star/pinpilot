export async function onRequestPost({ request, env }) {
  const headers = { 'content-type': 'application/json; charset=utf-8' };
  try {
    if (!env.ANTHROPIC_API_KEY) return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY is not configured in Cloudflare.' }), { status: 503, headers });
    const body = await request.json();
    const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : '';
    if (!prompt || prompt.length > 12000) return new Response(JSON.stringify({ error: 'Provide a prompt up to 12,000 characters.' }), { status: 400, headers });
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: env.ANTHROPIC_MODEL || 'claude-3-5-haiku-latest',
        max_tokens: 2500,
        system: 'You are PinPilot Studio, a Pinterest affiliate content strategist. Do not claim live Amazon or Pinterest data. Produce practical, compliant, concise JSON when requested.',
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await response.json();
    if (!response.ok) return new Response(JSON.stringify({ error: data?.error?.message || 'Anthropic request failed.' }), { status: response.status, headers });
    const text = (data.content || []).filter(x => x.type === 'text').map(x => x.text).join('\n');
    return new Response(JSON.stringify({ text, usage: data.usage || null }), { headers });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server error: ' + (error?.message || 'Unknown error') }), { status: 500, headers });
  }
}
