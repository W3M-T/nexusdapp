import { ModalContent, ModalCloseButton, VStack, HStack, Grid, Center, Text, Box, Button, FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import { customColors } from "../../../../../config/chakraTheme";
import MyModal from "../../MyModal";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../../../hooks/core/useRedux";
import { selectUserAddress } from "../../../../redux/slices/settings";
import LoginModal from "../../LoginModal";
import { LoginModalButton } from "../../../tools/LoginModalButton";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks/account/useGetLoginInfo";
import { useGetAccountInfo } from "@multiversx/sdk-dapp/hooks/account/useGetAccountInfo";
import { shortenHash } from "../../../../utils/shortenHash";
import { TiDeleteOutline } from "react-icons/ti";

interface CommentsIProps {
  isOpenCommentsModal: boolean;
  onCloseCommentsModal: () => void;
  nftObject: any;
}
  
const CommentsModal = ({ isOpenCommentsModal, onCloseCommentsModal, nftObject }: CommentsIProps) => {
  const connectedAddress = useAppSelector(selectUserAddress);
  const { account } = useGetAccountInfo();

  const username = account?.username
    ? account.username.split('.')[0]
    : "";

  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get('/api/getComments');
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCreateComment = async (listingId, address, username, newComment) => {
    try {
      await axios.post('/api/comments', {
        listing_id: listingId,
        address: address,
        username: username,
        text: newComment,
      });
      fetchComments();
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await axios.delete(`/api/deleteComment?id=${id}`);
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
  <MyModal isOpen={isOpenCommentsModal} onClose={onCloseCommentsModal} size="lg">
    {/* <ModalOverlay background={"rgba(0,0,0,0.1)"} /> */}
    <ModalContent py={4} mx={1} background={customColors.myCustomColor.lighter}>
        <ModalCloseButton
          border="none"
          outline={"none"}
          _focus={{ boxShadow: "none" }}
          right={0}
          top={0}
        />
        <VStack
          w={"full"}
          px={4}
        >

          <Text fontSize={"lg"} fontWeight={"bold"}> Comments </Text>

          <VStack
            w={"full"}
            // gap={2}
            // p={4}
            borderRadius={"2xl"}
            bg={customColors.myCustomColor.base}
            textColor={"whiteAlpha.700"}
          >
            {comments.length ? comments.reverse().filter((c) => c.listing_id == nftObject.listingId).map((comment) => {
              return (
                <VStack
                  p={3}
                  borderTop={"2px solid"}
                  borderColor={customColors.myCustomColor.lighter}
                  key={comment.id}
                  w={"full"}
                >
                  <HStack w={"full"} justifyContent={"space-between"}>
                      <HStack gap={6}>
                        {comment.username && <Text fontSize={"md"} fontWeight={"medium"}>
                          {comment.username}
                        </Text>}

                        {comment.address && <Text fontSize={"sm"} fontWeight={"light"}>
                          {shortenHash(comment.address, 4)}
                        </Text>}

                        {comment.created_at && <Text fontSize={"sm"} fontWeight={"light"}>
                          {comment.created_at}
                        </Text>}
                      </HStack>

                      {/* DELETE BUTTON */}
                      {comment.address == connectedAddress && <Box onClick={() => handleDeleteComment(comment.id)} title="Delete comment">
                        <TiDeleteOutline size={"18px"}/>
                      </Box>}
                  </HStack>

                  <Text w={"full"} justifyContent={"flex-start"} textColor={"white"}>
                    {comment.text}
                  </Text>
                </VStack>
              )
            }) : <Text>No comments yet.</Text>}
          </VStack>

          <Box p={3}>
            {connectedAddress
              ? <CommentForm
                  onCreateComment={handleCreateComment}
                  listingId={nftObject.listingId}
                  address={connectedAddress}
                  username={username}
                />
              : <VStack fontWeight={"semibold"}>
                  <Text> Connect to post your comment. </Text>
                  <Center><LoginModalButton/></Center>
                </VStack>
            }
          </Box>
        </VStack>
    </ModalContent>
  </MyModal>
  );
}

export default CommentsModal;



export const CommentForm = ({ onCreateComment, listingId, address, username }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newComment.trim()) {
      return; // Prevent empty comments
    }
    try {
      await onCreateComment(listingId, address, username, newComment);
      setNewComment(''); // Clear the input field after submitting
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <HStack as="form" onSubmit={handleSubmit} spacing={4} w={"full"}>
      <FormControl w={"full"}>
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your comment..."
          rows={2}
          w={"full"}
        />
      </FormControl>
      <Button px={6} type="submit" colorScheme="blue">Post</Button>
    </HStack>
  );
};
