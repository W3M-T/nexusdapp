import { Address, IAddress } from "@multiversx/sdk-core/out";
import { ProxyNetworkProvider } from "@multiversx/sdk-network-providers";
import { chainType, networkConfig } from "../../../config/network";
import nftstakingpoolsAbi from "../../../public/abi/nftstakingpools.abi.json";
export const abiPath = "/abi";

const { gatewayAddress, contractAddr } = networkConfig[chainType];

export const provider = new ProxyNetworkProvider(gatewayAddress, {
  timeout: 30000,
});

export type WORKSPACES = "efwsd" | "NftStakingPoolsWsp";

export const getInterface = (workspace: WORKSPACES) => {
  let address: IAddress = null;
  let abiUrl: unknown = null;
  let implementsInterfaces = "";
  let simpleAddress = "";

  switch (workspace) {
    case "NftStakingPoolsWsp": {
      simpleAddress = contractAddr.nftsStaking;
      address = new Address(simpleAddress);
      abiUrl = nftstakingpoolsAbi;
      implementsInterfaces = "NftStakingPools";
      break;
    }
    default:
      break;
  }

  return { address, abiUrl, implementsInterfaces, simpleAddress };
};
