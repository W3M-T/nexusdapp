import { useState, useEffect, useRef, useCallback } from "react";
import {
    Box, Flex, VStack, HStack, Text, Input, Button, Heading,
    Badge, Spinner, SimpleGrid, IconButton, Tooltip,
    Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent,
    DrawerCloseButton, useDisclosure, Progress, Divider, useToast,
} from "@chakra-ui/react";
import { MainLayout } from "../../shared/components/ui/MainLayout";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/core/useRedux";
import { fetchUserStaked } from "../../shared/redux/reduxAsyncFuncs/poolsFuncs";
import { selectUserStaked } from "../../shared/redux/slices/pools";
import { selectUserAddress } from "../../shared/redux/slices/settings";
import axios from "axios";

// ─── CONSTANTS ─────────────────────────────────────────────
const ACCESS_PASSWORD = "13579";

const FACTIONS = [
  { id: "samu", name: "Samu", archetype: "Warriors", color: "red.400", desc: "Cunning warriors renowned for strategic prowess.", nester: "Battle Fortress", bonus: "+20% Combat" },
  { id: "wingle", name: "Wingle", archetype: "Scouts", color: "green.400", desc: "Swift and agile, employing aerial mastery and heightened senses.", nester: "Sky Glider", bonus: "+20% Speed" },
  { id: "ani", name: "Ani", archetype: "Sorcerers", color: "purple.400", desc: "An order of sorcerers harnessing magical prowess and diplomacy.", nester: "Arcane Vessel", bonus: "+20% Magic" },
  { id: "searcho", name: "Searcho", archetype: "Hunters", color: "blue.400", desc: "Skilled hunters adept at traversing perilous waters.", nester: "Endurance Cruiser", bonus: "+20% Exploration" },
  { id: "inglo", name: "Inglo", archetype: "Infiltrators", color: "gray.400", desc: "Masters of disguise and shapeshifting abilities.", nester: "Shadow Ship", bonus: "+20% Stealth" },
  { id: "gamezoo", name: "Gamezoo", archetype: "Strategists", color: "orange.400", desc: "View everything as a game. Strategic planners and puzzle solvers.", nester: "Puzzle Engine", bonus: "+20% Analysis" },
  ];

const LOCATIONS = [
  { id: "openshore", name: "The Openshore", desc: "A vibrant hub where all six factions coexist.", connections: ["aqualuna", "oceancrest", "serenitide", "market_of_nomad"] },
  { id: "aqualuna", name: "Aqualuna", desc: "A land of eternal twilight with luminescent creatures.", connections: ["openshore", "oceancrest", "pearlhaven"] },
  { id: "oceancrest", name: "Oceancrest", desc: "The pulsing heart of the Water World.", connections: ["openshore", "aqualuna", "aquaria", "abyssia"] },
  { id: "serenitide", name: "Serenitide", desc: "A sanctuary where tides mark time.", connections: ["openshore", "pearlhaven", "ebbshore"] },
  { id: "aquaria", name: "Aquaria", desc: "Renowned for mesmerizing architecture.", connections: ["oceancrest", "tempestria", "celestialscape"] },
  { id: "abyssia", name: "Abyssia", desc: "Shrouded in perpetual darkness, rich in minerals.", connections: ["oceancrest", "tempestria"] },
  { id: "tempestria", name: "Tempestria", desc: "Land of wild storms, a warrior training ground.", connections: ["aquaria", "abyssia", "celestialscape"] },
  { id: "pearlhaven", name: "Pearlhaven", desc: "A tranquil haven for healing and rejuvenation.", connections: ["aqualuna", "serenitide", "ebbshore"] },
  { id: "ebbshore", name: "Ebbshore", desc: "A place of quiet reflection at the realm edges.", connections: ["serenitide", "pearlhaven", "celestialscape"] },
  { id: "celestialscape", name: "Celestialscape", desc: "Ethereal realm where reality and dreams merge.", connections: ["aquaria", "tempestria", "ebbshore"] },
  { id: "market_of_nomad", name: "Market of Nomad", desc: "Bustling hub of trade and exchange.", connections: ["openshore", "aqualuna", "oceancrest"] },
  ];

