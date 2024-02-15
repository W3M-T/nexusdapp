// import { Box, Center, Flex, HStack, Icon, Input, Text, useMediaQuery } from "@chakra-ui/react";
// import { SwapIcon } from "components/Icons/ui";
// import {
//   selectSlippage,
//   updateSlippage,
// } from "redux/slices/smartSwaps/smartSwaps";
// import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
// import { CiRoute } from "react-icons/ci";
// import { MdCurrencyExchange } from "react-icons/md";
// import { useEffect, useRef, useState } from "react";
// import { CloseIcon } from "@chakra-ui/icons";
// import { MdAttachMoney } from "react-icons/md";
// import { SorSwapResponse } from "@ashswap/ash-sdk-js/out";
// import { formatPrecision } from "utils/functions/formatBalance";
// import { breakpoints } from "theme/chakra";

// const Slippage = ({ swapPaths }: { swapPaths?: SorSwapResponse }) => {
//   // const [usesInput, setUsesInput] = useState(false);
//   const slipapge = useAppSelector(selectSlippage);
//   const dispatch = useAppDispatch();
  
//   let slippageSlecctions; // = [0.5, 1, 2];

//   const [isLargerThanLg] = useMediaQuery(`(min-width: ${breakpoints["md"]})`);
//   if (!isLargerThanLg) {
//     slippageSlecctions =  [1, 5];
//   } else {
//     slippageSlecctions = [1, 2, 5];
//   }

//   const handleUpdateSlippage = (newSlippage: number) => {
//     dispatch(updateSlippage(newSlippage));
//   };
  
//   return (
//     <HStack w={"full"} h={"full"} flex={1}>
//       <Flex
//         w="50%"
//         gap={"10px"}
//         alignSelf={"flex-start"}
//         bg={"black.baseDark"}
//         px={2}
//         py={1}
//         borderRadius={"20px"}
//         minH={"75px"}
//       >
//         <Center bg="black.base" boxSize={"34px"} borderRadius="full">
//           <MdCurrencyExchange size={"18"} color="#22F7DD"/>
//         </Center>
//         <Box flex={1}>
//           <Text flex={1} fontSize={'16px'} my={1}>
//             Slippage
//           </Text>
//           <Box>
//             {/* <Text color="white.500" mb={1} fontSize={"13px"}>
//               The swap will fail if the price increases more than{" "}
//               {slipapge}%.
//             </Text> */}

//             <Flex w="full" gap={{sm: 1, md: 2}} pt={1} ml={-3} direction={"row"}>
//               <Flex gap={1}>
//                 {slippageSlecctions.map((slippageOption) => {
//                   return (
//                     <SlippageBox
//                       key={slippageOption}
//                       slippage={slippageOption}
//                       active={slippageOption === slipapge}
//                       onClick={() => handleUpdateSlippage(slippageOption)}
//                     />
//                   );
//                 })}
//               </Flex>

//               <Flex
//                 ml={{md: "-2"}}
//                 borderRadius="md"
//                 maxW={"60px"}
//                 gap={0}
//                 bg={slipapge && slippageSlecctions.includes(slipapge) ? "none" : "main"}
//                 color={slipapge && slippageSlecctions.includes(slipapge) ? "white.300" : "black"}
//               >
//                 <Input
//                   px={0}
//                   textAlign={"center"}
//                   fontSize={"sm"}
//                   // bg={slipapge && slippageSlecctions.includes(slipapge) ? "none" : "main"}
//                   h="auto"
//                   outline={"none"}
//                   border="none"
//                   placeholder="___"
//                   _active={{
//                     outline: "none",
//                     border: "none",
//                   }}
//                   _activeLink={{
//                     outline: "none",
//                     border: "none",
//                   }}
//                   _focus={{
//                     outline: "none",
//                     border: "none",
//                     // color: "main",
//                   }}
//                   _focusVisible={{
//                     outline: "none",
//                     border: "none",
//                     // color: "main",
//                   }}
//                   onChange={(e) => {
//                     handleUpdateSlippage(Number(e.target.value))
//                   }}
//                 />
//                 <Text
//                   h="auto"
//                   py={1}
//                   mr={1}
//                   alignSelf={"center"}
//                   justifySelf={"flex-start"}
//                   fontSize={"sm"}
//                   // color={"white.500"}
//                 > 
//                   { slipapge  ? '%' : " " }
//                 </Text>
//               </Flex>
//             </Flex>
//           </Box>
//         </Box>
//       </Flex>
//       <Flex
//         w="50%"
//         gap={"10px"}
//         alignSelf={"flex-start"}
//         bg={"black.baseDark"}
//         p={2}
//         borderRadius={"20px"}
//         minH={"75px"}
//       >
//         <Center bg="black.base" boxSize={"34px"} borderRadius="full">
//           <MdAttachMoney size={"18"} color="#22F7DD"/>
//         </Center>
//         <Box>
//           <Text flex={1} fontSize={'16px'} my={1}>
//             Effective Price
//           </Text>
//           <ul>
//             {/* {finalRoutes.map((route, i) => {
//               return (
//                 <li key={i}>
//                   <Text fontSize={"lsm"} color="white.500">
//                     {route.token1} {"→"} {route.token2}
//                   </Text>
//                 </li>
//               );
//             })} */}
            
//             <Text fontSize={"lsm"} color="white.500">
//               ${formatPrecision(swapPaths?.effectivePrice)}
//             </Text>
//           </ul>
//         </Box>
//       </Flex>
//     </HStack>
//   );
// };

// export default Slippage;

// interface IProps {
//   slippage: number;
//   active?: boolean;
//   onClick: () => void;
// }

// const SlippageBox = ({ slippage, active, onClick }: IProps) => {
//   return (
//     <Box
//       bg={active ? "main" : "transparent"}
//       color={active ? "black" : "main"}
//       borderRadius={"15px"}
//       cursor="pointer"
//       _hover={{
//         bg: "main",
//         color: "black",
//       }}
//       maxW={"60px"}
//       fontSize={"sm"}
//       onClick={onClick}
//       textAlign="center"
//       alignSelf={"center"}
//       py={1}
//       // px={{md: 1}}
//       w={"35px"}
//     >
//       {slippage}%
//     </Box>
//   );
// };
