import { Center, Heading } from "@chakra-ui/react";
import { CardWrapper } from "../../../components/ui/CardWrapper";
import SendAirdrop from "./SendAirdrop/WithdrawFee";
import SetOneTimeFee from "./SetOneTimeFee/SetOneTimeFee";
import WithdrawFee from "./WithdrawFee/WithdrawFee";

const Actions = () => {
  return (
    <CardWrapper>
      <Heading fontSize={"2xl"} mb={12}>
        Actions
      </Heading>
      <Center flexDir={"column"} px={4} w="full" rowGap={12}>
        <SetOneTimeFee />
        <WithdrawFee />
        <SendAirdrop />
      </Center>
    </CardWrapper>
  );
};

export default Actions;
