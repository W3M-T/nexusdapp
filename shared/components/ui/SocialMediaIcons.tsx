import { Box } from "@chakra-ui/react";
import { SocialIcon } from "react-social-icons";

export const SocialMediaIcons = () => {
  return (
    <Box display="flex" alignItems="center" gap={3}>
      <SocialIcon
        url="https://t.me/"
        bgColor="#fff"
        style={{ width: 30, height: 30 }}
      />
      <SocialIcon
        url="https://twitter.com/"
        bgColor="#fff"
        style={{ width: 30, height: 30 }}
      />
    </Box>
  );
};
