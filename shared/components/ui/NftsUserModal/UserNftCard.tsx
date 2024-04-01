import { Box, Center, Flex, Grid, HStack, ModalCloseButton, ModalContent, ModalOverlay, Text, Tooltip, useDisclosure, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { ActionButton } from "../../tools/ActionButton";
import { TbExternalLink } from "react-icons/tb";
import Link from "next/link";
import { chainType, networkConfig } from "../../../../config/network";
import { customColors } from "../../../../config/chakraTheme";
import { IoMdInformationCircleOutline } from "react-icons/io";
import MyModal from "../MyModal";

const UserNftCard = (nft) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const nftName = nft.nft?.name || null;
  const nftRank = nft.nft?.rank || null;
  const nftThumbnail = nft.nft?.media[0].thumbnailUrl || null;
  const nftTags = nft.nft?.tags || null;
  const nftAttributes = nft.nft?.metadata.attributes || null; 
  const explorerLink = networkConfig[chainType].explorerAddress + "/nfts/" + nft.nft?.identifier;

  return (
    <Flex flexDir={"column"} bg={"black"} borderRadius="md">
      <Box key={nft.identifier} p={2}>
        
        <Box position="relative" borderRadius={"lg"} overflow="hidden">
          {nftThumbnail && (
            <Image
              src={nftThumbnail}
              alt={nft.identifier}
              width={200}
              height={200}
              layout="responsive"
            />
          )}
        </Box>

        <Box mt={3} gap={1}>
          
          <HStack fontSize={{sm: "sm", md: "lg"}} fontWeight={"semibold"} justifyContent={"space-between"}>
            <Text>
              {nftName.split("#")?.[0]}
            </Text>
            <Text>
              #{nftName.split("#")?.[1] || "-"}
            </Text>
          </HStack>

          <HStack fontSize={{sm: "xs", md: "md"}} fontWeight={"normal"} justifyContent={"space-between"}>
            <Text>
              Rank
            </Text>
            <Text>
              {nftRank}
            </Text>
          </HStack>

          {/* <HStack fontSize={"xs"} fontWeight={"light"} justifyContent={"space-between"}>
            <Text>
              {nftTags.map((tag) => "#" + tag).join(" ")}
            </Text>
          </HStack> */}

          <HStack pt={4} justifyContent={"space-between"}>

            <Attributes attributes={nftAttributes} tags={nftTags} onOpen={onOpen} isOpen={isOpen} onClose={onClose}/>

            <ViewOnExplorer link={explorerLink}/>

          </HStack>

        </Box>

      </Box>
    </Flex>
  );
};

export default UserNftCard;


const ViewOnExplorer = ({link}) => {
  return (
    <Link href={link}>
      <HStack
        border={"3px solid"}
        borderColor={customColors.myCustomColor.lighter}
        borderRadius={"2xl"}
        px={2}
        py={1}
        _hover={{
          bg: customColors.myCustomColor.lighter
        }}
      >
        <Text fontSize={"xs"} fontWeight={"semibold"}>View </Text>
        <TbExternalLink size={"16px"}/>
      </HStack>
    </Link>
  )
}

const Attributes = ({attributes, tags, onOpen, isOpen, onClose}) => {
  return (
    <HStack
      border={"3px solid"}
      borderColor={customColors.myCustomColor.lighter}
      borderRadius={"2xl"}
      px={2}
      py={1}
      _hover={{
        bg: customColors.myCustomColor.lighter
      }}
      onClick={onOpen}
    >
      <Text fontSize={"xs"} fontWeight={"semibold"}>Info </Text>
      <IoMdInformationCircleOutline size={"16px"}/>
      {isOpen && <NftInfoModal attributes={attributes} tags={tags} isOpen={isOpen} onClose={onClose}/>}
    </HStack>
  )
}

interface IProps {
  attributes: any[],
  tags: string[],
  isOpen: boolean;
  onClose: () => void;
}

const NftInfoModal = ({ attributes, tags, isOpen, onClose }: IProps) => {

  const hasTags = tags?.length > 0 && tags[0] != "";

  return (
  <MyModal isOpen={isOpen} onClose={onClose} size="sm">
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