/* eslint-disable @next/next/no-img-element */
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { BsCaretDown } from 'react-icons/bs';
import NftModal from '../../shared/components/ui/Modal';

function MyCreation() {
    const [visible, setVisible] = useState(false)

    const images = [
        {
            image: "https://media.licdn.com/dms/image/D5612AQHUbEe_xATFvQ/article-cover_image-shrink_720_1280/0/1681833573475?e=2147483647&v=beta&t=DLZSneR1F8VEoinyPps6O99GkoQsrhu8dwOH1YMhZYo"
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_R-hwfhNJeSF6nC-TCWs8gZTZOKBmP4Vv9jknaWGuhG3FlRIH_-WPxI-Lo_sCKGVpvuA&usqp=CAU"
        },
        {
            image: "https://www.nftculture.com/wp-content/uploads/2023/11/SAP-NFTs.webp"
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-1dlZnmzAlrUNKKJ5bjZdK_OlCiV5vsLb235LftCxbelU58k9YS5tEELrWkYbDlK4bPY&usqp=CAU"
        },
        {
            image: "https://www.blockchainmagazine.net/wp-content/uploads/Will-AI-Kill-The-Value-Of-NFT-artists-Or-Will-AI-Be-The-Saviour-Of-NFT-World.jpg"
        },
        {
            image: "https://cdn.mos.cms.futurecdn.net/GkYhNc4pdmPcnGuiLfWAyU.jpg"
        },
        {
            image: "https://dxagroup.io/wp-content/uploads/Blog/TheFutureofNFTArtGalleriesAVirtualRevolution/dxa-group-The-Future-of-NFT-Art-Galleries-A-Virtual-Revolution-10.webp"
        },
        {
            image: "https://static.media.thinknum.com/media/uploads/blog/.thumbnails/alternativedata_crypto_art_featured.jpg/alternativedata_crypto_art_featured-770x400.jpg"
        }
    ];
    const handleOpenModal = () => {
        setVisible(true);
    };

    const handleCloseModal = () => {
        setVisible(false);
    };


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
                    <button type='button' className='whitespace-nowrap flex items-center gap-x-2 mt-4 text-gray-950 bg-white px-[20px] py-[10px] rounded-[13px] text-[17px] font-semibold shadow-md'>Recent <BsCaretDown className='text-gray-950' /></button>
                </div>
                <div className='mb-[10px]'>
                    <button type='button' className='whitespace-nowrap text-gray-950 bg-white  w-[121px] py-[10px] rounded-[13px] text-[17px] font-semibold shadow-md' onClick={handleOpenModal}>Mint Nft</button>
                </div>
                <div className='mb-[10px]'>
                    <button type='button' className='text-gray-950 bg-white  w-[121px] py-[10px] rounded-[13px] text-[17px] font-semibold shadow-md'>Select</button>
                </div>
            </div>
            <div className='flex flex-row flex-wrap w-full gap-6 mt-[40px] mb-[100px]'>
                {images.map((item) => (
                    <div key={item.image}>
                        <img alt='' src={item.image} className='md:w-[388px] xl:w-[388px] w-[250px] max-w-[450px]   min-w-[250px] h-[320px]  max-h-[400px]  min-h-[320px] rounded-md' />
                    </div>
                ))}
            </div>
            <NftModal onClose={handleCloseModal} visible={visible} />
        </div>
    );
}

export default MyCreation;
