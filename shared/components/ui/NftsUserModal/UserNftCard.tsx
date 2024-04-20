import { border, Box, Center, Divider, Flex, FlexProps, Grid, HStack, Input, InputProps, ModalCloseButton, ModalContent, ModalOverlay, StepSeparator, Text, Tooltip, useDisclosure, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { ActionButton } from "../../tools/ActionButton";
import { TbExternalLink } from "react-icons/tb";
import Link from "next/link";
import { chainType, networkConfig } from "../../../../config/network";
import { customColors } from "../../../../config/chakraTheme";
import { IoMdInformationCircleOutline } from "react-icons/io";
import MyModal from "../MyModal";
import { useState } from "react";
import { EgldLogoIcon } from "../../icons/ui";
import { listNftForSale } from "../../../services/sc/calls/claimFromFaucet copy";

const UserNftCard = (nft) => {
  const { isOpen: isOpenInfoModal, onOpen: onOpenInfoModal, onClose: onCloseInfoModal } = useDisclosure();
  const { isOpen: isOpenSellModal, onOpen: onOpenSellModal, onClose: onCloseSellModal } = useDisclosure();
  
  const nftName = nft.nft?.name || null;
  const nftRank = nft.nft?.rank || null;
  const nftThumbnail = nft.nft?.media[0].thumbnailUrl || null;
  const nftTags = nft.nft?.tags || null;
  const nftAttributes = nft.nft?.metadata.attributes || null; 
  const explorerLink = networkConfig[chainType].explorerAddress + "/nfts/" + nft.nft?.identifier;
  const nftObject = nft.nft;

  return (
    <Flex flexDir={"column"} bg={"black"} borderRadius="md">
      <Box key={nft.identifier} p={{sm: 3, md: 3}}>
        
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
          
          <HStack fontSize={{sm: "xs", md: "md"}} fontWeight={"semibold"} justifyContent={"space-between"}>
            <Text>
              {nftName.split("#")?.[0]}
            </Text>
            <Text>
              #{nftName.split("#")?.[1] || "-"}
            </Text>
          </HStack>

          <HStack fontSize={{sm: "2xs", md: "sm"}} fontWeight={"normal"} justifyContent={"space-between"}>
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

          <HStack pt={3} justifyContent={"space-between"}>

            <HStack>
              <Attributes attributes={nftAttributes} tags={nftTags} onOpenInfoModal={onOpenInfoModal} isOpenInfoModal={isOpenInfoModal} onCloseInfoModal={onCloseInfoModal}/>

              <ViewOnExplorer link={explorerLink}/>
            </HStack>

            <ListNft onOpenSellModal={onOpenSellModal} isOpenSellModal={isOpenSellModal} onCloseSellModal={onCloseSellModal} nftObject={nftObject}/>

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
      border={"1px solid"}
      bg={customColors.myCustomColor.lighter}
      borderColor={customColors.myCustomColor.lighter}
      borderRadius={"2xl"}
      px={1.5}
      py={1.5}
      >
        {/* <Text fontSize={"xs"} fontWeight={"semibold"}>View </Text> */}
        <TbExternalLink size={"16px"}/>
      </HStack>
    </Link>
  )
}

const Attributes = ({attributes, tags, onOpenInfoModal, isOpenInfoModal, onCloseInfoModal}) => {
  return (
    <HStack
      border={"1px solid"}
      bg={customColors.myCustomColor.lighter}
      borderColor={customColors.myCustomColor.lighter}
      borderRadius={"2xl"}
      px={1.5}
      py={1.5}
      onClick={onOpenInfoModal}
      cursor={"pointer"}
    >
      {/* <Text fontSize={"xs"} fontWeight={"semibold"}>Info </Text> */}
      <IoMdInformationCircleOutline size={"16px"}/>
      {isOpenInfoModal && <NftInfoModal attributes={attributes} tags={tags} isOpenInfoModal={isOpenInfoModal} onCloseInfoModal={onCloseInfoModal}/>}
    </HStack>
  )
}

const ListNft = ({onOpenSellModal, isOpenSellModal, onCloseSellModal, nftObject}) => {
  return (
    <HStack
      border={"1px solid"}
      bg={customColors.myCustomColor.lighter}
      borderColor={customColors.myCustomColor.lighter}
      borderRadius={"2xl"}
      px={8}
      py={1.5}
      onClick={onOpenSellModal}
      cursor={"pointer"}
    >
      <Text fontSize={"xs"} fontWeight={"semibold"}>Sell </Text>
      {isOpenSellModal && <NftSellModal isOpenSellModal={isOpenSellModal} onCloseSellModal={onCloseSellModal} nftObject={nftObject}/>}
    </HStack>
  )
}

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

  const listForSale = () => {
    listNftForSale(
      nftObject.collection,
      nftObject.nonce,
      sellPrice * Math.pow(10, 18)
    )
  }

  const platformFee = 0.1;
  const royalties = nftObject.royalties * sellPrice / 100;
  const fee = platformFee * sellPrice / 100
  const finalEarnings = sellPrice - royalties - fee;

  const validSellPrice = Number(sellPrice) == sellPrice;

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
                <Text>{Number(sellPrice).toFixed(4)} EGLD</Text>
              </HStack>

              <HStack justifyContent={"space-between"}>
                <Text>Creator Royalties ({nftObject.royalties}%)</Text>
                <Text>{royalties.toFixed(4)} EGLD</Text>
              </HStack>

              <HStack justifyContent={"space-between"}>
                <Text>Platform Fees ({platformFee}%)</Text>
                <Text>{fee.toFixed(4)} EGLD</Text>
              </HStack>

              <Divider/>

              <HStack justifyContent={"space-between"} fontWeight={"bold"}>
                <Text>After sale you get</Text>
                <Text>{finalEarnings.toFixed(4)} EGLD</Text>
              </HStack>

            </Flex>
          </Box>}

          <ActionButton px={10} isFilled onClick={listForSale} disabled={!validSellPrice}>
            List for sale
          </ActionButton>

        </VStack>
    </ModalContent>
  </MyModal>
  );
}