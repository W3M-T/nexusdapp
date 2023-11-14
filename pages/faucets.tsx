import type { NextPage } from "next";
import { MetaHead } from "../shared/components/ui/MetaHead";
import { route } from "../shared/utils/routes";
import ViewPools from "../views/ViewPools/ViewPools";
import { MainLayout } from "../shared/components/ui/MainLayout";
import FaucetsView from "../views/Faucets/FaucetsView";

const Faucets: NextPage = () => {
  return (
    <>
      <MetaHead metaTitle={route.view.name} />
      <MainLayout metaTitle="Faucets" gap={"50px"}>
          <FaucetsView/>
      </MainLayout>
    </>
  );
};

export default Faucets;
