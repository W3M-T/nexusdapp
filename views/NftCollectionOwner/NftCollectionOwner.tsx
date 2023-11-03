import { Button, Center, Flex, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { MainLayout } from "../../shared/components/ui/MainLayout";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/core/useRedux";
import { fetchExistringPools } from "../../shared/redux/reduxAsyncFuncs/poolsFuncs";
import { route } from "../../shared/utils/routes";
import ClaimUnsentRewards from "./components/ClaimUnsentRewards/ClaimUnsentRewards";
import ExistingPools from "./components/ExistingPools/ExistingPools";
import SendAirdrop from "./components/SendRewards/SendRewards";
import pools, { selectisNftCreator } from "../../shared/redux/slices/pools";
import { CardWrapper } from "../../shared/components/ui/CardWrapper";
import SearchTable1 from "../../shared/components/ui/SearchTable1";
import { columns } from "./components/ExistingPools/columns";
import { ActionButton } from "../../shared/components/tools/ActionButton";

const NftCollectionOwnerView = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchExistringPools());
  }, [dispatch]);

  const isNftCreator = useAppSelector(selectisNftCreator);

  return (
    <MainLayout metaTitle={route.nftCollectionOwner.name}>
      <Flex gap={8} flexDir="column" mt={"30px"}>
        {isNftCreator && 
          <CardWrapper>
            <Heading fontSize={"2xl"}>Pool Creation</Heading>
            <Flex justifyContent="center" my={"20px"}>
              <ActionButton>
                <a href={route.create.route}>Create a Pool</a>
              </ActionButton>
            </Flex>
          </CardWrapper>
        }
        <ExistingPools />
        <CardWrapper>
          <Heading fontSize={"2xl"} mb={"30px"}>Management</Heading>
          <SendAirdrop />
          <ClaimUnsentRewards />
        </CardWrapper>
      </Flex>
    </MainLayout>
  );
};

export default NftCollectionOwnerView;
