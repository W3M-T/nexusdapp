import { MainLayout } from "../../components/ui/MainLayout";
import { route } from "../../utils/routes";

const NftCollectionOwnerView = () => {
  return (
    <MainLayout metaTitle={route.nftCollectionOwner.name}>
      <h1>NftCollectionOwner</h1>
    </MainLayout>
  );
};

export default NftCollectionOwnerView;
