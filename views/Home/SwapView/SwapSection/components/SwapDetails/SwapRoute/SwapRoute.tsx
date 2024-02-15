// import { SorSwapResponse } from "@ashswap/ash-sdk-js/out";
// import { Box, Center, Flex, HStack, Icon, Text , Button } from "@chakra-ui/react";
// import { SwapIcon } from "components/Icons/ui";
// import { CiRoute } from "react-icons/ci";
// import { formatTokenI } from "utils/functions/tokens";
// import { ILpSmartSwap, INomalSmartSwap } from "utils/types/others.interface";
// import useGetSwapInfo from "views/Swap/hooks/useGetSwapInfo";
// import { TbSum } from "react-icons/tb";
// import { MdOutlinePriceChange } from "react-icons/md";
// import { swap } from "views/Swap/services/swap";
// import React, { useState } from 'react';
// import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';


// const SwapRoute = ({ swapPaths }: { swapPaths?: SorSwapResponse }) => {
//   // console.log("⚠️ ~ file: SwapRoute.tsx:9 ~ swapPaths:", swapPaths)
//   const { data, isSapwToLp } = useGetSwapInfo();

//   const routes = swapPaths.swaps?.map((path) => {
//     return {
//       token1: formatTokenI(path.assetIn),
//       token2: formatTokenI(path.assetOut),
//     };
//   });

//   let finalRoutes = routes;
//   // if (routes.length > 0) {
//   //   finalRoutes = [...routes.filter((d, i) => i > 0), routes[0]];
//   // }

//   const priceImpact = Number(swapPaths?.priceImpact?.toFixed(7)) * 100;
//   const roundedPriceImpact = priceImpact.toFixed(6);

//   const displayPriceImpact = roundedPriceImpact.length > 6 ? Math.round(priceImpact*1000000) / 1000000 : roundedPriceImpact;
//   const [showAllRoutes, setShowAllRoutes] = useState(false);
  
//   return (
//     <HStack w={"full"} h={"full"} flex={1}>
//       <Flex
//         h={"full"}
//         w="50%"
//         gap={"10px"}
//         alignSelf={"flex-start"}
//         bg={"black.baseDark"}
//         p={2}
//         borderRadius={"20px"}
//         flex={1} // Add this line
//         minH={"75px"}
//       >
//         <Center bg="black.base" boxSize={"34px"} borderRadius="full">
//           <CiRoute color={"#22F7DD"} size={"22"}/>
//         </Center>
//         <Box>
//       <Text flex={1} fontSize={'16px'} my={1}>
//         Swap routes
//       </Text>
//       <Flex align="center" justify="space-between" mt={-1}>
//         {finalRoutes.length > 0 && <Text as="li" style={{ listStyleType: 'none' }} whiteSpace={"nowrap"} fontSize={'lsm'} color="white.500">
//           {finalRoutes?.[0].token1} {'→'} {finalRoutes?.[0].token2}
//         </Text>}
//         {finalRoutes.length > 1 && (
//           <Button 
//             size="sm" 
//             onClick={() => setShowAllRoutes(prev => !prev)} 
//             variant="ghost"
//             _hover={{ background: 'none' }}
//             _active={{ background: 'none' }}
//           >
//             {showAllRoutes ? <ChevronUpIcon color={"main"} /> : <ChevronDownIcon color={"main"}/>}
//           </Button>
//         )}
//       </Flex>
//       {showAllRoutes && (
//         <Box as="ul" style={{ listStyleType: 'none' }}  mt={-1}>
//           {finalRoutes.slice(1).map((route, i) => (
//             <Text as="li" fontSize={'lsm'} color="white.500" key={i + 1}>
//               {route.token1} {'→'} {route.token2}
//             </Text>
//           ))}
//         </Box>
//       )}
//     </Box>
//       </Flex>
//       <Flex
//         w="50%"
//         gap={"15px"}
//         alignSelf={"flex-start"}
//         bg={"black.baseDark"}
//         p={2}
//         borderRadius={"20px"}
//         flex={1} // Add this line
//         h={"full"}
//         minH={"75px"}
//       >
//         <Center bg="black.base" boxSize={"34px"} borderRadius="full">
//           <MdOutlinePriceChange color={"#22F7DD"} size={"22"}/>
//         </Center>
//         <Box>
//           <Text flex={1} fontSize={'16px'} my={1}>
//             Price Impact
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
//               {displayPriceImpact} %
//             </Text>
//           </ul>
//         </Box>
//       </Flex>
//     </HStack>
//   );
// };

// export default SwapRoute;
