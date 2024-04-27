import { ModalContent, ModalCloseButton, VStack, HStack, Grid, Center, Text, useOutsideClick } from "@chakra-ui/react";
import { customColors } from "../../../../../config/chakraTheme";
import MyModal from "../../MyModal";
import { useRef } from "react";

interface InfoIProps {
    attributes: any[],
    tags: string[],
    isOpenInfoModal: boolean;
    onCloseInfoModal: () => void;
  }
  
const NftInfoModal = ({ attributes, tags, isOpenInfoModal, onCloseInfoModal }: InfoIProps) => {
  
    const hasTags = tags?.length > 0 && tags[0] != "";
    
    return (
    <MyModal isOpen={isOpenInfoModal} onClose={onCloseInfoModal} size="sm">
      {/* <ModalOverlay background={"rgba(0,0,0,0.1)"} /> */}
      <ModalContent py={4} mx={1} background={customColors.myCustomColor.lighter}>
          <ModalCloseButton
            border="none"
            outline={"none"}
            _focus={{ boxShadow: "none" }}
            right={0}
            top={0}
          />
          <VStack
            w={"full"}
            px={4}
          >
  
            <Text fontSize={"lg"} fontWeight={"bold"}> Attributes </Text>
  
            <VStack
              w={"full"}
              gap={2}
              p={4}
              borderRadius={"2xl"}
              bg={customColors.myCustomColor.base}
            >
              {attributes ? attributes.map((attr) => {
                return (
                  <HStack
                    key={attr}
                    w={"full"}
                    justifyContent={"space-between"}
                  >
                    <Text fontSize={"sm"} fontWeight={"light"}>
                      {attr.trait_type}:
                    </Text>
                    <Text fontSize={"md"} fontWeight={"medium"}>
                      {attr.value}
                    </Text>
                  </HStack>
                )
              }) : <Text>No attributes found.</Text>}
            </VStack>
  
            <Text fontSize={"lg"} fontWeight={"bold"}> Tags </Text>
  
            <Grid fontSize={"sm"} fontWeight={"light"} justifyContent={"space-between"}
              gap={2}
              p={4}
              w={"full"}
              borderRadius={"2xl"}
              bg={customColors.myCustomColor.base}
              templateColumns={hasTags ? { sm: "1fr 1fr", md: "1fr 1fr" } : "1fr"}
            >
              {hasTags ? tags.map((tag) => {
                return (
                  <Text px={2} key={tag}>
                    #{tag}
                  </Text>)
                })
              : <Center>No tags found.</Center>}
            </Grid>
  
          </VStack>
      </ModalContent>
    </MyModal>
    );
  }

export default NftInfoModal;
