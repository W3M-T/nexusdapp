/* eslint-disable react/no-unescaped-entities */

// Chakra imports
import { TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useRef, useState } from "react";
import FeeTab from "./FeeTab/FeeTab";
import FormTab from "./FormTab/FormTab";

// Custom components

// Icons
import TabsList from "./TabsList/TabsList";
import UserTab from "./VerifyTab/VerifyTab";

const TabsSection = () => {
  const bgPrevButton = "white";

  // Set active bullets based on current state
  const [activeBullets, setActiveBullets] = useState({
    about: true,
    feet: false,
    form: false,
  });

  const [checkboxes, setCheckboxes] = useState({
    design: false,
    code: false,
    develop: false,
  });

  // Tabs references
  const verifyTab = useRef();
  const feeTab = useRef();
  const formTab = useRef();

  return (
    <Tabs
      variant="unstyled"
      mt="24px"
      display="flex"
      flexDirection="column"
      isLazy
    >
      {" "}
      <TabsList
        verifyTab={verifyTab}
        feeTab={feeTab}
        activeBullets={activeBullets}
        formTab={formTab}
        setActiveBullets={setActiveBullets}
      />
      <TabPanels mt="24px" maxW={{ md: "90%", lg: "100%" }} mx="auto">
        <TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
          <UserTab feeTab={feeTab} />
        </TabPanel>
        <TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
          <FeeTab
            verifyTab={verifyTab}
            formTab={formTab}
            bgPrevButton={bgPrevButton}
            checkboxes={checkboxes}
            setCheckboxes={setCheckboxes}
          />
        </TabPanel>
        <TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
          <FormTab feeTab={feeTab} bgPrevButton={bgPrevButton} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabsSection;
