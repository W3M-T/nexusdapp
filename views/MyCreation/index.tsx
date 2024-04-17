/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Container } from '@mui/system';
import React, { useCallback, useEffect, useState } from 'react';
import { BsCaretDown } from 'react-icons/bs';
import NftModal from '../../shared/components/ui/Modal';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../shared/utils/firebaseConfig';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';
import { InputGroup, InputLeftElement, Select } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import { GoArrowSwitch } from 'react-icons/go';
import ViewImagePopup, { ItemProps } from '../../shared/components/ui/CreationPop';

interface imageProps {
    imageUrl: string,
    walletAddress: string;
}

function MyCreation() {
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imagesData, setImagesData] = useState<imageProps[]>([])
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [currentItem, setCurrentItem] = useState<imageProps | null>(null);
    const [imageVisible, setImageVisible] = useState(false)

    const { account } = useGetAccountInfo();

    const getData = async () => {
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
    }

    const handleOpenModal = () => {
        setVisible(true);
    };

    useEffect(() => {
        getData();
    }, [])

    const handleCloseModal = () => {
        setVisible(false);
    };

    const handleCloseImageModal = () => {
        setImageVisible(false);
    }
    const handleOpenImageModal = (item: imageProps) => {
        setCurrentItem(item);
        setImageVisible(true);
    };

    const filterData = imagesData.filter((item) => item.walletAddress === account.address)
    console.log("🚀 ~ MyCreation ~ filterData:", filterData)

    const options = ["Recent", "Upscaled", "Published", "Unpublished"]
    const handleSelectChange = useCallback((e: any) => {
        console.log("🚀 ~ handleSelectChange ~ e:", e)
    }, [])


    return (
        <div className='flex flex-col h-full'>
            <div className='hidden md:block '>
                <h1 className='flex items-center gap-4 mb-[10px] text-white text-[25px] font-bold'>My creations <span className='text-title-primary font-bold'>Public Profile</span></h1>
                <div className='flex flex-col justify-between items-center md:flex-row  sm:flex-row xl:flex-row  '>
                    <div>
                        <InputGroup width="180px">
                            <Select
                                icon={<BsCaretDown />}
                                onChange={(e) => handleSelectChange(e.target.value)}
                                className='!whitespace-nowrap !flex !items-center !text-gray-950 !bg-blue-primary !px-[20px] !py-[10px] !text-[17px] !font-semibold !shadow-md !outline-none'
                            >
                                {options.map((option, index) => (
                                    <option key={index} value={option} className='rounded-md py-[10px] !bg-blue-primary text-[17px] !font-semibold' >{option}</option>
                                ))}
                            </Select>
                        </InputGroup>
                    </div>
                    <div>
                        <button type='button' className='whitespace-nowrap text-gray-950 bg-blue-primary px-[20px] py-[10px] rounded-[13px] text-[17px] font-semibold shadow-md' onClick={handleOpenModal}>Mint Nft</button>
                    </div>
                    <div>
                        <button type='button' className='text-gray-950 bg-blue-primary px-[20px] py-[10px] rounded-[13px] text-[17px] font-semibold shadow-md'>Select</button>
                    </div>
                </div>
            </div>
            {/* // Mobil  Design*/}
            <div className='flex-col block md:hidden'>
                <div className='mb-[10px]'>
                    <h1 className='flex items-center gap-4 text-white text-[25px] font-bold'>My creations <span className='text-title-primary font-bold'>Public Profile</span></h1>
                    <InputGroup width="200px">
                        <Select
                            icon={<BsCaretDown />}
                            onChange={(e) => handleSelectChange(e.target.value)}
                            className='!whitespace-nowrap !flex !items-center !text-gray-950 !bg-blue-primary !px-[20px] !py-[10px] !text-[17px] !font-semibold !shadow-md !outline-none'
                        >
                            {options.map((option, index) => (
                                <option key={index} value={option} className='rounded-md  !bg-blue-primary'>{option}</option>
                            ))}
                        </Select>
                    </InputGroup>
                </div>
                <div className='mb-[10px]'>
                    <button type='button' className='whitespace-nowrap text-gray-950 bg-blue-primary  w-[121px] py-[10px] rounded-[13px] text-[17px] font-semibold shadow-md' onClick={handleOpenModal}>Mint Nft</button>
                </div>
                <div className='mb-[10px]'>
                    <button type='button' className='text-gray-950 bg-blue-primary  w-[121px] py-[10px] rounded-[13px] text-[17px] font-semibold shadow-md'>Select</button>
                </div>
            </div>
            <div className='flex flex-row flex-wrap w-full gap-10 mt-[40px] mb-[100px]'>
                {account.address ? (
                    filterData.length ? (
                        filterData.map((item, index) => (
                            <div
                                key={item.walletAddress}
                                className='relative overflow-hidden rounded-md cursor-pointer'
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => handleOpenImageModal(item)}
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
                                        <ViewImagePopup item={currentItem as ItemProps} onClose={handleCloseImageModal} visible={imageVisible} />
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <h1 className='font-medium text-white text-lg'>No Images Yet!</h1>
                    )
                ) : (
                    <div className='flex justify-center items-center w-full'>
                        <h1 className='flex justify-center items-center text-2xl font-semibold text-center'>Please Connect the Wallet</h1>
                    </div>
                )}
            </div>
            <NftModal onClose={handleCloseModal} visible={visible} />
        </div >
    );
}

export default MyCreation;