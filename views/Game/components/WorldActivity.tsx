import { Box, Flex, Text, Badge } from "@chakra-ui/react";
import { customColors } from "../../../config/chakraTheme";
import { WorldState } from "../../../shared/types/game";

interface WorldActivityProps {
  worldState: WorldState | null;
  currentKingdomId: string;
}

const WorldActivity = ({ worldState, currentKingdomId }: WorldActivityProps) => {
  if (!worldState) return null;

  const { events, activePlayers, modifiers } = worldState;

  const totalActive = activePlayers.reduce(
    (sum, p) => sum + (p.player_count || 0),
    0
  );

  const localPlayers = activePlayers.find(
    (p) => p.kingdom_id === currentKingdomId
  );

  const activeModifiers = modifiers.filter(
    (m) => m.kingdom_id === currentKingdomId
  );

  const recentEvents = events
    .filter((e) => e.kingdom_id === currentKingdomId)
    .slice(0, 5);

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Text
          fontSize="xs"
          color="gray.400"
          fontWeight="bold"
          textTransform="uppercase"
          letterSpacing="wider"
        >
          World Activity
        </Text>
        <Badge
          bg={customColors.color1.base + "20"}
          color={customColors.color1.base}
          fontSize="9px"
          borderRadius="full"
          px={2}
        >
          {totalActive} exploring
        </Badge>
      </Flex>

      {/* Active players here */}
      {localPlayers && localPlayers.players.length > 0 && (
        <Box mb={2}>
          <Text fontSize="10px" color="gray.500" mb={1}>
            Explorers in this kingdom:
          </Text>
          <Flex gap={1} flexWrap="wrap">
            {localPlayers.players.map((p, i) => (
              <Badge
                key={i}
                fontSize="9px"
                bg={customColors.myCustomColor.lighter}
                color="gray.300"
                borderRadius="full"
                px={2}
              >
                {p.name} ({p.role})
              </Badge>
            ))}
          </Flex>
        </Box>
      )}

      {/* Active modifiers */}
      {activeModifiers.length > 0 && (
        <Box mb={2}>
          <Text fontSize="10px" color="gray.500" mb={1}>
            Active effects:
          </Text>
          {activeModifiers.map((m) => (
            <Flex
              key={m.id}
              alignItems="center"
              gap={1}
              mb={1}
              pl={2}
              borderLeft="2px solid"
              borderColor={
                m.modifier_type === "danger_spike"
                  ? "red.400"
                  : m.modifier_type === "kappax_stirred"
                  ? customColors.color1.base
                  : customColors.color2.base
              }
            >
              <Text fontSize="10px" color="gray.400">
                {m.description}
              </Text>
            </Flex>
          ))}
        </Box>
      )}

      {/* Recent events */}
      {recentEvents.length > 0 && (
        <Box>
          <Text fontSize="10px" color="gray.500" mb={1}>
            Recent happenings:
          </Text>
          {recentEvents.map((e) => (
            <Text key={e.id} fontSize="10px" color="gray.600" mb={0.5}>
              {e.explorer_name}{" "}
              {e.event_type === "kappax_found"
                ? "found a Kappax egg"
                : e.event_type === "kingdom_entered"
                ? "arrived"
                : e.event_type === "danger_event"
                ? "triggered something dangerous"
                : "did something"}
            </Text>
          ))}
        </Box>
      )}

      {!localPlayers && activeModifiers.length === 0 && recentEvents.length === 0 && (
        <Text fontSize="10px" color="gray.600" fontStyle="italic">
          The waters are calm. You appear to be alone here.
        </Text>
      )}
    </Box>
  );
};

export default WorldActivity;
