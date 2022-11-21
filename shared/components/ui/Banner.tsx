import { Box, BoxProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface IProps extends PropsWithChildren, BoxProps {
  bg?: string;
}

const Banner = ({ children, bg, ...props }: IProps) => {
  return (
    <Box
      width={"full"}
      textAlign="center"
      py={1.5}
      position="absolute"
      top={0}
      left={0}
      right={0}
      background={bg || "mainDark"}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Banner;
