// GPT-4o-mini Narrator API Route
// Handles AI storytelling for the Tribeden Kingdoms game

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { playerAction, gameContext } = req.body;

  if (!playerAction || !gameContext) {
    return res
      .status(400)
      .json({ message: "playerAction and gameContext are required" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ message: "OpenAI API key not configured" });
  }

  const systemPrompt = buildSystemPrompt(gameContext);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...formatHistory(gameContext.recentMessages || []),
          { role: "user", content: playerAction },
        ],
        max_tokens: 500,
        temperature: 0.85,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenAI API error:", error);
      return res.status(502).json({ message: "Narrator service unavailable" });
    }

    const data = await response.json();
    const narration = data.choices?.[0]?.message?.content || "";

    // Parse structured response from narrator
    const parsed = parseNarratorResponse(narration, gameContext);

    return res.status(200).json(parsed);
  } catch (error) {
    console.error("Narrator error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

function buildSystemPrompt(ctx) {
  const { currentLocation, playerRole, explorerName, kappaxCount, visitedKingdoms, health, reputation, worldState } = ctx;

  // Build world context from shared state
  let worldContext = "";
  if (worldState) {
    const { events, activePlayers, modifiers, kappaxScarcity } = worldState;

    if (activePlayers?.length > 0) {
      const otherPlayers = activePlayers
        .filter((p) => p.kingdom_id === currentLocation?.kingdomId)
        .flatMap((p) => p.players || [])
        .filter((p) => p.name !== explorerName);
      if (otherPlayers.length > 0) {
        worldContext += `\nOTHER EXPLORERS IN THIS KINGDOM: ${otherPlayers.map((p) => `${p.name} (${p.role})`).join(", ")}`;
        worldContext += `\n- Mention their presence naturally. They are real players exploring alongside this one.`;
      }
    }

    if (events?.length > 0) {
      const recentKingdomEvents = events
        .filter((e) => e.kingdom_id === currentLocation?.kingdomId)
        .slice(0, 5);
      if (recentKingdomEvents.length > 0) {
        worldContext += `\nRECENT EVENTS IN THIS KINGDOM:`;
        recentKingdomEvents.forEach((e) => {
          worldContext += `\n- ${e.explorer_name} triggered "${e.event_type}": ${JSON.stringify(e.data)}`;
        });
        worldContext += `\n- Weave these events into the narrative. The world is alive — what others do leaves traces.`;
      }
    }

    if (modifiers?.length > 0) {
      const activeModifiers = modifiers.filter(
        (m) => m.kingdom_id === currentLocation?.kingdomId
      );
      if (activeModifiers.length > 0) {
        worldContext += `\nACTIVE KINGDOM EFFECTS:`;
        activeModifiers.forEach((m) => {
          worldContext += `\n- ${m.modifier_type}: ${m.description}`;
        });
        worldContext += `\n- These effects change the atmosphere and difficulty. Reference them.`;
      }
    }

    if (kappaxScarcity?.length > 0) {
      worldContext += `\nKAPPAX SCARCITY (times found globally):`;
      kappaxScarcity.forEach((k) => {
        worldContext += `\n- ${k.kappax_id}: found ${k.times_found} times`;
      });
      worldContext += `\n- Rarer finds should feel harder. If many have been found, mention the waters feel depleted.`;
    }
  }

  return `You are the Narrator of the Tribeden Kingdoms — a vast underwater world of 9 mermaid-ruled realms. You speak in a dramatic, immersive second-person fantasy style. Keep responses to 2-4 paragraphs max.

WORLD LORE:
- 9 kingdoms: Abyssia (deep abyss), Coralheim (coral reef), Tidecrest (storm surge), Luminara (crystal caverns), Glacimera (frozen trench), Verdantia (kelp forest), Shellhaven (giant shell sanctuary), Thornveil (toxic depths), Pelagora (open ocean)
- Mermaids have 5 roles: Delfina (Queen), Nubela (Guard), Brynn (Messenger), Shimmer (Hunter), Nixie (unevolved)
- Explorers search the treacherous waters for Kappax eggs — powerful creatures sealed in enchanted shells
- Kappax eggs are like Pokémon — they have elements, rarities, and unique powers
- Each kingdom has unique Kappax types that can only be found there
- THIS IS A LIVING WORLD: Multiple explorers roam simultaneously. Their actions leave traces — disturbed nests, warned NPCs, shifted currents.

CURRENT STATE:
- Explorer: "${explorerName || "Unknown Explorer"}"
- Mermaid Role: ${playerRole || "Nixie"}
- Location: ${currentLocation?.zone || "entrance"} of ${currentLocation?.kingdomId || "Shellhaven"}
- Health: ${health || 100}/100
- Kappax Eggs Found: ${kappaxCount || 0}
- Kingdoms Visited: ${(visitedKingdoms || []).join(", ") || "None yet"}
- Reputation: ${JSON.stringify(reputation || {})}
${worldContext}

RULES:
1. Always maintain awareness of the player's current location
2. Describe the environment vividly when they move
3. When they search for Kappax eggs, sometimes they find one (30% chance — you decide based on drama). If others recently found eggs here, make it harder.
4. NPCs should be memorable and reference the lore characters (Delfina, Nubela, Brynn, Shimmer)
5. Danger should feel real — reference the kingdom's danger level and any active danger modifiers
6. Reference other players when present — they are fellow explorers, not NPCs
7. End each response with 2-4 suggested actions in this exact format:
   [ACTIONS: action1 | action2 | action3]
8. If a Kappax egg is found, include it in this format:
   [KAPPAX_FOUND: egg_id]
   Where egg_id matches one from the kingdom's available eggs
9. If the player moves to a new zone or kingdom, include:
   [LOCATION: kingdom_id:zone_name]
10. If the player's health changes, include:
    [HEALTH: new_value]

Available Kappax eggs in current kingdom based on location:
${getKingdomEggs(currentLocation?.kingdomId)}

Keep the adventure exciting, mysterious, and always moving forward. The world is shared — make it feel alive.`;
}

function getKingdomEggs(kingdomId) {
  const eggs = {
    abyssia: "kx_shadow_wisp (common, shadow), kx_void_leviathan (mythic, void)",
    coralheim: "kx_coral_sprite (common, coral), kx_flame_fin (rare, fire)",
    tidecrest: "kx_storm_caller (rare, storm), kx_gale_serpent (uncommon, wind)",
    luminara: "kx_prism_moth (uncommon, light), kx_crystal_titan (legendary, crystal)",
    glacimera: "kx_frost_phantom (rare, ice), kx_ancient_keeper (mythic, ancient)",
    verdantia: "kx_vine_crawler (common, nature), kx_toxic_bloom (uncommon, poison)",
    shellhaven: "kx_spirit_pearl (rare, spirit), kx_tide_dancer (common, water)",
    thornveil: "kx_venom_drake (legendary, dark), kx_thorn_lurker (uncommon, poison)",
    pelagora: "kx_current_rider (common, water), kx_zephyr_ray (legendary, wind)",
  };
  return eggs[kingdomId] || eggs.shellhaven;
}

function formatHistory(messages) {
  return messages.slice(-6).map((msg) => ({
    role: msg.role === "player" ? "user" : "assistant",
    content: msg.content,
  }));
}

function parseNarratorResponse(text, ctx) {
  const result = {
    narration: text,
    actions: [],
    kappaxFound: null,
    newLocation: null,
    healthChange: null,
  };

  // Extract actions
  const actionsMatch = text.match(/\[ACTIONS:\s*(.+?)\]/);
  if (actionsMatch) {
    result.actions = actionsMatch[1].split("|").map((a) => a.trim());
    result.narration = result.narration.replace(actionsMatch[0], "").trim();
  }

  // Extract Kappax find
  const kappaxMatch = text.match(/\[KAPPAX_FOUND:\s*(.+?)\]/);
  if (kappaxMatch) {
    result.kappaxFound = kappaxMatch[1].trim();
    result.narration = result.narration.replace(kappaxMatch[0], "").trim();
  }

  // Extract location change
  const locationMatch = text.match(/\[LOCATION:\s*(.+?)\]/);
  if (locationMatch) {
    const parts = locationMatch[1].trim().split(":");
    result.newLocation = {
      kingdomId: parts[0],
      zone: parts[1] || "entrance",
    };
    result.narration = result.narration.replace(locationMatch[0], "").trim();
  }

  // Extract health change
  const healthMatch = text.match(/\[HEALTH:\s*(\d+)\]/);
  if (healthMatch) {
    result.healthChange = parseInt(healthMatch[1]);
    result.narration = result.narration.replace(healthMatch[0], "").trim();
  }

  // Default actions if none provided
  if (result.actions.length === 0) {
    const kingdom = ctx.currentLocation?.kingdomId || "shellhaven";
    result.actions = [
      "Search for Kappax eggs",
      "Explore deeper",
      `Talk to a local mermaid`,
      "Check your inventory",
    ];
  }

  return result;
}
