import {
  AiOutlineHome,
  AiOutlineUpCircle,
  AiOutlineUser,
} from "react-icons/ai";
import { CgCloseR } from "react-icons/cg";
import { TbPyramid, TbWorld } from "react-icons/tb";

import { IconType } from "react-icons/lib";
import { RiGalleryLine } from "react-icons/ri";

interface IRoute {
  route: string;
  name: string;
  outNav?: boolean;
  public?: boolean;
  icon?: IconType;
}
export const route = {
  home: {
    route: "/",
    name: "Home",
    public: true,
    icon: AiOutlineHome,
  },
  staked: {
    route: "/staked",
    name: "Staked NFTs",
    public: true,
    icon: RiGalleryLine,
  },

  create: {
    route: "/create-pool",
    name: "Create Pool",
    icon: TbPyramid,
  },
  view: {
    route: "/view-pools",
    name: "Pools",
    public: true,
    icon: TbWorld,
  },
  aenPools: {
    route: "/aen-pools",
    name: "AEN Pools",
    public: true,
    icon: CgCloseR,
  },
  scOwner: {
    route: "/sc-owner-dashboard",
    name: "SC Owner",
    outNav: true,
    icon: AiOutlineUser,
  },
  nftCollectionOwner: {
    route: "/nft-collection-owner",
    name: "Nft Collection Owner",
    outNav: true,
    icon: AiOutlineUpCircle,
  },
};

const routesFn = (): IRoute[] => {
  const routes: IRoute[] = [];
  for (const key in route) {
    if (Object.prototype.hasOwnProperty.call(route, key)) {
      const routeObj: IRoute = route[key];
      routes.push(routeObj);
    }
  }

  return routes;
};

export const routes = routesFn();
