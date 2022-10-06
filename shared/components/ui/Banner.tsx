import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
  bg?: string;
}

const Banner = ({ children, bg }: IProps) => {
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
    >
      {children}
    </Box>
  );
};

export default Banner;
