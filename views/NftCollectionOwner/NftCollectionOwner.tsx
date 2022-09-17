import { MainLayout } from "../../components/ui/MainLayout";
import { route } from "../../utils/routes";
import ExistingPools from "./ExistingPools/ExistingPools";

const NftCollectionOwnerView = () => {
  return (
    <MainLayout metaTitle={route.nftCollectionOwner.name}>
      <ExistingPools />
    </MainLayout>
  );
};

export default NftCollectionOwnerView;
