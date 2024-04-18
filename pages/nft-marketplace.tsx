import type { NextPage } from "next";
import { MetaHead } from "../shared/components/ui/MetaHead";
import { route } from "../shared/utils/routes";
import NftMarketplace from "../views/NftMarketplace/NftMarketplace";

const StakedPage: NextPage = () => {
  return (
    <>
      <MetaHead metaTitle={route.nftmarketplace.name} />
      <NftMarketplace/>
    </>
  );
};

export default StakedPage;
