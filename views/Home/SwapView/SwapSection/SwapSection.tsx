import { Box, Center, Flex, HStack, Heading, Text, Image } from "@chakra-ui/react";
import { CardWrapper } from "../../../../shared/components/ui/CardWrapper";
import { Authenticated } from "../../../../shared/components/tools/Authenticated";
import { customColors } from "../../../../config/chakraTheme";
import { EgldLogoIcon } from "../../../../shared/components/icons/ui";
import useGetUserEgld from "../../../../shared/hooks/tools/useGetUserEgld";
import useGetUserTokens from "../../../../shared/hooks/tools/useGetUserTokens";
import { formatNumber, formatBalance } from "../../../../shared/utils/formatBalance";
import { isMobile } from "../../../../shared/utils/isMobile";

const getTokenDollarValue = (token: any) => {
    if (!token.price || !token.balance) { return 0; }
    return Number(token.balance) / (Math.pow(10, token.decimals)) * token.price;
}

const SwapSection = ({titleLeft = false}) => {
    const { userTokens, isLoadingUserTokens, errorUserTokens } = useGetUserTokens();
    const { userEgld, isLoadingUserEgld, errorUserEgld } = useGetUserEgld();
    const isSmallDevice = isMobile();


        
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
        </CardWrapper>
        );
};

export default SwapSection;