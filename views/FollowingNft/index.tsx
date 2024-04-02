/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import data from "./data.json"
import CommunityGalleryTabs from '../../shared/components/ui/Tabs/communityTabs'
import NftCard from '../../shared/components/ui/NftCard'

function FollowingNfts() {
    return (
        <div>
            <div>
                <h1 className='text-center text-3xl text-white font-bold mb-[2px]'>Discover Your Followed Creators' NFTs</h1>
                <span className='flex  text-[20px] font-medium text-white  justify-center items-center text-center'>Explore a curated selection of NFTs created by the artists and creators you admire.</span>
            </div>
            <div className='flex mt-[20px]'>
                <CommunityGalleryTabs community={false} following={true} />
            </div>
            <NftCard data={data as any} loading={false} />
        </div>
    )
}

export default FollowingNfts