import type { NextPage } from "next";
import { MetaHead } from "../shared/components/ui/MetaHead";
import Home from "../views/Home/Home";

const Index: NextPage = () => {
  return (
    <>
      <MetaHead metaTitle={"Home"} />
      <Home />
    </>
  );
};

export default Index;
