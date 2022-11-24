import { selectedNetwork } from "../../../../config/network";
import { scQuery } from "../queries";

//fetch sc admin address from the contract or return sc address
export const fetchScAdminAddress = async () => {
  let adminAddress = selectedNetwork.contractAddr.nftsStaking;

  try {
    const data = await scQuery("NftStakingPoolsWsp", "getOwner", []);
    adminAddress = data.firstValue.valueOf();
  } catch (error) {
    console.log(error);
  }

  return adminAddress;
};
