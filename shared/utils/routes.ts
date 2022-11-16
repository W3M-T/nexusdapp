import {
  AiFillEye,
  AiOutlineCrown,
  AiOutlineEye,
  AiOutlineHome,
  AiOutlineSafety,
  AiOutlineUpCircle,
  AiOutlineUser,
} from "react-icons/ai";
import { IconType } from "react-icons/lib";

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
    icon: AiOutlineCrown,
  },

  create: {
    route: "/create-pool",
    name: "Create Pool",
    icon: AiOutlineSafety,
  },
  view: {
    route: "/view-pools",
    name: "View Pools",
    public: true,
    icon: AiOutlineEye,
  },
  aenPools: {
    route: "/aen-pools",
    name: "AEN Pools",
    public: true,
    icon: AiFillEye,
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
