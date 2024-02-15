// import { Box, Flex, Text } from "@chakra-ui/react";
// import CustomTooltip from "components/CustomTooltip/CustomTooltip";
// import { formatBalance } from "utils/functions/formatBalance";
// import { useGetFees } from "views/Admin/Views/Swap/hooks";

// const FeeInfo = ({ fee, whichToken } : { fee: number, whichToken: string}) => {
//   const { fees } = useGetFees();

//   if (!fees) return null;
//   return (
//     <Flex justifyContent={"center"} color="GrayText" mt={4}>
//       <CustomTooltip
//         maxWidth={"400px"}
//         text={
//           <Box color="GrayText" fontSize={"sm"} >
//             {/* <Flex flexDir={"column"}> */}
//               <Text>
//                 {fee}% fee on the {whichToken} token
//               </Text>
//             {/* </Flex> */}
//             {
//             /* <Flex flexDir={"column"}>
//               <Text fontWeight={"800"}>LP Token</Text>
//               <Text>
//                 {formatBalance({ balance: fees.lpFee, decimals: 2 })}% fee
//               </Text>
//             </Flex> */
//           }

//           </Box>
//         }
//         iconSize={"14px"}
//         componentWithIcon={
//           <Text mr={1} fontSize="14px">
//             QuantumX Fee
//           </Text>
//         }
//       />
//     </Flex>
//   );
// };

// export default FeeInfo;
