import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import TokenList from "../../../../../../../../shared/components/TokenList/TokenList";
import orderBy from "lodash/orderBy";
import * as React from "react";
// import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
// import { IElrondToken } from "utils/types/elrond.interface";
import { useState } from "react";
// import useGetUserTokens from "utils/hooks/useGetUserTokens";
import useGetMultipleElrondTokens from "../../../../../../../../shared/hooks/tools/useGetMultipleElrondTokens";
import useGetUserTokens from "../../../../../../../../shared/hooks/tools/useGetUserTokens";
import { IElrondToken } from "../../../../../../../../shared/types/network";
import { SwapToken } from "../../../../SwapSection";
import MyModal from "../../../../../../../../shared/components/ui/MyModal";
import { customColors } from "../../../../../../../../config/chakraTheme";
import useGetUserEgld from "../../../../../../../../shared/hooks/tools/useGetUserEgld";
import { getIsLoggedIn } from "@multiversx/sdk-dapp/utils";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks/account/useGetLoginInfo";

interface IProps {
  field: "from" | "to";
  isOpen: boolean;
  onClose: () => void;
  handleClickToken: (t: IElrondToken) => void;
  swapTokens: SwapToken[];
}

const CurrencyModal = ({
  isOpen,
  onClose,
  handleClickToken,
  field,
  swapTokens,
}: IProps) => {
  const { isLoggedIn } = useGetLoginInfo();
  
  const [order, setOrder] = React.useState<"desc" | "asc">("desc");
  const [tokenList, setTokenList] = useState([]);

  // const { tokens: topTokens } = useGetTopSmartSwapTokens();
  let {tokens: elrondTokens, isLoading: isLoadingTokens, isError} = useGetMultipleElrondTokens(swapTokens.map((t) => t.identifier));
  const { userTokens, isLoadingUserTokens, errorUserTokens } = useGetUserTokens();
  const { userEgld, isLoadingUserEgld, errorUserEgld } = useGetUserEgld();
  
  elrondTokens = elrondTokens.map((t) => {
    const accountToken = userTokens?.find((at) => at.identifier === t.identifier);

    if (t.name == "EGLD") {
      return {
        ...t,
        balance: userEgld?.balance || 0,
      }
    } else {
      return {
        ...t,
        balance: accountToken?.balance || 0,
      }
    }
  }).filter((t) => field == "to" || !isLoggedIn || Number(t.balance) > 0);
  
  const handleSearch = (e) => {
    const query = e.target.value;

    if (query === "") {
      setTokenList(null);
    } else {
      let newTokenList = elrondTokens.filter((token) => {
        return (
          token.ticker.toString().toLowerCase().indexOf(query.toLowerCase()) >
          -1
        );
      });

      // add in list


      setTokenList(newTokenList);
    }
  };

  const handleOrder = () => {
    const orderTokens = orderBy(
      elrondTokens,
      [
        function (o) {
          return o.name.toString().toLowerCase();
        },
      ],
      order
    );

    setTokenList(orderTokens);
    setOrder(() => {
      if (order === "desc") {
        return "asc";
      } else {
        return "desc";
      }
    });
  };

  // const { tokens: topElrondTokens } = useGetMultipleElrondTokens(swapTokens.map((t) => t.identifier).filter((t) => SwapTopTokens.includes(t)));
  const diplayTokens = tokenList && tokenList.length > 0 ? tokenList: elrondTokens;

  return (
    <MyModal isOpen={isOpen} onClose={onClose} size={"lg"} isCentered>
      <ModalOverlay background={"rgba(0,0,0,0.1)"} />

      <ModalContent
        background={customColors.myCustomColor.lighter}
        borderRadius={"2xl"}
        py={2.5}
        width={"full"}
        height={"auto"}
        maxWidth={"300px"}
        minHeight={"400px"}
      >
        <Flex px={"20px"} alignItems={"center"} mt={0.5}>
          <Text fontSize={"md"} mr={3}>
            Select a token:
             {/* to {field === "from" ? "send" : "receive"} */}
          </Text>
          {/* <CutomTooltip
            text={"Find a token by searching for its name or symbol."}
          /> */}
        </Flex>

        <ModalCloseButton
          border="none"
          outline={"none"}
          _focus={{ boxShadow: "none" }}
        />

        <ModalBody p={0} bg={customColors.myCustomColor.darker} borderRadius={"2xl"}
          mx={2}
          mt={3}
        >
          <Box px={3} py={2} borderRadius={"2xl"}>
             <Input
              maxH={"34px"}
              onChange={handleSearch}
              placeholder="Search for a token..."
              border={"none"}
              // _active={
              //   {
              //     outline: "none",
              //     // borderColor: "main",
              //   }
              // }
              // _focusVisible={
              //   {
              //     outline: "none",
              //     // borderColor: "main",
              //   }
              // }
              // _hover={
              //   {
              //     outline: "none",
              //     // borderColor: "main",
              //   }
              // }
            />
            {/* {diplayTokens.length > topElrondTokens.length && topElrondTokens.length > 0 && <Flex flexWrap={"wrap"} w="full" gap={2} mt={3}>
              {topElrondTokens.map((t) => {
                return (
                  <Center
                    key={t.identifier}
                    // border="1px solid"
                    // borderColor={"GrayText"}
                    rounded="15px"
                    px={2}
                    py={1}
                    background="black.baseLight"
                    color="white"
                    cursor="pointer"
                    _hover={{
                      background: "main",
                      color: "black",
                    }}
                    onClick={() => handleClickToken(t)}
                    as={Button}
                    disabled={
                      elrondTokens?.findIndex(
                        (token) => t.identifier === token.identifier
                      ) === -1
                    }
                  >
                    
                      <>
                        {t.assets?.svgUrl || t.assets?.static.src ? (
                          <Image
                            boxSize={"24px"}
                            borderRadius={"full"}
                            boxShadow={"rgb(255 255 255 / 8%) 0px 6px 10px"}
                            src={t.assets?.svgUrl || t.assets?.static.src || ""}
                            alt={t.assets?.description || ""}
                          />
                        ) : (
                          <Box
                            boxSize={"24px"}
                            borderRadius={"full"}
                            bg="brand.200"
                            boxShadow={"rgb(255 255 255 / 8%) 0px 6px 10px"}
                          />
                        )}
                      </>
                    <Text ml={1} fontSize={"md"}>
                      {t.identifier !== t.ticker
                        ? t.ticker || t.name || t.identifier || ""
                        : t.name || t.ticker || t.identifier || ""}
                    </Text>
                  </Center>
                );
              })}
            </Flex>} */}
            {/* <Flex gap={2} mt={4} borderTop={"1px solid"} borderColor={"white.200"} w="full">
              <Text mt={3}>Token Name</Text>
              <IconButton
                mt={3}
                aria-label="Invert Order"
                background={"gray.800"}
                borderRadius={"5px"}
                height={"30px"}
                textColor={"gray.200"}
                _hover={{
                  background: "none",
                  outline: "none",
                }}
                _active={{
                  background: "none",
                  outline: "none",
                }}
                onClick={handleOrder}
              >
                {order === "desc" ? (
                  <ArrowDownIcon color="inherit" fontSize={"md"} />
                ) : (
                  <ArrowUpIcon color="inherit" fontSize={"md"} />
                )}
              </IconButton>
            </Flex>  */}
          </Box>
          <TokenList
            handleClickToken={handleClickToken}
            tokens={diplayTokens}
            showBalance={true}
            showIdent={false}
          />
        </ModalBody>
      </ModalContent>
    </MyModal>
  );
};
export default CurrencyModal;
