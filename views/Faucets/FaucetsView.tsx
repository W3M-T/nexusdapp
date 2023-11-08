import { useState } from "react";
import { Center, Grid, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { CardWrapper } from "../../shared/components/ui/CardWrapper";
import { customColors } from "../../config/chakraTheme";
import { ActionButton } from "../../shared/components/tools/ActionButton";

const FaucetsView = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const tokens = ["NEXUS", "MERMAID"];

    const handleTabChange = (index: number) => {
        setSelectedTab(index);
    };

    return (
        <CardWrapper>
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
                        {tokens.map((token, index) => (
                            <Tab
                                key={index}
                                px={10}
                                textAlign="center"
                                borderRadius={"xl"}
                                border={"none"}
                                bg={selectedTab === index ? customColors.myCustomColor.lighter : ""}
                                textColor={selectedTab === index ? customColors.color2.base : "gray.600"}
                                whiteSpace={"nowrap"}
                            >
                                {token}
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        {tokens.map((token, index) => (
                            <TabPanel key={index} bg={customColors.myCustomColor.base} borderRadius={"2xl"} mt={{sm: 5, md: 10}} w={{sm: "100%", md: "80%"}}>
                                <Grid
                                    templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
                                    templateRows={{ base: "repeat(2, 1fr)", md: "repeat(1, 1fr)" }}
                                    gap={{sm: 2, md: 10}}
                                    mt={{sm: 0, md: 5}}
                                    w={"full"}
                                    justifyContent={"center"}
                                    justifyItems={"center"}
                                    alignItems={"center"}
                                >
                                    <Center
                                        w={"70%"}
                                        p={5}
                                        fontSize={"xl"}
                                        borderRadius={"2xl"}
                                        fontWeight={"medium"} 
                                        gap={4}
                                        bg={customColors.myCustomColor.darker}
                                        flexDirection={"column"}
                                    >
                                        <Text>
                                            Total claimed
                                        </Text>
                                        <Text>
                                            30
                                        </Text>
                                    </Center>
                                    <Center
                                        w={"70%"}
                                        p={5}
                                        fontSize={"xl"}
                                        borderRadius={"2xl"}
                                        fontWeight={"medium"} 
                                        gap={4}
                                        bg={customColors.myCustomColor.darker}
                                        flexDirection={"column"}
                                    >
                                        <Text>
                                            Available to claim
                                        </Text>
                                        <Text>
                                            10
                                        </Text>
                                    </Center>
                                </Grid>
                                <Center mt={{sm: 8, md: 10}} mb={5} fontSize={"xl"} fontWeight={"medium"}>
                                    <ActionButton px={10} isFilled={true} disabled={false}>
                                        Claim {token}
                                    </ActionButton>
                                </Center>
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </Center>
        </CardWrapper>
    );
}

export default FaucetsView;