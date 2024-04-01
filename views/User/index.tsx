/* eslint-disable @next/next/no-img-element */
import { FaUserLarge } from "react-icons/fa6"

export default function User() {
    return (
        <div className="h-full text-white">
            <div className="flex flex-col justify-start ">
                <div className="flex flex-row items-center gap-x-10">
                    <div className="bg-grey-solid px-[30px] py-[30px] rounded-full">
                        <FaUserLarge className="text-[70px]" />
                    </div>
                    <div>
                        <h1
                            className='flex items-center gap-4 text-white text-[25px] font-bold'>User
                            <span className='text-title-primary font-semibold'>
                                #USE4002</span>
                        </h1>
                        <div className="flex flex-row gap-x-[10px] mt-[30px]">
                            <span className="text-white font-semibold text-lg">0 Following</span>
                            <span className="text-white font-semibold text-lg">0 Followers</span>
                            <span className="text-white font-semibold text-lg">0 Likes</span>
                        </div>
                        <button className="bg-white text-gray-950 px-[25px] py-[12px] rounded-md font-semibold mt-[20px]">Edit Profile</button>
                    </div>
                </div>
            </div>
            <hr className="bg-[#4E4D55] mt-[40px]" />
            <div className="mt-6">
                <div className="text-xl">No Images Yet!</div>
            </div>
        </div>
    )
}

