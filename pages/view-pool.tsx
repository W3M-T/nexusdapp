import type { NextPage } from "next";
import { MainLayout } from "../components/ui/MainLayout";
import ProtectPage from "../hoc/ProtectPage";

const ViewPool: NextPage = () => {
  return (
    <MainLayout metaTitle="Veiw Pool">
      <h1>View pool</h1>
    </MainLayout>
  );
};

export default ProtectPage(ViewPool);
