import type { NextPage } from "next";
import ProtectPage from "../hoc/ProtectPage";
import CreatePoolView from "../views/CreatePool/CreatePool";

const CreatePool: NextPage = () => {
  return <CreatePoolView />;
};

export default ProtectPage(CreatePool);
