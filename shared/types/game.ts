// ============================================
// TRIBEDEN KINGDOMS - Game Data Types
// ============================================

export type MermaidRole = "delfina" | "nubela" | "brynn" | "shimmer" | "nixie";

export interface Kingdom {
  id: string;
  name: string;
  description: string;
  ruler: string;
  rulerRole: MermaidRole;
  dangerLevel: number; // 1-5
  biome: string;
  color: string;
  connections: string[]; // IDs of connected kingdoms
  kappaxTypes: string[];
}

export interface KappaxEgg {
  id: string;
  name: string;
  element: string;
  rarity: "common" | "uncommon" | "rare" | "legendary" | "mythic";
  kingdom: string;
  description: string;
  imageEmoji: string;
  discovered: boolean;
}

export interface MermaidCharacter {
  role: MermaidRole;
  name: string;
  title: string;
  description: string;
  ability: string;
  color: string;
}

export interface GameLocation {
  kingdomId: string;
  zone: string; // e.g. "throne_room", "deep_waters", "coral_caves"
}

export interface NarratorMessage {
  id: string;
  role: "narrator" | "player" | "npc" | "system";
  content: string;
  timestamp: number;
  npcName?: string;
}

export interface PlayerState {
  address: string;
  currentLocation: GameLocation;
  visitedKingdoms: string[];
  kappaxEggs: KappaxEgg[];
  mermaidRole: MermaidRole;
  storyProgress: number;
  lastNarration: string;
  explorerName: string;
  health: number;
  reputation: Record<string, number>; // kingdom reputation
}

export interface WorldEvent {
  id: number;
  event_type: string;
  kingdom_id: string;
  address: string;
  explorer_name: string;
  data: Record<string, unknown>;
  created_at: string;
}

export interface KingdomModifier {
  id: number;
  kingdom_id: string;
  modifier_type: string;
  modifier_value: number;
  description: string;
  created_by: string;
  expires_at: string;
}

export interface ActivePlayerInfo {
  kingdom_id: string;
  player_count: number;
  players: { name: string; role: string }[];
}

export interface WorldState {
  events: WorldEvent[];
  activePlayers: ActivePlayerInfo[];
  modifiers: KingdomModifier[];
  kappaxScarcity: { kappax_id: string; times_found: number }[];
}

export interface GameState {
  player: PlayerState | null;
  messages: NarratorMessage[];
  isNarrating: boolean;
  kingdoms: Kingdom[];
  characters: MermaidCharacter[];
  availableActions: string[];
  worldState: WorldState | null;
}

// ============================================
// GAME WORLD DATA
// ============================================

export const MERMAID_CHARACTERS: MermaidCharacter[] = [
  {
    role: "delfina",
    name: "Delfina",
    title: "The Queen",
    description:
      "Supreme ruler of the nine Tribeden Kingdoms. Her voice commands the tides and her wisdom holds the realms together.",
    ability: "Commands the tides, grants passage between all kingdoms",
    color: "#FFD700",
  },
  {
    role: "nubela",
    name: "Nubela",
    title: "The Tribeden Guard",
    description:
      "Fierce protector of the kingdom borders. No explorer passes without her judgment.",
    ability: "Shields explorers from danger, unlocks guarded passages",
    color: "#E63946",
  },
  {
    role: "brynn",
    name: "Brynn",
    title: "The Messenger",
    description:
      "Swift courier between realms. She carries secrets, prophecies, and warnings across the deep.",
    ability: "Reveals hidden locations and secret Kappax nesting grounds",
    color: "#457B9D",
  },
  {
    role: "shimmer",
    name: "Shimmer",
    title: "The Kingdom Hunter",
    description:
      "Elite tracker of Kappax eggs. She reads the currents and knows where the rarest creatures hide.",
    ability: "Increases Kappax encounter rate and improves capture chance",
    color: "#2A9D8F",
  },
  {
    role: "nixie",
    name: "Nixie",
    title: "The Unevolved",
    description:
      "All mermaids begin as Nixies — curious, untested, full of potential. Your destiny awaits.",
    ability: "Can evolve into any mermaid role through exploration",
    color: "#A8DADC",
  },
];

