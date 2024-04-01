import { Box, BoxProps } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/legacy/image";
import { isValidImageUrl } from "../../utils/functions";

interface IProps extends BoxProps {
  src: string | StaticImageData;
  alt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nextProps?: any;
}

const NextImg = ({ src, alt = "", nextProps, ...props }: IProps) => {
  return (
    <Box {...props}>
      <Image
        src={
          typeof src === "string"
            ? isValidImageUrl(src)
              ? src
              : "/logoNexus.png"
            : src
        }
        alt={alt}
        width={22}
        height={22}
        layout="responsive"
        {...nextProps}
      />
    </Box>
  );
};

export default NextImg;
