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
import { BytesValue } from "@multiversx/sdk-core/out";
import { ActionButton } from "../../../../shared/components/tools/ActionButton";

// Custom components

// Icons
import { useEffect } from "react";
import { selectedNetwork } from "../../../../config/network";
import { CardWrapper } from "../../../../shared/components/ui/CardWrapper";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/core/useRedux";
import { fetchRegistrationInfo } from "../../../../shared/redux/reduxAsyncFuncs/poolsFuncs";
import { selectCreatePool } from "../../../../shared/redux/slices/pools";
import { selectUserAddress } from "../../../../shared/redux/slices/settings";
import {
  EGLDPayment,
  ESDTTransfer,
} from "../../../../shared/services/sc/calls";
import { formatBalance } from "../../../../shared/utils/formatBalance";
import { formatTokenI } from "../../../../shared/utils/formatTokenIdentifier";

interface IProps {
  activeFeeTab: () => void;
  activeVerifyTab: () => void;
  activeFormTab: () => void;
}

const FeeTab = ({ activeVerifyTab, activeFormTab }: IProps) => {
  const { phase2 } = useAppSelector(selectCreatePool);
  const { collection } = useAppSelector(selectCreatePool);
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectUserAddress);
  useEffect(() => {
    localStorage.setItem("poolcreationPhase", "2");
  }, []);

  useEffect(() => {
    if (address) {
      if (collection.collection !== "All-Elrond-NFTs") {
        dispatch(
          fetchRegistrationInfo({ address, collection: collection.collection })
        );
      }
    }
  }, [address, collection, dispatch]);

  const handlePayNow = () => {
    if (phase2.data.tokenAmount && collection) {
      if (phase2?.data?.tokenI === "EGLD") {
        EGLDPayment(
          "NftStakingPoolsWsp",
          "payFee",
          formatBalance({ balance: phase2.data.tokenAmount }, true),
          [BytesValue.fromUTF8(collection.collection)],
          80000000
        );
      } else {
        ESDTTransfer({
          funcName: "payFee",
          args: [BytesValue.fromUTF8(collection.collection)],
          token: {
            identifier: phase2.data.tokenI,
            decimals: 18,
          },
          realValue: phase2.data.tokenAmount,
          contractAddr: selectedNetwork.contractAddr.nftsStaking,
          val: 0,
          gasL: 80000000,
        });
      }
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
