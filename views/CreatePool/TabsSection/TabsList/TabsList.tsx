/* eslint-disable react/no-unescaped-entities */

// Chakra imports
import { Flex, Icon, Tab, TabList, Text } from "@chakra-ui/react";

// Custom components

// Icons
import { BsCircleFill } from "react-icons/bs";

const TabsList = ({
  setActiveBullets,
  verifyTab,
  activeBullets,
  feeTab,
  formTab,
}) => {
  return (
    <TabList display="flex" justifyContent="center">
      <Tab
        ref={verifyTab}
        w={{ sm: "120px", md: "250px", lg: "300px" }}
        onClick={() =>
          setActiveBullets({
            about: true,
            account: false,
            address: false,
          })
        }
      >
        <Flex
          direction="column"
          justify="center"
          align="center"
          position="relative"
          _before={{
            content: "''",
            width: { sm: "120px", md: "250px", lg: "300px" },
            height: "3px",
            bg: activeBullets.account ? "#fff" : "#182058",
            left: { sm: "12px", md: "32px" },
            top: { sm: activeBullets.about ? "8px" : "6px", md: null },
            position: "absolute",
            bottom: activeBullets.about ? "40px" : "38px",
            zIndex: -1,
            transition: "all .3s ease",
          }}
        >
          <Icon
            as={BsCircleFill}
            color={activeBullets.about ? "#fff" : "brand.200"}
            w="20px"
            h="20px"
            border={activeBullets.about ? "none" : "1px solid"}
            borderColor={activeBullets.about ? "#fff" : "#182058"}
            borderRadius="50%"
            mb="8px"
          />
          <Text
            color="#fff"
            fontWeight={activeBullets.about ? "bold" : "normal"}
            display={{ sm: "none", md: "block" }}
          >
            Verify
          </Text>
        </Flex>
      </Tab>
      <Tab
        ref={feeTab}
        w={{ sm: "120px", md: "250px", lg: "300px" }}
        onClick={() =>
          setActiveBullets({
            about: true,
            account: true,
            address: false,
          })
        }
      >
        <Flex
          direction="column"
          justify="center"
          align="center"
          position="relative"
          _before={{
            content: "''",
            width: { sm: "120px", md: "250px", lg: "300px" },
            height: "3px",
            bg: activeBullets.address ? "#fff" : "#182058",
            left: { sm: "12px", md: "32px" },
            top: { sm: activeBullets.account ? "8px" : "8px", md: null },
            position: "absolute",
            bottom: activeBullets.account ? "40px" : "38px",
            zIndex: -1,
            transition: "all .3s ease",
          }}
        >
          <Icon
            as={BsCircleFill}
            color={activeBullets.account ? "#fff" : "brand.200"}
            w="20px"
            h="20px"
            border={activeBullets.account ? "none" : "1px solid"}
            borderColor={activeBullets.account ? "#fff" : "#182058"}
            borderRadius="50%"
            mb="8px"
          />
          <Text
            color="#fff"
            fontWeight={activeBullets.account ? "bold" : "normal"}
            transition="all .3s ease"
            _hover={{ color: "#fff" }}
            display={{ sm: "none", md: "block" }}
          >
            Pay Fee
          </Text>
        </Flex>
      </Tab>
      <Tab
        ref={formTab}
        w={{ sm: "120px", md: "250px", lg: "300px" }}
        onClick={() =>
          setActiveBullets({
            about: true,
            account: true,
            address: true,
          })
        }
      >
        <Flex
          direction="column"
          justify="center"
          align="center"
          position="relative"
        >
          <Icon
            as={BsCircleFill}
            color={activeBullets.address ? "#fff" : "brand.200"}
            w="20px"
            h="20px"
            border={activeBullets.address ? "none" : "1px solid"}
            borderColor={activeBullets.address ? "#fff" : "#182058"}
            borderRadius="50%"
            mb="8px"
          />
          <Text
            color="#fff"
            fontWeight={activeBullets.address ? "bold" : "normal"}
            transition="all .3s ease"
            _hover={{ color: "#fff" }}
            display={{ sm: "none", md: "block" }}
          >
            Fill Form
          </Text>
        </Flex>
      </Tab>
    </TabList>
  );
};

export default TabsList;
