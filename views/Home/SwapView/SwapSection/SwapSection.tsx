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
import { ArrowUpDownIcon } from "@chakra-ui/icons";
import { CgArrowsExchangeV } from "react-icons/cg";
import { CgArrowDown } from "react-icons/cg";
import TextField from "./components/TextField/TextField";
import { chainType, networkConfig } from "../../../../config/network";
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
import {Aggregator, ChainId} from '@ashswap/ash-sdk-js';
import BigNumber from "bignumber.js";
import { useAppSelector } from "../../../../shared/hooks/core/useRedux";
import { selectUserAddress } from "../../../../shared/redux/slices/settings";
import { useEffect, useMemo, useState } from "react";
import useGetAshSwapFee from "../../../../shared/hooks/tools/useGetAshSwapFee";
import router from "next/router";
import tokens from "../../../../shared/redux/slices/tokens";
import useGetMultipleElrondTokens from "../../../../shared/hooks/tools/useGetMultipleElrondTokens";
import useGetAccountToken from "../../../../shared/hooks/tools/useGetAccountToken";
import { Address } from "@multiversx/sdk-core/out";
import SwapButton from "./components/SwapButton/SwapButton";
// import { Address } from "@multiversx/sdk-core/out";
// // import { network, tokensID } from "api/net.config";
// import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
// import useGetAccountToken from "utils/hooks/useGetAccountToken";
// import store from "redux/store";
// import useGetAshSwapFee from "utils/hooks/useGetAshSwapFee";
// import { networkConfig, chainType } from "../../../../config/network";


const network = networkConfig[chainType];

const getAshChainId = () => {
    if (network.id == "mainnet") {
      return ChainId.Mainnet;
    } else if (network.id == "devnet") {
      return ChainId.Devnet;
    }
}
  
const getValueAfterFee = (token, fee) => {
    return BigNumber(token.value).times(BigNumber(1).minus(BigNumber(fee))).toFixed(18).toString();
}

export interface SwapToken {
    identifier: string;
    decimals?: number;
    value?: string;
}

const egldFee = 0.01;

const resolveWarning = async (warning: string): Promise<boolean> => {
    // Here, you might prompt the user with the warning message
    // and ask for confirmation. For simplicity, we'll assume the user always confirms.
    console.log("Warning:", warning);
    const userConfirmed = true; // Assume the user confirms
    return userConfirmed;
};

