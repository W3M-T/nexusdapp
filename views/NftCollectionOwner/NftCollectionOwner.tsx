import { useEffect } from "react";
import { MainLayout } from "../../components/ui/MainLayout";
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
      <ExistingPools />
    </MainLayout>
  );
};

export default NftCollectionOwnerView;
