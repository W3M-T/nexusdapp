interface IRoute {
  route: string;
  name: string;
  outNav?: boolean;
  public?: boolean;
}
export const route = {
  home: {
    route: "/",
    name: "Home",
    public: true,
  },

  create: {
    route: "/create-pool",
    name: "Create Pool",
  },
  view: {
    route: "/view-pools",
    name: "View Pools",
    public: true,
  },
  aenPools: {
    route: "/aen-pools",
    name: "AEN Pools",
    public: true,
  },
  scOwner: {
    route: "/sc-owner-dashboard",
    name: "SC Owner",
    outNav: true,
  },
  nftCollectionOwner: {
    route: "/nft-collection-owner",
    name: "Nft Collection Owner",
    outNav: true,
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
