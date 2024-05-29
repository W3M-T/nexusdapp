import { Center, Flex, FlexProps, Text, Tooltip } from "@chakra-ui/react";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import NextImg from "../../../../shared/components/ui/NextImg";
import useGetNftRewards from "../../../../shared/hooks/tools/useGetNftRewards";
import { IStakedWithTokenDetails } from "../../../../shared/redux/types/pools.interface";
import { formatBalance } from "../../../../shared/utils/formatBalance";
import { formatTokenI } from "../../../../shared/utils/formatTokenIdentifier";

interface IProps {
  nft: IStakedWithTokenDetails;
  onClick: (reward: number) => void;
  wrapperProps?: FlexProps;
  fromHome?: boolean;
  selected?: boolean;
}
const NFTCard = ({
  nft,
  onClick,
  fromHome,
  wrapperProps,
  selected,
}: IProps) => {
  const [isNew, setIsNew] = useState(true);
  const { reward } = useGetNftRewards(nft);
  useEffect(() => {
    let isNew = true;
    const p = nft.nftPool;
    const date = new Date(p.timestam * 1000);

    const dateInAMonth = addDays(date, p.poolDuration || 30);
    const today = new Date();

    if (dateInAMonth < today) {
      isNew = false;
    } else {
      isNew = true;
    }

    setIsNew(isNew);
  }, [nft]);

  return (
    <Tooltip
      label="Pool has reached its end. You must unstake your NFT."
      borderRadius={"5px"}
      isDisabled={isNew}
    >
      <Flex
        height="100%"
        w={"100%"}
        // maxW={"180px"}
        minW={"130px"}
        cursor="pointer"
        position={"relative"}
        flexDir="column"
        onClick={() => onClick(reward)}
        border={"3px solid"}
        borderColor={
          selected ? "dappTemplate.color2.base" : isNew ? "dappTemplate.dark.darker" : "red"
        }
        borderRadius="0.7rem"
        padding={2}
        bg="black"
        {...wrapperProps}
      >
        {!fromHome && (
          <>
            <Text fontSize={"xl"} fontWeight="bold" mb={1}>
              {nft.name}
            </Text>
            <Flex
              mb={3}
              fontSize="small"
              flexDir={{ sm: "column", lsm: "row" }}
            >
              <Text color="gray.400" fontWeight="bold" mr={1}>
                Est. Rewards:
              </Text>{" "}
              <Text>
                {formatBalance({
                  balance: nft.estimatedRewards,
                  decimals: nft.tokenDetails?.decimals,
                })}{" "}
                {formatTokenI(nft.nftPool.token)}
              </Text>{" "}
            </Flex>
          </>
        )}
        <NextImg
          alt={"nft"}
          width={"100%"}
          sx={{
            span: {
              borderRadius: "1rem",
            },
          }}
          src={nft.url}
          // nextProps={{
          //   height: 400,
          //   width: 400,
          // }}
        />
        <Center fontSize={{sm: "0", md: "xs"}} pt={1} mb={-1}>
          {nft.name}
        </Center>
      </Flex>
    </Tooltip>
  );
};

export default NFTCard;
