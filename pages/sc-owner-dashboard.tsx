import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ProtectPage from "../shared/hoc/ProtectPage";
import { useAppSelector } from "../shared/hooks/core/useRedux";
import { selectisScOwner } from "../shared/redux/slices/pools";
import ScOwnerDashboardView from "../views/ScOwnerDash/ScOwnerDashboardView";
const ScOwnerDash: NextPage = () => {
  const isAdmin = useAppSelector(selectisScOwner);
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.replace("/");
    }
  }, [isAdmin, router]);

  return <ScOwnerDashboardView />;
};

export default ProtectPage(ScOwnerDash);
