import { Box, Image, createIcon } from "@chakra-ui/react";
import EgldLogoImg from "../../assets/images/coinlogos/egldlogo.png";
import NextImage from "../NextImage/NextImage";

export const MultiversxLogo = createIcon({
    displayName: "MultiversxLogo",
    viewBox: "0 0 13 9",
    // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
    path: (
      <path
        d="M6.80039 4.40288L12.2794 1.65934L11.3583 0L6.3412 1.90191C6.21202 1.95097 6.06882 1.95097 5.93964 1.90191L0.921136 0L0 1.65934L5.47906 4.40288L0 7.14507L0.921136 8.80448L5.93824 6.90256C6.06742 6.8535 6.21062 6.8535 6.3398 6.90256L11.3569 8.80448L12.278 7.14507L6.79899 4.40159L6.80039 4.40288Z"
        fill="#23F7DD"
      />
    ),
  });

  export const EgldLogoIcon = ({
    size = null,
    wrapperProps = undefined,
    ...props
  }) => {
    return (
      <Box  {...wrapperProps} boxShadow={""}>
        <Image
          as={NextImage}
          layout="responsive"
          borderRadius="full"
          // @ts-ignore
          src={EgldLogoImg}
          alt="Egld"
          {...props}
        />
      </Box>
    );
  };