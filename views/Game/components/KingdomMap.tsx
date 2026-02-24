import { Box, Flex, Text, Tooltip, Grid, Badge } from "@chakra-ui/react";
import { customColors } from "../../../config/chakraTheme";
import { Kingdom, ActivePlayerInfo } from "../../../shared/types/game";

interface KingdomMapProps {
  kingdoms: Kingdom[];
  currentKingdomId: string;
  visitedKingdoms: string[];
  activePlayers: ActivePlayerInfo[];
  onTravel: (kingdomId: string) => void;
  connectedKingdoms: string[];
}

const KingdomMap = ({
  kingdoms,
  currentKingdomId,
  visitedKingdoms,
  activePlayers,
  onTravel,
  connectedKingdoms,
}: KingdomMapProps) => {
  const getPlayerCount = (kingdomId: string) => {
    const entry = activePlayers.find((p) => p.kingdom_id === kingdomId);
    return entry?.player_count || 0;
  };

  const dangerStars = (level: number) => {
    return Array(level).fill(null).map((_, i) => (
      <Text key={i} as="span" fontSize="10px" color="red.400">*</Text>
    ));
  };

  return (
    <Box>
      <Text fontSize="xs" color="gray.400" mb={2} fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
        Kingdom Map
      </Text>
      <Grid
        templateColumns={{ sm: "repeat(3, 1fr)", md: "repeat(3, 1fr)" }}
        gap={2}
      >
        {kingdoms.map((k) => {
          const isCurrent = k.id === currentKingdomId;
          const isVisited = visitedKingdoms.includes(k.id);
          const isReachable = connectedKingdoms.includes(k.id);
          const players = getPlayerCount(k.id);

          return (
            <Tooltip
              key={k.id}
              label={`${k.name} — ${k.biome}\nDanger: ${"*".repeat(k.dangerLevel)}\n${k.description}\n${isReachable ? "Click to travel" : "Not connected"}`}
              placement="top"
              hasArrow
              bg={customColors.myCustomColor.lighter}
            >
              <Box
                bg={
                  isCurrent
                    ? k.color + "40"
                    : isVisited
                    ? customColors.myCustomColor.lighter
                    : customColors.myCustomColor.darker
                }
                border="1px solid"
                borderColor={
                  isCurrent
                    ? k.color
                    : isReachable
                    ? customColors.color2.darker + "80"
                    : "transparent"
                }
                borderRadius="lg"
                p={2}
                cursor={isReachable && !isCurrent ? "pointer" : "default"}
                opacity={!isVisited && !isReachable && !isCurrent ? 0.4 : 1}
                transition="all 0.3s"
                _hover={
                  isReachable && !isCurrent
                    ? {
                        borderColor: k.color,
                        bg: k.color + "20",
                        transform: "scale(1.02)",
                      }
                    : {}
                }
                onClick={() => {
                  if (isReachable && !isCurrent) {
                    onTravel(k.id);
                  }
                }}
                position="relative"
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    color={isCurrent ? k.color : "gray.200"}
                    noOfLines={1}
                  >
                    {isCurrent && ">> "}{k.name}
                  </Text>
                  {players > 0 && (
                    <Badge
                      bg={customColors.color2.base + "40"}
                      color={customColors.color2.lighter}
                      fontSize="9px"
                      borderRadius="full"
                      px={1.5}
                    >
                      {players}
                    </Badge>
                  )}
                </Flex>
                <Text fontSize="9px" color="gray.500" noOfLines={1}>
                  {k.biome}
                </Text>
                <Flex mt={0.5} gap={0}>
                  {dangerStars(k.dangerLevel)}
                </Flex>
              </Box>
            </Tooltip>
          );
        })}
      </Grid>
    </Box>
  );
};

export default KingdomMap;
