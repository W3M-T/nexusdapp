/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useCallback, useEffect, useState } from 'react'
import data from "./data.json"
import CommunityGalleryTabs from '../../shared/components/ui/Tabs/communityTabs'
import NftCard from '../../shared/components/ui/NftCard'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../shared/utils/firebaseConfig'
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo'
import Link from 'next/link'
import { CgProfile } from 'react-icons/cg'
import { GoArrowSwitch } from 'react-icons/go'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import ViewImagePopup, { ItemProps } from '../../shared/components/ui/CreationPop'

interface imageProps {
    imageUrl: string,
    walletAddress: string;
}

function Following() {
    const [loading, setLoading] = useState(false)
    const [followingData, setFollowingData] = useState([])
    const [visible, setVisible] = useState(false)
    const { account } = useGetAccountInfo()
    const [hoveredIndex, setHoveredIndex] = useState(null)
    const [currentItem, setCurrentItem] = useState<imageProps | null>(null);

    const getData = useCallback(async () => {
        if (!account) return; // Ensure account is available
        setLoading(true);
        try {
            const followingRef = doc(collection(db, 'followers'), account.address);
            const followingSnapshot = await getDoc(followingRef);
            if (followingSnapshot.exists()) {
                const followingUsers = followingSnapshot.data().followers || []; // Ensure followingUsers array exists
                const nftPromises = followingUsers.map(async (user: any) => {
                    const address = user.following && user.following.length > 0 ? user.following[0] : null; // Get the first following address
                    if (!address) return []; // Skip if address is not available
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
            <div className='mb-[50px]'>
                <div className='mb-[20px] flex flex-row flex-wrap gap-10 mt-[40px]'>
                    {followingData?.map((item, index) => (
                        <div
                            key={item.walletAddress}
                            className='relative overflow-hidden rounded-md cursor-pointer'
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => handleOpenModal(item)}
                        >
                            <div
                                className='absolute inset-0'
                                style={{
                                    background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.73) 80%), url('${item.imageUrl}') no-repeat center`,
                                    backgroundSize: 'cover',
                                    opacity: hoveredIndex === index ? 1 : 0,
                                    transition: 'opacity 0.3s ease-in-out',
                                }}
                            />
                            <img
                                alt=''
                                src={item.imageUrl}
                                className='w-[200px] md:w-[370px] max-w-[400px] min-w-[370px] h-[370px] max-h-[400px] min-h-[370px] rounded-md'
                            />
                            {hoveredIndex === index && (
                                <div className="absolute bottom-0 left-0 flex items-center space-x-2 p-2">
                                    <span style={{ display: 'flex', width: '100%' }}>

                                        <CgProfile size={32} color="white" />
                                    </span>
                                    <div
                                        className='bg-white rounded-full p-2 cursor-pointer hover:bg-gray-200'
                                    >
                                        <GoArrowSwitch style={{ width: '20px', height: '20px' }} color="black" />

                                    </div>
                                    <div
                                        className='bg-white rounded-full p-2 cursor-pointer hover:bg-gray-200'
                                    >
                                        {true ? (
                                            <AiOutlineHeart color="#FF35A5" style={{ width: '20px', height: '20px' }} />
                                        ) : (
                                            <AiFillHeart color="#FF35A5" style={{ width: '20px', height: '20px' }} />
                                        )}
                                    </div>
                                    <ViewImagePopup item={currentItem as ItemProps} onClose={handleCloseModal} visible={visible} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Following;