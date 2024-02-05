import { Box, Center, Divider, Flex, Grid, HStack, Heading, Icon, Image, Text, VStack } from "@chakra-ui/react";
import useGetNfts from "../../../../shared/hooks/tools/useGetNfts";
import useGetUserTokens from "../../../../shared/hooks/tools/useGetUserTokens";
import useGetUserEgld from "../../../../shared/hooks/tools/useGetUserEgld";
import { CardWrapper } from "../../../../shared/components/ui/CardWrapper";
import { Authenticated } from "../../../../shared/components/tools/Authenticated";
import BigNumber from "bignumber.js";
import { EgldLogoIcon, MultiversxLogo } from "../../../../shared/components/icons/ui";
import { customColors } from "../../../../config/chakraTheme";
import { formatBalance, formatNumber } from "../../../../shared/utils/formatBalance";
import { isMobile } from "../../../../shared/utils/isMobile";

const getTokenDollarValue = (token: any) => {
    if (!token.price || !token.balance) { return 0; }
    return Number(token.balance) / (Math.pow(10, token.decimals)) * token.price;
}

const DashboardSection = ({coinsHeight = "440px", ...props}) => {
    const { userTokens, isLoadingUserTokens, errorUserTokens } = useGetUserTokens();
    const { userEgld, isLoadingUserEgld, errorUserEgld } = useGetUserEgld();
    const isSmallDevice = isMobile();

    let combinedData = [];
    let totalValue = 0;
    if (!isLoadingUserEgld && !isLoadingUserTokens && !errorUserEgld && !errorUserTokens && userTokens && userEgld) {
        const sortedUserTokens = userTokens?.slice().sort((a, b) => {
            return getTokenDollarValue(b) - getTokenDollarValue(a);
        });
        combinedData = [userEgld, ...sortedUserTokens];

        totalValue = combinedData.reduce((sum, token) => {
            const value = getTokenDollarValue(token);
            return sum + value;
        }, 0);
    }
    
    return (
        <CardWrapper
            width={"full"}
            maxW={"600px"}
            pt={0}
            pb={3}
            px={2}
            {...props}
        >
            <Authenticated
                spinnerCentered
                fallback={
                    <>
                    <Text fontWeight="bold" fontSize="2xl" textAlign="center" m={10}>
                        Connect to view your wallet balance.
                    </Text>
                    </>
                }
            >
                <Flex flexWrap="wrap" rowGap={8}>
                    <Heading as={"h2"} w="full" justifyContent="center" textAlign={"center"} mb={6}
                        fontWeight="700"
                        fontSize={"24px"}
                    >
                        My wallet
                    </Heading>
                </Flex>
                {isLoadingUserTokens || isLoadingUserEgld
                ?
                <CardWrapper>
                    <Flex flexWrap="wrap" rowGap={8}>
                    <Heading as={"h1"} w="full" justifyContent="center" textAlign={"center"} mb={4}>
                        My Tokens
                    </Heading>
                    </Flex>
                    <Text fontWeight="bold" fontSize="2xl" textAlign="center" mt={8}>
                    Loading your wallet balance...
                    </Text>
                </CardWrapper>
                :
                <Flex flexDir={"column"}
                    gap={1}
                    justifyContent={"space-between"}
                    // maxWidth={"700px"}
                    minWidth={{sm: "200px", md: "550px"}}
                    width={"full"}
                    // bg={customColors.myCustomColor.darker}
                    backgroundColor={customColors.myCustomColor.base}
                    borderRadius={"2xl"}
                    p={{sm: 3, md: 5}}
                >
                    <Center gap={4} px={4} py={6}>
                        <Center opacity={0.7} fontSize={"md"}>
                            Total value:
                        </Center>
                        <Center fontWeight={"bold"} fontSize={"xl"}>
                            ${formatNumber(totalValue)}
                        </Center>
                    </Center>
                    <Flex flexDir={"row"} gap={1} justifyContent={"space-between"} w={"full"} py={1} px={1} opacity={0.7}>
                        <Text fontWeight="bold" fontSize={"md"} pl={2}>Token</Text>
                        <Flex flexDir="row" gap={4}>
                            {!isSmallDevice && <Text fontWeight="bold" fontSize={"md"} w={"80px"}>
                                Price
                            </Text>}
                            <Text fontWeight="bold" fontSize={"md"} w={"80px"}>
                                Value
                            </Text>
                        </Flex>
                    </Flex>

                    <Flex flexDir={"column"} gap={1} justifyContent={"space-between"}
                        w={"full"}
                        bg={customColors.myCustomColor.darker}
                        borderRadius={"2xl"}
                        maxH={coinsHeight}
                        overflowY={"auto"}
                    >
                        {combinedData.map((token, index) => (
                            <Flex key={index} flexDir={"row"} gap={1} 
                                justifyContent={"space-between"} w={"full"} 
                                borderBottom={"2px solid"} 
                                borderColor={customColors.myCustomColor.base} 
                                px={1}
                            >
                                <HStack py={2} pl={1}>
                                    <Box
                                        sx={{
                                            borderRadius: "1.5rem",
                                            width: "30px",
                                            height: "30px",
                                            marginRight: 1,
                                            boxShadow: "rgb(255 255 255 / 8%) 0px 6px 10px",
                                        }}
                                        mb={1}
                                    >
                                        {token.name == "EGLD" ? (
                                            <EgldLogoIcon/>
                                        ) : (
                                            <Image
                                                src={token.assets?.svgUrl || token.assets?.static.src || ""}
                                                alt={token.assets?.description || ""}
                                            />
                                        )}
                                    </Box>
                                    <Box>
                                        <Text fontWeight="bold">
                                            {token.ticker}
                                        </Text>
                                        <Text>
                                            {formatBalance(token=token)}
                                        </Text>
                                    </Box>
                                </HStack>
                                <Flex flexDir="row" gap={4}
                                // justifyItems={"flex-start"} justify={"flex-start"} justifySelf={"flex-start"} justifyContent={"flex-start"}
                                >
                                    {!isSmallDevice && <Box py={2} opacity={0.5} w={"80px"} alignSelf={"center"}>
                                        ${formatNumber(token.price) || '-'}
                                    </Box>}
                                    <Box py={2} w={"80px"} alignSelf={"center"}>
                                        ${formatNumber(getTokenDollarValue(token))}
                                    </Box>
                                </Flex>
                            </Flex>
                        ))}
                    </Flex>
                </Flex>
                }
            </Authenticated>
        </CardWrapper>
        );
  };
  
  export default DashboardSection;
  