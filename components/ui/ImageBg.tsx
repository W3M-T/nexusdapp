import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";

const ImageBg = ({ image, unoptimized = false, sx, quality }) => {
  return (
    <Box
      sx={sx}
      as={ImageBgS}
      borderRadius="inherit"
      objectFit="cover"
      layout="fill"
      src={image}
      alt={""}
      quality={quality || 80}
      placeholder="blur"
      blurDataURL={typeof image === "string" ? image : image.src}
      unoptimized={unoptimized}
    />
  );
};

export default ImageBg;

const ImageBgS = styled(Image)(() => ({
  zIndex: "-1",
}));
