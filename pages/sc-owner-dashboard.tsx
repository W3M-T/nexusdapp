import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProtectPage from "../shared/hoc/ProtectPage";
import { selectIsAdmin } from "../shared/redux/slices/settings";
import ScOwnerDashboardView from "../views/ScOwnerDash/ScOwnerDashboardView";
const ScOwnerDash: NextPage = () => {
  const isAdmin = useSelector(selectIsAdmin);
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.replace("/");
    }
  }, [isAdmin, router]);

  return <ScOwnerDashboardView />;
};

export default ProtectPage(ScOwnerDash);
