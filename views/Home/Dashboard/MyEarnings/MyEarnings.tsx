import { Box, Flex, Heading, HStack, Image, Link, Text } from "@chakra-ui/react";
import useGetUserEarnings from "../../../../shared/hooks/tools/useGetUserEarnings";
import { useAppSelector } from "../../../../shared/hooks/core/useRedux";
import { selectUserAddress } from "../../../../shared/redux/slices/settings";
import { ViewButton } from "../../../../shared/components/tools/ViewButton";
import { CardWrapper } from "../../../../shared/components/ui/CardWrapper";
import { route } from "../../../../shared/utils/routes";
import { customColors } from "../../../../config/chakraTheme";
import { Authenticated } from "../../../../shared/components/tools/Authenticated";
import { EgldLogoIcon } from "../../../../shared/components/icons/ui";
import { formatBalance, formatNumber } from "../../../../shared/utils/formatBalance";
import { isMobile } from "../../../../shared/utils/isMobile";
import { networkConfig, chainType } from "../../../../config/network";
import useGetMultipleElrondTokens from "../../../../shared/hooks/tools/useGetMultipleElrondTokens";

const MyEarnings = ({earnedTokens}) => {
    const isSmallDevice = isMobile();
    const nexusIdentifier = networkConfig[chainType].tokens.NEXUS.identifier;

    return (
        <Authenticated spinnerCentered>

        <CardWrapper w={"full"} pb={4}
            minH={{md: "320px"}} maxH={{md: "320px"}}
        >
            <Flex flexDir={"column"}>

                <Heading
                    fontWeight="700"
                    as="h2"
                    fontSize={"24px"}
                    w="full"
                >
                    My Earnings
                </Heading>

                <Flex flexDir={"column"}
                    gap={1}
                    justifyContent={"space-between"}
                    minWidth={{sm: "200px", md: "550px"}}
                    width={"full"}
                    backgroundColor={customColors.myCustomColor.base}
                    borderRadius={"2xl"}
                    px={{sm: 3, md: 5}}
                    py={{sm: 2, md: 3}}
                    mt={6}
                >
                    <Flex flexDir={"row"} gap={1} justifyContent={"space-between"} w={"full"} px={1} opacity={0.7}>
                        <Text fontWeight="bold" fontSize={"md"} pl={2}>Token</Text>
                        <Flex flexDir="row" gap={4}>
                            {!isSmallDevice && <Text fontWeight="bold" fontSize={"md"} w={"80px"}>
                                Amount
                            </Text>}
                            <Text fontWeight="bold" fontSize={"md"} w={"80px"}>
                                Value
                            </Text>
                        </Flex>
                    </Flex>

                    <Flex flexDir={"column"} gap={1} 
                        w={"full"}
                        bg={customColors.myCustomColor.darker}
                        borderRadius={"2xl"}
                        maxH={"170px"}
                        minH={"170px"}
                        overflowY={"auto"}
                    >

                        {earnedTokens.map((earnedToken, index) => {
                              return (
                                <Flex key={index} flexDir={"row"} gap={1} 
                                    justifyContent={"space-between"}
                                    w={"full"} 
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
                                                boxShadow: "rgb(255 255 255 / 8%) 0px 6px 10px",
                                            }}
                                            bg={earnedToken.identifier == nexusIdentifier ? "white" : null}
                                        >
                                            {earnedToken.identifier == "EGLD" ? (
                                                <EgldLogoIcon/>
                                            ) : (
                                                <Image
                                                    src={earnedToken.assets?.svgUrl || earnedToken.assets?.static.src || ""}
                                                    alt={earnedToken.assets?.description || ""}
                                                    p={0.5}
                                                />
                                            )}
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">
                                                {earnedToken.ticker}
                                            </Text>
                                        </Box>
                                    </HStack>
                                    
                                    <Flex flexDir="row" gap={4}>
                                        {!isSmallDevice && <Box py={2} opacity={0.5} w={"80px"} alignSelf={"center"}>
                                            {formatBalance({
                                                    balance: earnedToken.earnedAmount,
                                                    decimals: earnedToken.decimals
                                                }) || '-'}
                                        </Box>}
                                        <Box py={2} w={"80px"} alignSelf={"center"}>
                                            ${formatNumber(
                                                Number(earnedToken.earnedAmount) / (Math.pow(10, earnedToken.decimals)) * earnedToken.price
                                            )}
                                        </Box>
                                    </Flex>
                                </Flex>)
                            ;}
                        )}

                    </Flex>
                </Flex> 
          </Flex>
    </CardWrapper>

    </Authenticated>

    );
};
  
export default MyEarnings;
