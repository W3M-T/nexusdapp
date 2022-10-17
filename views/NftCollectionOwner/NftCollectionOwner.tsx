import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { MainLayout } from "../../shared/components/ui/MainLayout";
import { useAppDispatch } from "../../shared/hooks/core/useRedux";
import { fetchExistringPools } from "../../shared/redux/reduxAsyncFuncs/poolsFuncs";
import { route } from "../../shared/utils/routes";
import ClaimUnsentRewards from "./components/ClaimUnsentRewards/ClaimUnsentRewards";
import ExistingPools from "./components/ExistingPools/ExistingPools";
import SendAirdrop from "./components/SendRewards/SendRewards";

const NftCollectionOwnerView = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchExistringPools());
  }, [dispatch]);
  return (
    <MainLayout metaTitle={route.nftCollectionOwner.name}>
      <Flex gap={8} flexDir="column">
        <ExistingPools />
        <SendAirdrop />
        <ClaimUnsentRewards />
      </Flex>
    </MainLayout>
  );
};

export default NftCollectionOwnerView;
