import { Box, Container } from "@chakra-ui/react";
import { PropsWithChildren, useEffect } from "react";
import { useAccount } from "../../hooks/auth/useAccount";
import { useLogin } from "../../hooks/auth/useLogin";
import { useAppDispatch, useAppSelector } from "../../hooks/core/useRedux";
import { fetchIsNftCreator } from "../../reduxAsyncFuncs/poolsFuncs";
import {
  selectUserAddress,
  setAddress,
  setIsLogedIn,
} from "../../slices/settings";
import Banner from "./Banner";
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
  const account = useAccount();
  const dispatch = useAppDispatch();
  const { isLoggedIn, isLoggingIn } = useLogin();
  useEffect(() => {
    dispatch(setAddress(account.address));
    // dispatch(setAddress(addressdb.kostas));
  }, [account.address, dispatch]);

  useEffect(() => {
    if (!isLoggingIn) {
      dispatch(setIsLogedIn(isLoggedIn));
    }
  }, [isLoggedIn, isLoggingIn, dispatch]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const address: any = useAppSelector(selectUserAddress);
  useEffect(() => {
    if (address) {
      dispatch(fetchIsNftCreator(address));
    }
  }, [dispatch, address]);

  return (
    <>
      <MetaHead
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        metaImage={metaImage}
        metaUrl={metaUrl}
      />
      <Banner bg="dappTemplate.shadowColor">
        A 💧 $WATER Community Project
      </Banner>
      <Box minHeight="100vh" pb="24">
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
