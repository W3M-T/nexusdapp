import { useEffect, useMemo, useState } from "react";
import { Center, Grid, Heading, Link, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { CardWrapper } from "../../shared/components/ui/CardWrapper";
import { customColors } from "../../config/chakraTheme";
import { ActionButton } from "../../shared/components/tools/ActionButton";
import useGetNexusFaucetInfo from "../../shared/hooks/tools/useGetNexusFaucetInfo";
import { selectUserAddress } from "../../shared/redux/slices/settings";
import { useAppSelector } from "../../shared/hooks/core/useRedux";
import { InfoIcon } from "@chakra-ui/icons";
import useGetMermaidFaucetInfo from "../../shared/hooks/tools/useGetMermaidFaucetInfo";
import { IFaucetInfo } from "../../shared/redux/types/faucets.interface";
import { formatTokenI } from "../../shared/utils/formatTokenIdentifier";
import { formatBalance } from "../../shared/utils/formatBalance";
import { selectedNetwork } from "../../config/network";
import { claimFromFaucet } from "../../shared/services/sc/calls/claimFromFaucet";

const FaucetsView = () => {
        
    const connectedAddress = useAppSelector(selectUserAddress);

    const [selectedTab, setSelectedTab] = useState(0);

    const [faucets, setFaucets] = useState<IFaucetInfo[]>([]);
    console.log("⚠️ ~ file: FaucetsView.tsx:24 ~ FaucetsView ~ faucets::::", faucets)

    const handleTabChange = (index: number) => {
        setSelectedTab(index);
    };

    const {nexusFaucetInfo, isLoadingNexusFaucetInfo, errorNexusFaucetInfo} = useGetNexusFaucetInfo(connectedAddress);
    // console.log("⚠️ ~ file: FaucetsView.tsx:31 ~ nexusFaucetInfo::::", nexusFaucetInfo)
    const {mermaidFaucetInfo, isLoadingMermaidFaucetInfo, errorMermaidFaucetInfo} = useGetMermaidFaucetInfo(connectedAddress);
    // console.log("⚠️ ~ file: FaucetsView.tsx:33 ~ mermaidFaucetInfo::::", mermaidFaucetInfo)
    
    useEffect(() => {
        if (nexusFaucetInfo && mermaidFaucetInfo) {
            setFaucets([nexusFaucetInfo, mermaidFaucetInfo]);
        }
    }, [nexusFaucetInfo, mermaidFaucetInfo]);

    const handleClickedClaim = (token: string) => async () => {
        claimFromFaucet(token);
    }

    return (
        <CardWrapper pb={{sm: 4, md: 8}}>
            <Heading as={"h1"} w="full" textAlign={"center"} mb={6}>
                Faucets
            </Heading>
            <Center textAlign={"center"} mt={{sm: 5, md: 10}}>
                Daily opportunity to claim cryptocurrency tokens, allowing users to grow their portfolio.
            </Center>
            <Center textAlign={"center"}>
                In case you miss a few days, the amount is aggregated for a maximum of 7 days.
            </Center>
            <Center textAlign={"center"}>
                Make sure to claim before the 7 days are up.
            </Center>
            <Center textAlign={"center"} mt={{sm: 5, md: 10}} w={"full"}>
                <Tabs index={selectedTab} onChange={handleTabChange} align="center" w={"full"}>
                    <TabList
                        justifyContent="center"
                        textAlign="center"
                        w="min"
                        maxW={"500px"}
                        bg={customColors.myCustomColor.base}
                        borderRadius="2xl"
                        p={2}
                        border={"none"}
                    >
                        {!isLoadingNexusFaucetInfo && !isLoadingMermaidFaucetInfo ?
                            faucets.map((faucet, index) => {
                                return (
                                    <Tab
                                        key={index}
                                        px={10}
                                        textAlign="center"
                                        borderRadius={"xl"}
                                        fontWeight={"medium"}
                                        border={"none"}
                                        bg={selectedTab === index ? customColors.myCustomColor.lighter : ""}
                                        textColor={selectedTab === index ? customColors.color2.base : "gray.600"}
                                        whiteSpace={"nowrap"}
                                    >
                                        {formatTokenI(faucet.token)}
                                    </Tab>
                                )}
                            ) :
                            <Tab
                                px={10}
                                textAlign="center"
                                borderRadius={"xl"}
                                fontWeight={"medium"}
                                border={"none"}
                                bg={customColors.myCustomColor.lighter}
                                textColor={"gray.600"}
                                whiteSpace={"nowrap"}
                            >
                                Loading...
                            </Tab>
                        }
                    </TabList>
                    <TabPanels fontSize={{sm: "md", md: "xl"}}>
                        {faucets.length > 0 && faucets.map((faucet, index) => (
                            <>
                            <TabPanel bg={customColors.myCustomColor.base} borderRadius={"2xl"} mt={{sm: 5, md: 10}} w={{sm: "100%", md: "80%"}}>
                                <Grid
                                    templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }}
                                    templateRows={{ base: "repeat(2, 1fr)", sm: "repeat(1, 1fr)" }}
                                    gap={{sm: 2, md: 10}}
                                    my={{sm: 1, md: 4}}
                                    w={"full"}
                                    justifyContent={"center"}
                                    justifyItems={"center"}
                                    alignItems={"center"}
                                    px={{sm: 0, md: 25}}
                                >
                                    <Center
                                        w={"full"}
                                        p={5}
                                        borderRadius={"2xl"}
                                        fontWeight={"medium"} 
                                        gap={4}
                                        bg={customColors.myCustomColor.darker}
                                        flexDirection={"column"}
                                    >
                                        <Text color={"whiteAlpha.600"}>
                                            Ever claimed
                                        </Text>
                                        <Text>
                                            {formatBalance({ balance: faucet.totalClaimed, decimals: selectedNetwork.tokens[formatTokenI(faucet.token)].decimals })}
                                        </Text>
                                    </Center>
                                    <Center
                                        w={"full"}
                                        p={5}
                                        borderRadius={"2xl"}
                                        fontWeight={"medium"} 
                                        gap={4}
                                        bg={customColors.myCustomColor.darker}
                                        flexDirection={"column"}
                                    >
                                        <Text color={"whiteAlpha.600"}>
                                            Daily amount
                                        </Text>
                                        <Text>
                                            {formatBalance({ balance: faucet.amount, decimals: selectedNetwork.tokens[formatTokenI(faucet.token)].decimals })}
                                        </Text>
                                    </Center>
                                </Grid>
                            </TabPanel>
                            <TabPanel bg={customColors.myCustomColor.base} borderRadius={"2xl"} mt={{sm: 5, md: 10}} w={{sm: "100%", md: "80%"}}>
                            <Grid
                                templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }}
                                templateRows={{ base: "repeat(2, 1fr)", sm: "repeat(1, 1fr)" }}
                                gap={{sm: 2, md: 10}}
                                my={{sm: 1, md: 4}}
                                w={"full"}
                                justifyContent={"center"}
                                justifyItems={"center"}
                                alignItems={"center"}
                                px={{sm: 0, md: 25}}
                            >
                                <Center
                                    w={"full"}
                                    h={"full"}
                                    p={5}
                                    borderRadius={"2xl"}
                                    fontWeight={"medium"} 
                                    gap={4}
                                    bg={customColors.myCustomColor.darker}
                                    flexDirection={"column"}
                                >
                                    <Text color={"whiteAlpha.600"}>
                                        My claimed
                                    </Text>
                                    <Text>
                                        {formatBalance({ balance: faucet.userClaimed, decimals: selectedNetwork.tokens[formatTokenI(faucet.token)].decimals })}
                                    </Text>
                                </Center>
                                <Center
                                    w={"full"}
                                    p={5}
                                    borderRadius={"2xl"}
                                    fontWeight={"medium"} 
                                    gap={4}
                                    bg={customColors.myCustomColor.darker}
                                    flexDirection={"column"}
                                >
                                    <Text color={"whiteAlpha.600"}>
                                        Claimable
                                    </Text>
                                    <Text>
                                        {formatBalance({ balance: faucet.userClaimable, decimals: selectedNetwork.tokens[formatTokenI(faucet.token)].decimals })}
                                    </Text>
                                </Center>
                            </Grid>
                            <Center mt={{sm: 8, md: 10}} mb={5} fontSize={"xl"} fontWeight={"medium"}>
                                <ActionButton
                                    px={10}
                                    isFilled={true}
                                    disabled={faucet.currentEpoch - faucet.userLastClaimEpoch === 0 || !faucet.canUserClaim}
                                    onClick={handleClickedClaim(formatTokenI(faucet.token))}
                                >
                                     Claim {formatTokenI(faucet.token)}
                                </ActionButton>
                            </Center>
                            <Center fontSize={"sm"} color={"whiteAlpha.600"}>
                                <InfoIcon mx={1}/> {
                                    !faucet.canUserClaim ?
                                        // "fwvw" :
                                        <>
                                            You must stake an Explorer NFT &nbsp;
                                            <Link href={"/view-pools"} color={"blue.400"} textDecoration={"underline"}>here</Link>.
                                        </> :
                                        faucet.currentEpoch - faucet.userLastClaimEpoch === 0 ? 
                                            "You can claim on the next epoch." : 
                                            faucet.currentEpoch - faucet.userLastClaimEpoch === 1 ?
                                                "Previous claim: 1 day ago"
                                                : "Previous claim: " + Number(faucet.currentEpoch - faucet.userLastClaimEpoch) + " days ago"
                                }
                            </Center>
                            </TabPanel>
                            </>
                        ))}
                    </TabPanels>
                </Tabs>
            </Center>
        </CardWrapper>
    );
}

export default FaucetsView;