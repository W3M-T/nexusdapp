import { Center, Flex, Text, useDisclosure } from "@chakra-ui/react";
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
import { selectedNetwork } from "../../../config/network";
import NextImg from "../../../shared/components/ui/NextImg";
import { useAppSelector } from "../../../shared/hooks/core/useRedux";
import { useScTransaction } from "../../../shared/hooks/core/useScTransaction";
import { selectHasStakedForAEN } from "../../../shared/redux/slices/pools";
import { IExistingPool } from "../../../shared/redux/types/pools.interface";
import { INft } from "../../../shared/redux/types/tokens.interface";
import { ESDTNFTTransfer } from "../../../shared/services/sc/calls";
import { TxCb } from "../../../shared/utils/txCallback";

const HomePoolModal = dynamic(() => import("./SelectNftModal"));

interface IProps {
  pool: IExistingPool;
  small?: boolean;
}
const HomePool = ({ pool, small }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const hasStakenForAEN = useAppSelector(selectHasStakedForAEN);
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

    if (nft) {
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
    }
  };

  return (
    <Flex
      border="1px solid white"
      borderRadius={"lg"}
      p={{ sm: 2, md: 5 }}
      h="full"
      gap={8}
      justifyContent={{ sm: "center", md: "space-between" }}
      alignItems={{ sm: "center", md: "flex-start" }}
      flexDir={"column"}
      onClick={onOpen}
      cursor="pointer"
    >
      <Center h="full" w="full">
        <NextImg
          alt={"nft"}
          width={"full"}
          maxW="250px"
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
      {!small && (
        <Center flexDir={"column"} alignItems="flex-start" flex={1} w="full">
          <Text
            mb={2}
            fontWeight="bold"
            textAlign={"center"}
            fontSize={"xs"}
            w="full"
          >
            {pool.poolName}
          </Text>
        </Center>
      )}
      {isOpen && (
        <HomePoolModal
          isOpenModal={isOpen}
          onCloseModal={onClose}
          onConfirm={handleStake}
          pool={pool}
          hasStakenForAEN={hasStakenForAEN.data}
        />
      )}
    </Flex>
  );
};

export default HomePool;
