import {
  Center,
  Grid,
  Image,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { BigUIntValue, BytesValue } from "@elrondnetwork/erdjs/out";
import BigNumber from "bignumber.js";
import { memo } from "react";
import { ActionButton } from "../../../../components/tools/ActionButton";
import MyModal from "../../../../components/ui/MyModal";
import { useScTransaction } from "../../../../hooks/core/useScTransaction";
import { IStaked } from "../../../../redux/types/pools.interface";
import { NftStakingPoolsWsp } from "../../../../services/sc";
import { scCall } from "../../../../services/sc/calls";
import { TxCb } from "../../../../utils/txCallback";

interface IProps {
  nft: IStaked;
  isOpen: boolean;
  onClose: () => void;
}

const NftModal = ({ isOpen, onClose, nft }: IProps) => {
  const { triggerTx } = useScTransaction({
    cb: TxCb,
  });
  const handleUnstake = () => {
    triggerTx(
      scCall(NftStakingPoolsWsp, "unstakeNft", [
        BytesValue.fromUTF8(nft.token),
        new BigUIntValue(new BigNumber(nft.nonce)),
      ])
    );
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
        <Grid templateColumns={{ sm: "1fr", lg: "1fr 1fr" }} gap={10}>
          <Center>
            <Image src={nft.urls[0]} alt="nft" maxW={"350px"} w="full" />
          </Center>
          <Center flexDir={"column"}>
            <Text
              fontWeight={"bold"}
              fontSize="3xl"
              as="h2"
              width="full"
              mb={7}
              textAlign={{ sm: "center", lg: "left" }}
            >
              ELrond Mafia
            </Text>
            <Center
              w={"full"}
              justifyContent={{ sm: "center", lg: "flex-start" }}
            >
              <ActionButton textTransform={"uppercase"} onClick={handleUnstake}>
                Unstake
              </ActionButton>
            </Center>
          </Center>
        </Grid>
      </ModalBody>
    </MyModal>
  );
};

export default memo(NftModal);
