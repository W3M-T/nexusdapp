import { ArrowRightIcon } from "@chakra-ui/icons";
import { Box, BoxProps, HStack, Icon } from "@chakra-ui/react";
import { PropsWithChildren, useCallback } from "react";
import { BsArrowBarDown } from "react-icons/bs";
import { CgArrowRight } from "react-icons/cg";

interface ActionButtonProps extends BoxProps {
  onClick?: () => void;
  isFullWidth?: boolean;
  disabled?: boolean;
  type?: string;
}

export const ViewButton = ({
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
    <HStack
      as="button"
      // borderColor="dappTemplate.color2.darker"
      // borderWidth={1}
      bgColor="transparent"
      py={1.5}
      // px={0}
      // rounded="2xl"
      fontWeight="normal"
      cursor={disabled ? "not-allowed" : "pointer"}
      color="dappTemplate.white"
      userSelect="none"
      _hover={!disabled ? { bg: "dappTemplate.color2.darker" } : {}}
      transition="background-color .3s"
      width={isFullWidth ? "100%" : "auto"}
      onClick={handleClick}
      opacity={!disabled ? 0.7 : 0.2}
      type={type}
      {...props}
    >
      {children}
      <CgArrowRight size={"16px"}/>
    </HStack>
  );
};
