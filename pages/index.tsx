import type { NextPage } from "next";
import { MetaHead } from "../shared/components/ui/MetaHead";
import Home from "../views/Home/Home";
import { actualHomepage, route } from "../shared/utils/routes";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect from "/" to "/home" after the component mounts
    router.push(actualHomepage.route);
  }, [router]);

  // return null;
  return (
    <>
      <MetaHead metaTitle={actualHomepage.name} />
      {/* <Home /> */}
    </>
  );
};

export default Index;
