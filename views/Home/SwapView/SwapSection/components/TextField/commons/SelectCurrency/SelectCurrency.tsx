import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Image,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { customColors } from "../../../../../../../../config/chakraTheme";
import { ActionButton } from "../../../../../../../../shared/components/tools/ActionButton";
import { selectUserAddress } from "../../../../../../../../shared/redux/slices/settings";
import { useAppSelector } from "../../../../../../../../shared/hooks/core/useRedux";
import { chainType, networkConfig } from "../../../../../../../../config/network";
import { EgldLogoIcon } from "../../../../../../../../shared/components/icons/ui";

const CurrencyModal: any = dynamic(() =>
  import("../CurrencyModal/CurrencyModal")
);

const SelectCurrency = ({ token, handleClickToken, field, disable, swapTokens }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClickTokenAndClose = (data) => {
    onClose();
    handleClickToken(data);
  };

  const nexusToken = networkConfig[chainType].tokens.NEXUS;

  return (
    <>
      {token ? (
        <ActionButton
          sx={{
            borderRadius: "2xl",
            display: "flex",
            cursor: "pointer",
            position: "relative",
          }}
          px={3}
          // bg="black.base"
          // _hover={{
          //   background: "rgba(255,255,255,0.1)",
          // }}
          display={"flex"}
          alignItems={"center"}
          onClick={onOpen}
          disabled={disable}
          textTransform={"uppercase"}
          fontSize={"xs"}
          // px={3}
          py={1.5}
          rounded={"full"}
          border={"none"}
          bg={customColors.myCustomColor.lighter}
          zIndex={1}
        >
            <Box
              sx={{
                borderRadius: "1.5rem",
                width: "24px",
                height: "24px",
                marginRight: 2,
                boxShadow: "rgb(255 255 255 / 8%) 0px 6px 10px",
              }}
              bg={token.identifier == nexusToken.identifier ? "white" : null}
            >
              {token.assets?.img ? (
                token.assets?.img
              ) : token.name == "EGLD" ? (
                <EgldLogoIcon/>
            ) : (
                <Image
                  src={token.assets?.svgUrl || token.assets?.static.src || ""}
                  alt={token.assets?.description || ""}
                  p={0.5}
                />
              )}
            </Box>
          
          <Box
            sx={{
              flex: "1",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Text fontSize={"md"}>
                {token.ticker === token.identifier
                  ? token.name || token.ticker || ""
                  : token.ticker || token.name || ""}
              </Text>
            </Box>
            <Center
              ml={2}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              color="main"
            >
              <ChevronDownIcon />
            </Center>
          </Box>
        </ActionButton>
      ) : (
        <Center
        sx={{
          borderRadius: "2xl",
          display: "flex",
          position: "relative",
        }}
        px={10}
        py={1.5}
        rounded={"full"}
        border={"none"}
        bg={customColors.myCustomColor.lighter}
        zIndex={1}
        >
          <Spinner />
        </Center>
      )}
      {isOpen && (
        <CurrencyModal
          field={field}
          isOpen={isOpen}
          onClose={onClose}
          handleClickToken={handleClickTokenAndClose}
          swapTokens={swapTokens}
        />
      )}
    </>
  );
};

export default SelectCurrency;
