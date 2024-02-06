import { Box, Center, Flex, HStack, Heading, Text, Image, useMediaQuery } from "@chakra-ui/react";
import { CardWrapper } from "../../../../shared/components/ui/CardWrapper";
import { Authenticated } from "../../../../shared/components/tools/Authenticated";
import { breakpoints, customColors } from "../../../../config/chakraTheme";
import { EgldLogoIcon } from "../../../../shared/components/icons/ui";
import useGetUserEgld from "../../../../shared/hooks/tools/useGetUserEgld";
import useGetUserTokens from "../../../../shared/hooks/tools/useGetUserTokens";
import { formatNumber, formatBalance } from "../../../../shared/utils/formatBalance";
import { isMobile } from "../../../../shared/utils/isMobile";
import { BoxProps, FlexProps, IconButton, useEditable } from "@chakra-ui/react";
// import SwapButton from "../SwapButton/SwapButton";
// import TextField from "../TextField/TextField";
// import BigNumber from "bignumber.js";
// import { ArrowUpDownIcon } from "@chakra-ui/icons";
// import { useRouter } from "next/dist/client/router";
// import { useEffect, useMemo } from "react";
// // import {
// //   selectSlippage,
// // } from "redux/slices/smartSwaps/smartSwaps";
// import { updateURLParams } from "utils/functions/routes";
// import { useAppSelector } from "utils/hooks/redux";
// import FeeInfo from "../FeeInfo/FeeInfo";
// import SwapDetails from "../SwapDetails/SwapDetails";
// import React, { useState } from 'react';
// import {Aggregator, ChainId} from '@ashswap/ash-sdk-js';
// import { Address } from "@multiversx/sdk-core/out";
// // import { network, toknesID } from "api/net.config";
// import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
// import useGetAccountToken from "utils/hooks/useGetAccountToken";
// import store from "redux/store";
// import useGetAshSwapFee from "utils/hooks/useGetAshSwapFee";
// import { networkConfig, chainType } from "../../../../config/network";

// const { gatewayAddress, contractAddr, tokens } = networkConfig[chainType];

// const getAshChainId = () => {
//     if (network.id == "mainnet") {
//       return ChainId.Mainnet;
//     } else if (network.id == "devnet") {
//       return ChainId.Devnet;
//     }
// }
  
// const getValueAfterFee = (token, fee) => {
//     return BigNumber(token.value).times(BigNumber(1).minus(BigNumber(fee))).toFixed(18).toString();
// }
  
// export interface SwapToken {
//     identifier: string;
//     decimals?: number;
//     value?: string;
// }

const egldFee = 0.01;

const SwapSection = ({titleLeft = false}) => {
    const { userTokens, isLoadingUserTokens, errorUserTokens } = useGetUserTokens();
    const { userEgld, isLoadingUserEgld, errorUserEgld } = useGetUserEgld();
    const [isLargerThanLg] = useMediaQuery(`(min-width: ${breakpoints.lg})`);

    // const userAddress = store.getState().userAccount.connectedAddress;
    // const router = useRouter();
    // const chainId = getAshChainId();
    // const slipapge = 1;
    // const { fee } = useGetAshSwapFee();
  
    // const ashSwapAggregator = useMemo(() => {
    //   if (chainId) {
    //     const agg = new Aggregator({ chainId: chainId });
    //     // setReiceverAddress(agg.address.valueHex);
    //     return agg;
    //   }
    // }, [chainId]);

    return (
        <CardWrapper
            width={"full"}
            maxW={"600px"}
            pt={0}
            pb={3}
            px={2}
        >
            <Flex flexWrap="wrap" rowGap={8}>
                <Heading as={"h2"} w="full" justifyContent="center" textAlign={titleLeft ? "left" : "center"} mb={6}
                    fontWeight="700"
                    fontSize={"24px"}
                >
                    Swap
                </Heading>
            </Flex>
            <Box w={"300px"} h={"600px"}>

            </Box>
        </CardWrapper>
        );
};

export default SwapSection;