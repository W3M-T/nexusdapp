/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { CgProfile } from "react-icons/cg"
import { FaUserLarge } from "react-icons/fa6"
import { GoArrowSwitch } from "react-icons/go"
import ViewImagePopup, { ItemProps } from "../../shared/components/ui/CreationPop"
import { useGetAccountInfo } from "@multiversx/sdk-dapp/hooks/account/useGetAccountInfo"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../../shared/utils/firebaseConfig"
interface imageProps {
    imageUrl: string,
    walletAddress: string;
}

export default function User() {
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imagesData, setImagesData] = useState<imageProps[]>([])
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [currentItem, setCurrentItem] = useState<imageProps | null>(null);
    const [imageVisible, setImageVisible] = useState(false)
    const { account } = useGetAccountInfo();
    const [followers, setFollowers] = useState([])
    const [following, setfollowing] = useState([])

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

    useEffect(() => {
        getData();
        const getFollowing = async () => {
            try {
                const followingRef = doc(collection(db, 'followers'), account?.address);
                const followingSnapshot = await getDoc(followingRef);
                if (followingSnapshot.exists()) {
                    const followingUsers = followingSnapshot.data().followers;
                    setfollowing(followingUsers);
                }
            } catch (err) {
                console.log("🚀 ~ getFollowers ~ err:", err)
            }
        }
        getFollowing();

        const getFollowers = async () => {
            try {
                const followersCollection = collection(db, 'followers');
                const followersSnapshot = await getDocs(followersCollection);
                const followersData = followersSnapshot.docs.map(doc => doc.data());
                console.log("🚀 ~ getFollowers ~ followersData:", followersData);

                // Flatten the array and extract all following arrays
                const followingArrays = followersData.flatMap(item => {
                    if (item.followers) {
                        return item.followers.flatMap(follower => follower.following);
                    }
                    return [];
                });

                // Filter the follower objects that contain your account's address
                const filteredFollowers = followersData.filter(item => {
                    if (item.followers) {
                        return item.followers.some(follower => follower.following.includes(account.address));
                    }
                    return false;
                });

                setFollowers(filteredFollowers)
                console.log("🚀 ~ getFollowers ~ filteredFollowers:", filteredFollowers);
            } catch (error) {
                console.log("Error fetching followers:", error);
            }
        };

        getFollowers();


    }, [account.address])

    const filterData = imagesData?.filter((item) => item.walletAddress === account.address)
    console.log("🚀 ~ MyCreation ~ filterData:", filterData)

    const handleCloseImageModal = () => {
        setImageVisible(false);
    }
    const handleOpenImageModal = (item: imageProps) => {
        setCurrentItem(item);
        setImageVisible(true);
    };

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
                            <span className="text-white font-semibold text-lg">{following.length} Following</span>
                            <span className="text-white font-semibold text-lg">{followers.length} Followers</span>
                            <span className="text-white font-semibold text-lg">0 Likes</span>
                        </div>
                        <button className="bg-white text-gray-950 px-[25px] py-[12px] rounded-md font-semibold mt-[20px]">Edit Profile</button>
                    </div>
                </div>
            </div>
            <hr className="bg-[#4E4D55] mt-[40px]" />
            <div className="mt-6">
                <div className='flex flex-row flex-wrap w-full gap-10 mt-[40px] mb-[100px]'>
                    {account.address ? (
                        filterData.length ? (
                            filterData?.map((item, index) => (
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
                        <div>
                            <h1>Please Connect the Wallet</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

