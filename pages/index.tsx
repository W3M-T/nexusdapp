import type { NextPage } from "next";
import { MainLayout } from "../components/ui/MainLayout";

const Home: NextPage = () => {
  return (
    <MainLayout metaTitle="Home">
      <h1>Landing page</h1>
    </MainLayout>
  );
};

export default Home;