interface GameMessage {
    id: string;
    sender: "narrator" | "npc" | "player" | "system";
    senderName?: string;
    text: string;
}

interface GameState {
    playerName: string;
    faction: string;
    currentLocation: string;
    health: number;
    xp: number;
    mermaidTokens: number;
    inventory: any[];
    weapons: any[];
    tools: any[];
    ship: any;
    level: number;
}

// ─── PASSWORD GATE ─────────────────────────────────────────
const PasswordGate = ({ onSuccess }: { onSuccess: () => void }) => {
    const [pw, setPw] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = () => {
          if (pw === ACCESS_PASSWORD) {
                  sessionStorage.setItem("nexus_game_auth", "true");
                  onSuccess();
          } else {
                  setError(true);
                  setPw("");
          }
    };

    return (
          <Flex justify="center" align="center" minH="60vh">
                <Box maxW="400px" w="100%" p={8} borderRadius="xl" bg="rgba(0,20,40,0.9)" border="1px solid" borderColor="cyan.800" textAlign="center">
                        <Heading size="md" color="cyan.300" mb={2}>Nexus Game</Heading>
                        <Badge colorScheme="orange" mb={4}>ALPHA - Under Development</Badge>
                        <Text color="whiteAlpha.700" fontSize="sm" mb={6}>
                                  This game is currently in development. Enter the access code to continue.
                        </Text>
                        <Input
                                    placeholder="Access code"
                                    type="password"
                                    value={pw}
                                    onChange={(e) => { setPw(e.target.value); setError(false); }}
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                    bg="rgba(0,30,60,0.8)"
                                    border="1px solid"
                                    borderColor={error ? "red.400" : "cyan.800"}
                                    color="white"
                                    mb={3}
                                    textAlign="center"
                                    _focus={{ borderColor: "cyan.500" }}
                                  />
                  {error && <Text color="red.400" fontSize="xs" mb={2}>Incorrect access code</Text>}
                        <Button colorScheme="cyan" w="100%" onClick={handleSubmit}>Enter</Button>
                </Box>
          </Flex>
        );
};

// ─── STAKING GATE ──────────────────────────────────────────
const StakingGate = ({ isConnected, loading }: { isConnected: boolean; loading: boolean }) => {
    if (loading) {
          return (
                  <Flex justify="center" align="center" minH="50vh">
                          <VStack spacing={4}>
                                    <Spinner size="xl" color="cyan.400" thickness="4px" />
                                    <Text color="whiteAlpha.700">Checking your staked Explorers...</Text>
                          </VStack>
                  </Flex>
                );
    }
  
    return (
          <Box maxW="600px" mx="auto" mt={8} p={8} borderRadius="xl" bg="rgba(0,20,40,0.8)" border="1px solid" borderColor="cyan.800" textAlign="center">
                <Heading size="lg" bgGradient="linear(to-r, cyan.300, blue.400)" bgClip="text" mb={4}>
                        Explorer's Rift
                </Heading>
                <Text color="whiteAlpha.800" fontSize="md" mb={6}>
                        Openshore awaits, but first you need a staked Explorer to begin your journey through the Water World.
                </Text>
                <Box p={4} borderRadius="lg" bg="rgba(0,40,80,0.5)" border="1px dashed" borderColor="cyan.600" mb={6}>
                        <Text color="cyan.200" fontWeight="bold" mb={2}>Requirements:</Text>
                        <Text color="whiteAlpha.700" fontSize="sm">1. Connect your MultiversX wallet</Text>
                        <Text color="whiteAlpha.700" fontSize="sm">2. Stake at least one Explorer NFT</Text>
                        <Text color="whiteAlpha.700" fontSize="sm">3. Choose your faction and set sail</Text>
                </Box>
            {!isConnected ? (
                    <Text color="orange.300" fontSize="sm">Connect your wallet using the button above</Text>
                  ) : (
                    <Text color="orange.300" fontSize="sm">No staked Explorer NFTs found. Visit the Staking page to stake your Explorer.</Text>
                )}
                <Box mt={6}>
                        <Text color="whiteAlpha.500" fontSize="xs">Factions: Wingle - Samu - Ani - Inglo - Searcho - Gamezoo</Text>
                </Box>
          </Box>
        );
};

