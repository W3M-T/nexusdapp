import React, { MutableRefObject, useRef, useState } from 'react';
import { Modal, Button, FormControl, FormLabel, Input, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Avatar } from "@chakra-ui/react";
import { Formik } from 'formik';
import { collection, query, getDocs, updateDoc, where } from 'firebase/firestore';
import { db, storage } from '../../utils/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import Swal from 'sweetalert2';
// import { FaUserLarge } from 'react-icons/fa6';

interface User {
    username: string,
    dob: string,
    fullName: string,
    walletAddress: string,
    profileImage?: string
}
interface NftModalProps {
    visible: boolean;
    onClose: () => void;
    user?: User,
    getUser?: any;
}

const ProfileModal: React.FC<NftModalProps> = ({ visible, onClose, user, getUser }) => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(undefined);

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
                    fullName: values.fullName,
                    profileImage: values.profileImage
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
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const imageRef = useRef<HTMLInputElement>()
    const handleImageChange = e => setImage(e.target.files[0])
    return (
        <Modal isOpen={visible} onClose={onClose} size="2xl">
            <Formik
                initialValues={{
                    username: user?.username || "",
                    fullName: user?.fullName || "",
                    dob: user?.dob || getTodayDate(),
                    profileImage: undefined
                }}
                onSubmit={async (values, { setSubmitting }) => {

                    const storageRef = ref(storage, `${user?.walletAddress}/profile.${image?.name?.split('.')[1]}`); //seprate
                    const snapShot = await uploadBytes(storageRef, image) // uploading
                    const profileImage = await getDownloadURL(snapShot.ref); // getting 
                    // console.log({ ...values, profileImage })
                    updateUser({ ...values, profileImage });
                    setSubmitting(false);
                    
                }}
            >
                {({ values, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <ModalContent className="!bg-bg-primary2">
                            <ModalHeader className="flex justify-center items-center text-center">Edit Profile</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody className="!flex !flex-col !gap-y-[14px]">
                                <FormControl isRequired id="profileImage">
                                    <FormLabel>Profile Image</FormLabel>
                                    <div onClick={() => imageRef.current && imageRef.current?.click()} className='cursor-pointer w-fit'>
                                        <Avatar src={image ? URL.createObjectURL(image) : user?.profileImage} size="xl" className='!bg-grey-solid !rounded-full' />
                                    </div>
                                    <input
                                        ref={imageRef}
                                        className='hidden'
                                        type='file'
                                        name="profileImage"
                                        onChange={handleImageChange}
                                        disabled={loading}
                                    />
                                </FormControl>
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
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const maxDate = `${year}-${month}-${day}`;
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        const [selectedYear, selectedMonth, selectedDay] = selectedDate.split('-').map(Number);
        if (selectedYear > year ||
            (selectedYear === year && selectedMonth > parseInt(month)) ||
            (selectedYear === year && selectedMonth === parseInt(month) && selectedDay > parseInt(day))) {
            onChange({ target: { name, value: maxDate } });
        } else {
            onChange({ target: { name, value: selectedDate } });
        }
    };

    return (
        <Input
            name={name}
            type="date"
            value={value}
            onChange={handleDateChange}
            max={maxDate}
            disabled={disabled}
        />
    );
};



export default ProfileModal;
