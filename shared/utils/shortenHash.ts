export const shortenHash = (text: string, charsAmount: number = 6) => {
  if (text.length > 2 * charsAmount) {
    const firstPart = text.substring(0, charsAmount);
    const lastPart = text.substring(
      text.length - charsAmount,
      text.length
    );
    return `${firstPart}...${lastPart}`;
  } else {
    return text;
  }
};
