import React from 'react';
import { Modal, Button, FormControl, FormLabel, Input, Select, Textarea, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";

interface NftModalProps {
    visible: boolean;
    onClose: () => void;
}

const NftModal: React.FC<NftModalProps> = ({ visible, onClose }) => {
    return (
        <Modal isOpen={visible} onClose={onClose} size={"2xl"} >
            <ModalContent className='!bg-bg-primary2'>
                <ModalHeader>Create NFT</ModalHeader>
                <ModalCloseButton />
                <ModalBody className='!flex !flex-col !gap-y-[14px]'>
                    <FormControl id="title" isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input placeholder="Enter the title for your NFT" />
                    </FormControl>
                    <FormControl id="collection" isRequired>
                        <FormLabel>Collection</FormLabel>
                        <Select className='!bg-bg-primary2'>
                            <option value="existing" className='!bg-bg-primary'>Existing Collection</option>
                            <option value="new" className='!bg-bg-primary'>Create New Collection</option>
                        </Select>
                    </FormControl>
                    <FormControl id="royalties" isRequired>
                        <FormLabel>Royalties (%)</FormLabel>
                        <Input type="number" min={0} placeholder="Enter the royalties percentage" />
                    </FormControl>
                    <FormControl id="properties" isRequired>
                        <FormLabel>Properties</FormLabel>
                        <Textarea rows={4} placeholder="Add properties to the NFT" />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} mr={3}>Cancel</Button>
                    <Button colorScheme="blue" onClick={onClose} variant="ghost" className="!bg-blue-primary !text-white">Mint NFT</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    );
}

export default NftModal;
