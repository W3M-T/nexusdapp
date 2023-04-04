import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";

import { Box, ChakraProvider } from "@chakra-ui/react";
import { AxiosInterceptorContext } from "@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext";
import { DappProvider } from "@multiversx/sdk-dapp/wrappers/DappProvider";
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

const SignTransactionsModals: any = dynamic(
  async () => {
    return (await import("@multiversx/sdk-dapp/UI/SignTransactionsModals"))
      .SignTransactionsModals;
  },
  { ssr: false }
);
const NotificationModal: any = dynamic(
  async () => {
    return (await import("@multiversx/sdk-dapp/UI/NotificationModal"))
      .NotificationModal;
  },
  { ssr: false }
);
const TransactionsToastList: any = dynamic(
  async () => {
    return (await import("@multiversx/sdk-dapp/UI/TransactionsToastList"))
      .TransactionsToastList;
  },
  { ssr: false }
);

const NextJSDappTemplate = ({ Component, pageProps }: AppProps) => {
  return (
    <AxiosInterceptorContext.Provider>
      <AxiosInterceptorContext.Interceptor
        authenticatedDomanis={sampleAuthenticatedDomains}
      >
        <DappProvider
          environment={chainType}
          customNetworkConfig={{
            name: "nexusConfig",
            walletConnectV2ProjectId: "cf388e978587b4cba673b4080fb9d89b",
            ...selectedNetwork,
          }}
          dappConfig={{
            logoutRoute: "/",
          }}
        >
          <Provider store={store}>
            <AxiosInterceptorContext.Listener />

            <ChakraProvider theme={theme}>
              <MetaHead />
              <Box color="black">
                <TransactionsToastList />
                <NotificationModal />
                <SignTransactionsModals className="custom-class-for-modals" />
              </Box>
              <Component {...pageProps} />
            </ChakraProvider>
          </Provider>
        </DappProvider>
      </AxiosInterceptorContext.Interceptor>
    </AxiosInterceptorContext.Provider>
  );
};

export default NextJSDappTemplate;
