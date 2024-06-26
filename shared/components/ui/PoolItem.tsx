import {
  Box,
  Center,
  Flex,
  HStack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
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
} from "@multiversx/sdk-core/out";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks/transactions/useTrackTransactionStatus";
import BigNumber from "bignumber.js";
import { addDays } from "date-fns";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/core/useRedux";
import {
  selectCanUserStake,
  selectHasStakedForAEN,
  selectRewardsTokens,
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
import { customColors } from "../../../config/chakraTheme";
import { egldFee } from "../../../config/network";
import { selectUserAddress } from "../../redux/slices/settings";
import getEgldBalance from "../../services/sc/scQueries/getEgldBalance";
import AirdropModal from "../../../views/ViewPools/AirdropModal/AirdropModal";

const SelectNftModal = dynamic(
  () => import("../../../views/ViewPools/SelectNftModal/SelectNftModal")
);

interface IProps {
  pool: IExistingPool;
}
const PoolItem = ({ pool }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenAirdrop, onOpen: onOpenAirdrop, onClose: onCloseAirdrop } = useDisclosure();

  const hasStakenForAEN = useAppSelector(selectHasStakedForAEN);
  const needToUnstake = useAppSelector(selectCanUserStake);

  const nftsStaked = useAppSelector(selectUserStaked);
  const [sessionId, setSessionId] = useState();
  const onSuccess = () => {
    window.location.reload();
  };
  useTrackTransactionStatus({
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

  const createdDate = new Date(pool.timestam * 1000);

  const endDate = addDays(createdDate, pool.poolDuration);

  const connectedAddress = useAppSelector(selectUserAddress);
  const [userHasEgldForFee, setUserHasEgldForFee] = useState<boolean | null>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEgldBalance = await getEgldBalance(connectedAddress);
        const hasEgldForFee = Number(userEgldBalance.balance) / 10**18 >= egldFee;
        setUserHasEgldForFee(hasEgldForFee);
      } catch (error) {
        console.error("Error fetching EGLD balance:", error);
        setUserHasEgldForFee(false);
      }
    };

    fetchData();
  }, [connectedAddress]);

  const isStakingDisabled = pool ? pool.isStakingDisabled : true;

  return (
    <Flex
      // border="1px solid white"
      backgroundColor={customColors.myCustomColor.base}
      borderRadius={"2xl"}
      p={5}
      gap={8}
      minW="300px"
      maxW={"800px"}
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
        <Text mb={2} fontWeight="bold" fontSize={"2xl"} whiteSpace={"normal"}>
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
              Ends :{" "}
            </Box>{" "}
            {endDate.toLocaleDateString("en-US")}{" "}
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
          <HStack>
          <Tooltip
            label={
              isStakingDisabled ? "Staking in this pool is disabled by the Pool Creator." : 
              needToUnstake.data ? "You must first unstake your NFTs from completed pools (marked red)." :
              !userHasEgldForFee ? "You need " + egldFee + " EGLD for covering the fee." :
              pool.nftsNow == pool.nfts ? "Pool is already full." :
              "Make sure you have staked at least one NFT of PARROT, EXPLORER, or TEDDY1 collections."
            }
            borderRadius={"5px"}
            isDisabled={
              !isStakingDisabled && !(pool.collection === "" && !hasStakenForAEN.data) &&
              !needToUnstake.data && userHasEgldForFee && pool.nftsNow != pool.nfts
            }
          >
            <Box>
              {nftsStaked.status === "success" && (
                <ActionButton
                  borderRadius={"full"}
                  fontSize="xs"
                  py={1}
                  disabled={
                    isStakingDisabled ||
                    (pool.collection === "" && !hasStakenForAEN) ||
                    needToUnstake.data ||
                    !userHasEgldForFee || pool.nftsNow == pool.nfts
                  }
                  onClick={onOpen}
                >
                  Stake
                </ActionButton>
              )}
            </Box>
          </Tooltip>
          <Box>
              {nftsStaked.status === "success" && (
                <ActionButton
                  borderRadius={"full"}
                  fontSize="xs"
                  py={1}
                  onClick={onOpenAirdrop}
                >
                  Airdrop
                </ActionButton>
              )}
            </Box>
            </HStack>
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
      {isOpenAirdrop && (
        <AirdropModal
          isOpenModal={isOpenAirdrop}
          onCloseModal={onCloseAirdrop}
          pool={pool}
        />
      )}
    </Flex>
  );
};

export default PoolItem;
