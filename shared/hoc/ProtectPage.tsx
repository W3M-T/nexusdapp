/* eslint-disable react/display-name */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppSelector } from "../hooks/core/useRedux";
import { selectIsLogedIn } from "../redux/slices/settings";

const ProtectPage = (Component) => (props) => {
  const router = useRouter();
  const isLoggedIn = useAppSelector(selectIsLogedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  return <Component {...props} />;
};

export default ProtectPage;
