import { Account, Address } from "@elrondnetwork/erdjs";
import { ExtensionProvider } from "@elrondnetwork/erdjs-extension-provider";
import { HWProvider } from "@elrondnetwork/erdjs-hw-provider";
import { ApiNetworkProvider } from "@elrondnetwork/erdjs-network-providers";
import { WalletConnectProvider } from "@elrondnetwork/erdjs-wallet-connect-provider";
import { WalletProvider } from "@elrondnetwork/erdjs-web-wallet-provider";
import { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import {
  chainType,
  DAPP_INIT_ROUTE,
  networkConfig,
} from "../../../config/network";
import {
  accountState,
  clearAuthStates,
  loginInfoState,
  setAccountState,
  setLoggingInState,
  setLoginInfoState,
} from "../../store/auth";
import * as network from "../../store/network";
import { clearDappProvider } from "../../store/network";
import { LoginMethodsEnum } from "../../types/enums";
import { DappProvider } from "../../types/network";
import { getBridgeAddressFromNetwork } from "../../utils/bridgeAddress";
import { errorParse } from "../../utils/errorParse";
import { isLoginExpired } from "../../utils/expiresAt";
import { getParamFromUrl } from "../../utils/getParamFromUrl";
import { WcOnLogin } from "../../utils/walletConnectCbs";
import { useEffectOnlyOnUpdate } from "../tools/useEffectOnlyOnUpdate";
import { useLogout } from "./useLogout";

export const useElrondNetworkSync = () => {
  const { logout } = useLogout();
  const [accountDone, setAccountDone] = useState(false);
  const [loginInfoDone, setLoginInfoDone] = useState(false);

  const accountSnap = useSnapshot(accountState);
  const loginInfoSnap = useSnapshot(loginInfoState);

  const dappProviderRef = useRef<DappProvider>();
  const apiNetworkProviderRef = useRef<ApiNetworkProvider>();

  useEffect(() => {
    const accountStorage = localStorage.getItem("elrond_dapp__account");
    const parsedStorage = accountStorage ? JSON.parse(accountStorage) : null;

    if (!parsedStorage?.address) {
      setLoggingInState("pending", false);
      return;
    }

    setAccountState("address", parsedStorage.address);
    setAccountState("nonce", parsedStorage.nonce);
    setAccountState("balance", parsedStorage.balance);
    setAccountState("addressIndex", parsedStorage.addressIndex);
    setAccountState("username", parsedStorage.username);
    setAccountDone(true);
  }, []);

  useEffect(() => {
    const loginInfoStorage = localStorage.getItem("elrond_dapp__loginInfo");
    if (loginInfoStorage) {
      const parsedStorage = JSON.parse(loginInfoStorage);
      setLoginInfoState("loginMethod", parsedStorage.loginMethod);
      setLoginInfoState("expires", parsedStorage.expires);
      setLoginInfoState("loginToken", parsedStorage.loginToken);
      setLoginInfoState("signature", parsedStorage.signature);
      setLoginInfoDone(true);
    }
  }, []);

  useEffectOnlyOnUpdate(() => {
    localStorage.setItem("elrond_dapp__account", JSON.stringify(accountSnap));
  }, [
    accountSnap.address,
    accountSnap.nonce,
    accountSnap.balance,
    accountSnap.addressIndex,
    accountSnap.username,
  ]);

  useEffectOnlyOnUpdate(() => {
    localStorage.setItem(
      "elrond_dapp__loginInfo",
      JSON.stringify(loginInfoSnap)
    );
  }, [
    loginInfoSnap.loginMethod,
    loginInfoSnap.expires,
    loginInfoSnap.loginToken,
    loginInfoSnap.signature,
  ]);

  // Proxy provider sync
  useEffect(() => {
    const askForApiNetworkProvider = async () => {
      let apiNetworkProvider = apiNetworkProviderRef?.current;
      if (!apiNetworkProvider) {
        const publicApiEndpoint = process.env.NEXT_PUBLIC_ELROND_API;
        if (publicApiEndpoint) {
          apiNetworkProvider = new ApiNetworkProvider(publicApiEndpoint, {
            timeout: Number(networkConfig[chainType].apiTimeout),
          });
          apiNetworkProviderRef.current = apiNetworkProvider;
          network.setNetworkState("apiNetworkProvider", apiNetworkProvider);
        } else {
          throw Error(
            "There is no public api configured! Check env vars and README file."
          );
        }
      }
    };
    askForApiNetworkProvider();
  }, []);

  // Dapp Providers sync
  // Each provider has a little bit different logic on sync
  useEffectOnlyOnUpdate(() => {
    const askForDappProvider = async () => {
      const loginMethod = loginInfoSnap.loginMethod;
      const loginExpires = loginInfoSnap.expires;
      let dappProvider = dappProviderRef?.current;

      if (loginExpires && isLoginExpired(loginExpires)) {
        clearAuthStates();
        clearDappProvider();
        localStorage.clear();
        return;
      }

      if (!dappProvider) {
        switch (loginMethod) {
          // Browser extension auth (Maiar defi wallet)
          case LoginMethodsEnum.extension: {
            dappProvider = ExtensionProvider.getInstance();
            try {
              await dappProvider.init();

              if (!dappProvider.isInitialized()) {
                console.warn(
                  "Something went wrong trying to sync with the extension! Try to connect again."
                );
                return;
              } else {
                dappProvider.setAddress(accountSnap.address);
                network.setNetworkState("dappProvider", dappProvider);
              }
            } catch (e) {
              console.warn("Can't initialize the Dapp Provider!");
            }
            break;
          }
          // Maiar mobile app auth
          case LoginMethodsEnum.walletconnect: {
            const providerHandlers = {
              onClientLogin: () =>
                WcOnLogin(
                  apiNetworkProviderRef?.current,
                  dappProviderRef?.current as WalletConnectProvider
                ),
              onClientLogout: () =>
                logout({ dappProvider: dappProviderRef?.current }),
            };

            const bridgeAddress = getBridgeAddressFromNetwork(
              networkConfig[chainType].walletConnectBridgeAddresses
            );
            dappProvider = new WalletConnectProvider(
              bridgeAddress,
              providerHandlers
            );
            dappProviderRef.current = dappProvider;
            try {
              await dappProvider.init();
              if (!dappProvider.isInitialized()) {
                console.warn(
                  "Something went wrong trying to sync with the Maiar app!"
                );
              } else {
                network.setNetworkState("dappProvider", dappProvider);
              }
            } catch {
              console.warn("Can't initialize the Dapp Provider!");
            }
            break;
          }
          // Web wallet auth
          case LoginMethodsEnum.wallet: {
            const address = getParamFromUrl("address") || accountSnap?.address;
            const signature = getParamFromUrl("signature");
            if (signature) {
              setLoginInfoState("signature", signature);
            }
            if (address) {
              dappProvider = new WalletProvider(
                `${networkConfig[chainType].walletAddress}${DAPP_INIT_ROUTE}`
              );
              dappProviderRef.current = dappProvider;
              network.setNetworkState("dappProvider", dappProvider);
              const userAddressInstance = new Address(address);
              const userAccountInstance = new Account(userAddressInstance);
              setAccountState("address", userAccountInstance.address.bech32());
            }
            break;
          }

          case LoginMethodsEnum.ledger: {
            dappProvider = new HWProvider();
            dappProviderRef.current = dappProvider;
            network.setNetworkState<DappProvider>("dappProvider", dappProvider);
            try {
              await dappProvider.init();
              if (!dappProvider.isInitialized()) {
                console.warn(
                  "Something went wrong trying to sync with the Ledger!"
                );
              } else {
                dappProvider.setAddressIndex(accountSnap.addressIndex);
                network.setNetworkState<DappProvider>(
                  "dappProvider",
                  dappProvider
                );
              }
            } catch {
              console.warn("Can't initialize the Dapp Provider!");
            }
            break;
          }
        }
      }
    };
    askForDappProvider();
  }, [accountDone, loginInfoDone]);

  // Account network sync
  useEffectOnlyOnUpdate(() => {
    const askForAccount = async () => {
      const address = accountSnap?.address;
      const loginExpires = loginInfoSnap.expires;
      const apiNetworkProvider = apiNetworkProviderRef.current;
      const loginExpired = loginExpires && isLoginExpired(loginExpires);
      if (!loginExpired && address && apiNetworkProvider) {
        const userAddressInstance = new Address(address);
        interface ICustomAccount extends Account {
          username?: string;
        }
        const userAccountInstance: ICustomAccount = new Account(
          userAddressInstance
        );
        try {
          const userAccountOnNetwork = await apiNetworkProvider.getAccount(
            userAddressInstance
          );
          userAccountInstance.update(userAccountOnNetwork);

          setAccountState("address", address);
          setAccountState("nonce", userAccountInstance.nonce.valueOf());
          setAccountState("balance", userAccountInstance.balance.toString());
          setAccountState("username", userAccountOnNetwork.userName.toString());
          setLoggingInState("loggedIn", Boolean(address));
        } catch (e) {
          const err = errorParse(e);
          console.warn(
            `Something went wrong trying to synchronize the user account: ${err}`
          );
        }
      }
      setLoggingInState("pending", false);
    };
    askForAccount();
  }, [accountSnap?.address]);
};
