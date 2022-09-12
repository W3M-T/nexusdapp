import { WalletProvider } from "@elrondnetwork/erdjs-web-wallet-provider";
import {
  chainType,
  DAPP_INIT_ROUTE,
  networkConfig,
} from "../../config/network";
import { setLoggingInState, setLoginInfoState } from "../../store/auth";
import { Login } from "../../types/account";
import { LoginMethodsEnum } from "../../types/enums";
import { errorParse } from "../../utils/errorParse";
import { getNewLoginExpiresTimestamp } from "../../utils/expiresAt";
import { useLoggingIn } from "./useLoggingIn";
import { useLogout } from "./useLogout";

export const useWebWalletLogin = (params?: Login) => {
  const { logout } = useLogout();
  const { isLoggedIn, isLoggingIn, error } = useLoggingIn();

  const login = async () => {
    setLoggingInState("pending", true);

    const providerInstance = new WalletProvider(
      `${networkConfig[chainType].walletAddress}${DAPP_INIT_ROUTE}`
    );

    const callbackUrl: string =
      typeof window !== "undefined"
        ? encodeURIComponent(
            `${window.location.origin}${params?.callbackRoute || "/"}`
          )
        : "/";
    const providerLoginData = {
      callbackUrl,
      ...(params?.token && { token: params?.token }),
    };

    try {
      setLoginInfoState("loginMethod", LoginMethodsEnum.wallet);
      await providerInstance.login(providerLoginData);
      setLoginInfoState("expires", getNewLoginExpiresTimestamp());
      if (params?.token) {
        setLoginInfoState("loginToken", params.token);
      }
    } catch (e) {
      const err = errorParse(e);
      setLoggingInState("error", `Error logging in ${err}`);
      setLoginInfoState("loginMethod", "");
    } finally {
      setLoggingInState("pending", false);
    }
  };

  return {
    login,
    isLoggedIn,
    isLoggingIn,
    error,
    logout,
  };
};

export default useWebWalletLogin;
