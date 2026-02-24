// Persistent Game State API
// Stores and retrieves player game state from PostgreSQL

import { query } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return getGameState(req, res);
  } else if (req.method === "POST") {
    return saveGameState(req, res);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

async function getGameState(req, res) {
  const { address } = req.query;
  if (!address) {
    return res.status(400).json({ message: "address is required" });
  }

  try {
    // Ensure table exists
    await ensureTable();

    const result = await query(
      "SELECT state FROM game_states WHERE address = $1",
      [address]
    );

    if (result.rows.length === 0) {
      return res.status(200).json({ state: null });
    }

    return res.status(200).json({ state: result.rows[0].state });
  } catch (error) {
    console.error("Error loading game state:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function saveGameState(req, res) {
  const { address, state } = req.body;
  if (!address || !state) {
    return res.status(400).json({ message: "address and state are required" });
  }

  try {
    await ensureTable();

    await query(
      `INSERT INTO game_states (address, state, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (address)
       DO UPDATE SET state = $2, updated_at = NOW()`,
      [address, JSON.stringify(state)]
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error saving game state:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function ensureTable() {
  await query(
    `CREATE TABLE IF NOT EXISTS game_states (
      address VARCHAR(255) PRIMARY KEY,
      state JSONB NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW()
    )`,
    []
  );
}
