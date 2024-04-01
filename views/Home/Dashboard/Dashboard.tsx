import { Box, Flex } from "@chakra-ui/react";
import StakedNfts from "./StakedNfts/StakedNfts";
import MyEarnings from "./MyEarnings/MyEarnings";
import { networkConfig, chainType } from "../../../config/network";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/core/useRedux";
import useGetMultipleElrondTokens from "../../../shared/hooks/tools/useGetMultipleElrondTokens";
import useGetUserEarnings from "../../../shared/hooks/tools/useGetUserEarnings";
import { selectUserAddress } from "../../../shared/redux/slices/settings";
import { isMobile } from "../../../shared/utils/isMobile";
import { selectUserStaked } from "../../../shared/redux/slices/pools";
import { useEffect } from "react";
import { fetchUserStaked } from "../../../shared/redux/reduxAsyncFuncs/poolsFuncs";

const Dashboard = ({...props}) => {
    const address = useAppSelector(selectUserAddress);
    const dispatch = useAppDispatch();
    const stakedNfts = useAppSelector(selectUserStaked);

    useEffect(() => {
        if (address) {
          dispatch(fetchUserStaked({ address: address, page: 1 }));
        }
    }, [address, dispatch]);
    const hasStakedNfts = stakedNfts.data.nfts.length > 0 || false;
    
    const {userEarnings, isLoadingUserEarnings, errorUserEarnings} = useGetUserEarnings(address);

    let {tokens: earnedTokens, isLoading: isLoadingTokens, isError} = useGetMultipleElrondTokens(userEarnings.map(t => t.token));
    if (earnedTokens && userEarnings && !isLoadingTokens && !isLoadingUserEarnings) {
        earnedTokens = earnedTokens.map((tokenData) => {
            const userEarning = userEarnings.find((ue) => ue.token === tokenData.identifier);
            return userEarning ?
            { ...tokenData, earnedAmount: userEarning.amount } :
            { ...tokenData, earnedAmount: 0 };
        });
    }
    const hasEarnedTokens = earnedTokens.length > 0 || false;

    return (
        <Flex
            flexDirection={{sm: "column", md: "row"}}
            w={"full"}
            justifyContent={"center"}
            {...props}
            gap={{sm: 1, md:8}}
        >
            {hasStakedNfts && <Box maxW={{sm: "100%", md: hasEarnedTokens ? "50%" : "100%"}} w={"full"}>
                <StakedNfts stakedNfts={stakedNfts}/>
            </Box>}

            {hasEarnedTokens && <Box maxW={{sm: "100%", md: hasStakedNfts ? "50%" : "100%"}} w={"full"}>
                <MyEarnings earnedTokens={earnedTokens}/>
            </Box>}

        </Flex>
    )
};
  
export default Dashboard;
  