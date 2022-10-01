import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { MainLayout } from "../../components/ui/MainLayout";
import SendAirdrop from "../../components/ui/SendAirdrop";
import { useAppDispatch } from "../../hooks/core/useRedux";
import { fetchExistringPools } from "../../redux/asyncFuncs/poolsFuncs";
import { route } from "../../utils/routes";
import ExistingPools from "./ExistingPools/ExistingPools";

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
      </Flex>
    </MainLayout>
  );
};

export default NftCollectionOwnerView;