export const KINGDOMS: Kingdom[] = [
  {
    id: "abyssia",
    name: "Abyssia",
    description:
      "The deepest kingdom, cloaked in eternal twilight. Bioluminescent creatures light the obsidian halls where Queen Delfina holds court.",
    ruler: "Queen Delfina",
    rulerRole: "delfina",
    dangerLevel: 3,
    biome: "Deep Abyss",
    color: "#1a0a3e",
    connections: ["coralheim", "pelagora"],
    kappaxTypes: ["shadow", "void"],
  },
  {
    id: "coralheim",
    name: "Coralheim",
    description:
      "A sprawling reef kingdom of living coral towers. The markets here trade in Kappax eggs and sunken treasures.",
    ruler: "Reef Warden Tessara",
    rulerRole: "nubela",
    dangerLevel: 1,
    biome: "Coral Reef",
    color: "#FF6B6B",
    connections: ["abyssia", "tidecrest", "luminara"],
    kappaxTypes: ["coral", "fire"],
  },
  {
    id: "tidecrest",
    name: "Tidecrest",
    description:
      "Where ocean meets sky. Massive waves crash against floating stone platforms. Only the brave climb to the Crest.",
    ruler: "Wave Commander Ondara",
    rulerRole: "shimmer",
    dangerLevel: 4,
    biome: "Storm Surge",
    color: "#3C91E6",
    connections: ["coralheim", "glacimera", "shellhaven"],
    kappaxTypes: ["storm", "wind"],
  },
  {
    id: "luminara",
    name: "Luminara",
    description:
      "The kingdom of eternal light. Jellyfish lanterns float through crystal caverns, illuminating ancient mermaid scriptures.",
    ruler: "Beacon Keeper Solara",
    rulerRole: "brynn",
    dangerLevel: 2,
    biome: "Crystal Caverns",
    color: "#A2D729",
    connections: ["coralheim", "verdantia"],
    kappaxTypes: ["light", "crystal"],
  },
  {
    id: "glacimera",
    name: "Glacimera",
    description:
      "Frozen trenches where ice formations hide dormant Kappax. The cold preserves secrets from before the first kingdoms.",
    ruler: "Frost Sentinel Nivara",
    rulerRole: "nubela",
    dangerLevel: 5,
    biome: "Frozen Trench",
    color: "#A8DADC",
    connections: ["tidecrest", "thornveil"],
    kappaxTypes: ["ice", "ancient"],
  },
  {
    id: "verdantia",
    name: "Verdantia",
    description:
      "An underwater jungle where kelp forests grow taller than mountains. Life thrives in abundance here — including Kappax.",
    ruler: "Grove Mother Floressa",
    rulerRole: "shimmer",
    dangerLevel: 2,
    biome: "Kelp Forest",
    color: "#2A9D8F",
    connections: ["luminara", "shellhaven", "pelagora"],
    kappaxTypes: ["nature", "poison"],
  },
  {
    id: "shellhaven",
    name: "Shellhaven",
    description:
      "A peaceful sanctuary built inside a colossal ancient shell. Nixies come here to train and discover their destined roles.",
    ruler: "Mentor Calypsa",
    rulerRole: "delfina",
    dangerLevel: 1,
    biome: "Giant Shell",
    color: "#FA824C",
    connections: ["tidecrest", "verdantia"],
    kappaxTypes: ["spirit", "water"],
  },
  {
    id: "thornveil",
    name: "Thornveil",
    description:
      "Dark waters choked with venomous sea thorns. Outlaws and exiles lurk here, but so do the rarest Kappax.",
    ruler: "The Nameless One",
    rulerRole: "shimmer",
    dangerLevel: 5,
    biome: "Toxic Depths",
    color: "#6B2D5B",
    connections: ["glacimera", "pelagora"],
    kappaxTypes: ["dark", "poison"],
  },
  {
    id: "pelagora",
    name: "Pelagora",
    description:
      "The open-water kingdom — endless blue in every direction. Currents carry travelers and messages between all realms.",
    ruler: "Current Master Meridia",
    rulerRole: "brynn",
    dangerLevel: 3,
    biome: "Open Ocean",
    color: "#1D3557",
    connections: ["abyssia", "verdantia", "thornveil"],
    kappaxTypes: ["water", "wind"],
  },
];

