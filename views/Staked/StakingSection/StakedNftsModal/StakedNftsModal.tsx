import {
  Center,
  Grid,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";
import { ActionButton } from "../../../../shared/components/tools/ActionButton";
import MyModal from "../../../../shared/components/ui/MyModal";
import { IStakedWithTokenDetails } from "../../../../shared/redux/types/pools.interface";
import { unstakeNfts } from "../../../../shared/services/sc/calls/multiTx/unstake";
import NFTCard from "../NFTCard/NFTCard";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNftsToUnstake: IStakedWithTokenDetails[];
}

const StakedNftsModal = ({
  isOpen,
  onClose,
  selectedNftsToUnstake,
}: IProps) => {
  const stakedNfts = selectedNftsToUnstake;
  const handleUnstake = () => {
    unstakeNfts(selectedNftsToUnstake);
  };
  return (
    <MyModal isOpen={isOpen} onClose={onClose} size="4xl" p={{ sm: 4, md: 8 }}>
      <ModalBody>
        <ModalCloseButton
          border="none"
          outline={"none"}
          _focus={{ boxShadow: "none" }}
          right={5}
          top={6}
        />
        <Grid templateColumns={"1fr 1fr 1fr"} columnGap={5} rowGap="10" mt={10}>
          {stakedNfts.map((stakedNft) => {
            return (
              <NFTCard
                nft={stakedNft}
                key={stakedNft.name}
                onClick={() => console.log("asd")}
              />
            );
          })}
          {stakedNfts.length === 0 && (
            <Center>You don’t have any staked NFTs avilable.</Center>
          )}
        </Grid>
      </ModalBody>
      <ModalFooter>
        <ActionButton textTransform={"uppercase"} onClick={handleUnstake}>
          Unstake
        </ActionButton>
      </ModalFooter>
    </MyModal>
  );
};

export default StakedNftsModal;
