import { border, Box, Center, Divider, Flex, FlexProps, Grid, HStack, Input, InputProps, ModalCloseButton, ModalContent, ModalOverlay, StepSeparator, Text, Tooltip, useDisclosure, useOutsideClick, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { ActionButton } from "../../../tools/ActionButton";
import { TbExternalLink } from "react-icons/tb";
import Link from "next/link";
import { chainType, networkConfig } from "../../../../../config/network";
import { customColors } from "../../../../../config/chakraTheme";
import { IoMdInformationCircleOutline } from "react-icons/io";
import MyModal from "../../MyModal";
import { useEffect, useRef, useState } from "react";
import { EgldLogoIcon } from "../../../icons/ui";
import { listNftForSale } from "../../../../services/sc/calls/listNftForSale";
import { formatBalance, formatNumber } from "../../../../utils/formatBalance";
import { buyListedNft } from "../../../../services/sc/calls/buyListedNft";
import { BiCommentDetail } from "react-icons/bi";
import { useAppSelector } from "../../../../hooks/core/useRedux";
import { selectUserAddress } from "../../../../redux/slices/settings";
import { cancelListing } from "../../../../services/sc/calls/cancelListing";
import { isMobile } from "../../../../utils/isMobile";
import NftInfoModal from "./NftInfoModal";
import NftSellModal from "./NftSellModal";
import CommentsModal from "./CommentsModal";
import { useGetActiveTransactionsStatus, useGetSuccessfulTransactions } from "@multiversx/sdk-dapp/hooks/transactions";
import axios from "axios";

const UserNftCard = (nft) => {
  const connectedAddress = useAppSelector(selectUserAddress);
  const isSmallDevice = isMobile();

  const { isOpen: isOpenInfoModal, onOpen: onOpenInfoModal, onClose: onCloseInfoModal } = useDisclosure();
  const { isOpen: isOpenSellModal, onOpen: onOpenSellModal, onClose: onCloseSellModal } = useDisclosure();
  const { isOpen: isOpenCommentsModal, onOpen: onOpenCommentsModal, onClose: onCloseCommentsModal } = useDisclosure();
  
  const nftName = nft.nft?.name || null;
  const nftRank = nft.nft?.rank || null;
  const nftThumbnail = nft.nft?.media[0].thumbnailUrl || null;
  const nftTags = nft.nft?.tags || null;
  const nftAttributes = nft.nft?.metadata.attributes || null; 
  const explorerLink = networkConfig[chainType].explorerAddress + "/nfts/" + nft.nft?.identifier;
  const nftObject = nft.nft;
  
  const handleDeleteAllListingComments = async (listingId) => {
    try {
      await axios.delete(`/api/deleteAllListingComments?listingId=${listingId}`);
    } catch (error) {
      console.error('Error deleting comments:', error);
    }
  };

  const {hasSuccessfulTransactions, successfulTransactionsArray} = useGetSuccessfulTransactions();
  useEffect(() => {
    if (hasSuccessfulTransactions) {
        const { data } = successfulTransactionsArray[0][1].transactions[0];
        if (typeof data === 'string') {
          const decodedData = atob(data);
          const regex = /^(buy|cancelListing)@([a-fA-F0-9]+)$/;
          const match = decodedData.match(regex);
          if (match) {
            const [, , number] = match;
            const decodedNumber = parseInt(number, 16)
            handleDeleteAllListingComments(decodedNumber);
          }
        }
    }
  }, [hasSuccessfulTransactions, successfulTransactionsArray]);

  return (
    <Flex flexDir={"column"} bg={"black"} borderRadius="md" w="full" maxW={{sm:"180px", md: "260px"}}>
      <Box key={nft.identifier} p={{sm: 2, md: 3}}>
        
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

          <Flex pt={3} justifyContent={"space-between"} flexDirection={{sm: "row", md: "row"}} gap={{sm: 2, md: 1}}>

            <HStack>
              <Attributes attributes={nftAttributes} tags={nftTags} onOpenInfoModal={onOpenInfoModal} isOpenInfoModal={isOpenInfoModal} onCloseInfoModal={onCloseInfoModal}/>

              {!isSmallDevice && <ViewOnExplorer link={explorerLink}/>}

              {nftObject?.listingPrice && <Comments onOpenCommentsModal={onOpenCommentsModal} isOpenCommentsModal={isOpenCommentsModal} onCloseCommentsModal={onCloseCommentsModal} nftObject={nftObject}/>}

            </HStack>

            {nftObject?.listingPrice
            ? nftObject.listingCreator != connectedAddress
            ? <BuyNft nftObject={nftObject}/>
            : <CancelListing nftObject={nftObject}/>
            : <ListNft onOpenSellModal={onOpenSellModal} isOpenSellModal={isOpenSellModal} onCloseSellModal={onCloseSellModal} nftObject={nftObject}/>}

          </Flex>

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
        border={"2px solid"}
        bg={customColors.myCustomColor.lightest}
        borderColor={customColors.myCustomColor.lightest}
        borderRadius={"2xl"}
        p={1}
        m={-0.5}
        _hover={{borderColor: "dappTemplate.color2.darker"}}
        title="View on Explorer"
        >
        {/* <Text fontSize={"xs"} fontWeight={"semibold"}>View </Text> */}
        <TbExternalLink size={"18px"}/>
      </HStack>
    </Link>
  )
}

const Attributes = ({attributes, tags, onOpenInfoModal, isOpenInfoModal, onCloseInfoModal}) => {
  return (
    <HStack
      border={"2px solid"}
      bg={customColors.myCustomColor.lightest}
      borderColor={customColors.myCustomColor.lightest}
      borderRadius={"2xl"}
      p={1}
      m={-0.5}
      onClick={onOpenInfoModal}
      cursor={"pointer"}
      _hover={{borderColor: "dappTemplate.color2.darker"}}
      title="Attributes & Tags"
    >
      {/* <Text fontSize={"xs"} fontWeight={"semibold"}>Info </Text> */}
      <IoMdInformationCircleOutline size={"18px"}/>
      {isOpenInfoModal && <NftInfoModal attributes={attributes} tags={tags} isOpenInfoModal={isOpenInfoModal} onCloseInfoModal={onCloseInfoModal}/>}
    </HStack>
  )
}

const Comments = ({ onOpenCommentsModal, isOpenCommentsModal, onCloseCommentsModal, nftObject }) => {
  const [hasComments, setHasComments] = useState(false);

  useEffect(() => {
    const fetchHasComments = async () => {
      try {
        const response = await axios.get(`/api/getIfHasComments?listing_id=${nftObject.listingId}`);
        setHasComments(response.data.exists);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    if (nftObject.listingId) {
      fetchHasComments();
    }
  }, [nftObject.listingId]);

  return (
    <HStack
      border={`2px solid ${customColors.myCustomColor.lightest}`}
      bg={customColors.myCustomColor.lightest}
      borderRadius={"2xl"}
      p={1}
      m={-0.5}
      onClick={onOpenCommentsModal}
      cursor={"pointer"}
      _hover={{ borderColor: "dappTemplate.color2.darker" }}
      title="Comments"
    >
      <BiCommentDetail size={"18px"} color={hasComments ? customColors.color2.lighter : undefined} />
      {isOpenCommentsModal && <CommentsModal isOpenCommentsModal={isOpenCommentsModal} onCloseCommentsModal={onCloseCommentsModal} nftObject={nftObject} />}
    </HStack>
  );
};

const ListNft = ({onOpenSellModal, isOpenSellModal, onCloseSellModal, nftObject}) => {
  return (
    <HStack
      border={"1px solid"}
      bg={customColors.myCustomColor.lighter}
      borderColor={customColors.myCustomColor.lighter}
      borderRadius={"2xl"}
      px={{sm: 3, md: 6}} py={1.5}
      onClick={onOpenSellModal}
      cursor={"pointer"}
    >
      <Text fontSize={{md: "md", sm: "sm"}}>Sell </Text>
      {isOpenSellModal && <NftSellModal isOpenSellModal={isOpenSellModal} onCloseSellModal={onCloseSellModal} nftObject={nftObject}/>}
    </HStack>
  )
}

const BuyNft = ({nftObject}) => {  
  const handleBuyListedNft = () => {
    let x = buyListedNft(
      nftObject.listingId,
      nftObject.listingPrice
    );
  }

  return (
    <ActionButton px={{sm: 2, md: 4}} isFilled onClick={handleBuyListedNft} fontSize={{sm: 'xs', md: 'md'}}>
      <HStack>
        <Text pr={0.5}>Buy</Text>
        <Box boxSize={{sm: "16px", md: "18px"}}><EgldLogoIcon size={"xs"}/></Box>
        <Text ml={-1}>{formatBalance({balance: nftObject.listingPrice, decimals: 18}, false, 3)}</Text>
      </HStack>
    </ActionButton>
  )
}

const CancelListing = ({nftObject}) => {
  const handleCancelListing = () => {
    cancelListing(
      nftObject.listingId,
    );
  }

  return (
    <ActionButton px={{sm: 2, md: 4}} onClick={handleCancelListing} fontSize={{sm: 'xs', md: 'md'}}>
      <Text pr={0.5}>Cancel</Text>
    </ActionButton>
  )
}