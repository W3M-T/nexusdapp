import { Address, IAddress } from "@multiversx/sdk-core/out";
import { ProxyNetworkProvider } from "@multiversx/sdk-network-providers";
import { chainType, networkConfig } from "../../../config/network";
import nftstakingpoolsAbi from "../../../public/abi/nftstakingpools.abi.json";
import faucetAbi from "../../../public/abi/faucet.abi.json";
export const abiPath = "/abi";

const { gatewayAddress, contractAddr } = networkConfig[chainType];

export const provider = new ProxyNetworkProvider(gatewayAddress, {
  timeout: 30000,
});

export type WORKSPACES = "NftStakingPoolsWsp" | "FaucetNexusWsp" | "FaucetMermaidWsp";

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
    case "FaucetNexusWsp": {
      simpleAddress = contractAddr.faucetNexus;
      address = new Address(simpleAddress);
      abiUrl = faucetAbi;
      implementsInterfaces = "FaucetNexus";
      break;
    }
    case "FaucetMermaidWsp": {
      simpleAddress = contractAddr.faucetMermaid;
      address = new Address(simpleAddress);
      abiUrl = faucetAbi;
      implementsInterfaces = "FaucetMermaid";
      break;
    }
    default:
      break;
  }

  return { address, abiUrl, implementsInterfaces, simpleAddress };
};
