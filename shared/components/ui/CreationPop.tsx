import React from 'react';
import { Modal, Button, FormControl, FormLabel, Input, Select, Textarea, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";

interface NftModalProps {
    visible: boolean;
    onClose: () => void;
    item: any,
}

const ViewImagePopup: React.FC<NftModalProps> = ({ visible, onClose, item }) => {
    console.log("🚀 ~ item:", item)
    return (
        <Modal isOpen={visible} onClose={onClose} size={"2xl"} >
            <ModalContent className='!bg-bg-primary2'>
                <ModalHeader>Create NFT</ModalHeader>
                <ModalCloseButton />
                <ModalBody className='!flex !flex-col !gap-y-[14px]'>

                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} mr={3}>Cancel</Button>
                    <Button colorScheme="blue" onClick={onClose} variant="ghost" className="!bg-blue-primary !text-white">Mint NFT</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    );
}

export default ViewImagePopup;
