import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  keyframes,
} from "@chakra-ui/react";
import { useState } from "react";
import { customColors } from "../../../config/chakraTheme";

interface StartScreenProps {
  onStart: (name: string) => void;
  isLoggedIn: boolean;
}

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const StartScreen = ({ onStart, isLoggedIn }: StartScreenProps) => {
  const [name, setName] = useState("");

  return (
    <Flex
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      minH="60vh"
      gap={6}
      textAlign="center"
      px={4}
    >
      <Heading
        fontSize={{ sm: "3xl", md: "5xl" }}
        fontWeight="900"
        bgGradient={`linear(to-r, ${customColors.color2.base}, ${customColors.color1.base}, ${customColors.color3.base})`}
        bgClip="text"
        backgroundSize="200% auto"
        animation={`${shimmer} 4s linear infinite`}
      >
        Tribeden Kingdoms
      </Heading>

      <Text color="gray.400" maxW="500px" fontSize="sm" lineHeight="1.8">
        Nine underwater kingdoms. Mermaid rulers. Treacherous waters.
        <br />
        You are a Nixie — an unevolved mermaid with a destiny yet unknown.
        <br />
        Search the deep for Kappax eggs. Evolve. Survive. Explore.
      </Text>

      <Flex flexDir="column" gap={4} alignItems="center" mt={2}>
        {/* Character role preview */}
        <Flex gap={3} flexWrap="wrap" justifyContent="center">
          {[
            { name: "Delfina", title: "Queen", color: "#FFD700", emoji: "👑" },
            { name: "Nubela", title: "Guard", color: "#E63946", emoji: "🛡️" },
            { name: "Brynn", title: "Messenger", color: "#457B9D", emoji: "📜" },
            { name: "Shimmer", title: "Hunter", color: "#2A9D8F", emoji: "🏹" },
          ].map((c) => (
            <Flex
              key={c.name}
              flexDir="column"
              alignItems="center"
              bg={customColors.myCustomColor.lighter}
              borderRadius="lg"
              px={3}
              py={2}
              border="1px solid"
              borderColor={c.color + "30"}
              minW="80px"
            >
              <Text fontSize="xl">{c.emoji}</Text>
              <Text fontSize="xs" color={c.color} fontWeight="bold">
                {c.name}
              </Text>
              <Text fontSize="9px" color="gray.500">
                {c.title}
              </Text>
            </Flex>
          ))}
        </Flex>

        {isLoggedIn ? (
          <Flex flexDir="column" gap={3} alignItems="center" mt={2}>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name your explorer..."
              textAlign="center"
              size="lg"
              maxW="300px"
              bg={customColors.myCustomColor.darker}
              borderColor={customColors.myCustomColor.lightest}
              borderRadius="full"
              _focus={{
                borderColor: customColors.color2.base,
                boxShadow: `0 0 0 1px ${customColors.color2.base}`,
              }}
              _placeholder={{ color: "gray.600" }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && name.trim()) onStart(name.trim());
              }}
            />
            <Button
              size="lg"
              bg={customColors.color2.base}
              color="white"
              borderRadius="full"
              px={10}
              _hover={{
                bg: customColors.color2.lighter,
                transform: "translateY(-2px)",
                boxShadow: `0 4px 20px ${customColors.color2.base}40`,
              }}
              transition="all 0.3s"
              isDisabled={!name.trim()}
              onClick={() => onStart(name.trim())}
              fontWeight="bold"
            >
              Begin Your Journey
            </Button>
          </Flex>
        ) : (
          <Box
            bg={customColors.myCustomColor.lighter}
            borderRadius="xl"
            p={4}
            mt={2}
          >
            <Text color="gray.400" fontSize="sm">
              Connect your wallet to enter the Tribeden Kingdoms
            </Text>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default StartScreen;
