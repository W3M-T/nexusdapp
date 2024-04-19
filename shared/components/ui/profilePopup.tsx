import React, { useState } from 'react';
import { Modal, Button, FormControl, FormLabel, Input, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import { Formik } from 'formik';
import { collection, query, getDocs, updateDoc, where } from 'firebase/firestore';
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
    const [loading, setLoading] = useState(false);

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
                setLoading(false);
                getUser();
                onClose();
                Swal.fire({
                    title: "Update Successfully",
                    icon: "success"
                });
            }
        } catch (err) {
            console.error("Error updating document:", err);
            setLoading(false);
        }
    };

    // Function to get today's date in the required format (YYYY-MM-DD)
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <Modal isOpen={visible} onClose={onClose} size="2xl">
            <Formik
                initialValues={{
                    username: user?.username || "",
                    fullName: user?.fullName || "",
                    dob: user?.dob || getTodayDate() // Set today's date or user's dob
                }}
                onSubmit={(values, { setSubmitting }) => {
                    updateUser(values);
                    setSubmitting(false);
                }}
            >
                {({ values, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <ModalContent className="!bg-bg-primary2">
                            <ModalHeader className="flex justify-center items-center text-center">Edit Profile</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody className="!flex !flex-col !gap-y-[14px]">
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
                                <FormControl isRequired id="fullName">
                                    <FormLabel>Full Name</FormLabel>
                                    <Input
                                        name="fullName"
                                        value={values.fullName}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Enter the full Name"
                                        disabled={loading}
                                    />
                                </FormControl>
                                <FormControl isRequired id="dob">
                                    <FormLabel>Date of Birth</FormLabel>
                                    <CustomDatePicker
                                        name="dob"
                                        value={values.dob}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={onClose} mr={3} disabled={loading}>Cancel</Button>
                                <Button type="submit" colorScheme="blue" variant="ghost" className="!bg-blue-primary !text-white" disabled={loading}>Submit</Button>
                            </ModalFooter>
                        </ModalContent>
                    </form>
                )}
            </Formik>
        </Modal>
    );
};

const CustomDatePicker: React.FC<any> = ({ name, value, onChange, disabled }) => {
    // Get today's date
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const maxDate = `${year}-${month}-${day}`;

    // Function to handle date change
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;

        // Validate selected date
        const [selectedYear, selectedMonth, selectedDay] = selectedDate.split('-').map(Number);
        if (selectedYear > year ||
            (selectedYear === year && selectedMonth > parseInt(month)) ||
            (selectedYear === year && selectedMonth === parseInt(month) && selectedDay > parseInt(day))) {
            // If selected date is beyond current date, set it to current date
            onChange({ target: { name, value: maxDate } });
        } else {
            // Otherwise, update with selected date
            onChange({ target: { name, value: selectedDate } });
        }
    };

    return (
        <Input
            name={name}
            type="date"
            value={value}
            onChange={handleDateChange}
            max={maxDate} // Set max date to today's date
            disabled={disabled}
        />
    );
};



export default ProfileModal;
