import { ModalContent, ModalCloseButton, VStack, Flex, Input, HStack, Divider, Text, Box } from "@chakra-ui/react";
import { useState } from "react";
import { customColors } from "../../../../../config/chakraTheme";
import { listNftForSale } from "../../../../services/sc/calls/listNftForSale";
import { EgldLogoIcon } from "../../../icons/ui";
import { ActionButton } from "../../../tools/ActionButton";
import MyModal from "../../MyModal";
import UserNftCard from "./UserNftCard";

interface SellIProps {
    isOpenSellModal: boolean;
    onCloseSellModal: () => void;
    nftObject: any;
}


const NftSellModal = ({isOpenSellModal, onCloseSellModal, nftObject }: SellIProps) => {

    const [sellPrice, setSellPrice] = useState<number>(0);
  
    const handleSetPrice = (e) => {
      setSellPrice(e.target.value);
    }
  
    const handleListNftForSale = () => {
      listNftForSale(
        nftObject.collection,
        nftObject.nonce,
        sellPrice * Math.pow(10, 18)
      )
    }
  
    const platformFee = 1;
    const royalties = nftObject.royalties * sellPrice / 100;
    const fee = platformFee * sellPrice / 100
    const finalEarnings = sellPrice - royalties - fee;
  
    const validSellPrice = Number(sellPrice) == sellPrice && Number(sellPrice) >= 0.001;
  
    return (
    <MyModal isOpen={isOpenSellModal} onClose={onCloseSellModal} size="sm">
      {/* <ModalOverlay background={"rgba(0,0,0,0.1)"} /> */}
      <ModalContent py={4} mx={1} background={customColors.myCustomColor.lighter}>
          <ModalCloseButton
            border="none"
            outline={"none"}
            _focus={{ boxShadow: "none" }}
            right={2}
            top={3}
          />
          <VStack
            w={"full"}
            px={4}
            gap={6}
          >
  
            <Text fontSize={"lg"} fontWeight={"bold"} textAlign={"left"} w={"full"} pl={1}> Sell your {nftObject.name} </Text>
  
            <Box>
              <Text fontSize={"sm"} textAlign={"left"} w={"full"} pl={1} mb={1}> Price </Text>
              <Flex
                w={"full"}
                borderRadius={"2xl"}
                backgroundColor={customColors.myCustomColor.darker}
              >
                <Input
                  textColor={validSellPrice ? "white" : "red.900"}
                  w={"full"}
                  placeholder="Set price in EGLD"
                  borderRadius={"2xl"}
                  border="none"
                  _focus={{
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                  }}
                  onChange={handleSetPrice}
                />
                <HStack pr={3}>
                  <Box boxSize={"20px"}><EgldLogoIcon size={"xs"}/></Box>
                  <Text>EGLD</Text>
                </HStack>
              </Flex>
            </Box>
            
            {sellPrice && <Box w="full">
              <Text fontSize={"sm"} textAlign={"left"} w={"full"} pl={1} mb={1}> Earnings breakdown </Text>
              <Flex
                w={"full"} p={3} gap={4}
                borderRadius={"2xl"}
                backgroundColor={customColors.myCustomColor.darker}
                flexDirection="column"
              >
                <HStack justifyContent={"space-between"}>
                  <Text>Selling Price</Text>
                  <Text>{Number(sellPrice).toFixed(4).replace(/\.?0*$/, '')} EGLD</Text>
                </HStack>
  
                <HStack justifyContent={"space-between"}>
                  <Text>Creator Royalties ({nftObject.royalties}%)</Text>
                  <Text>{royalties.toFixed(4).replace(/\.?0*$/, '')} EGLD</Text>
                </HStack>
  
                <HStack justifyContent={"space-between"}>
                  <Text>Platform Fees ({platformFee}%)</Text>
                  <Text>{fee.toFixed(4).replace(/\.?0*$/, '')} EGLD</Text>
                </HStack>
  
                <Divider/>
  
                <HStack justifyContent={"space-between"} fontWeight={"bold"}>
                  <Text>After sale you get</Text>
                  <Text>{finalEarnings.toFixed(4).replace(/\.?0*$/, '')} EGLD</Text>
                </HStack>
  
              </Flex>
            </Box>}
  
            <ActionButton px={10} isFilled onClick={handleListNftForSale} disabled={!validSellPrice}>
              List for sale
            </ActionButton>
  
          </VStack>
      </ModalContent>
    </MyModal>
    );
  }

  export default NftSellModal;