// ─── FACTION SELECT ────────────────────────────────────────
const FactionSelect = ({ onSelect }: { onSelect: (id: string) => void }) => (
    <VStack spacing={6} p={4} maxW="800px" mx="auto">
        <Heading size="md" bgGradient="linear(to-r, cyan.300, blue.400)" bgClip="text">Choose Your Faction</Heading>
        <Text color="whiteAlpha.700" textAlign="center" fontSize="sm">
              Your faction determines your starting abilities, Nester ship, and approach to the Water World.
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
          {FACTIONS.map((f) => (
              <Box
                          key={f.id} p={4} borderRadius="lg" bg="rgba(0,20,40,0.8)" border="1px solid" borderColor={f.color}
                          _hover={{ borderColor: "cyan.300", transform: "translateY(-2px)", transition: "all 0.2s" }}
                          cursor="pointer" onClick={() => onSelect(f.id)}
                        >
                        <HStack mb={2}>
                                    <Heading size="sm" color={f.color}>{f.name}</Heading>
                                    <Badge fontSize="xs">{f.archetype}</Badge>
                        </HStack>
                        <Text color="whiteAlpha.700" fontSize="xs" mb={1}>{f.desc}</Text>
                        <Text color="whiteAlpha.500" fontSize="xs">Nester: {f.nester} | {f.bonus}</Text>
              </Box>
            ))}
        </SimpleGrid>
    </VStack>
  );

