// pages/api/getComments.js
import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const result = await query('SELECT * FROM comments');
      return res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching comments:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
