import type { NextPage } from "next";
import { MetaHead } from "../shared/components/ui/MetaHead";
import { route } from "../shared/utils/routes";
import ViewPools from "../views/ViewPools/ViewPools";

const ViewPool: NextPage = () => {
  return (
    <>
      <MetaHead metaTitle={route.view.name} />
      <ViewPools />
    </>
  );
};

export default ViewPool;
