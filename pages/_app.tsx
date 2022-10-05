import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";

import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { theme } from "../config/chakraTheme";
import { store } from "../redux/store";
import TxModal from "../shared/components/ui/TxModal";
import { useElrondNetworkSync } from "../shared/hooks/auth/useElrondNetworkSync";

const NextJSDappTemplate = ({ Component, pageProps }: AppProps) => {
  useElrondNetworkSync();

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <TxModal />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
};

export default NextJSDappTemplate;
