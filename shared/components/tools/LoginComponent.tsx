// Login component wraps all auth services in one place
// You can always use only one of them if needed
import { Flex, Stack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks";
import { memo } from "react";
import { route } from "../../utils/routes";

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
const LedgerLoginButton: any = dynamic(
  async () => {
    return (await import("@multiversx/sdk-dapp/UI/ledger/LedgerLoginButton"))
      .LedgerLoginButton;
  },
  { ssr: false }
);
const mobileText = (
  <Flex
    w="full"
    align={"center"}
    justifyContent="center"
    borderRadius={"7px !important"}
  >
    xPortal Mobile App
  </Flex>
);
const legerWallet = (
  <Flex
    w="full"
    align={"center"}
    justifyContent="center"
    borderRadius={"7px !important"}
  >
    Ledger
  </Flex>
);
const desktopText = (
  <Flex
    w="full"
    align={"center"}
    justifyContent="center"
    borderRadius={"7px !important"}
  >
    {" "}
    xPortal Browser Extension
  </Flex>
);
const webText = (
  <Flex
    w="full"
    align={"center"}
    justifyContent="center"
    borderRadius={"7px !important"}
  >
    MultiversX Web Wallet
  </Flex>
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
            <LoginMethod>
              <WalletConnectLoginButton
                callbackRoute={route.home.route}
                shouldRenderDefaultCss={false}
                loginButtonText={mobileText}
                isWalletConnectV2={true}
              />
            </LoginMethod>

            <LoginMethod>
              <ExtensionLoginButton
                callbackRoute={route.home.route}
                loginButtonText={desktopText}
              />
            </LoginMethod>
            <LoginMethod>
              <WebWalletLoginButton
                callbackRoute={route.home.route}
                shouldRenderDefaultCss={false}
                loginButtonText={webText}
              />
            </LoginMethod>
            <LoginMethod>
              {" "}
              <LedgerLoginButton
                callbackRoute={route.home.route}
                shouldRenderDefaultCss={false}
                loginButtonText={legerWallet}
              />
            </LoginMethod>
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

const LoginMethod = ({ children, onClick = undefined }) => {
  return (
    <Flex
      fontSize="18px"
      w="full"
      alignItems={"center"}
      justifyContent="space-between"
      cursor={"pointer"}
      onClick={onClick}
      fontWeight="400"
      position={"relative"}
      sx={{
        "& button": {
          width: "100%",
          bg: "#202020",
          border: "none",
          px: "12px !important",
          mx: 0,
          my: 0,
          py: "10px",
          borderRadius: "10px",
        },
        "& a": {
          width: "100%",
          bg: "#151515",
          border: "none",
          px: "12px !important",
          mx: 0,
          my: 0,
          py: "10px",
          borderRadius: "10px",
          _hover: {
            bg: "#0c0b0b",
          },
        },
      }}
    >
      {children}
    </Flex>
  );
};
