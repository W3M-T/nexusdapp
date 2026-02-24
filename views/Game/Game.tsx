import { Box, Flex, Grid } from "@chakra-ui/react";
import { useCallback, useEffect, useRef } from "react";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks/account/useGetLoginInfo";
import { customColors } from "../../config/chakraTheme";
import { MainLayout } from "../../shared/components/ui/MainLayout";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/core/useRedux";
import {
  selectPlayer,
  selectMessages,
  selectIsNarrating,
  selectKingdoms,
  selectAvailableActions,
  selectCurrentKingdom,
  selectWorldState,
  initPlayer,
  addMessage,
  sendNarratorMessage,
  saveGameState,
  loadGameState,
  fetchWorldState,
  postWorldEvent,
  resetGame,
} from "../../shared/redux/slices/game";
import { selectUserAddress } from "../../shared/redux/slices/settings";
import NarratorPanel from "./components/NarratorPanel";
import ActionPanel from "./components/ActionPanel";
import KingdomMap from "./components/KingdomMap";
import PlayerStatus from "./components/PlayerStatus";
import KappaxCollection from "./components/KappaxCollection";
import WorldActivity from "./components/WorldActivity";
import StartScreen from "./components/StartScreen";

const WORLD_POLL_INTERVAL = 30000; // 30 seconds

