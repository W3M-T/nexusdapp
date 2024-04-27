// pages/api/deleteAllListingComments.js
import { query } from '../../lib/db';

export default async function handler(req, res) {
  const { listingId } = req.query;

  if (req.method === 'DELETE') {
    try {
      await query('DELETE FROM comments WHERE listing_id = $1', [listingId]);
      return res.status(204).end(); // No content response
    } catch (error) {
      console.error('Error deleting comments:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
