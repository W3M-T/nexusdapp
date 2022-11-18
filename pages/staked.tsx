import type { NextPage } from "next";
import { MetaHead } from "../shared/components/ui/MetaHead";
import { route } from "../shared/utils/routes";
import Home from "../views/Staked/Staked";

const StakedPage: NextPage = () => {
  return (
    <>
      <MetaHead metaTitle={route.staked.name} />
      <Home />
    </>
  );
};

export default StakedPage;