const SwapSection = ({titleLeft = false}) => {
    const [isLargerThanLg] = useMediaQuery(`(min-width: ${breakpoints.lg})`);
    const userAddress = useAppSelector(selectUserAddress);

    const chainId = getAshChainId();
    const slippage = 1;
    const { fee } = useGetAshSwapFee();
  
    const ashSwapAggregator = useMemo(() => {
      if (chainId) {
        const agg = new Aggregator({ chainId: chainId });
        // setReiceverAddress(agg.address.valueHex);
        return agg;
      }
    }, [chainId]);

    //
    // TOKENS
    //
    const tokensID = network.tokens;
    const [swapTokens, setSwapTokens] = useState([]);
    // console.log("⚠️ ~ swapTokens:", swapTokens)
    const [fromToken, setFromToken] = useState<SwapToken>({
        identifier: tokensID.WEGLD.identifier,
        decimals: 6,
        value: null,
    });
    // console.log("⚠️ ~ fromToken:", fromToken)
    const [toToken, setToToken] = useState<SwapToken>({
        identifier: tokensID.NEXUS.identifier,
        decimals: 18,
        value: null,
    });
    // console.log("⚠️ ~ toToken:", toToken)

    const { tokens: elrondTokens } = useGetMultipleElrondTokens(swapTokens.map((token) => token.identifier));
    // console.log("⚠️ ~ elrondTokens:", elrondTokens)

    const { accountToken } = useGetAccountToken(fromToken.identifier);

    useEffect(() => {
        let isMounted = true;
        const fetchTokens = async () => {
        let tokens = await ashSwapAggregator.getTokens();
        if (!tokens.find((token) => token.id === "EGLD")) {
            tokens = [...tokens, {
            id: "EGLD",
            decimal: 18,
            coingeckoId: ""
            }];
        }

        const formattedTokens = tokens.map((token) => {
            return {
            identifier: token.id,
            decimals: token.decimal,
            coingeckoId: token.coingeckoId,
            };
        });

        if (isMounted) {
            setSwapTokens(formattedTokens);
        }
        };

        fetchTokens();
        return () => {
        isMounted = false;
        };
    }, [ashSwapAggregator, chainId]);


    //
    // FIELDS
    //
    const handleChangeFromField = (value) => {
        if (!value || value == "") {
            setToToken({
            identifier: toToken.identifier,
            decimals: toToken.decimals,
            value: null,
            });
        }
        if (!fromToken?.decimals) {
            setFromToken({
            identifier: fromToken.identifier,
            decimals: swapTokens.find((token) => token.identifier === fromToken.identifier).decimals,
            value: value !== "" ? value : null,
            });
        } else {
            setFromToken({
            identifier: fromToken.identifier,
            decimals: fromToken.decimals,
            value: value !== "" ? value : null,
            });
        }
    };

    const handleOnSelectFromToken = (token) => {
        const tokenIdentifier = token.identifier;
        if (tokenIdentifier === toToken.identifier) {
            handleExchangeFields();
        } else if (
            tokenIdentifier == tokensID.WEGLD.identifier && toToken.identifier == "EGLD"
            ||
            tokenIdentifier == "EGLD" && toToken.identifier == tokensID.WEGLD.identifier
        ) {
            setFromToken({
                identifier: tokenIdentifier,
                decimals: token.decimals,
                value: fromToken.value,
            });
            setSwapPaths(null);
            setInteraction(null);
            setToToken({
                identifier: null,
                decimals: null,
                value: null,
            });
        } else {
            setFromToken({
                identifier: tokenIdentifier,
                decimals: token.decimals,
                value: fromToken.value,
            });
            setSwapPaths(null);
            setInteraction(null);
        }
    };

    const handleOnSelectToToken = (token) => {
        const tokenIdentifier = token.identifier;

        if (
            tokenIdentifier == tokensID.WEGLD.identifier && fromToken.identifier == "EGLD"
            ||
            tokenIdentifier == "EGLD" && fromToken.identifier == tokensID.WEGLD.identifier
        ) {
            setToToken({
                identifier: tokenIdentifier,
                decimals: token.decimals,
                value: fromToken.value,
            });
            setSwapPaths(null);
            setInteraction(null);
            setFromToken({
                identifier: null,
                decimals: null,
                value: null,
            });
        } else {
            setToToken({
                identifier: tokenIdentifier,
                decimals: token.decimals,
                value: null,
            });
            setSwapPaths(null);
            setInteraction(null);
        }
    };

    const handleExchangeFields = () => {
        setFromToken({
            identifier: toToken.identifier,
            decimals: toToken.decimals,
            value: fromToken.value || null,
        });
        setToToken({
            identifier: fromToken.identifier,
            decimals: fromToken.decimals,
            value: null,
        });

        setSwapPaths(null);
        setInteraction(null);
    };

    const handleMaxFromField = () => {
        const multiplier = Math.pow(10, accountToken.decimals);
        const finalValue = fromToken.identifier == "EGLD" ?
        BigNumber(accountToken.balance).div(multiplier).minus(egldFee).toString() :
        BigNumber(accountToken.balance).div(multiplier).toString();
        setFromToken({
            identifier: fromToken.identifier,
            decimals: accountToken.decimals,
            value: finalValue,
        });
    };

    //
    // CONDITIONS
    //
    const hasEnoughBalance = useMemo(() => {
    const fee = fromToken.identifier == "EGLD" ? egldFee : 0;
    if (accountToken) {
        if (!fromToken.value) {
        return true;
        }
        return BigNumber(accountToken.balance).gte(
        BigNumber(fromToken?.value).times(Math.pow(10, accountToken.decimals)).plus(
            BigNumber(fee * Math.pow(10, 18))
        )
        );
    }
    }, [accountToken, fromToken.identifier, fromToken?.value]);

    //
    // NEW SWAP DATA
    //
    const [swapPaths, setSwapPaths] = useState(null);

    useEffect(() => {
    const handleCalculateNewSwapData = () => {
        const multiplier = Math.pow(10, fromToken?.decimals || 0);
        const finalInputAmount = getValueAfterFee(fromToken, fee);
        const finalValue = BigNumber(finalInputAmount).times(multiplier).toFixed(0).toString();

        try {
        ashSwapAggregator.getPaths(fromToken.identifier, toToken.identifier, finalValue).then((p) => {
            setSwapPaths(p);
        });
        } catch (error) {
        console.log("⚠️ ~ file: SwapCard.tsx:207 ~ error:", error)
        }
    };

    if (fromToken.identifier && Number(fromToken.value) > 0 && toToken.identifier) {
        handleCalculateNewSwapData();
    }
    }, [ashSwapAggregator, fee, fromToken, toToken.identifier]);

    useEffect(() => {
    if (swapPaths && swapPaths?.returnAmount && fromToken?.value) {
        setToToken({
        identifier: toToken.identifier,
        decimals: toToken.decimals,
        value: swapPaths?.returnAmount || null,
        });
    }
    }, [swapPaths, fromToken, toToken.identifier, toToken.decimals, fee]);

    //
    // INTERACTION DATA
    //
    const [interaction, setInteraction] = useState(null);
    useEffect(() => {
    const handleCreateInteractionFromSwapData = () => {
        try {
        ashSwapAggregator.aggregateFromPaths(swapPaths, slippage*1000, resolveWarning).then((i) => {
            setInteraction(
            i.withSender(
                new Address(userAddress)
            )
            );
        });
        } catch (error) {
        console.log("⚠️ ~ file: SwapCard.tsx:237 ~ error:", error)
        }
    };

    if (swapPaths && fromToken?.value) {
        handleCreateInteractionFromSwapData();
    }
    }
    , [ashSwapAggregator, fromToken?.value, slippage, swapPaths, userAddress]);

    //
    // RESET
    //
    useEffect(() => {
        if (!fromToken?.value) {
        setSwapPaths(null);
        setToToken({
            identifier: toToken.identifier,
            decimals: toToken.decimals,
            value: null,
        });
        setInteraction(null);
        }
    }, [fromToken?.value, toToken.decimals, toToken.identifier]);

    const isSwapButtonDisabled = !hasEnoughBalance || !swapPaths || userAddress=="";
    return (
        <CardWrapper
            // maxW={"600px"}
            py={0}
            px={{sm: 2, md: 4}}
            // p={0}
            // m={0}
            alignSelf={"flex-start"}
            // {...props}
            h={"full"}
            w={"full"}
        >
            <Flex flexWrap="wrap" rowGap={8}>
                <Heading as={"h2"} w="full" justifyContent="center" textAlign={titleLeft ? "left" : "center"} mb={6}
                    fontWeight="700"
                    fontSize={"24px"}
                    pl={{sm: 2, md: 0}}
                >
                    Swap
                </Heading>
            </Flex>
            <Flex flexDir={"column"}
                gap={1}
                justifyContent={"space-between"}
                // maxWidth={"700px"}
                minWidth={{sm: "200px", md: "550px"}}
                width={"full"}
                backgroundColor={customColors.myCustomColor.base}
                borderRadius={"2xl"}
                p={{sm: 3, md: 5}}
            >
                <TextField
                    sxProps={{borderColor: "transparent" , backgroundColor: customColors.myCustomColor.darker}}
                    label={"Swap From:"}
                    id="from"
                    hasMaxButton
                    onChange={(e) => handleChangeFromField(e.target.value)}
                    handleClickToken={handleOnSelectFromToken}
                    onClickMaxtoken={handleMaxFromField}
                    field={fromToken}
                    disableChangeToken={false}
                    dollarAmount={
                        fromToken.value ?
                        (elrondTokens.find((token) => token.identifier === fromToken.identifier)?.price
                        * BigNumber(fromToken.value).toNumber()).toString() : ""
                    }
                    swapTokens={swapTokens}
                />
                <Center>
                    <IconButton
                    onClick={handleExchangeFields}
                    borderRadius={"full"}
                    aria-label="change-positions"
                    bg="black.base"
                    boxSize={"40px"}
                    // border={"7px solid"}
                    // borderColor={"black.baseDark"}
                    _hover={{ bg: customColors.myCustomColor.darker }}
                    disabled={false}
                    >
                        <CgArrowsExchangeV color={ customColors.color2.base} size={"30px"}/>
                    </IconButton>
                </Center>
                <TextField
                    sxProps={{borderColor: "transparent" , backgroundColor: customColors.myCustomColor.darker}}
                    label={"Swap To:"}
                    id="to"
                    hasMaxButton={false}
                    handleClickToken={handleOnSelectToToken}
                    field={toToken}
                    isDisabled={true}
                    isLoadingAmount={false}
                    dollarAmount={
                        toToken.value && fromToken.value ?
                        (elrondTokens.find((token) => token.identifier === toToken.identifier)?.price
                        * BigNumber(toToken.value).toNumber()).toString() : ""
                    }
                    swapTokens={swapTokens.filter((token) => token.identifier !== fromToken.identifier)}
                />
                {/* {fromToken?.value && swapPaths && (
                <SwapDetails swapPaths={swapPaths} />
                )} */}
                <SwapButton
                    //bg={"#22F6DC"}
                    bg={customColors.color2.darker}
                    filter={isSwapButtonDisabled ? "brightness(50%)" : "brightness(90%)"}
                    // color="black"
                    border={"none"}
                    mt={8}
                    width="100%"
                    alignContent="center"
                    fontWeight={"900"}
                    fontSize={"1.2em"}
                    interaction={interaction}
                    actualInputAmount={BigNumber(fromToken.value).times(Math.pow(10, fromToken.decimals)).toString()}
                    disabled={isSwapButtonDisabled ? true : false}
                    disabledMessage={hasEnoughBalance ? "Enter an amount" : "Insufficient balance"}
                />
                {/* <FeeInfo fee={fee * 100} whichToken={"input"}/> */}
            </Flex>
            {!userAddress && !isLargerThanLg && 
                <Center mt={6} px={10}>
                    <Text fontWeight="bold" fontSize="2xl" textAlign="center"
                        alignSelf={"center"}
                        w={"full"}
                    >
                        Connect your wallet to swap tokens and view your staked NFTs!
                    </Text>
                </Center>
            }
        </CardWrapper>
        );
};

export default SwapSection;