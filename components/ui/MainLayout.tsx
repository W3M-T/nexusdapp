import { Box, Container } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Footer } from "./Footer";
import { HeaderMenu } from "./HeaderMenu";
import { HeaderMenuButtons } from "./HeaderMenuButtons";
import { MetaHead, MetaHeadProps } from "./MetaHead";

export const MainLayout = ({
  children,
  metaTitle,
  metaDescription,
  metaImage,
  metaUrl,
}: PropsWithChildren<MetaHeadProps>) => {
  return (
    <>
      <MetaHead
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        metaImage={metaImage}
        metaUrl={metaUrl}
      />
      <Box minHeight="calc(100vh - 80px)" pb="10">
        <Container maxW="container.xl">
          <HeaderMenu>
            <HeaderMenuButtons enabled={["auth"]} />
          </HeaderMenu>
          <Box>{children}</Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

MainLayout.displayName = "MainLayout";
