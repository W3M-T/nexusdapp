/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */

// Chakra imports
import { TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useRef, useState } from "react";
import FeeTab from "./FeeTab/FeeTab";
import FormTab from "./FormTab/FormTab";

// Custom components

// Icons
import { useEffect } from "react";
import { useAppDispatch } from "../../../shared/hooks/core/useRedux";
import { setCreatePool } from "../../../shared/redux/slices/pools";
import { store } from "../../../shared/redux/store";
import TabsList from "./TabsList/TabsList";
import UserTab from "./VerifyTab/VerifyTab";

const TabsSection = () => {
  const dispatch = useAppDispatch();

  // Set active bullets based on current state
  const [activeBullets, setActiveBullets] = useState({
    about: true,
    account: false,
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

  useEffect(() => {
    const phase = localStorage.getItem("poolcreationPhase");

    if (phase === "2") {
      setTimeout(() => {
        activeFeeTab();
      }, 500);
    } else if (phase === "3") {
      setTimeout(() => {
        activeFormTab();
      }, 500);
    }
  }, []);

  useEffect(() => {
    dispatch(
      setCreatePool(
        localStorage.getItem("createPool")
          ? JSON.parse(localStorage.getItem("createPool"))
          : {
              collection: null,
              phase1: null,
              phase2: {
                message: "",
                status: "success",
                data: null,
              },
            }
      )
    );
  }, [dispatch]);
  useEffect(() => {
    store.subscribe(() => {
      const createPoolState = store.getState().pools.createPool;
      localStorage.setItem("createPool", JSON.stringify(createPoolState));
    });
  }, []);

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
