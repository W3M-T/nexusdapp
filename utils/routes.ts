interface IRoute {
  route: string;
  name: string;
  outNav?: boolean;
}
export const route = {
  home: {
    route: "/",
    name: "Home",
  },

  create: {
    route: "/create-pool",
    name: "Create",
  },
  view: {
    route: "/view-pool",
    name: "View",
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
