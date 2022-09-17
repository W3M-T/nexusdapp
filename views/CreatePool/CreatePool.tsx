import { MainLayout } from "../../components/ui/MainLayout";
import { route } from "../../utils/routes";

const CreatePoolView = () => {
  return (
    <MainLayout metaTitle={route.create.name}>
      <h1>Create pool</h1>
    </MainLayout>
  );
};

export default CreatePoolView;
