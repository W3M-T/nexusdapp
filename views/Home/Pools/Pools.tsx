import { Box, Flex, Grid, Heading } from "@chakra-ui/react";
import { addDays } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../shared/hooks/core/useRedux";
import useGroupByField from "../../../shared/hooks/tools/useGroupByField";
import { fetchExistringPools } from "../../../shared/redux/reduxAsyncFuncs/poolsFuncs";
import { selectExistingPools } from "../../../shared/redux/slices/pools";
import { IExistingPool } from "../../../shared/redux/types/pools.interface";
import { route } from "../../../shared/utils/routes";
import HomePool from "./HomePool";

const Pools = () => {
  const { data: pools } = useAppSelector(selectExistingPools);
  const [poolData, setPoolData] = useState([]);
  const poolsGroupedByCollection: IExistingPool[][] = useGroupByField(
    pools,
    "collection"
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchExistringPools());
  }, [dispatch]);

  const data = pools.filter((p) => {
    const date = new Date(p.timestam * 1000);

    const dateInAMonth = addDays(date, 30);
    const today = new Date();

    if (dateInAMonth < today || p.collection === "") {
      return false;
    } else {
      return true;
    }
  });

  console.log("data", data);

  return (
    <Flex flexDir={"column"}>
      <Heading
        mb={4}
        fontWeight="600"
        as="h2"
        fontSize={"24px"}
        color="dappTemplate.color2.base"
      >
        Pools
      </Heading>
      {data.length > 0 && (
        <Grid templateColumns={"1fr 1.5fr"} gap={{ sm: 3, md: 8 }}>
          <Box mb={{ sm: 3, md: 8 }}>
            {data[0] && <HomePool pool={data[0]} />}
          </Box>

          <Grid templateColumns={"1fr 1fr"} gap={{ sm: 3, md: 8 }}>
            {data[1] ? <HomePool pool={data[1]} small /> : <Box></Box>}

            {data[2] ? <HomePool pool={data[2]} small /> : <Box></Box>}

            {data[3] ? <HomePool pool={data[3]} small /> : <Box></Box>}
            {data[4] ? <HomePool pool={data[4]} small /> : <Box></Box>}
            {data[5] ? <HomePool pool={data[5]} small /> : <Box></Box>}
          </Grid>
        </Grid>
      )}
      <Flex
        w="full"
        justifyContent={"flex-end"}
        display={{ sm: "none", md: "flex" }}
      >
        <Link href={route.view.route}>
          <a>
            <Box cursor="pointer" _hover={{ fontWeight: "bold" }}>
              View all
            </Box>
          </a>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Pools;
