/* eslint-disable @next/next/no-img-element */
import React, { use, useCallback, useEffect, useState } from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';
import { Modal, ModalContent, ModalCloseButton, ModalBody, ModalFooter, } from "@chakra-ui/react";
import { FaUserLarge } from 'react-icons/fa6';
import { FiCopy, FiShare } from 'react-icons/fi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiCopy } from 'react-icons/bi';
import Swal from "sweetalert2"
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../utils/firebaseConfig';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks/account/useGetLoginInfo';
import { useAllUsers } from '../../hooks/auth/user';

export interface ItemProps {
    imageUrl: string,
    id: string,
    prompt: string,
    walletAddress: string,
    likes: any,
}
interface NftModalProps {
    visible: boolean;
    onClose: () => void;
    item: ItemProps,
    setImagesData?: any,
    getData?: any
}

interface User {
    username: string,
    dob: string,
    fullName: string,
    walletAddress: string,
}

const ViewImagePopup: React.FC<NftModalProps> = ({ visible, onClose, item, setImagesData, getData }) => {
    console.log("🚀 ~ item:", item)
    const [followingLoading, setfollowingLoading] = useState(false)
    const { isLoggedIn } = useGetLoginInfo();
    const { account } = useGetAccountInfo()
    const [loading, setLoading] = useState(true)
    const users = useAllUsers();
    console.log("🚀 ~ users:", users)
    // console.log("🚀 ~ userData:", userData)
    // const account = {
    //     address: "12234444"
    // }
    const [isFollowing, setIsFollowing] = useState(false);

    const copyPrompthandler = useCallback((prompt: string) => {
        navigator.clipboard.writeText(prompt).then(() => {
            Swal.fire({
                title: "Prompt Sucessfully Copied!",
                icon: "success"
            })
        }).catch((err) => {
            Swal.fire({
                title: "Some thing went wrong",
                icon: "error"
            })
        })
    }, [])

    const copySettinghandler = useCallback((setting: string) => {
        navigator.clipboard.writeText(setting).then(() => {
            Swal.fire({
                title: "Setting Sucessfully Copied!",
                icon: "success"
            })
        }).catch((err) => {
            Swal.fire({
                title: "Some thing went wrong",
                icon: "error"
            })
        })
    }, [])

    const followHandler = async () => {
        if (!isLoggedIn) {
            Swal.fire({
                title: "Please Connect the Wallet",
                icon: "info"
            });
            return;
        }
        try {
            const docRef = doc(collection(db, "followers"), account.address);
            const docSnapshot = await getDoc(docRef);
            if (!docSnapshot.exists()) {
                await setDoc(docRef, {
                    followers: [{ currentUser: account.address, following: [item?.walletAddress] }]
                });
            } else {
                await updateDoc(docRef, {
                    followers: arrayUnion({ currentUser: account.address, following: [item?.walletAddress] })
                });
            }
            Swal.fire({
                title: "Followed Successfully",
                icon: "success"
            });
            onClose();
        } catch (error) {
            console.log("Error in followHandler:", error);
            Swal.fire({
                title: "Something went wrong",
                icon: "error"
            });
        }
    };

    const unfollowHandler = async () => {
        if (!isLoggedIn) {
            Swal.fire({
                title: "Please Connect the Wallet",
                icon: "info"
            });
            return;
        }
        try {
            const docRef = doc(collection(db, "followers"), account.address);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                await updateDoc(docRef, {
                    followers: docSnapshot.data().followers.map(follower => {
                        if (follower.currentUser === account.address) {
                            return {
                                ...follower,
                                following: follower.following.filter(f => f !== item?.walletAddress)
                            };
                        }
                        return follower;
                    })
                });
                Swal.fire({
                    title: "Unfollowed Successfully",
                    icon: "success"
                });
                getData();
                onClose();
            } else {
                Swal.fire({
                    title: "You are not following this user",
                    icon: "error"
                });
            }
        } catch (error) {
            console.log("Error in unfollowHandler:", error);
            Swal.fire({
                title: "Something went wrong",
                icon: "error"
            });
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            const fetchFollowers = async () => {
                setfollowingLoading(true)
                try {
                    const docRef = doc(collection(db, "followers"), account.address);
                    const docSnapshot = await getDoc(docRef);
                    if (docSnapshot.exists()) {
                        const followers = docSnapshot.data().followers;
                        console.log("🚀 ~ fetchFollowers ~ followers:", followers)
                        setIsFollowing(followers.some(follower => follower.following.includes(item?.walletAddress)));
                        setfollowingLoading(false)
                    } else {
                        setIsFollowing(false);
                        setfollowingLoading(false)
                    }
                } catch (error) {
                    setfollowingLoading(false)
                    console.log("Error fetching followers:", error);
                }
            };
            fetchFollowers();
        }
    }, [account.address, item?.walletAddress, isLoggedIn]);

    const findUser = users.find((i) => i.walletAddress == item?.walletAddress)
    useEffect(() => {
        if (users.length > 0) {
            setLoading(false);
        }
    }, [users]);
    console.log("🚀 ~ findUser:", findUser)
    return (
        <Modal isOpen={visible} onClose={onClose} size={"5xl"}  >
            <ModalContent className='!bg-bg-primary2 !p-[20px]'>
                <ModalCloseButton />
                <ModalBody className='!flex !flex-col !gap-y-[14px] '>
                    <div className='gap-x-[40px] flex flex-col md:!flex-row'>
                        <div>
                            <img
                                src={item?.imageUrl}
                                alt={item?.prompt}
                                className='w-[200px] min-w-[250px] h-[250px] min-h-[100px] md:w-[370px] max-w-[400px] primary-small:min-w-[370px]  primary-small:h-[370px] md:h-[370px] max-h-[400px] primary-small:min-h-[370px] md:min-h-[370px] rounded-md'
                            />
                        </div>
                        <div className='flex flex-col mt-[10px]'>
                            <div className="flex flex-row items-start gap-x-[20px]">
                                <div className='flex items-center flex-row gap-x-[20px]'>
                                    <FaUserLarge className="text-[50px] rounded-full bg-gray-700 px-[10px] py-[10px]" />
                                    <h2 className='flex gap-4 text-white text-[18px] font-medium'>
                                        {
                                            loading ? "loading..." : findUser?.username ?? "User"
                                        }
                                    </h2>
                                </div>
                                {
                                    account.address === item?.walletAddress ? null :
                                        <button className='px-[20px] py-[8px] text-[#1c14ff] border border-[#1c14ff] rounded-full text-[14px] font-medium hover:!bg-blue-primary hover:!text-white'
                                            onClick={isFollowing ? unfollowHandler : followHandler}>
                                            {isFollowing ? 'Unfollow' : 'Follow'}
                                        </button>
                                }
                            </div>
                            <div className='mt-[20px]'>
                                <h3 className='flex items-start  h-[100px] overflow-auto text-[18px] font-medium text-white'>{item?.prompt}</h3>
                            </div>
                            <div className='mt-[30px]'>

                            </div>
                            <div className='flex flex-col primary-small:flex-row mt-[30px] gap-x-[20px]'>
                                <button className='flex flex-row items-center bg-blue-primary px-[20px] tex-[20px] font-semibold gap-x-[10px] py-[10px] rounded-xl' onClick={() => copyPrompthandler(item?.prompt)}>
                                    <FiCopy className='text-[20px] font-medium' /><span className='text-[14px] font-medium text-white whitespace-nowrap'>Copy Prompt</span>
                                </button>
                                {/* {item?.likes?.find((item) => item?.likeAddress == account.address) ? (
                                    <>
                                        <button className='text-[16px]   leading-3 flex flex-row items-center gap-x-[7px] rounded-xl font-medium bg-blue-primary px-[15px] py-[10px]' onClick={() => unlikehandler(item)} >
                                            <AiFillHeart color="#FF35A5" style={{ width: '20px', height: '20px' }} />
                                            UnLike
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className='text-[16px]   leading-3 flex flex-row items-center gap-x-[7px] rounded-xl font-medium bg-blue-primary px-[15px] py-[10px]' onClick={() => likeshandler(item.id)}>
                                            <AiOutlineHeart color="#FF35A5" style={{ width: '20px', height: '20px' }} />
                                            Like
                                        </button>
                                    </>
                                )} */}
                                <button className='text-[16px]   leading-3 flex flex-row items-center gap-x-[7px] rounded-xl font-medium bg-blue-primary px-[15px] py-[10px] whitespace-nowrap'>
                                    <FiShare color="#80FF77" />
                                    Share
                                </button>
                                <button className='text-[16px]   leading-3 flex flex-row items-center gap-x-[7px] rounded-xl font-medium bg-blue-primary px-[15px] py-[10px]  whitespace-nowrap' onClick={() => copySettinghandler(item.prompt)}>
                                    <BiCopy color="#27DCEE" />Copy Setting</button>
                            </div>
                            <div className='mt-[30px]'>
                                <hr className='w-full h-[1px] bg-white text-white mb-[20px]' />
                                <div className='flex flex-row gap-x-[40px]'>
                                    <h2 className='flex flex-col py-[10px]'>
                                        <span className='text-[18px] font-medium text-gray-600 leading-3'>METHOD</span>
                                        <span className='text-[20px] font-semibold text-white leading-4 mt-[15px]'>Image</span>
                                    </h2>
                                    <h2 className='flex flex-col py-[10px]'>
                                        <span className='text-[18px] font-medium text-gray-600 leading-3'>Style</span>
                                        <span className='text-[20px] font-semibold text-white leading-4 mt-[15px]'>3D</span>
                                    </h2>
                                    <h2 className='flex flex-col py-[10px]'>
                                        <span className='text-[18px] font-medium text-gray-600 leading-3'>Run Time</span>
                                        <span className='text-[20px] font-semibold text-white leading-4 mt-[15px]'>50</span>
                                    </h2>
                                    <h2 className='flex flex-col py-[10px]'>
                                        <span className='text-[18px] font-medium text-gray-600 leading-3'>Likes </span>
                                        <span className='text-[20px] font-semibold text-white leading-4 mt-[15px]'>{item?.likes?.length}</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
        </Modal >
    );
}

export default ViewImagePopup;
