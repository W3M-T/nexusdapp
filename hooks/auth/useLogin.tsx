import { Login } from "../../types/account";
import { LoginMethodsEnum } from "../../types/enums";
import { useExtensionLogin } from "./useExtensionLogin";
import { useLedgerLogin } from "./useLedgerLogin";
import { useMobileAppLogin } from "./useMobileAppLogin";
import { useWebWalletLogin } from "./useWebWalletLogin";

export const useLogin = (params?: Login) => {
  const {
    login: webLogin,
    isLoggedIn: webIsLoggedIn,
    isLoggingIn: webIsLoggingIn,
    error: webLoginError,
  } = useWebWalletLogin(params);

  const {
    login: mobileLogin,
    isLoggedIn: mobileIsLoggedIn,
    isLoggingIn: mobileIsLoggingIn,
    walletConnectUri,
    error: mobileLoginError,
  } = useMobileAppLogin(params);

  const {
    login: extensionLogin,
    isLoggedIn: extensionIsLoggedIn,
    isLoggingIn: extensionIsLoggingIn,
    error: extensionLoginError,
  } = useExtensionLogin(params);

  const {
    login: ledgerLogin,
    isLoggedIn: ledgerIsLoggedIn,
    isLoggingIn: ledgerIsLoggingIn,
    error: ledgerLoginError,
    getHWAccounts,
  } = useLedgerLogin(params);

  const login = async (type: LoginMethodsEnum, ledgerAccountIndex?: number) => {
    if (type === LoginMethodsEnum.extension) {
      await extensionLogin();
    }
    if (type === LoginMethodsEnum.wallet) {
      await webLogin();
    }
    if (type === LoginMethodsEnum.walletconnect) {
      await mobileLogin();
    }
    if (type === LoginMethodsEnum.ledger) {
      await ledgerLogin(ledgerAccountIndex);
    }
    return null;
  };

  return {
    walletConnectUri,
    getHWAccounts,
    login,
    isLoggedIn:
      webIsLoggedIn ||
      mobileIsLoggedIn ||
      extensionIsLoggedIn ||
      ledgerIsLoggedIn,
    isLoggingIn:
      webIsLoggingIn ||
      mobileIsLoggingIn ||
      extensionIsLoggingIn ||
      ledgerIsLoggingIn,
    error:
      webLoginError ||
      mobileLoginError ||
      extensionLoginError ||
      ledgerLoginError,
  };
};
