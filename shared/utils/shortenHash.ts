export const shortenHash = (address: string, charsAmount: number = 6) => {
  const firstPart = address.substring(0, 4);
  const lastPart = address.substring(
    address.length - charsAmount,
    address.length
  );
  return `${firstPart} ... ${lastPart}`;
};
