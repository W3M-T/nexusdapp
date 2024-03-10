import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Flex, FormLabel, Heading, Switch, Text } from "@chakra-ui/react";
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
import { CardWrapper } from "../../../shared/components/ui/CardWrapper";

const StakingSection = () => {
  const stakedNfts = useAppSelector(selectUserStaked);
  const dispatch = useAppDispatch();
  const { data: userHasSeenWarning } = useAppSelector(selectHasSeenWarning);
  const [isMultipleUnstake] = useState(true);
  const [selectedNftsToUnstake, setSelectedNftsToUnstake] = useState<
    { nft: IStakedWithTokenDetails; reward: number }[]
  >([]);

  const handleViwNft = (nft: IStakedWithTokenDetails, reward: number) => {
    const indexNft = selectedNftsToUnstake.findIndex(
      (snft) =>
        createIndentifierByCollectionAndNonce(
          snft.nft.token,
          snft.nft.nonce
        ) === createIndentifierByCollectionAndNonce(nft.token, nft.nonce)
    );
    if (indexNft >= 0) {
      const newStakedArray = selectedNftsToUnstake.filter(
        (n, i) => i !== indexNft
      );
      setSelectedNftsToUnstake(newStakedArray);
    } else {
      if (selectedNftsToUnstake.length < 10) {
        setSelectedNftsToUnstake([
          ...selectedNftsToUnstake,
          {
            nft: nft,
            reward: reward,
          },
        ]);
      }
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
    // sum all rewards from nfts rewards
    const totalRewards = selectedNftsToUnstake.reduce(
      (acc, nft) => acc + nft.reward,
      0
    );
    if (totalRewards > 0) {
      Swal.fire({
        title: "Make sure to claim rewards first.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#032545",
        cancelButtonColor: "#ad0303",
        confirmButtonText: "Unstake",
        cancelButtonText: "Cancel",
        background: "#04101b",
        color: "#fff",
      }).then((result) => {
        if (result.isConfirmed) {
          unstakeNfts(selectedNftsToUnstake.map((info) => info.nft));
        }
      });
    } else {
      unstakeNfts(selectedNftsToUnstake.map((info) => info.nft));
    }
  };
  const handleClaimRewards = () => {
    if (userHasSeenWarning) {
      claimUserRewards(selectedNftsToUnstake.map((info) => info.nft));
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
          claimUserRewards(selectedNftsToUnstake.map((info) => info.nft));
        }
      });
    }
  };
  
  const pageCount = stakedNfts.data.pagination.pageCount;

  return (
    <CardWrapper>
      <Flex flexWrap="wrap" rowGap={8}>
        <Heading as={"h1"} w="full" justifyContent="center" textAlign={"center"} mb={4}>
          Staked NFTs
        </Heading>
        <Flex justifyContent="center" textAlign={"center"}  w="full" gap={4}>
          {isMultipleUnstake && (
            <>
              <ActionButton
                onClick={handleClaimRewards}
                disabled={selectedNftsToUnstake.length === 0}
                width={"150px"}
              >
                Claim Rewards
              </ActionButton>
              <ActionButton
                onClick={handleUnstake}
                disabled={selectedNftsToUnstake.length === 0}
                width={"150px"}
              >
                Unstake
              </ActionButton>
            </>
          )}
          {/* <Flex alignItems={"center"} gap="8px">
            <Switch
              id="multipleUnstake"
              size="md"
              onChange={() => {}} //handleChangeMultiUnstake}
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
          selectedNfts={selectedNftsToUnstake.map((info) => info.nft)}
        />

        {stakedNfts.data.pagination && (
          <ReactPaginateS
            breakLabel=" . . . "
            nextLabel={<ArrowRightIcon mx={2}/>}
            onPageChange={handleOnPageChange}
            pageCount={pageCount}
            previousLabel={<ArrowLeftIcon mx={2}/>}
            pageClassName="item"
            pageLinkClassName="page"
            containerClassName="pagination"
            activeClassName="selected"
            disabledClassName="disabled"
            marginPagesDisplayed={2}
          />
        )}

        {stakedNfts.data.nfts.length === 0 && (
          <Text fontWeight="bold" fontSize="2xl" textAlign="center" mt={8}>
            You have not staked any nfts yet!
          </Text>
        )}
      </Authenticated>
    </CardWrapper>
  );
};

const ReactPaginateS = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  list-style: none;
  margin-top: 25px;

  .item {
    a {
      height: 25px;
      width: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #012f5d;
      border-radius: 5px;
      margin: 0 5px;
      cursor: pointer;
      color: black; /* Set default text color to black */
    }

    &.selected a { /* Target the link inside the selected class */
      background-color: #1c7bda; /* Set background color for selected page */
      color: black; /* Set text color for selected page */
    }

    &.disabled a {
      color: #8d8d8d;
      cursor: not-allowed;
    }
  }
`;

export default StakingSection;
