import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import { ActionButton } from "../../../shared/components/tools/ActionButton";
import { Authenticated } from "../../../shared/components/tools/Authenticated";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../shared/hooks/core/useRedux";
import {
  changeStakedNftPage,
  selectHasSeenWarning,
  selectUserStaked,
} from "../../../shared/redux/slices/pools";
import { IStakedWithTokenDetails } from "../../../shared/redux/types/pools.interface";
import { claimUserRewards } from "../../../shared/services/sc/calls/multiTx/claimRewards";
import { unstakeNfts } from "../../../shared/services/sc/calls/multiTx/unstake";
import { createIndentifierByCollectionAndNonce } from "../../../shared/utils/formatTokenIdentifier";
import NftsList from "./NftsList/NftsList";

const StakingSection = () => {
  const stakedNfts = useAppSelector(selectUserStaked);
  const dispatch = useAppDispatch();
  const { data: userHasSeenWarning } = useAppSelector(selectHasSeenWarning);
  const [selectedNft, setSelectedNft] = useState(null);
  const [isMultipleUnstake] = useState(true);
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
      // onOpen();
    }
  };

  const handleOnPageChange = async (e) => {
    const { selected: page } = e;
    dispatch(changeStakedNftPage(page + 1));
  };

  // const handleChangeMultiUnstake = (e) => {
  //   setIsMultipleUnstake((s) => !s);
  // };
  const handleUnstake = () => {
    unstakeNfts(selectedNftsToUnstake);
  };
  const handleClaimRewards = () => {
    if (userHasSeenWarning) {
      claimUserRewards(selectedNftsToUnstake);
    } else {
      Swal.fire({
        title: "Are you sure that you want to take this action?",
        text: "By claiming rewards you will be able to harvest rewards for the selected NFTs, thus they will no longer be sent out by NFT creator. You will have to claim any new rewards of your stakings.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#032545",
        cancelButtonColor: "#ad0303",
        confirmButtonText: "Accept",
        cancelButtonText: "Cancel",
        background: "#04101b",
        color: "#fff",
      }).then((result) => {
        if (result.isConfirmed) {
          claimUserRewards(selectedNftsToUnstake);
        }
      });
    }
  };
  return (
    <Box>
      <Flex justifyContent={"space-between"} flexWrap="wrap" rowGap={8}>
        <Heading
          fontSize={"3xl"}
          borderBottom="3px solid white"
          w="fit-content"
        >
          Staked NFTs
        </Heading>
        <Flex gap={4}>
          {isMultipleUnstake && (
            <>
              <ActionButton
                onClick={handleClaimRewards}
                disabled={selectedNftsToUnstake.length === 0}
              >
                Claim Rewards
              </ActionButton>
              <ActionButton
                onClick={handleUnstake}
                disabled={selectedNftsToUnstake.length === 0}
              >
                Unstake
              </ActionButton>
            </>
          )}
          {/* <Flex alignItems={"center"} gap="8px">
            <Switch
              id="multipleUnstake"
              size="md"
              onChange={handleChangeMultiUnstake}
            />
            <FormLabel htmlFor="multipleUnstake" fontSize={"sm"} m={0}>
              Allow multiple unstake
            </FormLabel>
          </Flex> */}
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
