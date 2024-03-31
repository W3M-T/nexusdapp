import { Box, Image, Text, Tooltip } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import useGetElrondToken from "../../hooks/tools/useGetElrondToken";
import { chainType, networkConfig } from "../../../config/network";
import { VscFlame } from "react-icons/vsc";
import { customColors } from "../../../config/chakraTheme";
import BigNumber from "bignumber.js";
import { formatNumber } from "../../utils/formatBalance";

export const NexusBurnIndicator = ({ children }: PropsWithChildren) => {
  const nexusToken = networkConfig[chainType].tokens.NEXUS;
  const {token, isLoading, isError} = useGetElrondToken(nexusToken.identifier);
  console.log("⚠️ ~ token:", token)
  const tokensBurnt = nexusToken.initialSupply - token.circulatingSupply;
  const burntPercentage = ((tokensBurnt) / nexusToken.initialSupply * 100).toFixed(5);

  return (
    !isLoading && !isError ? 
    <Tooltip
      mt={-1}
      width={"full"}
      borderRadius={"xl"}
      bgColor={"white"}
      textColor={"black"}
      label={
        <>
          <b><u>NEXUS Burn Stats</u></b>
          <br/>
          <br/>
          <b>Initial supply:</b> &nbsp;&nbsp;&nbsp; {formatNumber(BigNumber(nexusToken.initialSupply).dividedBy(Math.pow(10, 18)).toNumber())}
          <br/>
          <b>In circulation:</b> &nbsp;&nbsp;&nbsp; {formatNumber(BigNumber(token.circulatingSupply).dividedBy(Math.pow(10, 18)).toNumber())}
          <br/>
          <b>Total burnt:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {formatNumber(BigNumber(tokensBurnt).dividedBy(Math.pow(10, 18)).toNumber())}
          <br/>
          <b>Burnt value:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${formatNumber(BigNumber(tokensBurnt).multipliedBy(token.price).dividedBy(Math.pow(10, 18)).toNumber())}
        </>
      }
    >
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        flexDirection={"row"}
        textAlign={"center"}
        border={"2px solid"}
        borderRadius={"3xl"}
        borderColor={customColors.myCustomColor.darker}
        bgColor={customColors.myCustomColor.lighter}
        p={1.5}
        _hover={{
          bgColor: "white",
          textColor: "black",
          borderColor: "white"
        }}
        _active={{
          bgColor: "white",
          textColor: "black",
          borderColor: "white"
        }}
      >

        <div className="glowing-icon">
          <VscFlame size={"26px"} />
        </div>

        <Text fontWeight={"bold"} pr={0.5}>
          {burntPercentage}%
        </Text>

        <Box
          sx={{
              borderRadius: "1.5rem",
              width: "26px",
              height: "26px",
              boxShadow: "rgb(255 255 255 / 8%) 0px 6px 10px",
          }}
          bg={token.identifier == nexusToken.identifier ? "white" : null}
        >
          <Image
              src={token.assets?.svgUrl || token.assets?.pngUrl}
              alt={token.assets?.description}
              p={0.5}
          />
        </Box>

      </Box>
  
    </Tooltip>
    : null
  );
};
