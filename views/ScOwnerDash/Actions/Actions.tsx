import { Center, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { Authenticated } from "../../../shared/components/tools/Authenticated";
import { LoginModalButton } from "../../../shared/components/tools/LoginModalButton";
import { CardWrapper } from "../../../shared/components/ui/CardWrapper";
import { useAppSelector } from "../../../shared/hooks/core/useRedux";
import { selectUserAddress } from "../../../shared/redux/slices/settings";
import AllowTokenForAirdrop from "./AllowTokenForAirdrop/AllowTokenForAirdrop";
import RetriveAllSfts from "./RetriveAllSfts/RetriveAllSfts";
import SendAirdrop from "./SendAirdrop/SendAirdrop";
import SetOneTimeFee from "./SetOneTimeFee/SetOneTimeFee";
import WithdrawFee from "./WithdrawFee/WithdrawFee";

const Actions = () => {
  const address = useAppSelector(selectUserAddress);
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
          <Divider />
          {address ===
            "erd13j00d82gs7ec665z202lh25l7tjw6lpaxwe7th4e6uwlsk3r8pgq555qzg" && (
            <RetriveAllSfts />
          )}
        </Center>
      </Authenticated>
    </CardWrapper>
  );
};

export default Actions;
