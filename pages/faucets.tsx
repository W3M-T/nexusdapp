import type { NextPage } from "next";
import { MetaHead } from "../shared/components/ui/MetaHead";
import { route } from "../shared/utils/routes";
import ViewPools from "../views/ViewPools/ViewPools";
import { MainLayout } from "../shared/components/ui/MainLayout";

const ViewPool: NextPage = () => {
  return (
    <>
      <MetaHead metaTitle={route.view.name} />
      <MainLayout metaTitle="Faucets" gap={"50px"}>
      </MainLayout>
    </>
  );
};

export default ViewPool;
