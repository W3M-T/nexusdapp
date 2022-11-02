import type { NextPage } from "next";
import ProtectPage from "../shared/hoc/ProtectPage";
import AenPoolView from "../views/AenPoolView/AenPoolView";

const AenPool: NextPage = () => {
  return <AenPoolView />;
};

export default ProtectPage(AenPool);
