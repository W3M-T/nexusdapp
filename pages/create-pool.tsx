import type { NextPage } from "next";
import { MetaHead } from "../shared/components/ui/MetaHead";
import ProtectPage from "../shared/hoc/ProtectPage";
import { route } from "../shared/utils/routes";
import CreatePoolView from "../views/CreatePool/CreatePool";

const CreatePool: NextPage = () => {
  return (
    <>
      <MetaHead metaTitle={route.create.name} />
      <CreatePoolView />
    </>
  );
};

export default ProtectPage(CreatePool);
