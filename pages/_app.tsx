import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import "../public/styles/global.css"

import { Box, ChakraProvider } from "@chakra-ui/react";
import { AxiosInterceptorContext } from "@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import { theme } from "../config/chakraTheme";
import {
  chainType,
  sampleAuthenticatedDomains,
  selectedNetwork,
} from "../config/network";
import { MetaHead } from "../shared/components/ui/MetaHead";
import "../shared/global.css";
import { store } from "../shared/redux/store";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks/account/useGetLoginInfo";
import { useAuthentication } from "../shared/hooks/auth";
import { useGetAccountInfo } from "@multiversx/sdk-dapp/hooks/account/useGetAccountInfo";

export const DappProvider = dynamic(
  async () => {
    return (await import("@multiversx/sdk-dapp/wrappers/DappProvider"))
      .DappProvider;
  },
  { ssr: false },
);

const SignTransactionsModals = dynamic(
  async () => {
    return (await import("@multiversx/sdk-dapp/UI/SignTransactionsModals"))
      .SignTransactionsModals;
  },
  { ssr: false },
);

const NotificationModal = dynamic(
  async () => {
    return (await import("@multiversx/sdk-dapp/UI/NotificationModal"))
      .NotificationModal;
  },
  { ssr: false },
);

const TransactionsToastList = dynamic(
  async () => {
    return (await import("@multiversx/sdk-dapp/UI/TransactionsToastList"))
      .TransactionsToastList;
  },
  { ssr: false },
);

const NextJSDappTemplate = ({ Component, pageProps }: AppProps) => {
  const { isLoggedIn } = useGetLoginInfo();
  const { account } = useGetAccountInfo();
  const { userData, userAdded } = useAuthentication(isLoggedIn, account);
  console.log("🚀 ~ NextJSDappTemplate ~ userData:", userData)
  return (
    <AxiosInterceptorContext.Provider>
      <AxiosInterceptorContext.Interceptor
        authenticatedDomanis={sampleAuthenticatedDomains}
      >
        <DappProvider
          environment={chainType}
          customNetworkConfig={{
            name: "nexusConfig",
            walletConnectV2ProjectId: "d57456f79cf0f38f6e941f057a90307c",
            ...selectedNetwork,
          }}
          dappConfig={{
            logoutRoute: "/",
            shouldUseWebViewProvider: true,
          }}
        >
          <Provider store={store}>
            <AxiosInterceptorContext.Listener />

            <ChakraProvider theme={theme}>
              {/* <MetaHead /> */}
              {/* <Box color="black"> */}
              <TransactionsToastList successfulToastLifetime={6000} />
              <NotificationModal />
              <SignTransactionsModals />
              {/* </Box> */}
              <Component {...pageProps} />
            </ChakraProvider>
          </Provider>
        </DappProvider>
      </AxiosInterceptorContext.Interceptor>
    </AxiosInterceptorContext.Provider>
  );
};

export default NextJSDappTemplate;
