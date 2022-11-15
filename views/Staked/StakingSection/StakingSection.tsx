import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Center, Heading, Text, useDisclosure } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Authenticated } from "../../../shared/components/tools/Authenticated";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../shared/hooks/core/useRedux";
import {
  changeStakedNftPage,
  selectUserStaked,
} from "../../../shared/redux/slices/pools";
import NftModal from "./NftModal/NftModal";
import NftsList from "./NftsList/NftsList";

const StakingSection = () => {
  const stakedNfts = useAppSelector(selectUserStaked);
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNft, setSelectedNft] = useState(null);

  const handleViwNft = (nft) => {
    setSelectedNft(nft);
    onOpen();
  };

  const handleOnPageChange = async (e) => {
    const { selected: page } = e;
    dispatch(changeStakedNftPage(page + 1));
  };

  return (
    <Box>
      <Center w="full">
        <Heading fontSize={"3xl"} borderBottom="3px solid white">
          Staked NFTs
        </Heading>
      </Center>

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
        <NftsList handleViwNft={handleViwNft} />

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
