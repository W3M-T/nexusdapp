import { Box, Container } from "@chakra-ui/react";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAccount } from "../../hooks/auth/useAccount";
import { setAddress } from "../../redux/slices/settings";
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
  const account = useAccount();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAddress(account.address));
  }, [account.address, dispatch]);

  return (
    <>
      <MetaHead
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        metaImage={metaImage}
        metaUrl={metaUrl}
      />
      <Box minHeight="100vh" pb="24">
        <Container maxW="container.xl">
          <HeaderMenu>
            <HeaderMenuButtons enabled={["auth"]} />
          </HeaderMenu>
          <Box>{children}</Box>
        </Container>
      </Box>
      {/* <Footer /> */}
    </>
  );
};

MainLayout.displayName = "MainLayout";
