/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Container } from '@mui/system';
import React, { useCallback, useEffect, useState } from 'react';
import { BsCaretDown } from 'react-icons/bs';
import NftModal from '../../shared/components/ui/Modal';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../shared/utils/firebaseConfig';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';

interface imageProps {
    imageUrl: string,
    walletAddress: string;
}

function MyCreation() {
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imagesData, setImagesData] = useState<imageProps[]>([])

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
    const filterData = imagesData.filter((item) => item.walletAddress === account.address)
    console.log("🚀 ~ MyCreation ~ filterData:", filterData)

    return (
        <div className='flex flex-col h-full'>
            <div className='hidden md:block '>
                <div className='flex flex-col justify-between items-center md:flex-row  sm:flex-row xl:flex-row  '>
                    <div>
                        <h1 className='flex items-center gap-4 text-white text-[25px] font-bold'>My creations <span className='text-title-primary font-bold'>Public Profile</span></h1>
                        <button type='button' className='whitespace-nowrap flex items-center gap-x-2 mt-4 text-gray-950 bg-blue-primary px-[20px] py-[10px] rounded-[13px] text-[17px] font-semibold shadow-md'>Recent <BsCaretDown className='text-gray-950' /></button>
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
                    <button type='button' className='whitespace-nowrap flex items-center gap-x-2 mt-4 text-gray-950 bg-blue-primary px-[20px] py-[10px] rounded-[13px] text-[17px] font-semibold shadow-md'>Recent <BsCaretDown className='text-gray-950' /></button>
                </div>
                <div className='mb-[10px]'>
                    <button type='button' className='whitespace-nowrap text-gray-950 bg-blue-primary  w-[121px] py-[10px] rounded-[13px] text-[17px] font-semibold shadow-md' onClick={handleOpenModal}>Mint Nft</button>
                </div>
                <div className='mb-[10px]'>
                    <button type='button' className='text-gray-950 bg-blue-primary  w-[121px] py-[10px] rounded-[13px] text-[17px] font-semibold shadow-md'>Select</button>
                </div>
            </div>
            <div className='flex flex-row flex-wrap w-full gap-6 mt-[40px] mb-[100px]'>
                {account.address ? (
                    filterData.length ? (
                        filterData.map((item) => (
                            <div key={item.walletAddress}>
                                <img
                                    alt=''
                                    src={item.imageUrl}
                                    className='md:w-[388px] xl:w-[388px] w-[250px] max-w-[450px] min-w-[250px] h-[320px] max-h-[400px] min-h-[320px] rounded-md'
                                />
                            </div>
                        ))
                    ) : (
                        <h1 className='font-medium text-white text-lg'>No Images Yet!</h1>
                    )
                ) : (
                    <div>
                        <h1>Please Connect the Wallet</h1>
                    </div>
                )}
            </div>
            <NftModal onClose={handleCloseModal} visible={visible} />
        </div >
    );
}

export default MyCreation;
