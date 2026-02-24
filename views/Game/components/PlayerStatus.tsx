import { Box, Flex, Text, Progress, Badge } from "@chakra-ui/react";
import { customColors } from "../../../config/chakraTheme";
import { PlayerState, MERMAID_CHARACTERS, Kingdom } from "../../../shared/types/game";

interface PlayerStatusProps {
  player: PlayerState;
  currentKingdom: Kingdom | null;
}

const PlayerStatus = ({ player, currentKingdom }: PlayerStatusProps) => {
  const character = MERMAID_CHARACTERS.find((c) => c.role === player.mermaidRole);

  return (
    <Box>
      <Text
        fontSize="xs"
        color="gray.400"
        mb={2}
        fontWeight="bold"
        textTransform="uppercase"
        letterSpacing="wider"
      >
        Explorer Status
      </Text>

      <Flex flexDir="column" gap={2}>
        {/* Name & Role */}
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" fontWeight="bold" color="gray.100">
            {player.explorerName}
          </Text>
          <Badge
            bg={character?.color + "30"}
            color={character?.color}
            fontSize="10px"
            borderRadius="full"
            px={2}
          >
            {character?.title || "Nixie"}
          </Badge>
        </Flex>

        {/* Location */}
        {currentKingdom && (
          <Flex alignItems="center" gap={2}>
            <Text fontSize="10px" color="gray.500">Location:</Text>
            <Text fontSize="xs" color={currentKingdom.color} fontWeight="bold">
              {currentKingdom.name}
            </Text>
            <Text fontSize="10px" color="gray.500">
              ({player.currentLocation.zone})
            </Text>
          </Flex>
        )}

        {/* Health */}
        <Box>
          <Flex justifyContent="space-between" mb={1}>
            <Text fontSize="10px" color="gray.500">Health</Text>
            <Text fontSize="10px" color={player.health > 30 ? "gray.300" : "red.400"}>
              {player.health}/100
            </Text>
          </Flex>
          <Progress
            value={player.health}
            size="xs"
            borderRadius="full"
            colorScheme={player.health > 60 ? "green" : player.health > 30 ? "yellow" : "red"}
            bg={customColors.myCustomColor.darker}
          />
        </Box>

        {/* Stats row */}
        <Flex gap={3} flexWrap="wrap">
          <Flex flexDir="column" alignItems="center">
            <Text fontSize="lg" fontWeight="bold" color={customColors.color1.base}>
              {player.kappaxEggs.length}
            </Text>
            <Text fontSize="9px" color="gray.500">Kappax</Text>
          </Flex>
          <Flex flexDir="column" alignItems="center">
            <Text fontSize="lg" fontWeight="bold" color={customColors.color2.base}>
              {player.visitedKingdoms.length}
            </Text>
            <Text fontSize="9px" color="gray.500">Kingdoms</Text>
          </Flex>
          <Flex flexDir="column" alignItems="center">
            <Text fontSize="lg" fontWeight="bold" color={customColors.color3.base}>
              {player.storyProgress}
            </Text>
            <Text fontSize="9px" color="gray.500">Actions</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default PlayerStatus;
