/* eslint-disable react/display-name */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLogin } from "../hooks/auth/useLogin";

const ProtectPage = (Component) => (props) => {
  const router = useRouter();
  const { isLoggedIn } = useLogin();
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  return <Component {...props} />;
};

export default ProtectPage;
