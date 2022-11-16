import { Box, Container } from "@chakra-ui/react";
import { PropsWithChildren, useEffect } from "react";
import { useAccount } from "../../hooks/auth/useAccount";
import { useLogin } from "../../hooks/auth/useLogin";
import { useAppDispatch, useAppSelector } from "../../hooks/core/useRedux";
import { fetchIsNftCreator } from "../../redux/reduxAsyncFuncs/poolsFuncs";
import {
  selectUserAddress,
  setAddress,
  setIsLogedIn,
} from "../../redux/slices/settings";
import Banner from "./Banner";
import ButtonNav from "./ButtonNav";
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
    const forceAddress = process.env.NEXT_PUBLIC_ADDRESS;
    dispatch(setAddress(forceAddress || account.address));
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
      <Banner bg="dappTemplate.dark.darker">
        A 💧 $WATER Community Project
      </Banner>
      <Box minHeight="100vh" pb="24">
        <Container maxW="container.xl">
          <HeaderMenu>
            <HeaderMenuButtons enabled={["auth"]} />
          </HeaderMenu>
          <Box>{children}</Box>
        </Container>
        <ButtonNav />
      </Box>
      <Footer />
    </>
  );
};

MainLayout.displayName = "MainLayout";
