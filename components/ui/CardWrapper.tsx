import { Box, BoxProps, chakra, Flex, FlexProps } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const FlexCardWrapper = ({
  children,
  ...props
}: PropsWithChildren<FlexProps>) => {
  const Wrapper = chakra(Flex, {
    baseStyle: {
      backgroundColor: "dappTemplate.dark.darker",
      padding: 8,
      borderRadius: "2xl",
      textAlign: "center",
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      ...props,
    },
  });
  return <Wrapper>{children}</Wrapper>;
};

export const CardWrapper: FC<PropsWithChildren<BoxProps>> = ({
  children,
  ...props
}) => {
  const Wrapper = chakra(Box, {
    baseStyle: {
      backgroundImage:
        "linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
      padding: 8,
      borderRadius: "2xl",
      ...props,
    },
  });
  return <Wrapper>{children}</Wrapper>;
};
