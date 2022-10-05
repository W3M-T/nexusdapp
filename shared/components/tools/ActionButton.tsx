import { Box, BoxProps } from "@chakra-ui/react";
import { PropsWithChildren, useCallback } from "react";

interface ActionButtonProps extends BoxProps {
  onClick?: () => void;
  isFullWidth?: boolean;
  disabled?: boolean;
  type?: string;
}

export const ActionButton = ({
  children,
  onClick,
  isFullWidth = false,
  disabled = false,
  type,
  ...props
}: PropsWithChildren<ActionButtonProps>) => {
  const handleClick = useCallback(() => {
    if (!disabled) {
      onClick?.();
    }
  }, [disabled, onClick]);

  return (
    <Box
      as="button"
      borderColor="dappTemplate.color2.darker"
      borderWidth={1.6}
      bgColor="transparent"
      py={1.5}
      px={5}
      rounded="lg"
      fontWeight="normal"
      cursor={disabled ? "not-allowed" : "pointer"}
      color="dappTemplate.white"
      userSelect="none"
      _hover={!disabled ? { bg: "dappTemplate.color2.darker" } : {}}
      transition="background-color .3s"
      width={isFullWidth ? "100%" : "auto"}
      onClick={handleClick}
      opacity={!disabled ? 1 : 0.5}
      type={type}
      {...props}
    >
      {children}
    </Box>
  );
};
