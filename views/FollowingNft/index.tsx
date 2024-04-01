/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import data from "./data.json"
import CommunityGalleryTabs from '../../shared/components/ui/Tabs/communityTabs'
import NftCard from '../../shared/components/ui/NftCard'

function FollowingNfts() {
    return (
        <div>
            <div>
                <h1 className='text-center text-3xl text-white font-bold mb-2'>Discover Your Followed Creators' NFTs</h1>
                <p className='text-center text-lg text-white mb-6'>Explore a curated selection of NFTs created by the artists and creators you admire.</p>
            </div>
            <div className='flex mt-[20px]'>
                <CommunityGalleryTabs community={false} following={true} />
            </div>
            <NftCard data={data as any} loading={false} />
        </div>
    )
}

export default FollowingNfts