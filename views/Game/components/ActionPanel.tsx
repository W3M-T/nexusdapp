import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { customColors } from "../../../config/chakraTheme";

interface ActionPanelProps {
  actions: string[];
  onAction: (action: string) => void;
  isNarrating: boolean;
}

const ActionPanel = ({ actions, onAction, isNarrating }: ActionPanelProps) => {
  const [customAction, setCustomAction] = useState("");

  const handleCustomSubmit = () => {
    if (customAction.trim()) {
      onAction(customAction.trim());
      setCustomAction("");
    }
  };

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
        What do you do?
      </Text>

      {/* Suggested actions */}
      <Flex flexWrap="wrap" gap={2} mb={3}>
        {actions.map((action, i) => (
          <Button
            key={i}
            size="sm"
            variant="outline"
            borderColor={customColors.color2.base + "60"}
            color={customColors.color2.lighter}
            bg="transparent"
            _hover={{
              bg: customColors.color2.base + "20",
              borderColor: customColors.color2.base,
              transform: "translateY(-1px)",
            }}
            transition="all 0.2s"
            isDisabled={isNarrating}
            onClick={() => onAction(action)}
            fontSize="xs"
            fontWeight="normal"
            borderRadius="full"
            px={4}
          >
            {action}
          </Button>
        ))}
      </Flex>

      {/* Custom action */}
      <Flex gap={2}>
        <Input
          value={customAction}
          onChange={(e) => setCustomAction(e.target.value)}
          placeholder="Or type your own action..."
          size="sm"
          bg={customColors.myCustomColor.darker}
          borderColor={customColors.myCustomColor.lightest + "60"}
          borderRadius="full"
          _focus={{
            borderColor: customColors.color2.base,
            boxShadow: `0 0 0 1px ${customColors.color2.base}`,
          }}
          _placeholder={{ color: "gray.600" }}
          isDisabled={isNarrating}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCustomSubmit();
          }}
        />
        <Button
          size="sm"
          bg={customColors.color1.base}
          color="black"
          borderRadius="full"
          px={6}
          _hover={{ bg: customColors.color1.lighter }}
          isDisabled={isNarrating || !customAction.trim()}
          onClick={handleCustomSubmit}
          fontSize="xs"
          fontWeight="bold"
        >
          Act
        </Button>
      </Flex>
    </Box>
  );
};

export default ActionPanel;
