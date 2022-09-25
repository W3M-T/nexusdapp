export const formatTokenI = (tokenIdentifier?: string): string => {
  if (!tokenIdentifier) {
    return "";
  }
  return tokenIdentifier.split("-")[0];
};
