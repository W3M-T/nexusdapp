import { ProxyNetworkProvider } from "@elrondnetwork/erdjs-network-providers/out";
import { Address, IAddress } from "@elrondnetwork/erdjs/out";
import { chainType, networkConfig } from "../../config/network";

export const abiPath = "/abi";

const { gatewayAddress, contractAddr } = networkConfig[chainType];

export const provider = new ProxyNetworkProvider(gatewayAddress, {
  timeout: 30000,
});

export const getInterface = (workspace) => {
  let address: IAddress = null;
  let abiUrl = "";
  let implementsInterfaces = "";
  let simpleAddress = "";

  switch (workspace) {
    case NftStakingPoolsWsp: {
      simpleAddress = contractAddr.nftsStaking;
      address = new Address(simpleAddress);
      abiUrl = abiPath + "/nftstakingpools.abi.json";
      implementsInterfaces = "NftStakingPools";

      break;
    }
    default:
      break;
  }

  return { address, abiUrl, implementsInterfaces, simpleAddress };
};

export const NftStakingPoolsWsp = "NftStakingPoolsWsp";
