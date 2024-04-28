// pages/api/getIfHasComments.js
import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { listing_id } = req.query; // Extract listing_id from query parameters
      if (!listing_id) {
        return res.status(400).json({ message: 'Listing ID is required' });
      }
      // Check if the listing ID exists in the database
      const result = await query('SELECT EXISTS(SELECT 1 FROM comments WHERE listing_id = $1)', [listing_id]);
      const exists = result.rows[0].exists;
      return res.status(200).json({ exists });
    } catch (error) {
      console.error('Error checking if listing ID exists:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
