import {
  Box,
  Center,
  Flex,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { transactionServices } from "@elrondnetwork/dapp-core";
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
import { useState } from "react";
import { useAppSelector } from "../../hooks/core/useRedux";
import {
  selectCanUserStake,
  selectHasStakedForAEN,
  selectUserStaked,
} from "../../redux/slices/pools";
import { IExistingPool } from "../../redux/types/pools.interface";
import { INft } from "../../redux/types/tokens.interface";
import { stakeNfts } from "../../services/sc/calls/multiTx/stake";
import { formatBalance } from "../../utils/formatBalance";
import { formatTokenI } from "../../utils/formatTokenIdentifier";
import { ActionButton } from "../tools/ActionButton";
import { Authenticated } from "../tools/Authenticated";
import NextImg from "./NextImg";
const SelectNftModal = dynamic(
  () => import("../../../views/ViewPools/SelectNftModal/SelectNftModal")
);

interface IProps {
  pool: IExistingPool;
}
const PoolItem = ({ pool }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const hasStakenForAEN = useAppSelector(selectHasStakedForAEN);
  const needToUnstake = useAppSelector(selectCanUserStake);

  const nftsStaked = useAppSelector(selectUserStaked);
  const [sessionId, setSessionId] = useState();
  const onSuccess = () => {
    window.location.reload();
  };
  const transactionStatus = transactionServices.useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess: onSuccess,
  });

  const handleStake = async (nfts: INft[]) => {
    if (nfts.length > 0 && nfts.length <= 10) {
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
        new Field(
          new BigUIntValue(new BigNumber(pool.rewards)),
          "reward_amount"
        ),
      ]);

      const res: any = await stakeNfts(
        nfts,
        poolStruct,
        nftsStaked.data.nfts.length
      );
      setSessionId(res.sessionId);
    }
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
          width={"full"}
          minW="100px"
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
      <Center flexDir={"column"} alignItems="flex-start" flex={1}>
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
            Total NFTs :{" "}
          </Box>{" "}
          {pool.nftsNow} / {pool.nfts}{" "}
        </Text>
        <Authenticated>
          <Tooltip
            label={
              needToUnstake
                ? "You must first unstake your NFTs from completed pools (marked red)."
                : "Make sure you have staked at least one NFT of PARROT, EXPLORER, or TEDDY1 collections."
            }
            borderRadius={"5px"}
            isDisabled={
              !(pool.collection === "" && !hasStakenForAEN.data) &&
              !needToUnstake.data
            }
          >
            <Box>
              {nftsStaked.status === "success" && (
                <ActionButton
                  borderRadius={"full"}
                  fontSize="xs"
                  py={1}
                  disabled={
                    (pool.collection === "" && !hasStakenForAEN.data) ||
                    needToUnstake.data
                  }
                  onClick={onOpen}
                >
                  Stake
                </ActionButton>
              )}
            </Box>
          </Tooltip>
        </Authenticated>
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
