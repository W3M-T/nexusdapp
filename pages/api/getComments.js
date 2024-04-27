// pages/api/getComments.js
import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { listing_id } = req.query; // Extract listing_id from query parameters
      if (!listing_id) {
        return res.status(400).json({ message: 'Listing ID is required' });
      }
      // Modify the SQL query to filter comments by listing_id
      const result = await query('SELECT * FROM comments WHERE listing_id = $1', [listing_id]);
      return res.status(200).json(result.rows.reverse());
    } catch (error) {
      console.error('Error fetching comments:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
