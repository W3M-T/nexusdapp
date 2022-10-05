/* eslint-disable react/no-unescaped-entities */

// Chakra imports
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import { BytesValue } from "@elrondnetwork/erdjs/out";
import { ActionButton } from "../../../../shared/components/tools/ActionButton";

// Custom components

// Icons
import { useEffect } from "react";
import { CardWrapper } from "../../../../shared/components/ui/CardWrapper";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/core/useRedux";
import { useScTransaction } from "../../../../shared/hooks/core/useScTransaction";
import { fetchRegistrationInfo } from "../../../../shared/reduxAsyncFuncs/poolsFuncs";
import { NftStakingPoolsWsp } from "../../../../shared/services/sc";
import { scCall } from "../../../../shared/services/sc/calls";
import { selectCreatePool } from "../../../../shared/slices/pools";
import { selectUserAddress } from "../../../../shared/slices/settings";
import { formatBalance } from "../../../../shared/utils/formatBalance";
import { formatTokenI } from "../../../../shared/utils/formatTokenIdentifier";
import { TxCb } from "../../../../shared/utils/txCallback";

interface IProps {
  activeFeeTab: () => void;
  activeVerifyTab: () => void;
  activeFormTab: () => void;
}

const FeeTab = ({ activeFeeTab, activeVerifyTab, activeFormTab }: IProps) => {
  const { phase2 } = useAppSelector(selectCreatePool);
  const { collection } = useAppSelector(selectCreatePool);
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectUserAddress);

  const { triggerTx, transaction } = useScTransaction({
    cb: TxCb,
  });

  useEffect(() => {
    localStorage.setItem("poolcreationPhase", "2");
  }, []);

  useEffect(() => {
    if (address) {
      dispatch(
        fetchRegistrationInfo({ address, collection: collection.collection })
      );
    }
  }, [address, collection, dispatch, transaction]);

  const handlePayNow = () => {
    if (phase2.data.tokenAmount && collection) {
      console.log(
        "amount",
        formatBalance({ balance: phase2.data.tokenAmount }, true)
      );

      triggerTx(
        scCall(
          NftStakingPoolsWsp,
          "payFee",
          [BytesValue.fromUTF8(collection.collection)],
          80000000,
          formatBalance({ balance: phase2.data.tokenAmount }, true)
        )
      );
    }
  };
  return (
    <CardWrapper bg="linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)">
      <Box mb="40px">
        <Flex
          direction="column"
          align="center"
          justify="center"
          textAlign="center"
          w="80%"
          mx="auto"
        >
          <Text fontSize="lg" fontWeight="bold" mb="4px">
            {collection.collection} collection verified!
          </Text>
          <Text color="gray.400" fontWeight="500" fontSize="sm">
            By registering you can create as many pools as you wish for this
            collection. Registration fee is{" "}
            <Box as="span" fontWeight={"bold"} textDecoration="underline">
              {" "}
              {formatBalance({ balance: phase2?.data?.tokenAmount })}{" "}
              {formatTokenI(phase2?.data?.tokenI)}
            </Box>
            .
          </Text>
        </Flex>
      </Box>
      <Box>
        <Flex direction="column" w="100%">
          <Box>
            <Center>
              {phase2?.data?.payed ? (
                <Box mt={8}>
                  {phase2.status !== "idle" && (
                    <Alert status={phase2.status} borderRadius="15px">
                      <AlertIcon />
                      {phase2.message}
                    </Alert>
                  )}
                </Box>
              ) : (
                <ActionButton onClick={handlePayNow}>Pay now</ActionButton>
              )}
            </Center>
          </Box>
          <Flex justify="space-between">
            <Button
              variant="no-hover"
              bg={"white"}
              alignSelf="flex-end"
              mt="24px"
              w={{ sm: "75px", lg: "100px" }}
              h="35px"
              onClick={activeVerifyTab}
            >
              <Text fontSize="xs" color="#313860" fontWeight="bold">
                PREV
              </Text>
            </Button>
            <ActionButton
              bg="dappTemplate.color2.base"
              alignSelf="flex-end"
              mt="24px"
              h="35px"
              disabled={!phase2?.data?.payed}
              onClick={activeFormTab}
            >
              <Text fontSize="xs" color="#fff" fontWeight="bold">
                NEXT
              </Text>
            </ActionButton>
          </Flex>
        </Flex>
      </Box>
    </CardWrapper>
  );
};

export default FeeTab;
