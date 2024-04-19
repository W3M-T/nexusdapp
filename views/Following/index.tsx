/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useCallback, useEffect, useState } from 'react'
import data from "./data.json"
import CommunityGalleryTabs from '../../shared/components/ui/Tabs/communityTabs'
import NftCard from '../../shared/components/ui/NftCard'
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../../shared/utils/firebaseConfig'
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo'
import Link from 'next/link'
import { CgProfile } from 'react-icons/cg'
import { GoArrowSwitch } from 'react-icons/go'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import ViewImagePopup, { ItemProps } from '../../shared/components/ui/CreationPop'
import { ChildLoader } from '../../shared/components/ui/Loader'
import Swal from 'sweetalert2'
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks/account/useGetLoginInfo'

interface imageProps {
    imageUrl: string,
    walletAddress: string;
    id: string,
    likes: any
}

function Following() {
    const [loading, setLoading] = useState(false)
    const [followingData, setFollowingData] = useState<any>([])
    const [visible, setVisible] = useState(false)
    const { account } = useGetAccountInfo()
    const [hoveredIndex, setHoveredIndex] = useState(null)
    const [currentItem, setCurrentItem] = useState<imageProps | null>(null);
    const { isLoggedIn } = useGetLoginInfo();

    const getData = useCallback(async () => {
        if (!account) return;
        setLoading(true);
        try {
            const followingRef = doc(collection(db, 'followers'), account.address);
            const followingSnapshot = await getDoc(followingRef);
            if (followingSnapshot.exists()) {
                const followingUsers = followingSnapshot.data().followers || [];
                const nftPromises = followingUsers.map(async (user: any) => {
                    const address = user.following && user.following.length > 0 ? user.following[0] : null;
                    if (!address) return [];
                    const userNFTsQuerySnapshot = await getDocs(query(collection(db, 'imagecollection'), where('walletAddress', '==', address)));
                    return userNFTsQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                });
                const nftResults = await Promise.all(nftPromises);
                const followingNFTs = nftResults.flat();
                setFollowingData(followingNFTs);
                setLoading(false);
            } else {
                console.log("Following list not found for the current user");
                setLoading(false);
            }
        } catch (error) {
            console.log("Error fetching following users' NFTs:", error);
            setLoading(false);
        }
    }, [account]);


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
            setFollowingData(prev => prev.map(img => {
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
            setFollowingData(prev => prev.map(item => {
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

    return (
        <div>
            <div>
                <h1 className='text-center text-3xl text-white font-bold mb-[2px]'>Discover Your Followed Creators' NFTs</h1>
                <span className='flex  text-[20px] font-medium text-white  justify-center items-center text-center'>Explore a curated selection of NFTs created by the artists and creators you admire.</span>
            </div>
            <div className='flex mt-[20px]'>
                <CommunityGalleryTabs community={false} following={true} />
            </div>
            {
                account.address ? <>
                    {
                        loading ? <ChildLoader /> :
                            <div className='mb-[50px]'>
                                <div className='mb-[20px] flex flex-row  justify-center md:justify-start flex-wrap gap-10 mt-[40px]'>
                                    {followingData.length > 0 ? followingData?.map((item, index) => (
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
                                                className='w-[200px] min-w-[250px] h-[250px] min-h-[100px] md:w-[370px] max-w-[400px] primary-small:min-w-[370px]  primary-small:h-[370px] md:h-[370px] max-h-[400px] primary-small:min-h-[370px] md:min-h-[370px] rounded-md'
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
                                                    <ViewImagePopup item={currentItem as ItemProps} onClose={handleCloseModal} visible={visible} setImagesData={setFollowingData} getData={getData} />
                                                </div>
                                            )}
                                        </div>
                                    )) :
                                        <div className='flex justify-center items-center w-full text-center h-[10vh]'>
                                            <h1 className='font-medium text-white text-lg text-center'>No Images Yet!</h1>
                                        </div>
                                    }
                                </div>
                            </div>
                    }
                </> :
                    <div>
                        <h1 className='flex  justify-center h-[30vh] flex-col items-center gap-x-[15px] text-white text-[25px] font-bold'>Please Connect the Wallet</h1>
                    </div>
            }
        </div>
    )
}

export default Following;