// ─── GAME SHELL ────────────────────────────────────────────
const GameShell = ({ explorer, playerAddress }: { explorer: any; playerAddress: string }) => {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [messages, setMessages] = useState<GameMessage[]>([]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showFactionSelect, setShowFactionSelect] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const addMsg = useCallback((sender: GameMessage["sender"], text: string, senderName?: string) => {
          setMessages((prev) => [...prev, { id: `${Date.now()}-${Math.random()}`, sender, senderName, text }]);
    }, []);
  
    useEffect(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
  
    useEffect(() => {
          // Initialize - check if player exists in localStorage
          const saved = localStorage.getItem(`nexus_game_${playerAddress}`);
          if (saved) {
                  const parsed = JSON.parse(saved);
                  setGameState(parsed);
                  addMsg("narrator", `Welcome back, ${parsed.playerName}! You stand in ${LOCATIONS.find(l => l.id === parsed.currentLocation)?.name || parsed.currentLocation}. What would you like to do?`, "The Sage");
          } else {
                  setShowFactionSelect(true);
                  addMsg("narrator", "Welcome to the Water World, brave Explorer! Before your journey begins, choose your faction. Each possesses unique traits that will shape your adventure...", "The Sage");
          }
    }, [playerAddress, addMsg]);
  
    const saveGame = (state: GameState) => {
          localStorage.setItem(`nexus_game_${playerAddress}`, JSON.stringify(state));
    };
  
    const handleFactionSelect = (factionId: string) => {
          const faction = FACTIONS.find(f => f.id === factionId)!;
          const newState: GameState = {
                  playerName: explorer?.name || "Explorer",
                  faction: faction.name,
                  currentLocation: "openshore",
                  health: 100,
                  xp: 0,
                  mermaidTokens: 10,
                  inventory: [{ name: "Tracheo's First Letter", type: "quest", quantity: 1 }],
                  weapons: [{ name: "Driftwood Blade", attack: 10, defense: 5 }],
                  tools: [{ name: "Basic Compass", usefulScore: 15 }],
                  ship: { name: `${faction.name} Nester`, type: faction.nester },
                  level: 1,
          };
          setGameState(newState);
          saveGame(newState);
          setShowFactionSelect(false);
          addMsg("narrator", `Excellent choice! You have joined the ${faction.name} faction - ${faction.archetype}. Your ${faction.nester} awaits at the Openshore docks. You start with a Driftwood Blade and a Basic Compass. The Water World stretches before you...\n\nYou stand at The Openshore, a vibrant hub where all six factions coexist. Faction houses line the shore, ships bob on bright blue waters, and the air crackles with anticipation. What would you like to do?`, "The Sage");
    };
  
    const handleTravel = (locationId: string) => {
          if (!gameState) return;
          const dest = LOCATIONS.find(l => l.id === locationId);
          if (!dest) return;
          const current = LOCATIONS.find(l => l.id === gameState.currentLocation);
          if (!current?.connections.includes(locationId)) {
                  addMsg("system", "You cannot travel there from your current location.");
                  return;
          }
          const updated = { ...gameState, currentLocation: locationId, xp: gameState.xp + 5 };
          setGameState(updated);
          saveGame(updated);
          addMsg("narrator", `Your ${gameState.ship?.name || "Nester"} cuts through the waves as you sail toward ${dest.name}.\n\n${dest.desc}\n\nYou have arrived at ${dest.name}. (+5 XP)`, "The Sage");
    };
  
    const processAction = async (action: string) => {
          if (!gameState) return;
          const lower = action.toLowerCase();
          const currentLoc = LOCATIONS.find(l => l.id === gameState.currentLocation);
      
          // Look around
          if (lower.includes("look") || lower.includes("examine") || lower.includes("observe")) {
                  addMsg("narrator", `You survey ${currentLoc?.name || "your surroundings"}. ${currentLoc?.desc || ""}\n\nYou can travel to: ${currentLoc?.connections.map(c => LOCATIONS.find(l => l.id === c)?.name).join(", ")}.\n\nThe salty breeze carries whispers of adventure. Various explorers from different factions go about their business.`, "The Sage");
                  return;
          }
      
          // Check inventory
          if (lower.includes("inventory") || lower.includes("bag") || lower.includes("items")) {
                  const inv = gameState.inventory.map(i => `  - ${i.name} (x${i.quantity || 1})`).join("\n");
                  const weaps = gameState.weapons.map(w => `  - ${w.name} (ATK:${w.attack} DEF:${w.defense})`).join("\n");
                  const tls = gameState.tools.map(t => `  - ${t.name} (Useful:${t.usefulScore})`).join("\n");
                  addMsg("system", `=== Inventory ===\nShip: ${gameState.ship?.name || "None"}\n\nWeapons:\n${weaps || "  None"}\n\nTools:\n${tls || "  None"}\n\nItems:\n${inv || "  None"}\n\nMermaid Tokens: ${gameState.mermaidTokens}`);
                  return;
          }
      
          // Battle
          if (lower.includes("battle") || lower.includes("fight") || lower.includes("attack")) {
                  const monsters = [
                    { name: "Reef Stalker", attack: 15, defense: 20, xp: 25 },
                    { name: "Moe Slime", attack: 5, defense: 5, xp: 10 },
                    { name: "Coral Serpent", attack: 20, defense: 15, xp: 35 },
                    { name: "Storm Eel", attack: 25, defense: 10, xp: 30 },
                          ];
                  const monster = monsters[Math.floor(Math.random() * monsters.length)];
                  const weapon = gameState.weapons[0];
                  const playerPower = weapon ? (weapon.attack + weapon.defense) / 2 : 5;
                  const monsterPower = (monster.attack + monster.defense) / 2;
                  const won = playerPower + Math.random() * 10 >= monsterPower;
            
                  if (won) {
                            const tokenReward = Math.floor(Math.random() * 3) + 1;
                            const updated = {
                                        ...gameState,
                                        xp: gameState.xp + monster.xp,
                                        mermaidTokens: gameState.mermaidTokens + tokenReward,
                            };
                            setGameState(updated);
                            saveGame(updated);
                            addMsg("narrator", `A wild ${monster.name} appears! (ATK:${monster.attack} DEF:${monster.defense})\n\nYou draw your ${weapon?.name || "fists"} and engage!\n\nVICTORY! You defeated the ${monster.name}!\n+${monster.xp} XP, +${tokenReward} Mermaid Tokens`, "The Sage");
                  } else {
                            const dmg = Math.floor(Math.random() * 15) + 5;
                            const updated = {
                                        ...gameState,
                                        health: Math.max(0, gameState.health - dmg),
                            };
                            setGameState(updated);
                            saveGame(updated);
                            addMsg("narrator", `A wild ${monster.name} appears! (ATK:${monster.attack} DEF:${monster.defense})\n\nYou draw your ${weapon?.name || "fists"} and engage!\n\nDEFEAT! The ${monster.name} overwhelms you.\n-${dmg} HP`, "The Sage");
                  }
                  return;
          }
      
          // Rest / Heal
          if (lower.includes("rest") || lower.includes("heal") || lower.includes("sleep")) {
                  const healed = Math.min(100, gameState.health + 25);
                  const updated = { ...gameState, health: healed };
                  setGameState(updated);
                  saveGame(updated);
                  addMsg("narrator", `You find a quiet spot and rest. The sound of waves soothes your weary body.\n\nHealth restored to ${healed}/100.`, "The Sage");
                  return;
          }
      
          // Explore cave
          if (lower.includes("cave") || lower.includes("explore") || lower.includes("search")) {
                  const found = Math.random() > 0.4;
                  if (found) {
                            const tokens = Math.floor(Math.random() * 5) + 1;
                            const updated = { ...gameState, mermaidTokens: gameState.mermaidTokens + tokens, xp: gameState.xp + 10 };
                            setGameState(updated);
                            saveGame(updated);
                            addMsg("narrator", `You discover a hidden cave beneath the coral. Inside, you find a cache of ${tokens} Mermaid Tokens and ancient carvings that hint at the location of the KappaX eggs.\n\n+${tokens} Mermaid Tokens, +10 XP`, "The Sage");
                  } else {
                            addMsg("narrator", "You search the area thoroughly but find nothing of note. The Water World guards its secrets well. Perhaps try a different location?", "The Sage");
                  }
                  return;
          }
      
          // Talk to NPCs
          if (lower.includes("talk") || lower.includes("speak") || lower.includes("ask")) {
                  const npcs = [
                    { name: "A weathered Searcho trader", dialogue: "The deeper waters hold the rarest treasures, friend. But beware the Nubela guards - they serve Queen Delfina directly." },
                    { name: "An Ani sorcerer", dialogue: "Tracheo's letters speak of a path through the Tribedens. Each one holds a piece of the puzzle to finding the KappaX eggs." },
                    { name: "A Gamezoo strategist", dialogue: "Everything in the Water World follows a pattern. The mermaid tribedens, the monster movements, even the currents. Study them and you'll find your advantage." },
                    { name: "A grizzled Samu warrior", dialogue: "Strength alone won't get you the KappaX eggs. I've seen the mightiest fall to the Lurking Behemoth. You need allies and strategy." },
                          ];
                  const npc = npcs[Math.floor(Math.random() * npcs.length)];
                  addMsg("npc", `${npc.name} approaches you:\n\n"${npc.dialogue}"`, npc.name);
                  const updated = { ...gameState, xp: gameState.xp + 2 };
                  setGameState(updated);
                  saveGame(updated);
                  return;
          }
      
          // Sage guidance
          if (lower.includes("sage") || lower.includes("guide") || lower.includes("help")) {
                  addMsg("narrator", `The Sage speaks:\n\nYou can do many things in the Water World:\n- "look around" to survey your location\n- "travel" to see and visit nearby locations\n- "battle" to fight Water Monsters\n- "explore" or "search" to discover hidden caves and treasures\n- "talk" to interact with NPCs\n- "rest" to restore health\n- "inventory" to check your items\n\nYour goal: navigate the Tribedens, gather Mermaid Tokens, decipher Tracheo's clues, and find the legendary KappaX eggs!`, "The Sage");
                  return;
          }
      
          // Default narrative response
          addMsg("narrator", `The Water World responds to your action. The waters ripple with possibility around ${currentLoc?.name || "you"}.\n\nTry: "look around", "explore", "battle", "talk", "rest", or ask the sage for guidance.`, "The Sage");
    };
  
    const handleSend = () => {
          if (!inputText.trim() || isLoading) return;
          const text = inputText.trim();
          setInputText("");
          addMsg("player", text, gameState?.playerName || "Explorer");
          setIsLoading(true);
          setTimeout(() => {
                  processAction(text);
                  setIsLoading(false);
          }, 500 + Math.random() * 500);
    };
  
    if (showFactionSelect) {
          return <FactionSelect onSelect={handleFactionSelect} />;
    }
  
    const currentLoc = LOCATIONS.find(l => l.id === gameState?.currentLocation);
    const reachable = currentLoc?.connections || [];
  
    return (
          <Box maxW="900px" mx="auto" mt={2} px={2}>
            {/* Stats Bar */}
            {gameState && (
                    <Box bg="rgba(0,15,30,0.9)" border="1px solid" borderColor="cyan.900" borderRadius="lg" p={3} mb={3}>
                              <Flex justify="space-between" align="center" flexWrap="wrap" gap={2}>
                                          <HStack spacing={3}>
                                                        <Text color="cyan.300" fontWeight="bold" fontSize="sm">{gameState.playerName}</Text>
                                                        <Badge colorScheme="purple" fontSize="xs">{gameState.faction}</Badge>
                                                        <Badge colorScheme="yellow" fontSize="xs">Lv.{gameState.level}</Badge>
                                          </HStack>
                                          <HStack spacing={4}>
                                                        <Box><Text color="whiteAlpha.600" fontSize="xs">HP</Text><Progress value={gameState.health} max={100} size="xs" colorScheme="red" w="60px" borderRadius="full" /></Box>
                                                        <Box><Text color="whiteAlpha.600" fontSize="xs">XP</Text><Text color="yellow.300" fontSize="xs" fontWeight="bold">{gameState.xp}</Text></Box>
                                                        <Box><Text color="whiteAlpha.600" fontSize="xs">Tokens</Text><Text color="cyan.300" fontSize="xs" fontWeight="bold">{gameState.mermaidTokens}</Text></Box>
                                          </HStack>
                              </Flex>
                    </Box>
                )}
          
            {/* Location Bar */}
            {gameState && (
                    <Box bg="rgba(0,15,30,0.9)" border="1px solid" borderColor="blue.900" borderRadius="lg" p={3} mb={3}>
                              <Flex justify="space-between" align="center" flexWrap="wrap" gap={2}>
                                          <Text color="cyan.200" fontSize="sm" fontWeight="bold">{currentLoc?.name || gameState.currentLocation}</Text>
                                          <HStack spacing={1} flexWrap="wrap">
                                            {reachable.map((locId) => {
                                      const loc = LOCATIONS.find(l => l.id === locId);
                                      return (
                                                          <Button key={locId} size="xs" variant="outline" colorScheme="blue" onClick={() => handleTravel(locId)} isDisabled={isLoading}>
                                                            {loc?.name || locId}
                                                          </Button>
                                                        );
                    })}
                                          </HStack>
                              </Flex>
                    </Box>
                )}
          
            {/* Messages Area */}
                <Box
                          bg="rgba(0,10,25,0.9)" border="1px solid" borderColor="cyan.900" borderRadius="lg"
                          h={{ base: "350px", md: "400px" }} overflowY="auto" p={4} mb={3}
                          css={{ "&::-webkit-scrollbar": { width: "6px" }, "&::-webkit-scrollbar-thumb": { bg: "rgba(0,200,255,0.3)", borderRadius: "3px" } }}
                        >
                        <VStack spacing={3} align="stretch">
                          {messages.map((msg) => (
                                      <Box
                                                      key={msg.id} p={3} borderRadius="md"
                                                      bg={msg.sender === "player" ? "rgba(0,100,200,0.15)" : msg.sender === "narrator" ? "rgba(0,50,100,0.2)" : msg.sender === "npc" ? "rgba(50,0,100,0.2)" : "rgba(100,100,0,0.15)"}
                                                      borderLeft="3px solid"
                                                      borderColor={msg.sender === "player" ? "blue.400" : msg.sender === "narrator" ? "cyan.400" : msg.sender === "npc" ? "purple.400" : "yellow.400"}
                                                    >
                                        {msg.senderName && (
                                                                      <Text fontSize="xs" fontWeight="bold" color={msg.sender === "player" ? "blue.300" : msg.sender === "narrator" ? "cyan.300" : "purple.300"} mb={1}>
                                                                        {msg.senderName}
                                                                      </Text>
                                                    )}
                                                    <Text color="whiteAlpha.900" fontSize="sm" whiteSpace="pre-wrap">{msg.text}</Text>
                                      </Box>
                                    ))}
                          {isLoading && <Text color="cyan.400" fontSize="sm" fontStyle="italic">The Sage consults the waters...</Text>}
                                  <div ref={messagesEndRef} />
                        </VStack>
                </Box>
          
            {/* Input */}
                <HStack spacing={2} mb={2}>
                        <Input
                                    placeholder="What do you do? (look around, explore, battle, talk...)"
                                    value={inputText} onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    bg="rgba(0,20,40,0.8)" border="1px solid" borderColor="cyan.800" color="white"
                                    _placeholder={{ color: "whiteAlpha.500" }} _focus={{ borderColor: "cyan.500" }} size="md"
                                  />
                        <Button colorScheme="cyan" onClick={handleSend} isLoading={isLoading} minW="70px">Act</Button>
                </HStack>
          
            {/* Quick Actions */}
                <HStack spacing={1} mb={4} flexWrap="wrap">
                  {["look around", "explore", "battle", "talk", "rest", "inventory", "ask sage"].map((cmd) => (
                      <Button key={cmd} size="xs" variant="ghost" color="cyan.300" onClick={() => { setInputText(cmd); }}>
                        {cmd}
                      </Button>
                    ))}
                </HStack>
          </Box>
        );
};

// ─── MAIN COMPONENT ────────────────────────────────────────
const NexusGame = () => {
    const dispatch = useAppDispatch();
    const address = useAppSelector(selectUserAddress);
    const stakedData = useAppSelector(selectUserStaked);
    const [authenticated, setAuthenticated] = useState(false);
    const [hasExplorer, setHasExplorer] = useState(false);
    const [selectedExplorer, setSelectedExplorer] = useState<any>(null);
    const [loading, setLoading] = useState(true);
  
    // Check session auth on mount
    useEffect(() => {
          if (sessionStorage.getItem("nexus_game_auth") === "true") {
                  setAuthenticated(true);
          }
    }, []);
  
    // Fetch staked NFTs
    useEffect(() => {
          if (address && authenticated) {
                  dispatch(fetchUserStaked({ address, page: 1, maxNftsPerPage: 50 }));
          } else if (!address) {
                  setLoading(false);
          }
    }, [address, authenticated, dispatch]);
  
    // Check for Explorer NFTs
    useEffect(() => {
          if (stakedData?.nfts) {
                  // Check for any staked NFT (in MVP, any staked NFT counts as an Explorer)
                  const explorers = stakedData.nfts;
                  if (explorers.length > 0) {
                            setHasExplorer(true);
                            if (!selectedExplorer) setSelectedExplorer(explorers[0]);
                  }
                  setLoading(false);
          }
    }, [stakedData, selectedExplorer]);
  
    return (
          <MainLayout metaTitle="Nexus Game">
            {!authenticated ? (
                    <PasswordGate onSuccess={() => setAuthenticated(true)} />
                  ) : !address || !hasExplorer ? (
                    <StakingGate isConnected={!!address} loading={loading} />
                  ) : (
                    <GameShell explorer={selectedExplorer} playerAddress={address} />
                  )}
          </MainLayout>
        );
};

export default NexusGame;
