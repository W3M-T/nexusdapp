import type { NextPage } from "next";
import { MetaHead } from "../shared/components/ui/MetaHead";
import Home from "../views/Home/Home";
import { MainLayout } from "../shared/components/ui/MainLayout";
import MainChatAi from "../views/Chat/main";

const Index: NextPage = () => {
  return (
    <>
      <MetaHead metaTitle={"Home"} />
      <div className="flex md:hidden">
        <Home />
      </div>
      <div className="hidden md:flex flex-col">
        <MainLayout>
          <div className='black-bg pt-[50px] '>
            <MainChatAi />
          </div>
        </MainLayout>
      </div>
    </>
  );
};

export default Index;
