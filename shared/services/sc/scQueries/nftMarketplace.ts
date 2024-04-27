import {
  Address, AddressValue,
} from "@multiversx/sdk-core/out";
import { store } from "../../../redux/store";
import { scQuery, scSimpleQuery } from "../queries";
import { IFaucetInfo } from "../../../redux/types/faucets.interface";
import { chainType, networkConfig } from "../../../../config/network";
import { IListingsInfo } from "../../../redux/types/nftMarketplace.interface";

export const fetchListedNfts = async ([address] : [string]) => {
  try {
    const res = await scQuery("NftMarketplaceWsp", "getListings", address == "" ? [] : [
      new AddressValue(new Address(address))
    ]);

    const { firstValue } = res;
    const data = firstValue.valueOf();

    let finalData: IListingsInfo[] = data.map((listing) => {
      return {
        listingId: listing[0].toNumber(),
        nft_token: listing[1].toString(),
        nft_nonce: listing[2].toNumber(),
        nft_amount: listing[3].toNumber(),
        creator: listing[4].toString(),
        price: listing[5].toNumber(),
        timestamp: listing[6].toNumber(),
      };
    });
    
    return finalData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchNftMarketplaceFee = async () => {
  try {
    const res = await scQuery("NftMarketplaceWsp", "getFeePercentage", []);

    const { firstValue } = res;
    const data = firstValue.valueOf();
    
    return data.toNumber() / 100;
    
  } catch (error) {
    console.log(error);
    return null;
  }
};
