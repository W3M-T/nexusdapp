import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { MainLayout } from "../../shared/components/ui/MainLayout";
import {
  useAppDispatch,
  useAppSelector,
} from "../../shared/hooks/core/useRedux";
import {
  fetchHasReadWarning,
  fetchUserStaked,
} from "../../shared/redux/reduxAsyncFuncs/poolsFuncs";
import { selectUserStaked } from "../../shared/redux/slices/pools";
import { selectUserAddress } from "../../shared/redux/slices/settings";
import StakingSection from "./StakingSection/StakingSection";

const Staked = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectUserAddress);
  const page = useAppSelector(selectUserStaked).page;
  useEffect(() => {
    if (address) {
      dispatch(fetchHasReadWarning(address));
      dispatch(fetchUserStaked({ address: address, page: page, maxNftsPerPage: 8 }));
    }
  }, [address, dispatch, page]);
  return (
    <MainLayout metaTitle="Staked NFTs">
      <StakingSection />
    </MainLayout>
  );
};

export default Staked;