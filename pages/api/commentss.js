import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ message: 'Text is required' });
      }
      const result = await query(
        'INSERT INTO commentss (text) VALUES ($1) RETURNING *',
        [text]
      );
      return res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating comment:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
