import {
  Address, AddressValue,
} from "@multiversx/sdk-core/out";
import { store } from "../../../redux/store";
import { scQuery } from "../queries";
import { IFaucetInfo } from "../../../redux/types/faucets.interface";

export const fetchFaucetInfo = async ([_key, faucet, address]: [string, string, string]) => {
  let wsp;
  if (faucet == "nexus") {
    wsp = "FaucetNexusWsp";
  } else if (faucet == "mermaid") {
    wsp = "FaucetMermaidWsp";
  } else {
    return null;
  }

  try {
    const res = await scQuery(wsp, "getFaucetInfo", [new AddressValue(new Address(address))]);
    const { firstValue } = res;
    const data = firstValue.valueOf();

    let finalData: IFaucetInfo = {
      token: data.token,
      amount: data.amount.toNumber(),
      availableBalance: data.available_balance.toNumber(),
      aggregatedEpochs: data.aggregated_epochs.toNumber(),
      currentEpoch: data.current_epoch.toNumber(),
      userLastClaimEpoch: data.user_last_claim_epoch.toNumber(),
      userClaimable: data.user_claimable.toNumber(),
      canUserClaim: data.can_user_claim,
      userClaimed: data.user_claimed.toNumber(),
      totalClaimed: data.total_claimed.toNumber(),
    }
    
    return finalData;
  } catch (error) {
    console.log(error);
    return null;
  }
};
