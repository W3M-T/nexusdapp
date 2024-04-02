/* eslint-disable @next/next/no-img-element */
import CommunityGalleryTabs from '../../shared/components/ui/Tabs/communityTabs'
import React from 'react'

function CommunityGallery() {
    const images = [
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJjDWWiA1reT6AVZjS0OM1vs2YUT7_YIxfhw&usqp=CAU"
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQue26QHVdyyCIaFoCqOaQC9GUoox9oKUm38g&usqp=CAU"
        },
        {
            image: "https://cdn.pixabay.com/photo/2022/04/20/12/17/abstract-art-7145100_640.jpg"
        },
        {
            image: "https://cdn.pixabay.com/photo/2022/04/20/12/16/abstract-art-7145098_1280.jpg"
        },
        {
            image: "https://cdn.pixabay.com/photo/2022/04/30/20/08/venus-7166301_640.jpg"
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
    ];

    return (
        <div>
            <div>
                <h1 className='flex justify-center items-center text-center text-3xl text-white font-bold mb-[2px]'>Community Gallery</h1>
                <span className='flex  text-[20px] font-medium text-white  justify-center items-center text-center'>Discover the best AI genrated artworks made using Pensy AI<br />
                </span>
            </div>
            <div className='flex mt-[20px]'>
                <CommunityGalleryTabs community={true} following={false} />
            </div>
            <div className='mb-[50px]'>
                <div className='mb-[20px] flex flex-row flex-wrap gap-6  mt-[40px] '>
                    {images.map((item) => (
                        <div key={item.image}>
                            <img alt='' src={item.image} className='w-[200px] md:w-[265px] max-w-[400px]   min-w-[250px] h-[230px]  max-h-[400px]  min-h-[250px] rounded-md' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CommunityGallery