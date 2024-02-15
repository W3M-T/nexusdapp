import { As, Box, Flex, HStack, Input, InputProps, Spinner, Text, theme } from "@chakra-ui/react";
import styled from "@emotion/styled";
import SelectCurrency from "./commons/SelectCurrency/SelectCurrency";
import BigNumber from "bignumber.js";
import { ActionButton } from "../../../../../../shared/components/tools/ActionButton";
import { formatBalance, formatNumber, formatPrecision } from "../../../../../../shared/utils/formatBalance";
import { preventExponetialNotation } from "../../../../../../shared/utils/functions";
import { SwapToken } from "../../SwapSection";
import useGetAccountToken from "../../../../../../shared/hooks/tools/useGetAccountToken";
import { customColors } from "../../../../../../config/chakraTheme";
import useGetMultipleElrondTokens from "../../../../../../shared/hooks/tools/useGetMultipleElrondTokens";
import { selectUserAddress } from "../../../../../../shared/redux/slices/settings";
import { useAppSelector } from "../../../../../../shared/hooks/core/useRedux";
import useGetUserEgld from "../../../../../../shared/hooks/tools/useGetUserEgld";
import useGetElrondToken from "../../../../../../shared/hooks/tools/useGetElrondToken";

function formatNumberWithMaxDecimals(num: number | string, decimals = 5): string | number {
  const decimalCount = (num.toString().split('.')[1] || '').length;

  if (decimalCount) {
    num = formatPrecision(num, Math.min(decimals, decimalCount));
  }
  return num;
}

interface IProps extends InputProps {
  label: string;
  id: "from" | "to";
  handleClickToken: (token: any) => void;
  onClickMaxtoken?: (maxBalance: number) => void;
  hasMaxButton: boolean;
  field: SwapToken;
  sxProps?: any;
  isLoadingAmount?: boolean;
  disableChangeToken?: boolean;
  dollarAmount?: string;
  swapTokens: SwapToken[];
}

const TextField = ({
  label,
  id,
  handleClickToken,
  onClickMaxtoken,
  hasMaxButton,
  field,
  disableChangeToken,
  sxProps,
  isLoadingAmount,
  dollarAmount,
  swapTokens,
  ...props
}: IProps) => {

  const { token, isLoading } = useGetElrondToken(field.identifier);
  const { accountToken } = useGetAccountToken(field.identifier);
  
  const { tokens } = useGetMultipleElrondTokens([field.identifier]);

  function findFirstNonZeroDigit(numStr: string): number | null {
    if (!numStr) {
      return null;
    }
    for (let i = 0; i < numStr.length; i++) {
        if (numStr[i] !== '0' && numStr[i] !== '.') {
            return i + 1;
        }
    }
    return null;
  }

  const firstNonZeroDigit: number | null = findFirstNonZeroDigit(field.value);

  return (
    <Box
      width={"full"}
      px={{sm: 2, md: 4}}
      py={2}
      borderRadius={"20px"}
      border={"1px solid"}
      sx={sxProps}
      position={"relative"}
      // bg="secondary"
      fontSize={{ xs: "sm", md: "16px" }}
    >
      <Flex justifyContent={"space-between"}>
          <Text fontWeight="bold" fontSize={"md"} opacity={0.5} pt={1}>
            {label}
          </Text>
      </Flex>

      <Box 
        width={"full"}
        mt={3}
        sx={{
          borderRadius: "2xl",
          zIndex: 2,
          // marginTop: "5px",
          fontSize: "1.4rem",
          display: "flex",
          flexDir: "column",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
        // transform={"translateY(-20px)"}
        // mb={-6}
      >
        <HStack zIndex={2} gap={{sm: 2, md: 5}} pb={1}>
          {field.identifier && hasMaxButton && (
            <ActionButton
                onClick={() => onClickMaxtoken(formatBalance(accountToken, false, accountToken.decimals))}
                textTransform={"uppercase"}
                fontSize={"xs"}
                px={3}
                py={1.5}
                rounded={"full"}
                border={"none"}
                bg={customColors.myCustomColor.lighter}
                zIndex={1}
            >
                Max
            </ActionButton>
          )}
          <SelectCurrency 
            field={id}
            handleClickToken={handleClickToken}
            token={!accountToken ? tokens?.[0] : token}
            disable={disableChangeToken}
            swapTokens={swapTokens}
          />
        </HStack>
        <Flex alignItems="center" mt={0}>
          
            <HStack opacity={0.5} fontSize={"sm"} gap={1} mx={1} pr={!hasMaxButton ? 1 : 0}>
                <Box as="span" m="5px">
                    Balance:
                </Box>
                <Text> {accountToken? formatBalance(accountToken) : "0"} </Text>
            </HStack>
        </Flex>
        <Flex flexDir={"column"} w="60%"
          justifySelf={"flex-start"}
          alignSelf={"flex-start"}
        >
          {isLoadingAmount ? (
            <Box w="full" marginTop={"-65px"}>
              <Spinner />
            </Box>
          ) : (
            <InputS 
              value={field.value ?
                id == "to" ?
                  formatNumberWithMaxDecimals(Number(field.value), firstNonZeroDigit > 8 ? firstNonZeroDigit : 6)
                  : formatNumberWithMaxDecimals(Number(field.value), Math.min(9, field.decimals))
                : ""}
              fontSize={{sm: firstNonZeroDigit > 8 ? "16px" : "3xl", md: firstNonZeroDigit > 8 ? "26px" : "3xl"}}
              fontWeight={"500"}
              id={id}
              px={0}
              mr={2}
              marginTop={"-72px"}
              _focus={{
                border: "none",
                outline: "none",
                boxShadow: "none",
              }}
              _placeholder={{
                color: "rgba(255, 255, 255, 0.15)",
              }}
              inputMode="decimal"
              title="Token Amount"
              autoComplete="off"
              autoCorrect="off"
              type={id === "from" ? "number" : "text"}
              placeholder="0"
              minLength={1}
              maxLength={79}
              spellCheck="false"
              position="relative" bottom="0"
              zIndex={0}
              {...props}
            />
          )}
          {dollarAmount && (
            <Text opacity={0.5} fontSize={"sm"} mt={hasMaxButton ? "5px" : "6px"}>
              ≈ ${formatNumber(preventExponetialNotation(dollarAmount))}
            </Text>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default TextField;

const InputS = styled(Input)(({ theme }) => ({
  border: "none",
  outline: "none",
  width: "100%",
  "&:disabled": {
    opacity: 1,
  },
}));
