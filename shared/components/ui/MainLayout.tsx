import { Box, Container } from "@chakra-ui/react";
import { useGetAccountInfo } from "@multiversx/sdk-dapp/hooks/account/useGetAccountInfo";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks/account/useGetLoginInfo";
import { PropsWithChildren, useEffect } from "react";
import withElronDapp from "../../hoc/withElronDapp";
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
import { MetaHeadProps } from "./MetaHead";

export const MainLayout = withElronDapp(
  ({ children }: PropsWithChildren<MetaHeadProps>) => {
    const account = useGetAccountInfo();
    const dispatch = useAppDispatch();
    const { isLoggedIn } = useGetLoginInfo();
    useEffect(() => {
      const forceAddress = process.env.NEXT_PUBLIC_ADDRESS || null;
      dispatch(setAddress(forceAddress || account.address));
    }, [account.address, dispatch]);

    useEffect(() => {
      dispatch(setIsLogedIn(isLoggedIn));
    }, [isLoggedIn, dispatch]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const address: any = useAppSelector(selectUserAddress);
    useEffect(() => {
      if (address) {
        dispatch(fetchIsNftCreator(address));
      }
    }, [dispatch, address]);

    return (
      <>
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
  }
);
