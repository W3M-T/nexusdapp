import { Center, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { Authenticated } from "../../../shared/components/tools/Authenticated";
import { LoginModalButton } from "../../../shared/components/tools/LoginModalButton";
import { CardWrapper } from "../../../shared/components/ui/CardWrapper";
import AllowTokenForAirdrop from "./AllowTokenForAirdrop/AllowTokenForAirdrop";
import SendAirdrop from "./SendAirdrop/SendAirdrop";
import SetOneTimeFee from "./SetOneTimeFee/SetOneTimeFee";
import WithdrawFee from "./WithdrawFee/WithdrawFee";

const Actions = () => {
  return (
    <CardWrapper>
      <Heading fontSize={"2xl"} mb={12}>
        Actions
      </Heading>
      <Authenticated
        spinnerCentered
        fallback={
          <>
            <Text fontWeight="bold" fontSize="2xl" textAlign="center" mt={8}>
              Connect your wallet!
            </Text>
            <Flex mt={4} justifyContent="center">
              <LoginModalButton />
            </Flex>
          </>
        }
      >
        <Center flexDir={"column"} px={4} w="full" rowGap={12}>
          <SetOneTimeFee />
          <Divider />
          <WithdrawFee />
          <Divider />
          <AllowTokenForAirdrop />
          <Divider />
          <SendAirdrop />
        </Center>
      </Authenticated>
    </CardWrapper>
  );
};

export default Actions;
