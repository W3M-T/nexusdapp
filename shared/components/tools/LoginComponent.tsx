// Login component wraps all auth services in one place
// You can always use only one of them if needed
import { Flex, Stack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks/account/useGetLoginInfo";
import { memo } from "react";
import { actualHomepage, route } from "../../utils/routes";
import dynamic from "next/dynamic";
// import { WebWalletLoginButtonPropsType } from "@multiversx/sdk-dapp/UI/webWallet/WebWalletLoginButton";

const ExtensionLoginButton = dynamic(
  async () => {
    return (
      await import("@multiversx/sdk-dapp/UI/extension/ExtensionLoginButton")
    ).ExtensionLoginButton;
  },
  { ssr: false },
);

const WalletConnectLoginButton = dynamic(
  async () => {
    return (
      await import(
        "@multiversx/sdk-dapp/UI/walletConnect/WalletConnectLoginButton"
      )
    ).WalletConnectLoginButton;
  },
  { ssr: false },
);

const LedgerLoginButton = dynamic(
  async () => {
    return (await import("@multiversx/sdk-dapp/UI/ledger/LedgerLoginButton"))
      .LedgerLoginButton;
  },
  { ssr: false },
);

const WebWalletLoginButton = dynamic(
  async () => {
    return (
      await import("@multiversx/sdk-dapp/UI/webWallet/WebWalletLoginButton")
    ).WebWalletLoginButton;
  },
  { ssr: false },
);

const XaliasLoginButton = dynamic(
  async () => {
    return (
      await import(
        "@multiversx/sdk-dapp/UI/webWallet/XaliasLoginButton/XaliasLoginButton"
      )
    ).XaliasLoginButton;
  },
  { ssr: false },
);

// button
// <Flex
//   w="full"
//   align={"center"}
//   justifyContent="center"
//   borderRadius={"7px !important"}
// >
//   Text
// </Flex>

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
                // callbackRoute={actualHomepage.route}
                // shouldRenderDefaultCss={false}
                loginButtonText={"xPortal Mobile App"}
                isWalletConnectV2={true}
              />
            </LoginMethod>

            <LoginMethod>
              <ExtensionLoginButton
                // callbackRoute={actualHomepage.route}
                loginButtonText={"DeFi Extension"}
              />
            </LoginMethod>
            <LoginMethod>
              <WebWalletLoginButton
                // callbackRoute={actualHomepage.route}
                // shouldRenderDefaultCss={false}
                loginButtonText={"MultiversX Web Wallet"}
                nativeAuth
              />
            </LoginMethod>
            <LoginMethod>
              <XaliasLoginButton
                // callbackRoute={actualHomepage.route}
                // shouldRenderDefaultCss={false}
                loginButtonText={"xAlias Wallet"}
                nativeAuth
              />
            </LoginMethod>
            <LoginMethod>
              {" "}
              <LedgerLoginButton
                // callbackRoute={actualHomepage.route}
                // shouldRenderDefaultCss={false}
                loginButtonText={"Ledger"}
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
