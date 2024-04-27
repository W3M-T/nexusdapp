import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { MetaHead } from "../shared/components/ui/MetaHead";
import ProtectPage from "../shared/hoc/ProtectPage";
import { selectisNftCreator } from "../shared/redux/slices/pools";
import { actualHomepage, route } from "../shared/utils/routes";
import NftCollectionOwnerView from "../views/NftCollectionOwner/NftCollectionOwner";

const NftCollectionOwner: NextPage = () => {
  const isNftCreator = useSelector(selectisNftCreator);
  const router = useRouter();

  useEffect(() => {
    if (!isNftCreator) {
      router.replace(actualHomepage.route);
    }
  }, [isNftCreator, router]);

  return (
    <>
      <MetaHead metaTitle={route.nftCollectionOwner.name} />

      <NftCollectionOwnerView />
    </>
  );
};

export default ProtectPage(NftCollectionOwner);
