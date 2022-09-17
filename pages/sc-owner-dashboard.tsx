import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import ProtectPage from "../hoc/ProtectPage";
import { selectIsAdmin } from "../redux/slices/settings";
import ScOwnerDashboardView from "../views/ScOwnerDash/ScOwnerDashboardView";

const ScOwnerDash: NextPage = () => {
  const isAdmin = useSelector(selectIsAdmin);
  const router = useRouter();

  // useEffect(() => {
  //   if (!isAdmin) {
  //     router.replace("/");
  //   }
  // }, [isAdmin, router]);

  return <ScOwnerDashboardView />;
};

export default ProtectPage(ScOwnerDash);
