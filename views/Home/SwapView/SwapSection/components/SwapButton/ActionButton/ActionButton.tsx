import { Button, ButtonProps } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";

// const Ripple: any = dynamic(() => import("../Ripple/Ripple"), {
//   ssr: false,
// });

const ActionButton = ({
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <Button
      position="relative"
      overflow="hidden"
      fontWeight="semibold"
      _hover={
        props.bg
          ? {
              bg: props.bg,
              opacity: 0.8,
            }
          : null
      }
      _active={
        props.bg
          ? {
              bg: props.bg,
              opacity: 0.8,
            }
          : null
      }
      // disabled={props.disabled} // Add disabled prop here
      {...props}
    >
      {children}
      {/* <Ripple radius={props.borderRadius} /> */}
    </Button>
  );
};

export default ActionButton;
