import { Box, Flex, Text, Spinner, keyframes } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { customColors } from "../../../config/chakraTheme";
import { NarratorMessage } from "../../../shared/types/game";

interface NarratorPanelProps {
  messages: NarratorMessage[];
  isNarrating: boolean;
}

const pulseGlow = keyframes`
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
`;

const NarratorPanel = ({ messages, isNarrating }: NarratorPanelProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isNarrating]);

  const getMessageStyle = (role: string) => {
    switch (role) {
      case "narrator":
        return {
          bg: "transparent",
          color: "#e2e8f0",
          borderLeft: `3px solid ${customColors.color2.base}`,
          pl: 3,
        };
      case "player":
        return {
          bg: customColors.color2.base + "15",
          color: customColors.color2.lighter,
          borderLeft: `3px solid ${customColors.color1.base}`,
          pl: 3,
        };
      case "npc":
        return {
          bg: customColors.color3.base + "15",
          color: customColors.color3.lighter,
          borderLeft: `3px solid ${customColors.color3.base}`,
          pl: 3,
        };
      case "system":
        return {
          bg: "transparent",
          color: "gray.500",
          borderLeft: `3px solid gray`,
          pl: 3,
          fontStyle: "italic" as const,
        };
      default:
        return { bg: "transparent", color: "gray.200", pl: 0 };
    }
  };

  return (
    <Box
      bg={customColors.myCustomColor.darker}
      borderRadius="xl"
      border="1px solid"
      borderColor={customColors.myCustomColor.lightest + "40"}
      overflow="hidden"
      h="100%"
      display="flex"
      flexDir="column"
    >
      {/* Header */}
      <Flex
        px={4}
        py={2}
        bg={customColors.myCustomColor.lighter}
        alignItems="center"
        gap={2}
        borderBottom="1px solid"
        borderColor={customColors.myCustomColor.lightest + "40"}
      >
        <Text
          fontSize="xs"
          fontWeight="bold"
          textTransform="uppercase"
          letterSpacing="wider"
          color={customColors.color2.lighter}
        >
          The Narrator
        </Text>
        {isNarrating && (
          <Flex alignItems="center" gap={1}>
            <Spinner size="xs" color={customColors.color2.base} />
            <Text
              fontSize="10px"
              color={customColors.color2.base}
              animation={`${pulseGlow} 1.5s infinite`}
            >
              weaving tale...
            </Text>
          </Flex>
        )}
      </Flex>

      {/* Messages */}
      <Box
        ref={scrollRef}
        flex="1"
        overflowY="auto"
        px={4}
        py={3}
        display="flex"
        flexDir="column"
        gap={3}
      >
        {messages.map((msg) => {
          const style = getMessageStyle(msg.role);
          return (
            <Box key={msg.id} {...style} py={2} borderRadius="sm">
              {msg.role === "player" && (
                <Text fontSize="10px" color={customColors.color1.base} mb={1} fontWeight="bold">
                  You
                </Text>
              )}
              {msg.npcName && (
                <Text fontSize="10px" color={customColors.color3.base} mb={1} fontWeight="bold">
                  {msg.npcName}
                </Text>
              )}
              <Text
                fontSize="sm"
                lineHeight="1.7"
                whiteSpace="pre-wrap"
                fontStyle={msg.role === "system" ? "italic" : "normal"}
              >
                {msg.content}
              </Text>
            </Box>
          );
        })}

        {isNarrating && (
          <Flex alignItems="center" gap={2} pl={3} borderLeft={`3px solid ${customColors.color2.base}`}>
            <Text
              fontSize="sm"
              color="gray.500"
              animation={`${pulseGlow} 1.5s infinite`}
            >
              The waters ripple as the narrator speaks...
            </Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default NarratorPanel;
