import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProtectPage from "../hoc/ProtectPage";
import { selectIsAdmin } from "../redux/slices/settings";
import NftCollectionOwnerView from "../views/NftCollectionOwner/NftCollectionOwner";

const NftCollectionOwner: NextPage = () => {
  const isAdmin = useSelector(selectIsAdmin);
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.replace("/");
    }
  }, [isAdmin, router]);

  return <NftCollectionOwnerView />;
};

export default ProtectPage(NftCollectionOwner);
