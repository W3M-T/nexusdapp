// Login component wraps all auth services in one place
// You can always use only one of them if needed
import { Box, Stack } from "@chakra-ui/react";
import { DappUI, useGetLoginInfo } from "@elrondnetwork/dapp-core";
import styled from "@emotion/styled";
import { memo } from "react";
import { route } from "../../utils/routes";
import { ActionButton } from "./ActionButton";

const mobileText = (
  <ActionButton as={"div"} isFullWidth borderRadius={"7px !important"}>
    Maiar Mobile App
  </ActionButton>
);
const desktopText = (
  <Box as={"div"} py="6px" borderRadius={"7px !important"}>
    {" "}
    Maiar Browser Extension
  </Box>
);
const webText = (
  <ActionButton as={"div"} isFullWidth borderRadius={"7px !important"}>
    Elrond Web Wallet
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
              as={DappUI.WebWalletLoginButton}
              shouldRenderDefaultCss={false}
              loginButtonText={webText}
              callbackRoute={route.home.route}
              className="DappUIButton"
              w="100%"
            />
            <ActionButton w={"full"} px={0} py={0}>
              <Box
                as={DappUI.ExtensionLoginButton}
                shouldRenderDefaultCss={false}
                loginButtonText={desktopText}
                className="DappUIButton Extension"
                buttonClass="buttonLogin"
                w="100%"
              />
            </ActionButton>
            <Box
              as={DappUI.WalletConnectLoginButton}
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
  .dapp-core-ui-component {
    display: block;
    width: 100%;
    border-radius: 10px;
  }
  .DappUIButton {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dapp-core-ui-component a {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white !important;
    padding: 6px 0;
  }
  .dapp-core-ui-component a div div {
    width: auto;
  }
  .dapp-core-ui-component a svg {
    width: auto;
    margin-left: 10px;
  }
`;
