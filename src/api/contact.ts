
import type { VercelRequest, VercelResponse } from '@vercel/node';

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, position = '', message } = req.body || {};

  if (!name || name.length < 5) return res.status(400).json({ error: 'Invalid name' });
  if (!email || !isEmail(email)) return res.status(400).json({ error: 'Invalid email' });
  if (!message) return res.status(400).json({ error: 'Message required' });

  console.log('[CONTACT]', { name, email, position, message, ts: new Date().toISOString() });

  return res.status(204).end();
}