export const KAPPAX_EGGS: KappaxEgg[] = [
  // Abyssia
  { id: "kx_shadow_wisp", name: "Shadow Wisp", element: "shadow", rarity: "common", kingdom: "abyssia", description: "A faintly glowing egg that absorbs light around it.", imageEmoji: "🌑", discovered: false },
  { id: "kx_void_leviathan", name: "Void Leviathan", element: "void", rarity: "mythic", kingdom: "abyssia", description: "Pulses with gravity-warping energy. Legends say it hatches once per millennium.", imageEmoji: "🕳️", discovered: false },
  // Coralheim
  { id: "kx_coral_sprite", name: "Coral Sprite", element: "coral", rarity: "common", kingdom: "coralheim", description: "Warm to the touch and covered in tiny polyps.", imageEmoji: "🪸", discovered: false },
  { id: "kx_flame_fin", name: "Flame Fin", element: "fire", rarity: "rare", kingdom: "coralheim", description: "Steam rises from the cracks in its shell.", imageEmoji: "🔥", discovered: false },
  // Tidecrest
  { id: "kx_storm_caller", name: "Storm Caller", element: "storm", rarity: "rare", kingdom: "tidecrest", description: "Lightning crackles across its surface during high tide.", imageEmoji: "⛈️", discovered: false },
  { id: "kx_gale_serpent", name: "Gale Serpent", element: "wind", rarity: "uncommon", kingdom: "tidecrest", description: "Impossibly light, it floats if released.", imageEmoji: "🌪️", discovered: false },
  // Luminara
  { id: "kx_prism_moth", name: "Prism Moth", element: "light", rarity: "uncommon", kingdom: "luminara", description: "Refracts light into rainbows when held up to any source.", imageEmoji: "🦋", discovered: false },
  { id: "kx_crystal_titan", name: "Crystal Titan", element: "crystal", rarity: "legendary", kingdom: "luminara", description: "Perfectly geometric, it hums a low resonant tone.", imageEmoji: "💎", discovered: false },
  // Glacimera
  { id: "kx_frost_phantom", name: "Frost Phantom", element: "ice", rarity: "rare", kingdom: "glacimera", description: "Never melts. Frost patterns shift across its surface like living art.", imageEmoji: "❄️", discovered: false },
  { id: "kx_ancient_keeper", name: "Ancient Keeper", element: "ancient", rarity: "mythic", kingdom: "glacimera", description: "Contains memories from the first age. Those who touch it see visions.", imageEmoji: "🗿", discovered: false },
  // Verdantia
  { id: "kx_vine_crawler", name: "Vine Crawler", element: "nature", rarity: "common", kingdom: "verdantia", description: "Roots and tendrils slowly grow from tiny cracks.", imageEmoji: "🌿", discovered: false },
  { id: "kx_toxic_bloom", name: "Toxic Bloom", element: "poison", rarity: "uncommon", kingdom: "verdantia", description: "Beautiful but deadly. Handle with extreme care.", imageEmoji: "☠️", discovered: false },
  // Shellhaven
  { id: "kx_spirit_pearl", name: "Spirit Pearl", element: "spirit", rarity: "rare", kingdom: "shellhaven", description: "Glows softly and whispers encouragement to nearby Nixies.", imageEmoji: "🫧", discovered: false },
  { id: "kx_tide_dancer", name: "Tide Dancer", element: "water", rarity: "common", kingdom: "shellhaven", description: "Bobs and weaves with the current as if already alive.", imageEmoji: "💧", discovered: false },
  // Thornveil
  { id: "kx_venom_drake", name: "Venom Drake", element: "dark", rarity: "legendary", kingdom: "thornveil", description: "Barbed shell that oozes a paralytic toxin. Incredibly valuable.", imageEmoji: "🐉", discovered: false },
  { id: "kx_thorn_lurker", name: "Thorn Lurker", element: "poison", rarity: "uncommon", kingdom: "thornveil", description: "Camouflaged perfectly among the sea thorns.", imageEmoji: "🌵", discovered: false },
  // Pelagora
  { id: "kx_current_rider", name: "Current Rider", element: "water", rarity: "common", kingdom: "pelagora", description: "Smooth and hydrodynamic, carried endlessly by the currents.", imageEmoji: "🌊", discovered: false },
  { id: "kx_zephyr_ray", name: "Zephyr Ray", element: "wind", rarity: "legendary", kingdom: "pelagora", description: "Wings unfold from the shell. Some say it can already fly.", imageEmoji: "🦅", discovered: false },
];
