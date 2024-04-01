/* eslint-disable @next/next/no-img-element */
import React from 'react';
interface NftType {
    name: string;
    description: string;
    royalty: string;
    nftSize: string;
    property: string;
    price: string,
    image: string,
}

interface NftCardProps {
    loading: boolean;
    data: NftType[];
}

function NftCard({ loading, data }: NftCardProps) {
    return (
        <div className='w-full'>
            {/* {loading && <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" className='flex justify-center items-center'  } */}
            <div className="text-center mt-14 w-full">
                <div className="flex flex-row flex-wrap gap-10">
                    {data?.map((item: NftType, index: number) => (
                        <div key={index} className="flex justify-center">
                            <div
                                className="rounded-lg w-[280px] md:w-[370px] h-[450px] md:h-[460px] min-h-[200px] bg-bg-primary2 transition-transform transform-gpu hover:scale-105"
                            >
                                <div className='overflow-hidden'>
                                    <img src={item.image} alt='NFT Image' className='h-[200px] md:h-[280px] w-[280px] md:min-w-[370px] max-w-[400px] object-cover rounded-t-lg' />
                                </div>
                                <div className='p-4 min-w-[230px] h-[170px] max-w-[360px]'>
                                    <h3 className='text-lg text-app-orange font-semibold h-[40px] mb-2 truncate text-center items-center text-white'>{item.name}</h3>
                                    <p className='text-app-black text-base font-medium line-clamp-3 h-[50px] text-white'>{item.description}</p>
                                    {item.price && (
                                        <p className='text-app-black text-base font-medium mt-[10px] line-clamp-3 h-[20px] flex justify-between text-white'>
                                            <span className='text-lg font-medium'>Price</span>
                                            <span className='text-[#3c91e6] font-semibold'>$NEXUS {item.price}</span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* </Spinner> */}
        </div >
    );
}

export default NftCard;
