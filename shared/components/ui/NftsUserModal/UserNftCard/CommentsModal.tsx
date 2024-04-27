import { ModalContent, ModalCloseButton, VStack, HStack, Grid, Center, Text, Box, Button, FormControl, FormLabel, Textarea, useOutsideClick } from "@chakra-ui/react";
import { customColors } from "../../../../../config/chakraTheme";
import MyModal from "../../MyModal";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
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
      const response = await axios.get('/api/getComments', {
        params: {
          listing_id: nftObject.listingId
        }
      });
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

  const [copied, setCopied] = useState(0);
  const handleCopyAddress = (address, commentId) => {
    navigator.clipboard.writeText(address)
      .then(() => {
        setCopied(commentId);
        setTimeout(() => {
          setCopied(0);
        }, 2000); // Reset copied state after 2 seconds
      })
      .catch((error) => {
        console.error('Error copying address to clipboard:', error);
      });
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
            maxH={"75vh"}
            overflowY={"auto"}
          >
            {comments.length ? comments.map((comment) => {
              return (
                <VStack
                  p={3}
                  borderTop={"2px solid"}
                  borderColor={customColors.myCustomColor.lighter}
                  key={comment.id}
                  w={"full"}
                >
                  <HStack w={"full"} justifyContent={"space-between"}>
                      <HStack gap={3}>
                        {comment.username && <Text fontSize={"sm"} fontWeight={"medium"}>
                          @{shortenHash(comment.username, 5)}
                        </Text>}

                        {comment.address && <Text
                          fontSize={"sm"} fontWeight={"light"}
                          cursor="pointer" color={customColors.color2.lighter}
                          onClick={() => handleCopyAddress(comment.address, comment.id)}
                        >
                          {shortenHash(comment.address, 5)}
                        </Text>}

                        {copied == comment.id && <Text fontSize="xs" color="green.500">Copied</Text>}
                      </HStack>

                      <HStack>
                        {comment.created_at && <Text fontSize={"xs"} fontWeight={"light"}>
                            {formatDateString(comment.created_at)}
                          </Text>}

                        {comment.address == connectedAddress && <Box onClick={() => handleDeleteComment(comment.id)} title="Delete comment" color={"red.700"} cursor={"pointer"}>
                          <TiDeleteOutline size={"20px"}/>
                        </Box>}
                      </HStack>
                  </HStack>

                  <Text w={"full"} justifyContent={"flex-start"} textColor={"white"}>
                    {comment.text}
                  </Text>
                </VStack>
              )
            }) : <Text py={4}>No comments yet.</Text>}

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



const CommentForm = ({ onCreateComment, listingId, address, username }) => {
  const [newComment, setNewComment] = useState('');
  const [isPosting, setIsPosting] = useState(false); // State to track if a comment is being posted

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newComment.trim()) {
      return; // Prevent empty comments
    }
    setIsPosting(true); // Set isPosting to true when starting to post a comment
    try {
      await onCreateComment(listingId, address, username, newComment);
      setNewComment(''); // Clear the input field after submitting
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setTimeout(() => {
        setIsPosting(false); // Set isPosting to false after a timeout of 3 seconds
      }, 3000);
    }
  };

  return (
    <HStack as="form" onSubmit={handleSubmit} gap={3} w={"full"}>
      <FormControl w={"full"}>
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your comment..."
          rows={2}
          w={"full"}
          maxLength={250} // Set maximum character limit
        />
        <Text fontSize="sm" color="gray.500" textAlign="right">
          {newComment.length}/250 characters
        </Text>
      </FormControl>
      <Button
        px={6}
        type="submit"
        colorScheme="blue"
        isDisabled={newComment.length >= 250 || !newComment.trim() || isPosting} // Disable the button if character count exceeds or equals 250, if the comment is empty, or if a comment is being posted
      >
        {isPosting ? 'Posting...' : 'Post'}
      </Button>
    </HStack>
  );
};


function formatDateString(inputString) {
  const date = new Date(inputString);
  
  // Format the date components
  const formattedDate = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  // Format the time components (adjusted to user's timezone)
  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Use 24-hour format
    // timeZoneName: 'short', // Include timezone abbreviation
  });

  return `${formattedDate} ${formattedTime}`;
}