/* eslint-disable @typescript-eslint/no-explicit-any */
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
    account: true,
    address: false,
  });

  // Tabs references
  const verifyTab = useRef<any>();
  const feeTab = useRef<any>();
  const formTab = useRef<any>();

  const activeVerifyTab = () => {
    if (verifyTab.current) {
      verifyTab.current.click();
    }
  };
  const activeFeeTab = () => {
    if (verifyTab.current) {
      feeTab.current.click();
    }
  };
  const activeFormTab = () => {
    if (verifyTab.current) {
      formTab.current.click();
    }
  };

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
          <UserTab activeFeeTab={activeFeeTab} />
        </TabPanel>
        <TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
          <FeeTab
            activeVerifyTab={activeVerifyTab}
            activeFormTab={activeFormTab}
            activeFeeTab={activeFeeTab}
          />
        </TabPanel>
        <TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
          <FormTab activeFeeTab={activeFeeTab} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabsSection;
