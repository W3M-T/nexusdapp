import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_NO_SSL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function query(queryText, values) {
  const client = await pool.connect();
  try {
    const result = await client.query(queryText, values);
    return result;
  } finally {
    client.release();
  }
}
