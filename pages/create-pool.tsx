import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MainLayout } from "../components/ui/MainLayout";
import ProtectPage from "../hoc/ProtectPage";
import { useLogin } from "../hooks/auth/useLogin";

const CreatePool: NextPage = () => {
  const router = useRouter();
  const { isLoggedIn } = useLogin();
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  return (
    <MainLayout metaTitle="Create Pool">
      <h1>Create pool</h1>
    </MainLayout>
  );
};

export default ProtectPage(CreatePool);
