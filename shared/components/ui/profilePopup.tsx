import React, { useState } from 'react';
import { Modal, Button, FormControl, FormLabel, Input, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Spinner } from "@chakra-ui/react";
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../utils/firebaseConfig';
import Swal from 'sweetalert2';
import { Formik } from 'formik';

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
    const [loading, setLoading] = useState(false)

    const updateUser = async (values: any) => {
        setLoading(true);
        try {
            const userQuery = query(collection(db, "users"), where("walletAddress", "==", user.walletAddress));
            const userSnapshot = await getDocs(userQuery);
            if (!userSnapshot.empty) {
                const userDocRef = userSnapshot.docs[0].ref;
                await updateDoc(userDocRef, {
                    dob: values.dob,
                    username: values.username,
                    fullName: values.fullName
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

    return (
        <Modal isOpen={visible} onClose={onClose} size={"2xl"} >
            <Formik
                initialValues={{
                    username: user?.username ?? "",
                    fullName: user?.fullName ?? "",
                    dob: user?.dob ?? ""
                }}
                onSubmit={(values, { setSubmitting }) => {
                    updateUser(values);
                    setSubmitting(false);
                }}
            >
                {({ values, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <ModalContent className='!bg-bg-primary2'>
                            <ModalHeader className='flex justify-center items-center text-center'>Edit Profile</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody className='!flex !flex-col !gap-y-[14px]'>
                                <FormControl isRequired id="username">
                                    <FormLabel>UserName</FormLabel>
                                    <Input
                                        name="username"
                                        value={values.username}
                                        onChange={handleChange}
                                        placeholder="Enter the Username"
                                        disabled={loading}
                                    />
                                </FormControl>
                                <FormControl isRequired id="firstName">
                                    <FormLabel>FirstName</FormLabel>
                                    <Input
                                        name="fullName"
                                        value={values.fullName}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Enter the first Name"
                                        disabled={loading}
                                    />
                                </FormControl>
                                <FormControl isRequired id="dob">
                                    <FormLabel>Date of Birth</FormLabel>
                                    <div className='data-dob'>
                                        <Input
                                            name="dob"
                                            type="date"
                                            value={values.dob}
                                            onChange={handleChange}
                                            placeholder='enter the Date of Birth'
                                            disabled={loading}
                                        />
                                    </div>
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={onClose} mr={3}>Cancel</Button>
                                <Button type="submit" colorScheme="blue" variant="ghost" className="!bg-blue-primary !text-white" disabled={loading}>Submit</Button>
                            </ModalFooter>
                        </ModalContent>
                    </form>
                )}
            </Formik>
        </Modal >
    );
}

export default ProfileModal;
