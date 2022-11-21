import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  FormLabel,
  Heading,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { ActionButton } from "../../../shared/components/tools/ActionButton";
import { Authenticated } from "../../../shared/components/tools/Authenticated";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../shared/hooks/core/useRedux";
import {
  changeStakedNftPage,
  selectUserStaked,
} from "../../../shared/redux/slices/pools";
import { IStakedWithTokenDetails } from "../../../shared/redux/types/pools.interface";
import { createIndentifierByCollectionAndNonce } from "../../../shared/utils/formatTokenIdentifier";
import NftsList from "./NftsList/NftsList";

//Dynamic  nextjs import of NFtModal
const NftModal = dynamic(() => import("./NftModal/NftModal"));

//Dynamic nextjs import of stakedNfts
const StakedNftsModal = dynamic(
  () => import("./StakedNftsModal/StakedNftsModal")
);

const StakingSection = () => {
  const stakedNfts = useAppSelector(selectUserStaked);
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isStakedModal,
    onOpen: openStakedModal,
    onClose: closeStakedModal,
  } = useDisclosure();
  const [selectedNft, setSelectedNft] = useState(null);
  const [isMultipleUnstake, setIsMultipleUnstake] = useState(false);
  const [selectedNftsToUnstake, setSelectedNftsToUnstake] = useState<
    IStakedWithTokenDetails[]
  >([]);
  const handleViwNft = (nft: IStakedWithTokenDetails) => {
    if (isMultipleUnstake) {
      const indexNft = selectedNftsToUnstake.findIndex(
        (snft) =>
          createIndentifierByCollectionAndNonce(snft.token, snft.nonce) ===
          createIndentifierByCollectionAndNonce(nft.token, nft.nonce)
      );
      if (indexNft >= 0) {
        const newStakedArray = selectedNftsToUnstake.filter(
          (n, i) => i !== indexNft
        );
        setSelectedNftsToUnstake(newStakedArray);
      } else {
        if (selectedNftsToUnstake.length < 10) {
          setSelectedNftsToUnstake([...selectedNftsToUnstake, nft]);
        }
      }
    } else {
      setSelectedNft(nft);
      onOpen();
    }
  };

  const handleOnPageChange = async (e) => {
    const { selected: page } = e;
    dispatch(changeStakedNftPage(page + 1));
  };

  const handleChangeMultiUnstake = (e) => {
    setIsMultipleUnstake((s) => !s);
  };
  console.log("selectedNftsToUnstake", selectedNftsToUnstake);

  return (
    <Box>
      <Flex justifyContent={"space-between"}>
        <Heading
          fontSize={"3xl"}
          borderBottom="3px solid white"
          w="fit-content"
        >
          Staked NFTs
        </Heading>
        <Flex gap={4}>
          {isMultipleUnstake && (
            <ActionButton
              onClick={openStakedModal}
              disabled={selectedNftsToUnstake.length === 0}
            >
              Multiple Unstake
            </ActionButton>
          )}
          <Flex alignItems={"center"} gap="8px">
            <Switch
              id="multipleUnstake"
              size="md"
              onChange={handleChangeMultiUnstake}
            />
            <FormLabel htmlFor="multipleUnstake" fontSize={"sm"} m={0}>
              Allow multiple unstake
            </FormLabel>
          </Flex>
        </Flex>
      </Flex>

      <Authenticated
        spinnerCentered
        fallback={
          <>
            <Text fontWeight="bold" fontSize="2xl" textAlign="center" mt={8}>
              Connect your wallet to view your staked NFTs!
            </Text>
          </>
        }
      >
        <NftsList
          handleViwNft={handleViwNft}
          selectedNfts={selectedNftsToUnstake}
        />

        {stakedNfts.data.pagination && (
          <ReactPaginateS
            breakLabel="..."
            nextLabel={<ArrowRightIcon />}
            onPageChange={handleOnPageChange}
            pageRangeDisplayed={5}
            marginPagesDisplayed={30}
            pageCount={stakedNfts.data.pagination.pageCount}
            previousLabel={<ArrowLeftIcon />}
            renderOnZeroPageCount={null}
            pageClassName="item page"
          />
        )}

        {stakedNfts.data.nfts.length === 0 && (
          <Text fontWeight="bold" fontSize="2xl" textAlign="center" mt={8}>
            You have not staked any nfts yet!
          </Text>
        )}
      </Authenticated>

      {isOpen && (
        <NftModal isOpen={isOpen} onClose={onClose} nft={selectedNft} />
      )}
      {isStakedModal && (
        <StakedNftsModal
          isOpen={isStakedModal}
          onClose={closeStakedModal}
          selectedNftsToUnstake={selectedNftsToUnstake}
        />
      )}
    </Box>
  );
};
const ReactPaginateS = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  list-style: none;
  margin-top: 25px;

  .item a {
    height: 25px;
    width: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1c7bda;
    border-radius: 5px;
    margin: 0 10px;
  }

  .selected a {
    background-color: #012f5d;
  }

  .disabled a {
    color: #8d8d8d;
    cursor: not-allowed;
  }
`;

export default StakingSection;
