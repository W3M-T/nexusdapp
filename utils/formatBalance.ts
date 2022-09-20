import BigNumber from "bignumber.js";
import { preventExponetialNotation } from "./functions";
import { numberWithCommas } from "./numbers";

export const formatBalance = (
  token: { balance: string | number; decimals?: number; withDots?: boolean },
  retrunNumber = false,
  customPrecision?: number
) => {
  if (token) {
    const strBalance = token.balance;
    const intBalance = Number(strBalance);
    const formatedBalance = getRealBalance(intBalance, token.decimals);

    const finalBinance = formatPrecision(formatedBalance, customPrecision);
    if (retrunNumber) {
      return finalBinance;
    }

    const withoutExponential = preventExponetialNotation(finalBinance);
    if (token.withDots) {
      return numberWithCommas(withoutExponential, true);
    } else {
      return numberWithCommas(withoutExponential);
    }
  }
  if (token?.balance === 0) {
    return 0;
  }
  return null;
};
export const formatBalanceDolar = (token, price, toString) => {
  if (token && token.balance) {
    const strBalance = token.balance;

    const intBalance = Number(strBalance);
    const intBalanceDolar = intBalance * Number(price);
    const formatedBalance = getRealBalance(intBalanceDolar, token.decimals);
    const finalBinance = formatPrecision(formatedBalance);
    if (toString) {
      return numberWithCommas(finalBinance);
    }
    return finalBinance;
  }
  return 0;
};

export const getRealBalance = (
  balance1 = 0,
  decimal,
  returnBigNumber = false
) => {
  const divider = Math.pow(10, decimal ?? 18);
  const balance = new BigNumber(balance1);
  const real = balance.dividedBy(divider, 10);

  if (returnBigNumber) {
    return real;
  }
  return real.toNumber();
};

export const formatPrecision = (num, customPrecision = 2) => {
  if (!num) {
    return 0;
  }
  let precision = customPrecision ?? 2;
  if (!customPrecision && customPrecision !== 0) {
    if (num < 1) {
      if (num < 0.009) {
        if (num < 0.0000001) {
          if (num < 0.000000001) {
            precision = 16;
          } else {
            precision = 11;
          }
        } else {
          precision = 6;
        }
      } else {
        precision = 4;
      }
    }
    if (num === 1) {
      precision = 1;
    }
    if (num > 1) {
      precision = 2;
    }
  }

  const exp = Math.pow(10, precision);

  return parseInt(String(num * exp), 10) / exp;
};

export const formatNumber = (number) => {
  return numberWithCommas(formatPrecision(number));
};

export const setEltondBalance = (amount, decimals = 18) => {
  return amount * Math.pow(10, decimals);
};
