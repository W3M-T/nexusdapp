import { Box, BoxProps } from "@chakra-ui/react";
import Image, { ImageProps } from "next/image";

interface IProps extends BoxProps {
  src: string;
  alt?: string;
  nextProps?: ImageProps;
}

const NextImg = ({ src, alt = "", nextProps, ...props }: IProps) => {
  return (
    <Box {...props}>
      <Image
        src={src}
        alt={alt}
        width="24px"
        height="24px"
        layout="responsive"
        {...nextProps}
      />
    </Box>
  );
};

export default NextImg;
