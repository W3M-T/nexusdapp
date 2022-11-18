import type { NextPage } from "next";
import { MetaHead } from "../shared/components/ui/MetaHead";
import { route } from "../shared/utils/routes";
import AenPoolView from "../views/AenPoolView/AenPoolView";

const AenPool: NextPage = () => {
  return (
    <>
      <MetaHead metaTitle={route.aenPools.name} />
      <AenPoolView />
    </>
  );
};

export default AenPool;
