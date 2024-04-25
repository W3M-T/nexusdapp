/* eslint-disable @next/next/no-img-element */
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';
import CommunityGalleryTabs from '../../shared/components/ui/Tabs/communityTabs'
import React, { useCallback, useEffect, useState } from 'react'
import { arrayRemove, arrayUnion, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../shared/utils/firebaseConfig';
import { Box, Tooltip } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { GoArrowSwitch } from "react-icons/go";
import Link from 'next/link';
import ViewImagePopup, { ItemProps } from '../../shared/components/ui/CreationPop';
import { ChildLoader } from '../../shared/components/ui/Loader';
import Swal from 'sweetalert2';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks/account/useGetLoginInfo';

interface imageProps {
    imageUrl: string,
    walletAddress: string;
    id: string,
    likes: any[]
}

function CommunityGallery() {
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [imagesData, setImagesData] = useState<imageProps[]>([])
    const [currentItem, setCurrentItem] = useState<imageProps | null>(null);
    const { account } = useGetAccountInfo();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const { isLoggedIn } = useGetLoginInfo();

    const getData = useCallback(async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'imagecollection'));
            const imagesgallery = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            imagesgallery.sort((a: imageProps, b: imageProps) => b.likes.length - a.likes.length);
            setImagesData(imagesgallery as []);
            setLoading(false);
        } catch (error) {
            console.log("🚀 ~ getData ~ error:", error)
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleCloseModal = () => {
        setVisible(false);
    }
    const handleOpenModal = (item: imageProps) => {
        setCurrentItem(item);
        setVisible(true);
    };

    const unlikehandler = async (item: imageProps) => {
        setVisible(false)
        if (!isLoggedIn) {
            Swal.fire({
                title: "Please Connect the Wallet",
                icon: "info"
            });
            return;
        }
        try {
            const docRef = doc(collection(db, "imagecollection"), item.id);
            await updateDoc(docRef, {
                likes: arrayRemove({
                    likeAddress: account.address
                })
            });
            // Update the state directly after unliking
            setImagesData(prev => prev.map(img => {
                if (img.id === item.id) {
                    return {
                        ...img,
                        likes: img.likes.filter(like => like.likeAddress !== account.address)
                    };
                }
                return img;
            }));
            Swal.fire({
                title: "Unliked Successfully",
                icon: "success"
            });
        } catch (error) {
            console.log("Error in unlikehandler:", error);
            Swal.fire({
                title: "Something went wrong",
                icon: "error"
            });
        }
    };

    const likeshandler = async (docId: string) => {
        setVisible(false)
        if (!isLoggedIn) {
            Swal.fire({
                title: "Please Connect the Wallet",
                icon: "info"
            });
            return;
        }
        try {
            const docRef = doc(collection(db, "imagecollection"), docId);
            await updateDoc(docRef, {
                likes: arrayUnion({
                    likeAddress: account.address
                })
            });
            // Update the state directly after liking
            setImagesData(prev => prev.map(item => {
                if (item.id === docId) {
                    return {
                        ...item,
                        likes: [...item.likes, { likeAddress: account.address }]
                    };
                }
                return item;
            }));
            Swal.fire({
                title: "Liked Successfully",
                icon: "success"
            });
        } catch (error) {
            console.log("Error in likeshandler:", error);
            Swal.fire({
                title: "Something went wrong",
                icon: "error"
            });
        }
    };


    return (
        <div>
            <div>
                <h1 className='flex justify-center items-center text-center text-3xl text-white font-bold mb-[2px]'>Community Gallery</h1>
                <span className='flex text-[20px] font-medium text-white justify-center items-center text-center'>Discover the best AI genrated artworks made using Pensy AI<br />
                </span>
            </div>
            <div className='flex mt-[20px]'>
                <CommunityGalleryTabs community={true} following={false} />
            </div>
            {
                loading ? <ChildLoader /> :
                    <div className='mb-[50px]'>
                        {/* <div className='mb-[20px] flex flex-row flex-wrap gap-10 justify-center md:justify-start mt-[40px] border'> */}
                        <div className='mb-[20px] mt-[40px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10'>

                            {imagesData.map((item, index) => (
                                <div
                                    key={item.walletAddress}
                                    className='relative overflow-hidden rounded-md cursor-pointer'
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <div
                                        className='absolute inset-0'
                                        style={{
                                            background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.73) 80%), url('${item.imageUrl}') no-repeat center`,
                                            backgroundSize: 'cover',
                                            opacity: hoveredIndex === index ? 1 : 0,
                                            transition: 'opacity 0.3s ease-in-out',
                                        }}
                                        onClick={() => handleOpenModal(item)}
                                    />
                                    <img
                                        alt=''
                                        src={item.imageUrl}
                                        // className='w-[200px] min-w-[250px] h-[250px] min-h-[100px] md:w-[370px] max-w-[400px] primary-small:min-w-[370px]  primary-small:h-[370px] md:h-[370px] max-h-[400px] primary-small:min-h-[370px] md:min-h-[370px] rounded-md'
                                        className="w-full"
                                    />
                                    {hoveredIndex === index && (
                                        <div className="absolute bottom-0 left-0 flex items-center space-x-2 p-2">
                                            <span style={{ display: 'flex', width: '100%' }}>
                                                <CgProfile size={32} color="white" />
                                            </span>
                                            {/* <div
                                        className='bg-white rounded-full p-2 cursor-pointer hover:bg-gray-200'
                                    >
                                        <GoArrowSwitch style={{ width: '20px', height: '20px' }} color="black" />

                                    </div> */}
                                            {item?.likes?.find((item) => item?.likeAddress == account.address) ? (
                                                <div
                                                    className='bg-white rounded-full p-2 cursor-pointer hover:bg-gray-200'
                                                    onClick={() => unlikehandler(item)}
                                                >
                                                    <AiFillHeart color="#FF35A5" style={{ width: '20px', height: '20px' }} />
                                                </div>
                                            ) : (
                                                <div
                                                    className='bg-white rounded-full p-2 cursor-pointer hover:bg-gray-200'
                                                    onClick={() => likeshandler(item.id)}
                                                >
                                                    <AiOutlineHeart color="#FF35A5" style={{ width: '20px', height: '20px' }} />
                                                </div>
                                            )}
                                            <ViewImagePopup item={currentItem as ItemProps} onClose={handleCloseModal} visible={visible} setImagesData={setImagesData} getData={getData} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
            }
        </div >

    )
}

export default CommunityGallery