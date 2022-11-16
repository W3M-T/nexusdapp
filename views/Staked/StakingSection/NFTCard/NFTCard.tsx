import { Flex, FlexProps, Text, Tooltip } from "@chakra-ui/react";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import NextImg from "../../../../shared/components/ui/NextImg";
import { IStakedWithTokenDetails } from "../../../../shared/redux/types/pools.interface";
import { formatBalance } from "../../../../shared/utils/formatBalance";
import { formatTokenI } from "../../../../shared/utils/formatTokenIdentifier";

interface IProps {
  nft: IStakedWithTokenDetails;
  onClick: () => void;
  wrapperProps?: FlexProps;
  fromHome?: boolean;
}
const NFTCard = ({ nft, onClick, fromHome, wrapperProps }: IProps) => {
  const [isNew, setIsNew] = useState(true);
  useEffect(() => {
    let isNew = true;
    const p = nft.nftPool;
    const date = new Date(p.timestam * 1000);

    const dateInAMonth = addDays(date, 30);
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
        height="full"
        cursor="pointer"
        position={"relative"}
        flexDir="column"
        onClick={onClick}
        border="1px solid"
        borderColor={isNew ? "dappTemplate.color2.base" : "red"}
        borderRadius="0.7rem"
        padding={"4"}
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
          nextProps={{
            height: "600px",
            width: "600px",
          }}
        />
      </Flex>
    </Tooltip>
  );
};

export default NFTCard;
