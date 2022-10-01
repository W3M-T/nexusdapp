import { Box, Center, Flex, Text, useDisclosure } from "@chakra-ui/react";
import {
  Address,
  AddressType,
  AddressValue,
  BigUIntType,
  BigUIntValue,
  BytesType,
  BytesValue,
  Field,
  FieldDefinition,
  Struct,
  StructType,
  TokenIdentifierType,
  TokenIdentifierValue,
  U32Type,
  U32Value,
  U64Type,
  U64Value,
} from "@elrondnetwork/erdjs/out";
import BigNumber from "bignumber.js";
import dynamic from "next/dynamic";
import { ActionButton } from "../../../components/tools/ActionButton";
import NextImg from "../../../components/ui/NextImg";
import { selectedNetwork } from "../../../config/network";
import { useScTransaction } from "../../../hooks/core/useScTransaction";
import { IExistingPool } from "../../../redux/types/pools.interface";
import { INft } from "../../../redux/types/tokens.interface";
import { ESDTNFTTransfer } from "../../../services/sc/calls";
import { formatBalance } from "../../../utils/formatBalance";
import { formatTokenI } from "../../../utils/formatTokenIdentifier";
import { TxCb } from "../../../utils/txCallback";

const SelectNftModal = dynamic(
  () => import("../SelectNftModal/SelectNftModal")
);

interface IProps {
  pool: IExistingPool;
}
const PoolItem = ({ pool }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { triggerTx } = useScTransaction({
    cb: TxCb,
  });
  const handleStake = (nft: INft) => {
    const poolType = new StructType("pool", [
      new FieldDefinition("creation_timestamp", "", new U64Type()),
      new FieldDefinition("creator", "", new AddressType()),
      new FieldDefinition("collection", "", new TokenIdentifierType()),
      new FieldDefinition("nr_of_nfts", "", new U32Type()),
      new FieldDefinition("reward_token", "", new BytesType()),
      new FieldDefinition("reward_amount", "", new BigUIntType()),
    ]);

    const poolStruct = new Struct(poolType, [
      new Field(
        new U64Value(new BigNumber(pool.timestam)),
        "creation_timestamp"
      ),
      new Field(new AddressValue(new Address(pool.creator)), "creator"),
      new Field(new TokenIdentifierValue(pool.collection), "collection"),
      new Field(new U32Value(new BigNumber(pool.nfts)), "nr_of_nfts"),
      new Field(BytesValue.fromUTF8(pool.token), "reward_token"),
      new Field(new BigUIntValue(new BigNumber(pool.rewards)), "reward_amount"),
    ]);

    triggerTx(
      ESDTNFTTransfer(
        "stakeNft",
        "",
        undefined,
        nft,
        selectedNetwork.contractAddr.nftsStaking,
        70000000,
        [
          poolStruct,
          BytesValue.fromUTF8(nft?.media[0]?.url || ""),
          BytesValue.fromUTF8(nft?.name || ""),
        ],
        1
      )
    );
  };
  const date = new Date(pool.timestam * 1000);
  return (
    <Flex
      border="1px solid white"
      borderRadius={"lg"}
      p={5}
      gap={8}
      minW="300px"
      justifyContent={{ sm: "center", md: "space-between" }}
      alignItems={{ sm: "center", md: "flex-start" }}
      flexDir={{ sm: "column", md: "row" }}
    >
      <Center h="full">
        <NextImg
          alt={"nft"}
          width={"100px"}
          sx={{
            span: {
              borderRadius: "full",
            },
          }}
          src={pool.url} // use normal <img> attributes as props
          nextProps={{
            height: 490,
            width: 490,
          }}
        />
      </Center>
      <Center flexDir={"column"} alignItems="flex-start">
        <Text mb={2} fontWeight="bold" fontSize={"2xl"}>
          {pool.poolName}
        </Text>
        <Flex flexDir={"column"} gap={1}>
          <Text>
            <Box as="span" fontWeight={"bold"}>
              {" "}
              Daily Rewards :
            </Box>{" "}
            {formatBalance({ balance: pool.rewards })}{" "}
            {formatTokenI(pool.token)}{" "}
          </Text>
          <Text>
            {" "}
            <Box as="span" fontWeight={"bold"}>
              Created :{" "}
            </Box>{" "}
            {date.toLocaleDateString("en-US")}{" "}
          </Text>
        </Flex>
        <Text mb={2}>
          {" "}
          <Box as="span" fontWeight={"bold"}>
            Total Nfts :{" "}
          </Box>{" "}
          {pool.nftsNow} / {pool.nfts}{" "}
        </Text>
        <ActionButton
          borderRadius={"full"}
          fontSize="xs"
          py={1}
          onClick={onOpen}
        >
          Stake
        </ActionButton>
      </Center>
      {isOpen && (
        <SelectNftModal
          isOpenModal={isOpen}
          onCloseModal={onClose}
          onConfirm={handleStake}
          colelction={pool.collection}
        />
      )}
    </Flex>
  );
};

export default PoolItem;
