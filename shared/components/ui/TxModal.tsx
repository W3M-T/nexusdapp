/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import { Box, Link, Spinner, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chainType, networkConfig } from "../../../config/network";
import { useLoginInfo } from "../../hooks/auth/useLoginInfo";
import {
  handleTxClose,
  selectTxError,
  selectTxPending,
  selectTxResult,
} from "../../redux/slices/transactions";
import { LoginMethodsEnum } from "../../types/enums";
import { shortenHash } from "../../utils/shortenHash";
import { ActionButton } from "../tools/ActionButton";
import { FlexCardWrapper } from "./CardWrapper";

const TxModal = () => {
  const { loginMethod } = useLoginInfo();
  const dispatch = useDispatch();
  const result = useSelector(selectTxResult);
  const pending = useSelector(selectTxPending);
  const error = useSelector(selectTxError);
  const handleClose = useCallback(() => {
    dispatch(handleTxClose());
  }, [dispatch]);
  if (result || pending || error) {
    return (
      <Box
        position="fixed"
        w="300px"
        bottom={"30px"}
        right={"70px"}
        zIndex={"999999"}
      >
        <FlexCardWrapper
          inset={0}
          backdropFilter="blur(10px)"
          bg="blue.900"
          padding={4}
        >
          <>
            {error && (
              <>
                <Box fontSize="md" fontWeight="semibold">
                  Transaction status:
                </Box>
                <Box>{error}</Box>
                <ActionButton mt={4} onClick={handleClose}>
                  Close
                </ActionButton>
              </>
            )}
            {pending && (
              <>
                <Box fontSize="md" fontWeight="semibold">
                  Transaction is pending. Please wait.
                </Box>
                {loginMethod === LoginMethodsEnum.walletconnect && (
                  <Box>
                    Confirm it on the Maiar mobile app and wait till it
                    finishes.
                  </Box>
                )}
                {loginMethod === LoginMethodsEnum.ledger && (
                  <Box>
                    Then wait some time to finish the transaction. You will get
                    the transaction hash and link at the end.
                  </Box>
                )}
                <Spinner mt={6} color="dappTemplate.color2.darker" />
              </>
            )}
            {result?.type && (
              <>
                {result.type === "tx" ? (
                  <>
                    <Box fontSize="md" fontWeight="semibold">
                      Transaction {result.status ? "Success" : "failed"} hash:
                    </Box>
                    <Link
                      textDecoration="underline"
                      href={`${networkConfig[chainType].explorerAddress}/transactions/${result.content}`}
                      isExternal
                    >
                      {shortenHash(result.content, 10)}
                    </Link>
                  </>
                ) : (
                  <>
                    <Box fontSize="md" fontWeight="semibold">
                      Query result
                    </Box>
                    <Box>
                      There is{" "}
                      <Text
                        fontWeight="black"
                        fontSize="xl"
                        display="inline-block"
                      >
                        {result.content}
                      </Text>{" "}
                      NFTs to mint left!
                    </Box>
                  </>
                )}
                <ActionButton mt={4} onClick={handleClose}>
                  Close
                </ActionButton>
              </>
            )}
          </>
        </FlexCardWrapper>
      </Box>
    );
  }
  return null;
};

export default TxModal;
