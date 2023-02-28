import {
  Box,
  Center,
  Grid,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { transactionServices } from "@elrondnetwork/dapp-core";
import { BigUIntValue, BytesValue } from "@elrondnetwork/erdjs/out";
import BigNumber from "bignumber.js";
import Image from "next/image";
import { useRouter } from "next/router";
import { memo, useState } from "react";
import Swal from "sweetalert2";
import { ActionButton } from "../../../../shared/components/tools/ActionButton";
import MyModal from "../../../../shared/components/ui/MyModal";
import useGetElrondToken from "../../../../shared/hooks/tools/useGetElrondToken";
import useGetNftRewards from "../../../../shared/hooks/tools/useGetNftRewards";
import { IStaked } from "../../../../shared/redux/types/pools.interface";
import { EGLDPayment } from "../../../../shared/services/sc/calls";
import { claimUserRewards } from "../../../../shared/services/sc/calls/multiTx/claimRewards";
import { formatBalance } from "../../../../shared/utils/formatBalance";
import { formatTokenI } from "../../../../shared/utils/formatTokenIdentifier";
import { route } from "../../../../shared/utils/routes";

interface IProps {
  nft: IStaked;
  isOpen: boolean;
  onClose: () => void;
}

const NftModal = ({ isOpen, onClose, nft }: IProps) => {
  const router = useRouter();
  const { reward } = useGetNftRewards(nft);
  const [sessionId, setSessionId] = useState<string>();
  const { token: elrondToken } = useGetElrondToken(nft.nftPool.token);
  const onSuccess = () => {
    router.push(route.home.route);
  };
  transactionServices.useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess: onSuccess,
  });

  const handleUnstake = async () => {
    if (reward > 0) {
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
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await EGLDPayment(
            "NftStakingPoolsWsp",
            "unstakeNft",
            0.00075,
            [
              BytesValue.fromUTF8(nft.token),
              new BigUIntValue(new BigNumber(nft.nonce)),
            ],
            70000000
          );

          setSessionId(res.sessionId);
        }
      });
    } else {
      const res = await EGLDPayment(
        "NftStakingPoolsWsp",
        "unstakeNft",
        0.00075,
        [
          BytesValue.fromUTF8(nft.token),
          new BigUIntValue(new BigNumber(nft.nonce)),
        ],
        70000000
      );

      setSessionId(res.sessionId);
    }
  };
  const handleClaim = async () => {
    claimUserRewards([nft]);
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
              gap={4}
            >
              <ActionButton textTransform={"uppercase"} onClick={handleUnstake}>
                Unstake
              </ActionButton>
              {reward && (
                <ActionButton
                  textTransform={"uppercase"}
                  onClick={handleClaim}
                  bgColor="dappTemplate.color2.base"
                >
                  Claim{" "}
                  {formatBalance({
                    balance: reward,
                    decimals: elrondToken.decimals,
                  })}{" "}
                  {formatTokenI(nft.nftPool.token)}
                </ActionButton>
              )}
            </Center>
          </Center>
        </Grid>
      </ModalBody>
    </MyModal>
  );
};

export default memo(NftModal);
