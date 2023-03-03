// Login component wraps all auth services in one place
// You can always use only one of them if needed
import { Box, Stack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks";
import { memo } from "react";
import { route } from "../../utils/routes";
import { ActionButton } from "./ActionButton";

import dynamic from "next/dynamic";

const ExtensionLoginButton: any = dynamic(
  async () => {
    return (
      await import("@multiversx/sdk-dapp/UI/extension/ExtensionLoginButton")
    ).ExtensionLoginButton;
  },
  { ssr: false }
);

const WalletConnectLoginButton: any = dynamic(
  async () => {
    return (
      await import(
        "@multiversx/sdk-dapp/UI/walletConnect/WalletConnectLoginButton"
      )
    ).WalletConnectLoginButton;
  },
  { ssr: false }
);

const WebWalletLoginButton: any = dynamic(
  async () => {
    return (
      await import("@multiversx/sdk-dapp/UI/webWallet/WebWalletLoginButton")
    ).WebWalletLoginButton;
  },
  { ssr: false }
);

const mobileText = (
  <ActionButton as={"div"} isFullWidth borderRadius={"7px !important"}>
    xPortal Mobile App
  </ActionButton>
);
const desktopText = (
  <Box as={"div"} py="6px" borderRadius={"7px !important"}>
    {" "}
    xPortal Browser Extension
  </Box>
);
const webText = (
  <ActionButton as={"div"} isFullWidth borderRadius={"7px !important"}>
    MultiversX Web Wallet
  </ActionButton>
);

export const LoginComponent = memo(() => {
  const { isLoggedIn } = useGetLoginInfo();
  return (
    <>
      <LoginWrapperS
        spacing={4}
        direction="column"
        align="center"
        sx={{
          "&.dapp-core-ui-component": {
            width: "100%",
          },
        }}
      >
        {!isLoggedIn && (
          <>
            <Box
              as={WebWalletLoginButton}
              shouldRenderDefaultCss={false}
              loginButtonText={webText}
              callbackRoute={route.home.route}
              className="DappUIButton"
              w="100%"
            />
            <ActionButton w={"full"} px={0} py={0}>
              <Box
                as={ExtensionLoginButton}
                shouldRenderDefaultCss={false}
                loginButtonText={desktopText}
                className="DappUIButton Extension"
                buttonClass="buttonLogin"
                w="100%"
              />
            </ActionButton>
            <Box
              as={WalletConnectLoginButton}
              shouldRenderDefaultCss={false}
              loginButtonText={mobileText}
              className="DappUIButton"
              w="100%"
            />
          </>
        )}
      </LoginWrapperS>
    </>
  );
});

LoginComponent.displayName = "LoginComponent";

const LoginWrapperS = styled(Stack)`
  button : {
    width: "100%";
    border: "none";
    background-color: red !important;
  }
`;
