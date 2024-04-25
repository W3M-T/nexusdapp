// pages/api/deleteComment.js
import { query } from '../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      await query('DELETE FROM commentss WHERE id = $1', [id]);
      return res.status(204).end(); // No content response
    } catch (error) {
      console.error('Error deleting comment:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
