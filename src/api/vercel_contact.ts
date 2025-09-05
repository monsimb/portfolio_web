
import type { VercelRequest, VercelResponse } from '@vercel/node';

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return res.status(200).end(); // CORS preflight
  if (req.method === 'GET') return res.status(200).json({ ok: true, msg: 'Contact API is alive' });
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  

  const { name, email, position = '', message } = req.body || {};

  if (!name || name.length < 5) return res.status(400).json({ error: 'Invalid name' });
  if (!email || !isEmail(email)) return res.status(400).json({ error: 'Invalid email' });
  if (!message) return res.status(400).json({ error: 'Message required' });

  console.log('[CONTACT]', { name, email, position, message, ts: new Date().toISOString() });

  return res.status(204).end();
}
