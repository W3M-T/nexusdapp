import {
  Address,
  AddressValue,
  BigUIntValue,
  BytesValue,
  ContractFunction,
  Transaction,
  TransactionPayload,
} from "@elrondnetwork/erdjs/out";
import BigNumber from "bignumber.js";
import { sendMultipleTransactions } from "..";
import { selectedNetwork } from "../../../../../config/network";
import { store } from "../../../../redux/store";
import { INft } from "../../../../redux/types/tokens.interface";

export const stakeNfts = async (
  nfts: INft[],
  poolStruct,
  amountNftsStaked: number
) => {
  let payment = 0;

  if (nfts.length > 1) {
    payment = 0.001;
  }

  if (amountNftsStaked >= 10) {
    payment = nfts.length * 0.001;
  }

  const transactions: Transaction[] = [];

  const Args: any = [
    new AddressValue(new Address(selectedNetwork.contractAddr.nftsStaking)),
    new BigUIntValue(new BigNumber(nfts.length)),
  ];

  const sender = store.getState().settings.userAddress;
  const senderAddress = new Address(sender);
  for (let i = 0; i < nfts.length; i++) {
    const nft = nfts[i];

    const payload = TransactionPayload.contractCall()
      .setFunction(new ContractFunction("ESDTNFTTransfer"))
      .setArgs([
        BytesValue.fromUTF8(nft.collection),
        new BigUIntValue(new BigNumber(nft.nonce)),
        new BigUIntValue(new BigNumber(1)),
        new AddressValue(new Address(selectedNetwork.contractAddr.nftsStaking)),
        BytesValue.fromUTF8("stakeNft"),
        poolStruct,
        BytesValue.fromUTF8(nft?.media[0]?.url || ""),
        BytesValue.fromUTF8(nft?.name || ""),
      ])
      .build();

    const tx = new Transaction({
      sender: senderAddress,
      receiver: senderAddress,
      value: 0,
      data: payload,
      gasLimit: 70000000,
      chainID: selectedNetwork.shortId,
    });

    transactions.push(tx);
  }

  if (payment > 0) {
    const tx = new Transaction({
      sender: senderAddress,
      receiver: new Address(selectedNetwork.contractAddr.nftsStaking),
      value: payment * Math.pow(10, 18),

      gasLimit: 7000000,
      chainID: selectedNetwork.shortId,
    });
    console.log("tx", tx);

    transactions.push(tx);
  }
  return await sendMultipleTransactions({ txs: transactions });
};
