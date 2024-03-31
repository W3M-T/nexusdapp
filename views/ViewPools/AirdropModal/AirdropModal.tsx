import {
  Center,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ActionButton } from "../../../shared/components/tools/ActionButton";
import MyModal from "../../../shared/components/ui/MyModal";
import useGetNfts from "../../../shared/hooks/tools/useGetNfts";
import { INft } from "../../../shared/redux/types/tokens.interface";
import { customColors } from "../../../config/chakraTheme";
import SendAirdrop from "../../ScOwnerDash/Actions/SendAirdrop/SendAirdrop";
import { IExistingPool } from "../../../shared/redux/types/pools.interface";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/core/useRedux";
import { selectRewardsTokens } from "../../../shared/redux/slices/pools";
import { selectUserAddress } from "../../../shared/redux/slices/settings";
import useNumerizePools from "../../../shared/hooks/tools/useNumerizePools";
import { fetchAllowedRewardTokens, fetchExistringPools } from "../../../shared/redux/reduxAsyncFuncs/poolsFuncs";
interface IProps {
  isOpenModal: boolean;
  onCloseModal: () => void;
  pool: IExistingPool;
}

const AirdropModal = ({
  isOpenModal,
  onCloseModal,
  pool,
}: IProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchExistringPools());
    dispatch(fetchAllowedRewardTokens());
  }, [dispatch]);

  const { pools: existingPools } = useNumerizePools();

  const poolIndex = existingPools.findIndex((p) => p.timestam == pool.timestam).toString();
  
  return (
    <MyModal
      isOpen={isOpenModal}
      onClose={onCloseModal}
      size="lg"
      px="3"
      background={customColors.myCustomColor.base}
      borderRadius="20px"
      pb={3}
    >
      <ModalCloseButton
        border="none"
        outline={"none"}
        _focus={{ boxShadow: "none" }}
        right={5}
        top={4}
      />

      <ModalHeader borderRadius="1.5rem 1.5rem 0 0"> Send an Airdrop</ModalHeader>

      <ModalBody borderRadius={"20px"} background={customColors.myCustomColor.lighter}>
        {poolIndex != "-1" && <Flex
          justifyContent={"space-evenly"}
          columnGap={5}
          rowGap="10"
          flexWrap="wrap"
          my={1}
          maxH={"60vh"}
          overflowY={"auto"}
        >
          <SendAirdrop specificPool={poolIndex}/>
        </Flex>}
      </ModalBody>
    </MyModal>
  );
};

export default AirdropModal;
