import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProtectPage from "../hoc/ProtectPage";
import { selectisNftCreator } from "../redux/slices/pools";
import NftCollectionOwnerView from "../views/NftCollectionOwner/NftCollectionOwner";

const NftCollectionOwner: NextPage = () => {
  const isNftCreator = useSelector(selectisNftCreator).data;
  const router = useRouter();

  useEffect(() => {
    if (!isNftCreator) {
      router.replace("/");
    }
  }, [isNftCreator, router]);

  return <NftCollectionOwnerView />;
};

export default ProtectPage(NftCollectionOwner);
