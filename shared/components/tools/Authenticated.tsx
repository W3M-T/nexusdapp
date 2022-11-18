import { useGetLoginInfo } from "@elrondnetwork/dapp-core";
import { FC, PropsWithChildren, ReactElement } from "react";

interface AuthenticatedProps {
  fallback?: ReactElement;
  noSpinner?: boolean;
  spinnerCentered?: boolean;
}

export const Authenticated: FC<PropsWithChildren<AuthenticatedProps>> = ({
  children,
  fallback = null,
  noSpinner = false,
  spinnerCentered = false,
}) => {
  const { isLoggedIn } = useGetLoginInfo();

  if (!isLoggedIn) return fallback;

  return <>{children}</>;
};
