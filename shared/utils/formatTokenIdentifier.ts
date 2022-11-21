import toHex from "to-hex";

export const formatTokenI = (tokenIdentifier?: string): string => {
  if (!tokenIdentifier) {
    return "";
  }
  return tokenIdentifier.split("-")[0];
};

export const createIndentifierByCollectionAndNonce = (
  collection: string,
  nonce: number
): string => {
  const newNonce = toHex(nonce, { evenLength: true });

  return collection + "-" + newNonce;
};
