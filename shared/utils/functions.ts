// eslint-disable-next-line @typescript-eslint/no-explicit-any
import toHex from "to-hex";

export function preventExponetialNotation(x: any) {
  return ("" + +x).replace(
    /(-?)(\d*)\.?(\d*)e([+-]\d+)/,
    function (a, b, c, d, e) {
      return e < 0
        ? b + "0." + Array(1 - e - c.length).join("0") + c + d
        : b + c + d + Array(e - d.length + 1).join("0");
    }
  );
}

export const createIndentifierByCollectionAndNonce = (
  collection: string,
  nonce: number
): string => {
  const newNonce = toHex(nonce, { evenLength: true });

  return collection + "-" + newNonce;
};