const Game = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useGetLoginInfo();
  const address = useAppSelector(selectUserAddress);
  const player = useAppSelector(selectPlayer);
  const messages = useAppSelector(selectMessages);
  const isNarrating = useAppSelector(selectIsNarrating);
  const kingdoms = useAppSelector(selectKingdoms);
  const availableActions = useAppSelector(selectAvailableActions);
  const currentKingdom = useAppSelector(selectCurrentKingdom);
  const worldState = useAppSelector(selectWorldState);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load saved game on login
  useEffect(() => {
    if (address) {
      dispatch(loadGameState(address));
    }
  }, [address, dispatch]);

  // Poll world state
  useEffect(() => {
    if (!player) return;

    const poll = () => {
      dispatch(fetchWorldState(player.currentLocation.kingdomId));
    };

    poll(); // Initial fetch
    const interval = setInterval(poll, WORLD_POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [player?.currentLocation.kingdomId, dispatch, player]);

  // Auto-save game state (debounced)
  useEffect(() => {
    if (!player || !address) return;

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = setTimeout(() => {
      dispatch(saveGameState({ address, state: player }));
    }, 3000);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [player, address, dispatch]);

  const handleStart = useCallback(
    (name: string) => {
      if (!address) return;
      dispatch(initPlayer({ address, name }));
      // Post presence event
      dispatch(
        postWorldEvent({
          eventType: "kingdom_entered",
          kingdomId: "shellhaven",
          address,
          explorerName: name,
          data: { mermaidRole: "nixie" },
        })
      );
    },
    [address, dispatch]
  );

  const handleAction = useCallback(
    (action: string) => {
      if (!player || isNarrating) return;

      // Add player message
      dispatch(
        addMessage({
          id: `player_${Date.now()}`,
          role: "player",
          content: action,
          timestamp: Date.now(),
        })
      );

      // Build context for narrator (includes shared world state)
      const gameContext = {
        currentLocation: player.currentLocation,
        playerRole: player.mermaidRole,
        explorerName: player.explorerName,
        kappaxCount: player.kappaxEggs.length,
        visitedKingdoms: player.visitedKingdoms,
        health: player.health,
        reputation: player.reputation,
        recentMessages: messages.slice(-6),
        worldState: worldState || undefined,
      };

      dispatch(sendNarratorMessage({ playerAction: action, gameContext })).then(
        (result) => {
          if (sendNarratorMessage.fulfilled.match(result)) {
            const { kappaxFound, newLocation } = result.payload;

            // Post world events for significant actions
            if (kappaxFound) {
              dispatch(
                postWorldEvent({
                  eventType: "kappax_found",
                  kingdomId: player.currentLocation.kingdomId,
                  address: player.address,
                  explorerName: player.explorerName,
                  data: {
                    kappaxId: kappaxFound,
                    mermaidRole: player.mermaidRole,
                  },
                })
              );
            }

            if (newLocation) {
              dispatch(
                postWorldEvent({
                  eventType: "kingdom_entered",
                  kingdomId: newLocation.kingdomId,
                  address: player.address,
                  explorerName: player.explorerName,
                  data: { mermaidRole: player.mermaidRole },
                })
              );
              // Refresh world state for new kingdom
              dispatch(fetchWorldState(newLocation.kingdomId));
            }
          }
        }
      );
    },
    [player, isNarrating, messages, worldState, dispatch]
  );

  const handleTravel = useCallback(
    (kingdomId: string) => {
      if (!player) return;
      const kingdom = kingdoms.find((k) => k.id === kingdomId);
      if (!kingdom) return;
      handleAction(`Travel to ${kingdom.name}`);
    },
    [player, kingdoms, handleAction]
  );

  const connectedKingdoms = currentKingdom?.connections || [];

  return (
    <MainLayout metaTitle="Tribeden Kingdoms">
      <Box mt={4}>
        {!player ? (
          <StartScreen onStart={handleStart} isLoggedIn={isLoggedIn} />
        ) : (
          <Grid
            templateColumns={{ sm: "1fr", md: "280px 1fr", lg: "280px 1fr 260px" }}
            gap={4}
            minH="75vh"
          >
            {/* Left sidebar — Player info + Map */}
            <Flex
              flexDir="column"
              gap={4}
              display={{ sm: "none", md: "flex" }}
            >
              <Box
                bg={customColors.myCustomColor.base}
                borderRadius="xl"
                border="1px solid"
                borderColor={customColors.myCustomColor.lightest + "40"}
                p={4}
              >
                <PlayerStatus player={player} currentKingdom={currentKingdom} />
              </Box>

              <Box
                bg={customColors.myCustomColor.base}
                borderRadius="xl"
                border="1px solid"
                borderColor={customColors.myCustomColor.lightest + "40"}
                p={4}
              >
                <KingdomMap
                  kingdoms={kingdoms}
                  currentKingdomId={player.currentLocation.kingdomId}
                  visitedKingdoms={player.visitedKingdoms}
                  activePlayers={worldState?.activePlayers || []}
                  onTravel={handleTravel}
                  connectedKingdoms={connectedKingdoms}
                />
              </Box>

              <Box
                bg={customColors.myCustomColor.base}
                borderRadius="xl"
                border="1px solid"
                borderColor={customColors.myCustomColor.lightest + "40"}
                p={4}
              >
                <WorldActivity
                  worldState={worldState}
                  currentKingdomId={player.currentLocation.kingdomId}
                />
              </Box>
            </Flex>

            {/* Center — Narrator + Actions */}
            <Flex flexDir="column" gap={4}>
              {/* Mobile player status */}
              <Box
                display={{ sm: "block", md: "none" }}
                bg={customColors.myCustomColor.base}
                borderRadius="xl"
                border="1px solid"
                borderColor={customColors.myCustomColor.lightest + "40"}
                p={3}
              >
                <PlayerStatus player={player} currentKingdom={currentKingdom} />
              </Box>

              <Box flex="1" minH={{ sm: "50vh", md: "60vh" }}>
                <NarratorPanel messages={messages} isNarrating={isNarrating} />
              </Box>

              <Box
                bg={customColors.myCustomColor.base}
                borderRadius="xl"
                border="1px solid"
                borderColor={customColors.myCustomColor.lightest + "40"}
                p={4}
              >
                <ActionPanel
                  actions={availableActions}
                  onAction={handleAction}
                  isNarrating={isNarrating}
                />
              </Box>

              {/* Mobile map */}
              <Box
                display={{ sm: "block", md: "none" }}
                bg={customColors.myCustomColor.base}
                borderRadius="xl"
                border="1px solid"
                borderColor={customColors.myCustomColor.lightest + "40"}
                p={3}
              >
                <KingdomMap
                  kingdoms={kingdoms}
                  currentKingdomId={player.currentLocation.kingdomId}
                  visitedKingdoms={player.visitedKingdoms}
                  activePlayers={worldState?.activePlayers || []}
                  onTravel={handleTravel}
                  connectedKingdoms={connectedKingdoms}
                />
              </Box>
            </Flex>

            {/* Right sidebar — Kappax collection */}
            <Flex
              flexDir="column"
              gap={4}
              display={{ sm: "none", lg: "flex" }}
            >
              <Box
                bg={customColors.myCustomColor.base}
                borderRadius="xl"
                border="1px solid"
                borderColor={customColors.myCustomColor.lightest + "40"}
                p={4}
              >
                <KappaxCollection collected={player.kappaxEggs} />
              </Box>
            </Flex>
          </Grid>
        )}
      </Box>
    </MainLayout>
  );
};

export default Game;
