import { Box, BoxProps } from "@chakra-ui/react";
import Image from "next/image";

interface IProps extends BoxProps {
  src: string;
  alt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nextProps?: any;
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
