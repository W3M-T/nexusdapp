import type { NextPage } from "next";
import { MetaHead } from "../shared/components/ui/MetaHead";
import Home from "../views/Home/Home";
import { route } from "../shared/utils/routes";

const Homepage: NextPage = () => {
  return (
    <>
      <MetaHead metaTitle={route.home.name} />
      <Home />
    </>
  );
};

export default  Homepage;
