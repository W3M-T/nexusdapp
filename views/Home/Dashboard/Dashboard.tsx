import { Flex } from "@chakra-ui/react";
import StakedNfts from "./StakedNfts/StakedNfts";
import Stats from "./MyDashboard/MyDashboard";

const Dashboard = ({...props}) => {
    return (
        <Flex
            flexDirection={{sm: "column", md: "row"}}
            w={"full"}
            justifyContent={"center"}
            {...props}
            gap={{sm: 1, md:8}}
        >

            <StakedNfts/>

            {/* <Stats/> */}
            <StakedNfts/>


        </Flex>
    )
};
  
export default Dashboard;
  