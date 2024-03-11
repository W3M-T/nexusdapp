import { Box, Flex, Grid, HStack, Heading } from "@chakra-ui/react";
import { addDays } from "date-fns";
import Link from "next/link";
import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../shared/hooks/core/useRedux";
import {
  fetchExistringPools,
  fetcHhasStakedForAEN,
  fetchNeedsToUnstake,
} from "../../../shared/redux/reduxAsyncFuncs/poolsFuncs";
import { selectExistingPools } from "../../../shared/redux/slices/pools";
import { selectUserAddress } from "../../../shared/redux/slices/settings";
import { route } from "../../../shared/utils/routes";
import HomePool from "./HomePool";
import { CardWrapper } from "../../../shared/components/ui/CardWrapper";
import { ViewButton } from "../../../shared/components/tools/ViewButton";

const Pools = () => {
  const { data: pools } = useAppSelector(selectExistingPools);

  const connectedAddress = useAppSelector(selectUserAddress);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchExistringPools());
    if (connectedAddress) {
      dispatch(fetchNeedsToUnstake(connectedAddress));
      dispatch(fetcHhasStakedForAEN(connectedAddress));
    }
  }, [connectedAddress, dispatch]);

  let data = pools.filter((p) => {
    const date = new Date(p.timestam * 1000);

    const dateInAMonth = addDays(date, p.poolDuration || 30);
    const today = new Date();

    if (dateInAMonth < today || p.collection == "") {
      return false;
    } else {
      return true;
    }
  });

  data = data.reverse();

  return (
    <CardWrapper>
      <Flex flexDir={"column"}>
        <HStack justifyContent="center" alignContent={"center"} mb={8}>
          <Flex display={{ sm: "flex", md: "none" }} w="full">
            <Link href={route.view.route}>
              <Heading
                fontWeight="700"
                as="h2"
                fontSize={"24px"}
                w="full"
                // color="dappTemplate.color2.base"
              >
                Pools
              </Heading>
            </Link>
          </Flex>
          <Flex display={{ sm: "none", md: "flex" }} w="full">
            <Heading
              fontWeight="700"
              as="h2"
              fontSize={"24px"}
              w="full"
              // color="dappTemplate.color2.base"
            >
              Pools
            </Heading>
          </Flex>
          {/* <Flex
            w="full"
            justifyContent={"flex-end"}
            display={{ sm: "none", md: "flex" }}
            mt={2}
          > */}
          <ViewButton w={"100px"} fontSize={"12px"} cursor="pointer" _hover={{ fontWeight: "bold" }}>
            <Link href={route.view.route}>
              View all
            </Link>
          </ViewButton>
          {/* </Flex> */}
        </HStack>
        {data.length > 0 && (
          <Grid templateColumns={"1fr 1.5fr"} gap={{ sm: 3, md: 8 }}>
            <Box>{data[0] && <HomePool pool={data[0]} />}</Box>

            <Grid templateColumns={"1fr 1fr"} gap={{ sm: 3, md: 8 }}>
              {data[1] ? <HomePool pool={data[1]} small /> : <Box></Box>}

              {data[2] ? <HomePool pool={data[2]} small /> : <Box></Box>}

              {data[3] ? <HomePool pool={data[3]} small /> : <Box></Box>}
              {data[4] ? <HomePool pool={data[4]} small /> : <Box></Box>}
            </Grid>
          </Grid>
        )}
      </Flex>
    </CardWrapper>
  );
};

export default Pools;
