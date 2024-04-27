import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { listing_id, address, username, text } = req.body;
      if (!listing_id || !address || !text) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      const result = await query(
        'INSERT INTO comments (listing_id, address, username, text) VALUES ($1, $2, $3, $4) RETURNING *',
        [listing_id, address, username, text]
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
