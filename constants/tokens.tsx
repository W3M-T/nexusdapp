import EgldImg from "../assets/images/coinlogos/egldlogo.png";
import NextImg from "../components/ui/NextImg";
import { selectedNetwork } from "../config/network";
const tokens = selectedNetwork.tokens;
export const tokensPools = [tokens.EGLD, tokens.MERMAID, tokens.WATER];

export const EgldToken = {
  identifier: selectedNetwork.tokens.EGLD.identifier,
  name: "EGLD",
  ticker: "EGLD",
  decimals: selectedNetwork.tokens.EGLD.decimals,
  assets: {
    description: "EGLD",

    img: <NextImg src={EgldImg} alt="" boxSize={4} />,
  },
};
