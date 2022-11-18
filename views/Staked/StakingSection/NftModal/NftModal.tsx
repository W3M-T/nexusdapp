import {
  Box,
  Center,
  Grid,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { BigUIntValue, BytesValue } from "@elrondnetwork/erdjs/out";
import BigNumber from "bignumber.js";
import Image from "next/image";
import { memo } from "react";
import { ActionButton } from "../../../../shared/components/tools/ActionButton";
import MyModal from "../../../../shared/components/ui/MyModal";
import { IStaked } from "../../../../shared/redux/types/pools.interface";
import { EGLDPayment } from "../../../../shared/services/sc/calls";

interface IProps {
  nft: IStaked;
  isOpen: boolean;
  onClose: () => void;
}

const NftModal = ({ isOpen, onClose, nft }: IProps) => {
  const handleUnstake = () => {
    EGLDPayment(
      "NftStakingPoolsWsp",
      "unstakeNft",
      0.002,
      [
        BytesValue.fromUTF8(nft.token),
        new BigUIntValue(new BigNumber(nft.nonce)),
      ],
      70000000
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
            <Box maxW={"350px"} w="full">
              <Image
                src={nft.url}
                alt="nft"
                layout="intrinsic"
                width={"350px"}
                height="400px"
              />
            </Box>
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
              {nft.name}
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
