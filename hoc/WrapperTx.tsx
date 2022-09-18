/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import { Box, Link, Spinner, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionButton } from "../components/tools/ActionButton";
import { FlexCardWrapper } from "../components/ui/CardWrapper";
import { chainType, networkConfig } from "../config/network";
import { useLoginInfo } from "../hooks/auth/useLoginInfo";
import {
  handleTxClose,
  selectTxError,
  selectTxPending,
  selectTxResult,
} from "../redux/slices/transactions";
import { LoginMethodsEnum } from "../types/enums";
import { shortenHash } from "../utils/shortenHash";

const WrapperTx = (Component) => (props) => {
  const { loginMethod } = useLoginInfo();
  const dispatch = useDispatch();
  const result = useSelector(selectTxResult);
  const pending = useSelector(selectTxPending);
  const error = useSelector(selectTxError);

  // const handleQueryCb = useCallback(
  //   (queryResult: string, pending: boolean, error: string) => {
  //     if (queryResult) {
  //       setResult({ type: 'query', content: queryResult });
  //       setPending(false);
  //       setError(undefined);
  //     }
  //     if (pending) {
  //       setPending(true);
  //       setError(undefined);
  //       setResult(undefined);
  //     }
  //     if (error) {
  //       setError(error);
  //       setPending(false);
  //       setResult(undefined);
  //     }
  //   },
  //   []
  // );

  const handleClose = useCallback(() => {
    dispatch(handleTxClose());
  }, [dispatch]);

  return (
    <Box position="relative">
      {error && (
        <FlexCardWrapper
          position="absolute"
          inset={0}
          bg="blackAlpha.200"
          backdropFilter="blur(10px)"
        >
          <Box fontSize="x-large" fontWeight="black">
            Transaction status:
          </Box>
          <Box fontSize="lg">{error}</Box>
          <ActionButton mt={4} onClick={handleClose}>
            Close
          </ActionButton>
        </FlexCardWrapper>
      )}
      {pending && (
        <FlexCardWrapper
          position="absolute"
          inset={0}
          bg="blackAlpha.200"
          backdropFilter="blur(10px)"
        >
          <Box fontSize="x-large" fontWeight="black">
            Transaction is pending. Please wait.
          </Box>
          {loginMethod === LoginMethodsEnum.walletconnect && (
            <Box>
              Confirm it on the Maiar mobile app and wait till it finishes.
            </Box>
          )}
          {loginMethod === LoginMethodsEnum.ledger && (
            <Box>
              Then wait some time to finish the transaction. You will get the
              transaction hash and link at the end.
            </Box>
          )}
          <Spinner mt={6} color="dappTemplate.color2.darker" />
        </FlexCardWrapper>
      )}
      {result?.type && (
        <FlexCardWrapper
          position="absolute"
          inset={0}
          bg="blackAlpha.200"
          backdropFilter="blur(10px)"
        >
          {result.type === "tx" ? (
            <>
              <Box fontSize="x-large" fontWeight="black">
                Transaction hash:
              </Box>
              <Link
                fontSize="large"
                textDecoration="underline"
                href={`${networkConfig[chainType].explorerAddress}/transactions/${result.content}`}
              >
                {shortenHash(result.content, 10)}
              </Link>
            </>
          ) : (
            <>
              <Box fontSize="x-large" fontWeight="black">
                Query result
              </Box>
              <Box fontSize="large">
                There is{" "}
                <Text fontWeight="black" fontSize="xl" display="inline-block">
                  {result.content}
                </Text>{" "}
                NFTs to mint left!
              </Box>
            </>
          )}
          <ActionButton mt={4} onClick={handleClose}>
            Close
          </ActionButton>
        </FlexCardWrapper>
      )}
    </Box>
  );
};

export default WrapperTx;
