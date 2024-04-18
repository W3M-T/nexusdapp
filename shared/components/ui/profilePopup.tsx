import React, { useState } from 'react';
import { Modal, Button, FormControl, FormLabel, Input, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Spinner } from "@chakra-ui/react";
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../utils/firebaseConfig';
import Swal from 'sweetalert2';

interface User {
    username: string,
    dob: string,
    fullName: string,
    walletAddress: string,
}

interface NftModalProps {
    visible: boolean;
    onClose: () => void;
    user?: User,
    getUser?: any;
}

const ProfileModal: React.FC<NftModalProps> = ({ visible, onClose, user, getUser }) => {
    const [username, setUsername] = useState(user?.username ?? "John Doe");
    const [fullName, setFullName] = useState(user?.fullName ?? "User #111");
    const [dob, setDob] = useState(user?.dob ?? "11/11/2006");
    const [loading, setLoading] = useState(false)

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(event.target.value);
    };

    const handleDobChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDob(event.target.value);
    };

    const updateUser = async () => {
        setLoading(true);
        try {
            const userQuery = query(collection(db, "users"), where("walletAddress", "==", user.walletAddress));
            const userSnapshot = await getDocs(userQuery);
            if (!userSnapshot.empty) {
                const userDocRef = userSnapshot.docs[0].ref;
                await updateDoc(userDocRef, {
                    dob: dob,
                    username: username,
                    fullName: fullName
                });
                console.log("Document updated successfully");
                setLoading(false);
                getUser();
                onClose();
            }
            console.log("Document updated successfully");
            setLoading(false);

            Swal.fire({
                title: "Update Sucessfully",
                icon: "success"
            })

            onClose();
        } catch (err) {
            console.error("Error updating document:", err);
            setLoading(false);
        }
    };
    console.log("dob :", dob, "userName:", username, "fullName");

    return (
        <Modal isOpen={visible} onClose={onClose} size={"2xl"} >
            <ModalContent className='!bg-bg-primary2'>
                <ModalHeader className='flex justify-center items-center text-center'>Edit Profile</ModalHeader>
                <ModalCloseButton />

                <ModalBody className='!flex !flex-col !gap-y-[14px]'>
                    <FormControl isRequired id="username">
                        <FormLabel>UserName</FormLabel>
                        <Input value={username} onChange={handleUsernameChange} placeholder="Enter the Username" disabled={loading} />
                    </FormControl>
                    <FormControl isRequired id="firstName">
                        <FormLabel>FirstName</FormLabel>
                        <Input value={fullName} onChange={handleFirstNameChange} type="text" placeholder="Enter the first Name" disabled={loading} />
                    </FormControl>
                    <FormControl isRequired id="dob">
                        <FormLabel>Date of Birth</FormLabel>
                        <div className='data-dob'>
                            <Input type="date" value={dob} onChange={handleDobChange} placeholder='enter the Date of Birth' disabled={loading} />
                        </div>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} mr={3}>Cancel</Button>
                    <Button colorScheme="blue" variant="ghost" className="!bg-blue-primary !text-white" onClick={updateUser}>Submit</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    );
}

export default ProfileModal;
