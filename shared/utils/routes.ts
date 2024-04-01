import {
  AiOutlineHome,
  AiOutlineUpCircle,
  AiOutlineUser,
} from "react-icons/ai";
// import { CgCloseR } from "react-icons/cg";
// import { FaFaucet } from "react-icons/fa";
import { TbPyramid } from "react-icons/tb";
import { IconType } from "react-icons/lib";
// import { RiGalleryLine } from "react-icons/ri";
import { RiNftFill } from 'react-icons/ri';
import { GiReceiveMoney } from 'react-icons/gi';
// import { GrStackOverflow } from 'react-icons/gr';
import { PiStackDuotone } from "react-icons/pi";
import { PiWalletBold } from "react-icons/pi";
import { LuBadgeHelp } from "react-icons/lu";

interface IRoute {
  route: string;
  name: string;
  outNav?: boolean;
  public?: boolean;
  icon?: IconType;
  hideFromMobile?: boolean;
  destopshow?: boolean;
}
export const route = {
  home: {
    route: "/",
    name: "Home",
    public: true,
    icon: AiOutlineHome,
    destopshow: true,
  },
  staked: {
    route: "/staked",
    name: "Staked NFTs",
    public: true,
    icon: RiNftFill,
    hideFromMobile: true,
    destopshow: true,
  },
  create: {
    route: "/create-pool",
    name: "Create Pool",
    public: false,
    icon: TbPyramid,
    destopshow: true,
  },
  view: {
    route: "/view-pools",
    name: "Pools",
    public: true,
    icon: PiStackDuotone,
    hideFromMobile: true,
    destopshow: true,
  },
  faucets: {
    route: "/faucets",
    name: "Faucets",
    public: true,
    icon: GiReceiveMoney,
    destopshow: true,
  },
  dapp: {
    route: "/dapp",
    name: "dApp",
    public: true,
    icon: LuBadgeHelp,
    hideFromMobile: true,
    destopshow: true,
  },
  support: {
    route: "/chat",
    name: "Support",
    public: true,
    icon: LuBadgeHelp,
    destopshow: false,
  },
  scOwner: {
    route: "/sc-owner-dashboard",
    name: "SC Owner",
    outNav: true,
    icon: AiOutlineUser,
    destopshow: true,
  },
  nftCollectionOwner: {
    route: "/nft-collection-owner",
    name: "Nft Collection Owner",
    outNav: true,
    icon: AiOutlineUpCircle,
    destopshow: true,
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
