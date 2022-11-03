import type { NextPage } from "next";
import ProtectPage from "../shared/hoc/ProtectPage";
import ViewPools from "../views/ViewPools/ViewPools";

const ViewPool: NextPage = () => {
  return <ViewPools />;
};

export default ProtectPage(ViewPool);
