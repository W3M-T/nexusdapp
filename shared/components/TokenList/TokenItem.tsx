import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { formatBalance } from "../../utils/formatBalance";
import { IELrondTOkenWithBalance, IElrondToken } from "../../redux/types/elrond.interface";
import { EgldLogoIcon } from "../icons/ui";
import { customColors } from "../../../config/chakraTheme";
// import { formatBalance } from "utils/functions/formatBalance";
// import { formatTokenI } from "utils/functions/tokens";
// import {
//   IElrondToken,
//   IELrondTOkenWithBalance,
// } from "utils/types/elrond.interface";

interface IProps {
  token: IElrondToken;
  onClick: (t: IElrondToken) => void;
  showIdent?: boolean;
  showBalance?: boolean;
  hoverBg?: string;
}

const TokenItem = ({
  token,
  onClick,
  showIdent,
  showBalance,
  hoverBg,
}: IProps) => {
  return (
    <Flex
      px={"20px"}
      py={3}
      cursor={"pointer"}
      _hover={{
        background: hoverBg || "brand.700",
      }}
      justifyContent={showBalance && "space-between"}
      onClick={() => onClick(token)}
      // borderRadius="md"
      border={"1px solid"}
      borderColor={customColors.myCustomColor.lighter}
    >
      <Flex>
        <Box mr={4}>
          {token?.assets?.img ? (
            token?.assets?.img
          ) : token.assets ? (
              <>
                {token?.assets?.svgUrl ? (
                  <Image
                    boxSize={"24px"}
                    borderRadius={"full"}
                    boxShadow={"rgb(255 255 255 / 8%) 0px 6px 10px"}
                    src={
                      token?.assets?.svgUrl || ""
                    }
                    alt={token?.assets?.description || ""}
                  />
                ) : token.name == "EGLD" ? (
                  <Box
                    boxSize={"24px"}
                    borderRadius={"full"}
                    boxShadow={"rgb(255 255 255 / 8%) 0px 6px 10px"}
                  >
                    <EgldLogoIcon/>
                  </Box>
                  ) : (
                  <Box
                    boxSize={"24px"}
                    borderRadius={"full"}
                    bg="brand.200"
                    boxShadow={"rgb(255 255 255 / 8%) 0px 6px 10px"}
                  />
                )}
              </>
          ) : null
          }
        </Box>
        {showIdent ? (
          <Text>{token.identifier || token.ticker || token.name || ""}</Text>
        ) : (
          <Text>
            {token.identifier !== token.ticker
              ? token.ticker || token.name || token.identifier || ""
              : token.name || token.ticker || token.identifier || ""}
          </Text>
        )}
      </Flex>
      {showBalance && (
        <Box fontSize={"md"} color={"white.500"}>
          <Text>{formatBalance(token as IELrondTOkenWithBalance)}</Text>
        </Box>
      )}
    </Flex>
  );
};

export default TokenItem;
