/* eslint-disable react/no-unescaped-entities */
import { MainLayout } from "../../components/ui/MainLayout";
import { route } from "../../utils/routes";

// Chakra imports
import { Flex } from "@chakra-ui/react";

// Custom components

// Icons
import TabsSection from "./TabsSection/TabsSection";
import TitleSection from "./TitlSection/TitleSection";

const CreatePoolView = () => {
  return (
    <MainLayout metaTitle={route.create.name}>
      <Flex
        direction="column"
        minH="100vh"
        align="center"
        pt={{ sm: "125px", lg: "75px" }}
      >
        <TitleSection />
        <TabsSection />
      </Flex>
    </MainLayout>
  );
};

export default CreatePoolView;
