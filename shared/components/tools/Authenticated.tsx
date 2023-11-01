import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks/account/useGetLoginInfo";
import { FC, PropsWithChildren, ReactElement } from "react";

interface AuthenticatedProps {
  fallback?: ReactElement;
  noSpinner?: boolean;
  spinnerCentered?: boolean;
}

export const Authenticated: FC<PropsWithChildren<AuthenticatedProps>> = ({
  children,
  fallback = null,
}) => {
  const { isLoggedIn } = useGetLoginInfo();

  if (!isLoggedIn) return fallback;

  return <>{children}</>;
};
