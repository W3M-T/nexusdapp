import { scQuery } from "../queries";


export const fetchAshSwapFee = async (): Promise<number> => {
  const res1 = await scQuery("NexusSwapWsp", "feePercentage");
  const res2 = await scQuery("NexusSwapWsp", "maxPercentage");
  const firstValue = res1?.firstValue?.valueOf().toNumber();
  const maxValue = res2?.firstValue?.valueOf().toNumber();

  return firstValue / maxValue;
};
