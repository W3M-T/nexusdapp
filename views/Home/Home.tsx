import { Center, Flex, Heading } from "@chakra-ui/react";
import {
  Address,
  BigUIntValue,
  BytesValue,
  ContractFunction,
  Transaction,
  TransactionPayload,
} from "@elrondnetwork/erdjs/out";
import BigNumber from "bignumber.js";
import "swiper/css";
import { selectedNetwork } from "../../config/network";
import { ActionButton } from "../../shared/components/tools/ActionButton";
import { Authenticated } from "../../shared/components/tools/Authenticated";
import { MainLayout } from "../../shared/components/ui/MainLayout";
import { store } from "../../shared/redux/store";
import { sendMultipleTransactions } from "../../shared/services/sc/calls";
import MyNfts from "./MyNfts/MyNfts";
import Pools from "./Pools/Pools";
import StakedNfts from "./StakedNfts/StakedNfts";

const Home = () => {
  const handleTx = () => {
    const payment = 5;
    const sender = store.getState().settings.userAddress;
    const senderAddress = new Address(sender);
    const transactions = [];
    const tokenIdentifier = selectedNetwork.tokens.MERMAID.identifier;
    const multiplyier = Math.pow(10, selectedNetwork.tokens.MERMAID.decimals);
    const finalValue = Number(payment) * multiplyier;
    const payload2 = TransactionPayload.contractCall()
      .setFunction(new ContractFunction("ESDTTransfer"))
      .setArgs([
        BytesValue.fromUTF8(tokenIdentifier),
        new BigUIntValue(new BigNumber(finalValue)),
        BytesValue.fromUTF8("fee"),
      ])
      .build();

    const tx = new Transaction({
      sender: senderAddress,
      receiver: new Address(
        "erd10fq6af9vkr6usqc4wf9adsqhdvfz7d0d57pkag5ecmac7486zncsunge5m"
      ),
      value: 0,
      data: payload2,

      gasLimit: 7000000,
      chainID: selectedNetwork.shortId,
    });

    transactions.push(tx);
    sendMultipleTransactions({ txs: transactions });
  };

  return (
    <MainLayout metaTitle="Home">
      <Authenticated
        fallback={
          <Center mt="120px">
            {" "}
            <Heading as="h1">
              Connect your wallet to view your staked NFTs!
            </Heading>
          </Center>
        }
      >
        <Flex mt={8} flexDir="column" gap="40px">
          <ActionButton onClick={handleTx}>CLick to tx</ActionButton>
          <MyNfts />
          <StakedNfts />
          <Pools />
        </Flex>
      </Authenticated>
    </MainLayout>
  );
};

export default Home;
