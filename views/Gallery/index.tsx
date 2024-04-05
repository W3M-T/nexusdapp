/* eslint-disable @next/next/no-img-element */
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';
import CommunityGalleryTabs from '../../shared/components/ui/Tabs/communityTabs'
import React, { useCallback, useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../shared/utils/firebaseConfig';
import { Box, Tooltip } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { GoArrowSwitch } from "react-icons/go";
import Link from 'next/link';
import ViewImagePopup from '../../shared/components/ui/CreationPop';

interface imageProps {
    imageUrl: string,
    walletAddress: string;
}

function CommunityGallery() {
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [imagesData, setImagesData] = useState<imageProps[]>([])
    const [currentItem, setCurrentItem] = useState<imageProps | null>(null);
    const { account } = useGetAccountInfo();
    console.log("🚀 ~ CommunityGallery ~ account:", account)
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const getData = useCallback(async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'imagecollection'));
            const imagesgallery = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
            <div className='mb-[50px]'>
                <div className='mb-[20px] flex flex-row flex-wrap gap-6 mt-[40px]'>
                    {imagesData.map((item, index) => (
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
                                className='w-[200px] md:w-[300px] max-w-[400px] min-w-[300px] h-[300px] max-h-[400px] min-h-[300px] rounded-md'
                            />
                            {hoveredIndex === index && (
                                <div className="absolute bottom-0 left-0 flex items-center space-x-2 p-2">
                                    <Link href={`/profile}`} style={{ display: 'flex', width: '100%' }}>

                                        <CgProfile size={32} color="white" />
                                    </Link>
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
                                    {/* <ViewImagePopup item={currentItem} onClose={handleCloseModal} visible={visible} /> */}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default CommunityGallery