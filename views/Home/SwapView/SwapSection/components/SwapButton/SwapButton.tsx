import { ButtonProps } from "@chakra-ui/react";
import { Address, BooleanValue, BytesValue, ContractFunction, Interaction, SmartContract, TokenTransfer } from "@multiversx/sdk-core/out";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks/transactions/useTrackTransactionStatus";
import { sendTransactions } from "@multiversx/sdk-dapp/services";
// import { ChainId, contractAddr, network } from "api/net.config";
// import { sendTransaction } from "api/sc/sc";
import BigNumber from "bignumber.js";
// import ActionButton from "components/ActionButton/ActionButton";
import { useState } from "react";
// import { openLogin } from "redux/slices/settings/settings-reducer";
import { selectUserAddress } from "../../../../../../shared/redux/slices/settings";
import { chainType, networkConfig } from "../../../../../../config/network";
import { sendTransaction } from "../../../../../../shared/services/sc/calls";
// import { ActionButton } from "../../../../../../shared/components/tools/ActionButton";
import { useAppDispatch, useAppSelector } from "../../../../../../shared/hooks/core/useRedux";
import { ChainId } from "@ashswap/ash-sdk-js/out";
import ActionButton from "./ActionButton/ActionButton";
// import { ActionButton } from "../../../../../../shared/components/tools/ActionButton";

interface IProps extends ButtonProps {
  interaction?: Interaction,
  actualInputAmount?: string
  disabled?: boolean,
  disabledMessage?: string,
  defaultMessage?: string
  isWrapOrUnwrap?: boolean
  wrapUnwrapCall?: () => void
}

const network = networkConfig[chainType];

const getAshChainId = () => {
  if (network.id == "mainnet") {
    return ChainId.Mainnet;
  } else if (network.id == "devnet") {
    return ChainId.Devnet;
  }
}

const SwapButton = ({
    interaction,
    actualInputAmount,
    disabled,
    disabledMessage,
    defaultMessage = "Swap",
    isWrapOrUnwrap = false,
    wrapUnwrapCall,
    ...props
  }: IProps) => {

    const userAddress = useAppSelector(selectUserAddress);

    const handleSwap = async () => {

      let finalArgs = interaction.getArguments();

      if (finalArgs.length == 3) {
        finalArgs.push(new BooleanValue(false));
        finalArgs = [finalArgs[0], finalArgs[1], finalArgs[3], finalArgs[2]];
      }
  
      const contract = new SmartContract({ address: new Address(networkConfig[chainType].contractAddr.nexusSwap)});
      let finalInteraction = new Interaction(contract, new ContractFunction("swap"), finalArgs);
      
      finalInteraction = finalInteraction
        .withSender(new Address(userAddress))
        .withChainID(getAshChainId())
        .withGasLimit(interaction.getGasLimit().valueOf()) // * 1.2) // 20% more gas
      
      if (BigNumber(interaction.getValue().toString()).gt(0)) {
        const inputAmount = actualInputAmount ?
          actualInputAmount :
          interaction.getValue().toString();
      
          finalInteraction = finalInteraction.withValue(inputAmount);
      } else {
        const inputAmount = actualInputAmount ?
          actualInputAmount :
          interaction.getTokenTransfers()?.[0].amountAsBigInteger;
      
        const transfer = interaction.getTokenTransfers()?.[0];
      
        finalInteraction = finalInteraction.withSingleESDTTransfer(
          TokenTransfer.fungibleFromBigInteger(
            transfer.tokenIdentifier,
            inputAmount
          )
        );
      }

      const tx = finalInteraction.buildTransaction();
      
      const res = await sendTransaction({tx: tx});
    };
  
    return (
        <ActionButton
          height={"auto"}
          variant={"ghost"}
          borderRadius={"2xl"}
          padding={"18px"}
          width={"full"}
          onClick={handleSwap}
          {...props}
          isDisabled={disabled}
          textColor={"white"}
          fontSize={"xl"}
          fontWeight={"bold"}
        >
          {!userAddress ? "Swap" :
            disabled ? disabledMessage:
              interaction ? defaultMessage :
                "Error"}
        </ActionButton>
    );
  };
  
  export default SwapButton;
