// Shared World State API
// Tracks kingdom-level events that affect ALL players
// When one player finds a rare Kappax, defeats a threat, or triggers an event,
// it ripples across the world for everyone.

import { query } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return getWorldState(req, res);
  } else if (req.method === "POST") {
    return postWorldEvent(req, res);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

async function getWorldState(req, res) {
  const { kingdomId } = req.query;

  try {
    await ensureTables();

    // Get recent events for a kingdom (or all kingdoms)
    let events;
    if (kingdomId) {
      events = await query(
        `SELECT * FROM world_events
         WHERE kingdom_id = $1
         ORDER BY created_at DESC LIMIT 20`,
        [kingdomId]
      );
    } else {
      events = await query(
        `SELECT * FROM world_events
         ORDER BY created_at DESC LIMIT 50`,
        []
      );
    }

    // Get active players per kingdom (active in last 10 minutes)
    const activePlayers = await query(
      `SELECT kingdom_id, COUNT(*) as player_count,
              json_agg(json_build_object('name', explorer_name, 'role', mermaid_role)) as players
       FROM player_presence
       WHERE last_seen > NOW() - INTERVAL '10 minutes'
       GROUP BY kingdom_id`,
      []
    );

    // Get kingdom modifiers (accumulated effects from player actions)
    const modifiers = await query(
      `SELECT * FROM kingdom_modifiers WHERE expires_at > NOW()`,
      []
    );

    // Get Kappax scarcity (track how many of each have been found globally)
    const kappaxCounts = await query(
      `SELECT kappax_id, COUNT(*) as times_found
       FROM kappax_discoveries
       GROUP BY kappax_id`,
      []
    );

    return res.status(200).json({
      events: events.rows,
      activePlayers: activePlayers.rows,
      modifiers: modifiers.rows,
      kappaxScarcity: kappaxCounts.rows,
    });
  } catch (error) {
    console.error("Error loading world state:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function postWorldEvent(req, res) {
  const { eventType, kingdomId, address, explorerName, data } = req.body;

  if (!eventType || !kingdomId || !address) {
    return res
      .status(400)
      .json({ message: "eventType, kingdomId, and address are required" });
  }

  try {
    await ensureTables();

    // Record the event
    await query(
      `INSERT INTO world_events (event_type, kingdom_id, address, explorer_name, data, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())`,
      [eventType, kingdomId, address, explorerName || "Unknown", JSON.stringify(data || {})]
    );

    // Update player presence
    await query(
      `INSERT INTO player_presence (address, explorer_name, mermaid_role, kingdom_id, last_seen)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (address)
       DO UPDATE SET kingdom_id = $4, last_seen = NOW(), explorer_name = $2, mermaid_role = $3`,
      [address, explorerName || "Unknown", data?.mermaidRole || "nixie", kingdomId]
    );

    // Handle event-specific effects
    switch (eventType) {
      case "kappax_found": {
        // Record Kappax discovery (affects scarcity)
        await query(
          `INSERT INTO kappax_discoveries (kappax_id, address, kingdom_id, discovered_at)
           VALUES ($1, $2, $3, NOW())`,
          [data.kappaxId, address, kingdomId]
        );

        // If it's rare or above, add a kingdom modifier
        if (["rare", "legendary", "mythic"].includes(data.rarity)) {
          await query(
            `INSERT INTO kingdom_modifiers (kingdom_id, modifier_type, modifier_value, description, created_by, expires_at)
             VALUES ($1, 'kappax_stirred', $2, $3, $4, NOW() + INTERVAL '30 minutes')`,
            [
              kingdomId,
              data.rarity === "mythic" ? 3 : data.rarity === "legendary" ? 2 : 1,
              `${explorerName} found a ${data.rarity} ${data.kappaxName}! The waters stir with energy...`,
              address,
            ]
          );
        }
        break;
      }

      case "kingdom_entered": {
        // Just presence update (already handled above)
        break;
      }

      case "danger_event": {
        // A dangerous event occurred — adds a temporary danger modifier
        await query(
          `INSERT INTO kingdom_modifiers (kingdom_id, modifier_type, modifier_value, description, created_by, expires_at)
           VALUES ($1, 'danger_spike', $2, $3, $4, NOW() + INTERVAL '15 minutes')`,
          [
            kingdomId,
            data.severity || 1,
            data.description || "Something dangerous stirs in these waters...",
            address,
          ]
        );
        break;
      }

      case "npc_interaction": {
        // NPC mood/state changes affect future interactions for all players
        await query(
          `INSERT INTO kingdom_modifiers (kingdom_id, modifier_type, modifier_value, description, created_by, expires_at)
           VALUES ($1, 'npc_mood', $2, $3, $4, NOW() + INTERVAL '20 minutes')`,
          [
            kingdomId,
            data.mood || 0,
            data.description || "The NPCs seem different...",
            address,
          ]
        );
        break;
      }
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error posting world event:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function ensureTables() {
  await query(
    `CREATE TABLE IF NOT EXISTS world_events (
      id SERIAL PRIMARY KEY,
      event_type VARCHAR(50) NOT NULL,
      kingdom_id VARCHAR(50) NOT NULL,
      address VARCHAR(255) NOT NULL,
      explorer_name VARCHAR(100),
      data JSONB DEFAULT '{}',
      created_at TIMESTAMP DEFAULT NOW()
    )`,
    []
  );

  await query(
    `CREATE TABLE IF NOT EXISTS player_presence (
      address VARCHAR(255) PRIMARY KEY,
      explorer_name VARCHAR(100),
      mermaid_role VARCHAR(50),
      kingdom_id VARCHAR(50),
      last_seen TIMESTAMP DEFAULT NOW()
    )`,
    []
  );

  await query(
    `CREATE TABLE IF NOT EXISTS kingdom_modifiers (
      id SERIAL PRIMARY KEY,
      kingdom_id VARCHAR(50) NOT NULL,
      modifier_type VARCHAR(50) NOT NULL,
      modifier_value INTEGER DEFAULT 0,
      description TEXT,
      created_by VARCHAR(255),
      expires_at TIMESTAMP NOT NULL
    )`,
    []
  );

  await query(
    `CREATE TABLE IF NOT EXISTS kappax_discoveries (
      id SERIAL PRIMARY KEY,
      kappax_id VARCHAR(100) NOT NULL,
      address VARCHAR(255) NOT NULL,
      kingdom_id VARCHAR(50) NOT NULL,
      discovered_at TIMESTAMP DEFAULT NOW()
    )`,
    []
  );
}
