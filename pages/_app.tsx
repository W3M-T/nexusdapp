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
import { MetaHead } from "../shared/components/ui/MetaHead";
import TxModal from "../shared/components/ui/TxModal";
import { store } from "../shared/redux/store";

const NextJSDappTemplate = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <TxModal />
        <MetaHead />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
};

export default NextJSDappTemplate;
