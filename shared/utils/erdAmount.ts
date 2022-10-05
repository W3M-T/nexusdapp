import BigNumber from "bignumber.js";

export const formatErdAmount = (
  amount: number | string,
  decimals = 18
): BigNumber => {
  const numberAmount = Number(amount);
  return new BigNumber(numberAmount * Math.pow(10, decimals));
};
