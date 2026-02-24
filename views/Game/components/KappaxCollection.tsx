import { Box, Flex, Text, Grid, Badge, Tooltip } from "@chakra-ui/react";
import { customColors } from "../../../config/chakraTheme";
import { KappaxEgg, KAPPAX_EGGS } from "../../../shared/types/game";

interface KappaxCollectionProps {
  collected: KappaxEgg[];
}

const rarityColor: Record<string, string> = {
  common: "gray.400",
  uncommon: customColors.color1.base,
  rare: customColors.color2.base,
  legendary: customColors.color3.base,
  mythic: "#FFD700",
};

const KappaxCollection = ({ collected }: KappaxCollectionProps) => {
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
          Kappax Collection
        </Text>
        <Text fontSize="10px" color="gray.500">
          {collected.length}/{KAPPAX_EGGS.length}
        </Text>
      </Flex>

      {collected.length === 0 ? (
        <Text fontSize="xs" color="gray.600" fontStyle="italic">
          No Kappax eggs discovered yet. Explore the kingdoms to find them!
        </Text>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(80px, 1fr))" gap={2}>
          {collected.map((egg) => (
            <Tooltip
              key={egg.id}
              label={`${egg.name}\n${egg.description}\nElement: ${egg.element}\nKingdom: ${egg.kingdom}`}
              placement="top"
              hasArrow
              bg={customColors.myCustomColor.lighter}
            >
              <Flex
                flexDir="column"
                alignItems="center"
                bg={customColors.myCustomColor.darker}
                borderRadius="lg"
                p={2}
                border="1px solid"
                borderColor={rarityColor[egg.rarity] + "40"}
                transition="all 0.2s"
                _hover={{
                  borderColor: rarityColor[egg.rarity],
                  transform: "scale(1.05)",
                }}
              >
                <Text fontSize="2xl">{egg.imageEmoji}</Text>
                <Text fontSize="9px" color="gray.300" noOfLines={1} textAlign="center">
                  {egg.name}
                </Text>
                <Badge
                  fontSize="8px"
                  bg={rarityColor[egg.rarity] + "20"}
                  color={rarityColor[egg.rarity]}
                  borderRadius="full"
                  px={1.5}
                  mt={0.5}
                >
                  {egg.rarity}
                </Badge>
              </Flex>
            </Tooltip>
          ))}
        </Grid>
      )}

      {/* All possible eggs preview */}
      {collected.length > 0 && collected.length < KAPPAX_EGGS.length && (
        <Text fontSize="10px" color="gray.600" mt={2}>
          {KAPPAX_EGGS.length - collected.length} more Kappax await discovery...
        </Text>
      )}
    </Box>
  );
};

export default KappaxCollection;
