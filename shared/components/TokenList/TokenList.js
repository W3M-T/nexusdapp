import { Box } from "@chakra-ui/react";
import TokenItem from "./TokenItem";

const TokenList = ({
  handleClickToken,
  tokens,
  showIdent = false,
  showBalance = false,
  hoverBg = "black.baseDark",
}) => {
  if (!tokens) {
    return null;
  }

  return (
    <Box width={"full"} maxHeight={"510px"} overflow={"auto"}>
      {tokens.map((token) => (
        <TokenItem
          showIdent={showIdent}
          showBalance={showBalance}
          key={token.identifier}
          token={token}
          onClick={handleClickToken}
          hoverBg={hoverBg}
        />
      ))}
    </Box>
  );
};

export default TokenList;
