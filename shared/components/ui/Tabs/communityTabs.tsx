import React, { useState } from 'react';
import Link from 'next/link';
import { Text } from '@chakra-ui/react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';

function CommunityGalleryTabs({ following, community }: { following?: boolean, community?: any }) {
    const { account } = useGetAccountInfo();

    const isDarkMode = true;
    const swapbtn = {
        color: isDarkMode ? '#FFFFFF80' : '#00000080',
        fontSize: '20px',
        background: isDarkMode ? '#3c91e6' : 'linear-gradient(180deg, #6737FF 0%, #CB37FF 100%)',
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '24px',
        fontWeight: "600",
        paddingRight: '24px',
        borderRadius: '6px',
        borderColor: isDarkMode ? '#3c91e6' : '#3C9781',
        boxShadow: '0px 0px 0px 1px rgba(209, 208, 210, 0.3)',
        cursor: 'pointer',
        textDecoration: 'none',
    };

    const swapbtn1 = {
        color: isDarkMode ? '#FFFFFF80' : '#00000080',
        fontSize: '20px',
        backgroundColor: isDarkMode ? 'bg-blue-primary' : '#F2F2F2',
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '24px',
        fontWeight: "600",
        paddingRight: '24px',
        cursor: 'pointer',
        textDecoration: 'none',
    };


    const [btnswap, setBtnswap] = useState('Chat');

    return (
        <div className='w-full'>
            <div
                style={{
                    display: 'flex',
                    padding: '4px',
                    borderRadius: "8px",
                    backgroundColor: `${isDarkMode ? 'rgb(28, 15, 58)' : '#F2F2F2'}`,
                    justifyContent: 'space-between',
                }}
                className='max-w-[250px] min-w-[250px]'
            >
                <Link
                    href="/gallery"
                    style={community ? swapbtn : swapbtn1}
                    onClick={() => setBtnswap('Image')}
                >
                    <Text className='text-[16px] text-[#4E4D55]' >Trending</Text>
                </Link>
                <Link style={following ? swapbtn : swapbtn1} href={account.address && "/followingnft"}>
                    <Text className={`text-[16px] text-[#4E4D55] ${account.address ? "cursor-pointer" : "cursor-not-allowed"}`}  >Following</Text>
                </Link>
            </div>
        </div >
    );
}

export default CommunityGalleryTabs;
