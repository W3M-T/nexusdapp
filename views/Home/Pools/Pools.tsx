import { Box, Flex, Grid, Heading } from "@chakra-ui/react";
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

  const data = pools.filter((p) => {
    const date = new Date(p.timestam * 1000);

    const dateInAMonth = addDays(date, p.poolDuration || 30);
    const today = new Date();

    if (dateInAMonth < today) {
      return false;
    } else {
      return true;
    }
  });

  return (
    <Flex flexDir={"column"}>
      <Flex display={{ sm: "flex", md: "none" }}>
        <Link href={route.view.route}>
          <Heading
            mb={4}
            fontWeight="600"
            as="h2"
            fontSize={"24px"}
            color="dappTemplate.color2.base"
          >
            Pools
          </Heading>
        </Link>
      </Flex>
      <Flex display={{ sm: "none", md: "flex" }}>
        <Heading
          mb={4}
          fontWeight="600"
          as="h2"
          fontSize={"24px"}
          color="dappTemplate.color2.base"
        >
          Pools
        </Heading>
      </Flex>
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
      <Flex
        w="full"
        justifyContent={"flex-end"}
        display={{ sm: "none", md: "flex" }}
        mt={2}
      >
        <Link href={route.view.route}>
          <Box cursor="pointer" _hover={{ fontWeight: "bold" }}>
            View all
          </Box>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Pools;
