/* eslint-disable @next/next/no-img-element */
//@ts-nocheck
import { useRef, useState } from 'react';
import { AiFillPlusCircle, AiOutlineClockCircle, AiOutlineExclamationCircle } from 'react-icons/ai';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { BsChevronDown, BsChevronRight, BsHash } from 'react-icons/bs';
import { IoMdCloseCircle } from 'react-icons/io';
import { RxCross1 } from 'react-icons/rx';
import { RiBrush4Line } from 'react-icons/ri';
import { choosesty, templetes } from './data';
import useOutside from '../../shared/constants/useOuteside';
import { isMidTierUser, remainingCredits, shouldGenerateImage } from '../../shared/constants/calcShouldGenerateImage';
import { generateImage } from '../../shared/services/openai/openai';
import { Box, Button, Container, Input, Text, Tooltip } from '@chakra-ui/react';
import Tabs from '../../shared/components/ui/Tabs';
import PaintingProgress from '../../shared/components/ui/PaintingProgress';
import Swal from "sweetalert2";
import SliderThumbWithTooltip from '../../shared/components/ui/CustomRangePicker';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../shared/utils/firebaseConfig';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks/account/useGetLoginInfo';
import axios from 'axios';
import { Loader } from '../../shared/components/ui/Loader';

interface dataResponse {
    url?: string,
    revised_prompt?: string,
}

function ImageGenerator() {
    const [active, setActive] = useState<any>(0)
    const [open, setOpen] = useState({
        canvasSizeSelect: false,
        styleSelector: false,
        randomize: false,
    });

    const { account } = useGetAccountInfo();
    const { isLoggedIn } = useGetLoginInfo();
    const initFormValues = {
        prompt: '',
        negative_prompt: '',
        guidance_scale: 7.5,
        steps: '20',
        width: '512', height: '512',
        model_id: 'synthwave-diffusion',
        seed: '0',
        id: 1,
        style: 'PulseSynth',
        runtime: 50,
        method: 'Image',
        strength: 0.5,
        initImage: null,
        title: null,
        speed: 'auto',
    };


    const [formValues, setformValues] = useState<any>(initFormValues)
    //@ts-ignore
    const { balance, setBalance } = useState<any>();
    const [checked, setChecked] = useState<any>(true);
    const [negativePromptRows, setNegativePromptRows] = useState<any>(0)
    const [randomSeed, setRandomSeed] = useState<any>()
    const [btnswap, setBtnswap] = useState<any>('Image');
    const [imageStrength, setimageStrength] = useState<any>(50)
    const [loading, setLoading] = useState<any>()
    const [newImages, setnewImages] = useState<any>([])
    const [addImageHover, setAddImageHover] = useState();
    const [item, setItem] = useState<any>()
    const [runtime, setruntime] = useState<any>(1)
    const [data, setData] = useState<dataResponse>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const popupRef = useRef(null);
    const clickHandler = () => setItem(undefined);

    useOutside(popupRef, setItem);

    const isDarkMode = true;
    const checkShouldGenerateImage = shouldGenerateImage(balance, newImages?.length);
    const currCredits = remainingCredits(balance, newImages?.length).credits;

    const handleFileRefChange = (e: any, input: any) => {
        setformValues((prev) => ({ ...prev, initImage: e.target.files[0] }));
        input.remove();
    };

    const mouseEnter = (index: any, type: any) => {
        setAddImageHover(index);
    };

    const mouseLeave = () => {
        setAddImageHover(undefined);
    };
    const activesty = { backgroundColor: isDarkMode ? 'rgb(17, 10, 43)' : '', borderRadius: '6px', padding: '10px' };

    const notactivesty = {};
    const namesty = {
        color: isDarkMode ? '#FFFFFF' : '#4E4D55',
        backgroundColor: 'transparent',
        fontSize: '14px',
    };

    const chosenamesty = {
        color: isDarkMode ? '#BAB8C9' : '#5B5B5B',
        fontSize: '14px',
    };

    const canvasSizes = [
        { name: 'Portrait (4:5)', tag: 'PRO', width: '512', height: '512' },
        { name: 'Wide (16:9)', tag: '', width: '960', height: '576' },
        { name: 'Landscape (4:3)', tag: '', width: '1024', height: '768' },
        { name: 'Square (1:1)', tag: '', width: '1080px', height: '1080px' },
    ];

    const handleChange = (e: any) => {
        setformValues((prev: any) => ({
            ...prev,
            [e.target.name]: `${e.target.value}`,
        }));
    };

    const handleSubmit = async () => {
        if (!isLoggedIn) {
            return Swal.fire({
                title: "Please Connect the Wallet"
            })
        }
        setIsLoading(true);
        try {
            const prompt = formValues?.prompt;
            setData(null);

            const response = await generateImage({
                height: "1024",
                prompt: prompt,
                width: "1024"
            })

            const response2 = await axios.post("/api/upload", {
                url: response.url
            })

            const imageUrl = response2.data.url;
            // Third Debug
            const docRef = await addDoc(collection(db, "imagecollection"), {
                imageUrl: imageUrl,
                likes: [],
                prompt: response.revised_prompt,
                walletAddress: account?.address,
            });

            console.log("🚀 ~ docRef ~ docRef:", docRef)

            setData(response);
            setIsLoading(false);
            Swal.fire({
                title: "Image Generated Successfully Store in Gallery!",
                icon: "success"
            })
        } catch (error: any) {
            console.log("🚀 ~ handleSubmit ~ error:", error)
            setIsLoading(false);
            Swal.fire({
                title: "Please Enter the correct Prompt"
            })
        }
    }

    const handleImageDownload = async (imageUrl: string) => {
        try {
            window.open(imageUrl, "_blank");
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };


    const [isChecked, setIsChecked] = useState(true);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const buttonTextForGeneration = () => {
        if (loading)
            return (
                <div className="loader">
                    <svg className="circular-loader" viewBox="25 25 50 50">
                        <circle
                            className={isDarkMode ? 'loader-pathd' : 'loader-path'}
                            cx="50"
                            cy="50"
                            r="20"
                            fill="none"
                            stroke={isDarkMode ? '#FFFFFF' : '#000000'}
                            stroke-width="2"
                        />
                    </svg>
                </div>
            );
        else if (!checkShouldGenerateImage) {
            return 'Insufficient balance';
        }
        return 'Generate';
    };

    console.log("form Values", formValues);

    return (
        <Container maxW={"container.xl"}>
            <Box>
                <Box
                    display={'flex'}
                    flexDirection={{ xs: 'column', md: 'row' }}
                    className='flex flex-col md:flex-row'
                    columnGap={'60px'}
                >
                    {/* sidebar */}
                    <Box
                        className={'scrollStyle'}
                        position={{ xs: 'relative', md: 'sticky' }}
                        height={{ xs: '100%', md: '100vh' }}
                        minWidth={'fit-content'}
                        overflow={'scroll'}
                    >
                        <div>
                            {/* selector */}
                            <Tabs chat={false} />
                            {/* img generator */}
                            <Box marginTop={'16px'} borderRadius={'8px'} width={"100%"}>
                                <Box
                                    width={'100%'}
                                    paddingX={'16px'}
                                    paddingY={'16px'}
                                    borderRadius={'16px 16px'}
                                    sx={{
                                        backgroundColor: isDarkMode ? 'rgb(28, 15, 58)' : '#F2F2F2',
                                    }}
                                >
                                    <Box position={'relative'}>
                                        <textarea
                                            placeholder="Describe image to generate..."
                                            style={{
                                                resize: 'none',
                                                color: isDarkMode ? '#FFFFFF' : '',
                                                border: 'none',
                                                borderRadius: '8px',
                                                padding: '16px 24px',
                                                outline: 'none',
                                                width: '100%',
                                                WebkitTextFillColor: isDarkMode ? 'white' : 'black',
                                            }}
                                            name="prompt"
                                            onChange={handleChange}
                                            className={`customResizer scrollStyle ${isDarkMode ? "bg-bg-primary2" : ""} mb-[10px] !resize-none`}
                                            value={formValues?.prompt ?? ""}
                                        ></textarea>
                                    </Box>
                                    <Box
                                        display={'flex'}
                                        justifyContent={'space-between'}
                                        borderRadius={formValues?.initImage !== null ? '16px 16px 0px 0px' : '16px'}
                                        alignItems="center"
                                        className={`px-[10px] py-[8px]`}
                                    >
                                        <Text
                                            sx={{
                                                color: isDarkMode ? '#FFFFFF80' : '#00000080',
                                                fontSize: '14px',
                                            }}
                                        >
                                            Start Image
                                        </Text>
                                        <Box
                                            className='bg-none'
                                            onClick={() => {
                                                if (formValues?.initImage !== null) {
                                                    setformValues((prev: any) => ({ ...prev, initImage: null }));
                                                } else {
                                                    const input = document.createElement('input');
                                                    input.type = 'file';
                                                    input.addEventListener('change', (e) => handleFileRefChange(e, input));
                                                    input.style.display = 'none';
                                                    document.body.appendChild(input);
                                                    input.click();
                                                }
                                            }}
                                        >
                                            {formValues.initImage !== null ? (
                                                <IoMdCloseCircle size={16} color={isDarkMode ? '#FFFFFF' : '#000000'} />
                                            ) : (
                                                <AiFillPlusCircle size={16} color={isDarkMode ? '#FFFFFF' : '#000000'} />
                                            )}
                                        </Box>
                                    </Box>
                                    {formValues.initImage !== null && (
                                        <Box
                                            display={'flex'}
                                            gap={'24px'}
                                            alignItems="center"
                                            borderRadius={formValues.initImage !== null ? '0px 0px 16px 16px' : '16px'}
                                            sx={{
                                                backgroundColor: isDarkMode ? 'rgb(17, 10, 43)' : '#F2F2F2',
                                            }}
                                            className='p-[10px]'
                                            color={'white'}
                                        >
                                            <Box width={'60px'} display={'flex'} height={'60px'} alignItems="center">
                                                <img
                                                    src={
                                                        formValues.initImage !== null && formValues.initImage.name
                                                            ? URL.createObjectURL(formValues.initImage)
                                                            : formValues.initImage
                                                    }
                                                    style={{ borderRadius: '8px', objectFit: 'cover', opacity: `${imageStrength}%` }}
                                                    alt=""
                                                />
                                            </Box>
                                            <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                                                <Box display={'flex'} columnGap={'4px'} alignItems={'center'}>
                                                    <Text
                                                        sx={{
                                                            fontSize: '14px',
                                                            color: isDarkMode ? '#FFFFFF' : '#000000',
                                                            opacity: '50%',
                                                        }}
                                                    >
                                                        Image Strength
                                                    </Text>
                                                    <AiOutlineExclamationCircle size={12} color={isDarkMode ? '#FFFFFF80' : '#00000080'} />
                                                </Box>

                                                <Box display={'flex'} width={'100%'} columnGap={'16px'} alignItems={'center'}>
                                                    {/* slider */}
                                                    <SliderThumbWithTooltip
                                                        min={0}
                                                        max={100}
                                                        step={1}
                                                        value={imageStrength}
                                                        onChange={(value) => setimageStrength(value)} />
                                                    <Text
                                                        sx={{
                                                            fontSize: '14px',
                                                            color: isDarkMode ? '#FFFFFF' : '#000000',
                                                        }}
                                                        className='whitespace-nowrap'
                                                    >
                                                        {imageStrength}
                                                    </Text>
                                                </Box>
                                            </Box>
                                        </Box>
                                    )}
                                    <Box display={'flex'} alignItems={'center'} columnGap={'8px'} justifyContent={'space-between'}>
                                        <Text
                                            sx={{
                                                color: isDarkMode ? '#FFFFFF80' : '#00000080',
                                                fontSize: '14px',
                                                marginY: '16px',
                                            }}
                                            className='remove-image'
                                        >
                                            Remove from image
                                        </Text>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                value="hello"
                                                className="sr-only peer"
                                                checked={isChecked}
                                                onChange={handleCheckboxChange}
                                            />
                                            <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-primary"></div>
                                        </label>
                                    </Box>
                                    <Box
                                        style={{
                                            fontSize: '16px',
                                            color: isDarkMode ? '#FFFFFF' : '#000000',
                                            border: 'none',
                                            outline: 'none',
                                            borderRadius: '8px',
                                            cursor: loading || !formValues?.prompt || !formValues?.id?.wallet ? 'not-allowed' : 'pointer',
                                        }}

                                        className={`${!formValues.prompt || isLoading ? "bg-blue-gen cursor-not-allowed" : "bg-blue-primary"}`}
                                    >
                                        <button
                                            style={{
                                                color: isDarkMode ? '#FFFFFF' : '#000000',
                                                padding: '12px 16px',
                                                width: '100%',
                                            }}
                                            type='button'

                                            className={`${!formValues.prompt || isLoading ? "bg-blue-primary cursor-not-allowed" : "bg-blue-primary"} flex relative justify-center rounded-xl`}
                                            onClick={handleSubmit}
                                            disabled={!formValues?.prompt || isLoading}
                                        >
                                            {buttonTextForGeneration()}
                                            <Box
                                                position={'absolute'}
                                                right={'10px'}
                                                borderRadius={'30px'}
                                                padding={'4px 9px'}
                                                fontSize={'12px'}
                                                width={'29px'}
                                                height={'29px'}
                                                className={`${isDarkMode ? "bg-blue-700" : ""}`}
                                            >
                                                {runtime}
                                            </Box>
                                        </button>
                                    </Box>
                                    {!isMidTierUser(balance) && (
                                        <Text
                                            sx={{
                                                color: isDarkMode ? '#FFFFFF80' : '#00000080',
                                                fontSize: '15px',
                                            }}
                                            marginTop={1}
                                        >
                                            You have {currCredits} credit(s) left
                                        </Text>
                                    )}
                                </Box>
                            </Box>

                            {/* Style slector */}
                            <Box
                                marginTop={'16px'}
                                borderRadius={'16px'}
                                sx={{
                                    backgroundColor: isDarkMode ? 'rgb(28, 15, 58)' : '#F2F2F2',
                                }}
                            >
                                <Box
                                    display={'flex'}
                                    padding={'16px'}
                                    justifyContent={'space-between'}
                                    borderRadius={'16px'}
                                >
                                    <Box
                                        display={'flex'}
                                        justifyContent={'space-between'}
                                        alignItems={'center'}
                                        width={'100%'}
                                        borderRadius={`16px`}
                                    >
                                        <Text
                                            sx={{
                                                color: isDarkMode ? '#FFFFFF80' : '#00000080',
                                                fontSize: '14px',
                                            }}
                                        >
                                            Style
                                        </Text>
                                        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={'4px'}>
                                            <Box
                                                position={'relative'}
                                                display={'flex'}
                                                alignItems={'center'}
                                                justifyContent={'center'}
                                                borderRadius={'6px'}
                                                className='bg-blue-primary'
                                                width={templetes[active]?.name?.length >= 7 ? 'fit-content' : '56px'}
                                                height={'36px'}
                                            >
                                                <img
                                                    src={templetes[active]?.image}
                                                    loading="lazy"
                                                    alt=""
                                                    style={{
                                                        opacity: '35%',
                                                        objectFit: 'cover',
                                                        position: 'absolute',
                                                        width: '100%',
                                                        borderRadius: '8px',
                                                        height: '100%',
                                                    }}
                                                />
                                                <Text fontSize={'15px'} color={'black'} fontWeight={'bold'}>
                                                    {templetes[active]?.name}
                                                </Text>
                                            </Box>
                                            <Box onClick={() => setOpen((prev) => ({ ...prev, styleSelector: !prev.styleSelector }))}>
                                                <BsChevronRight size={16} className={isDarkMode ? "text-[#FFFFFF]" : "text-[#000000] "} />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <div className='absloute'>
                                    {open?.styleSelector && (
                                        <Box
                                            ref={popupRef}
                                            style={{
                                                backgroundColor: `${isDarkMode ? 'rgb(28, 15, 58)' : '#F2F2F2'}`
                                            }}
                                            className="hidden md:flex flex-row flex-wrap max-w-[550px] z-[111] gap-x-[10px] justify-center absolute top-0 md:top-[500px] md:left-[550px] bg-gray-100 dark:bg-gray-800 p-2 rounded-lg"
                                        >
                                            {/* map */}
                                            {templetes.map((item, index) => (
                                                <Box
                                                    key={index}
                                                    className={`${active === index ? 'border-4 text-white border-blue-500' : '  dark:border-gray-600'
                                                        } p-2 rounded-md cursor-pointer`}
                                                    onClick={() => {
                                                        setActive(index);
                                                        setformValues((prev) => ({
                                                            ...prev,
                                                            model_id: item.id,
                                                            style: item.name,
                                                        }));
                                                        setOpen((prev) => ({
                                                            ...prev,
                                                            styleSelector: false,
                                                        }));
                                                    }}
                                                >
                                                    <Box className="relative flex justify-center">
                                                        <img
                                                            src={item.image}
                                                            alt=""
                                                            width={'96px'}
                                                            height={'96px'}
                                                            loading="eager"
                                                            className="rounded-md"
                                                        />
                                                        <Box className="absolute bottom-0 bg-gray-900 bg-opacity-50 text-white w-11/12 p-1 rounded-b-md">
                                                            {item.tag}
                                                        </Box>
                                                    </Box>
                                                    <Text
                                                        className={`${active === index ? 'text-white' : 'text-white text-center'
                                                            } ${item.name === 'StableDiffusion' ? 'text-sm' : 'text-base'}`}
                                                    >
                                                        {item.name}
                                                    </Text>
                                                </Box>
                                            ))}
                                        </Box>
                                    )}
                                </div>

                                {open?.styleSelector && (
                                    <Box
                                        ref={popupRef}
                                        display={{ xs: 'flex', md: 'none' }}
                                        gap={'16px'}
                                        flexWrap={'wrap'}
                                        textAlign={'center'}
                                        position={{ xs: 'relative', md: 'fixed' }}
                                        zIndex={'100'}
                                        top={{ xs: '0px', md: '247px' }}
                                        left={{ xs: '0px', md: '472px' }}
                                        backgroundColor={isDarkMode ? 'rgb(28, 15, 58)' : '#F2F2F2'}
                                        padding={'6px'}
                                        borderRadius={'16px'}
                                        width={'fit-content'}
                                        justifyContent={'space-between'}
                                        className='flex md:hidden'
                                    >
                                        {templetes.map((item, index) => (
                                            <Box
                                                key={index}
                                                style={active === index ? activesty : notactivesty}
                                                onClick={() => {
                                                    setActive(index);
                                                    setformValues((prev) => ({
                                                        ...prev,
                                                        model_id: item.id,
                                                        style: item.name,
                                                    }));
                                                    setOpen((prev) => ({
                                                        ...prev,
                                                        styleSelector: false,
                                                    }));
                                                }}
                                            >
                                                <Box position={'relative'} display={'flex'} justifyContent={'center'}>
                                                    <img
                                                        src={item.image}
                                                        alt=""
                                                        width={'96px'}
                                                        height={'96px'}
                                                        loading="eager"
                                                        style={{ borderRadius: '10px' }}
                                                    />
                                                    <Box
                                                        position={'absolute'}
                                                        bottom={0}
                                                        backgroundColor={'#21212166'}
                                                        color={'white'}
                                                        width={'85%'}
                                                        borderRadius={'5px'}
                                                    >
                                                        {item.tag}
                                                    </Box>
                                                </Box>
                                                <Text
                                                    style={{
                                                        color: active === index && '#000000',
                                                        ...namesty,
                                                        fontSize: item.name === 'StableDiffusion' ? '12px' : '14px',
                                                    }}
                                                >
                                                    {item.name}
                                                </Text>
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </Box>

                            {/* startimg */}
                            

                            {/* setting */}
                            <Box marginTop={'16px'} borderRadius={'8px'} marginBottom={"40px"}
                            >
                                {/* <Box
                                    display={'flex'}
                                    padding={'16px'}
                                    justifyContent={'space-between'}
                                    borderRadius={'16px 16px 0px 0px'}
                                    sx={{
                                        backgroundColor: isDarkMode ? 'rgb(28, 15, 58)' : '#F2F2F2',
                                    }}
                                >
                                    <Text
                                        sx={{
                                            color: isDarkMode ? '#FFFFFF80' : '#00000080',
                                            fontSize: '14px',
                                        }}
                                    >
                                        Settings
                                    </Text>
                                </Box> */}

                                <Box
                                    width={'100%'}
                                    paddingX={'16px'}
                                    paddingBottom={'16px'}
                                    borderRadius={'16px 16px 16px 16px'}
                                    sx={{
                                        backgroundColor: isDarkMode ? 'rgb(28, 15, 58)' : '#F2F2F2',
                                    }}
                                >
                                    {/* <Box display={'flex'} columnGap={'4px'} alignItems={'center'}>
                                        <RiBrush4Line size={14} color={isDarkMode ? '#FFFFFF80' : '#00000080'} />
                                        <Text
                                            sx={{
                                                fontSize: '14px',
                                                color: isDarkMode ? '#FFFFFF80' : '#00000080',
                                            }}
                                        >
                                            Canvas Size
                                        </Text>
                                    </Box> */}

                                    {/* <Box
                                        display={'flex'}
                                        justifyContent={'space-between'}
                                        marginTop={'8px'}
                                        borderRadius={'8px'}
                                        alignItems={'center'}
                                        paddingX={'24px'}
                                        paddingY={'16px'}
                                        backgroundColor={isDarkMode ? 'rgb(17, 10, 43)' : '#FFFFFF'}
                                    >
                                        <Text
                                            sx={{
                                                color: isDarkMode ? '#FFFFFF' : '#000000',
                                                fontSize: '14px',
                                            }}
                                        >
                                            {
                                                canvasSizes.filter((i) => i.width === formValues?.width && i.height === formValues?.height)[0]
                                                    ?.name
                                            }
                                        </Text>
                                        <Box
                                            onClick={() => setOpen((prev) => ({ ...prev, canvasSizeSelect: !prev.canvasSizeSelect }))}
                                        >
                                            <BsChevronDown size={16} className={isDarkMode ? "text-[#FFFFFF]" : "text-[#000000] "} />
                                        </Box>
                                    </Box> */}

                                    {open.canvasSizeSelect && (
                                        <Box
                                            display={'flex'}
                                            flexDirection={'column'}
                                            justifyContent={'space-between'}
                                            marginTop={'8px'}
                                            gap={'4px'}
                                            borderRadius={'8px'}
                                            padding={'16px'}
                                            backgroundColor={isDarkMode ? 'rgb(17, 10, 43)' : '#FFFFFF'}
                                        >
                                            {canvasSizes.map((item, idx) => (
                                                <Box
                                                    key={idx}
                                                    display={'flex'}
                                                    justifyContent={'space-between'}
                                                    alignItems={'center'}
                                                    padding={'8px'}
                                                    borderRadius={'6px'}
                                                    backgroundColor={
                                                        formValues?.width === item?.width && formValues?.height === item?.height && '#3c91e6'
                                                    }
                                                    onClick={() => {
                                                        setformValues((prev) => ({ ...prev, width: item.width, height: item.height }));
                                                        setOpen((prev) => ({ ...prev, canvasSizeSelect: false }));
                                                    }}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <Text
                                                        sx={{
                                                            color:
                                                                formValues?.width === item.width && formValues?.height === item?.height
                                                                    ? 'white'
                                                                    : isDarkMode
                                                                        ? '#FFFFFF'
                                                                        : '#00000080',
                                                            fontSize: '14px',
                                                        }}
                                                    >
                                                        {item?.name}
                                                    </Text>
                                                    {item.tag && (
                                                        <Box
                                                            backgroundColor={isDarkMode ? '#1C7152' : '#89DCBE'}
                                                            padding={'0px 3px'}
                                                            borderRadius={'35px'}
                                                        >
                                                            <Text
                                                                sx={{
                                                                    color: isDarkMode ? '#FFFFFF' : '#00000080',
                                                                    fontSize: '12px',
                                                                }}
                                                            >
                                                                {item.tag}
                                                            </Text>
                                                        </Box>
                                                    )}
                                                </Box>
                                            ))}
                                        </Box>
                                    )}

                                    {/* Runtime */}
                                    {/* <Box marginTop={'20px'}>
                                        <Box display={'flex'} columnGap={'4px'} alignItems={'center'}>
                                            <AiOutlineClockCircle size={16} className={isDarkMode ? "text-[#FFFFFF]" : "text-[#000000] "} />
                                            <Text
                                                sx={{
                                                    fontSize: '14px',
                                                    color: isDarkMode ? '#FFFFFF80' : '#00000080',
                                                }}
                                            >
                                                Runtime
                                            </Text>
                                            <Tooltip label="A higher number will yield better-quality images, but it will also take more time to generate.">
                                                <Box className='cursor-pointer'>
                                                    <AiOutlineExclamationCircle size={12} className={`${isDarkMode ? "text-[#FFFFFF]" : "text-[#000000] "} cursor-pointer`} />
                                                </Box>
                                            </Tooltip>
                                        </Box>
                                        <Box display={'flex'} className='gap-x-[10px]' alignItems={'center'} justifyContent={"center"}>
                                            <SliderThumbWithTooltip
                                                min={50}
                                                max={150}
                                                step={50}
                                                value={formValues.runtime}
                                                onChange={(newValue) => setformValues((prev) => ({ ...prev, runtime: newValue }))} />
                                            <Text
                                                sx={{
                                                    fontSize: '14px',
                                                    color: isDarkMode ? '#FFFFFF' : '#000000',
                                                }}
                                            >
                                                {formValues.runtime}
                                            </Text>
                                        </Box>

                                    </Box> */}

                                    {/* Guidence Scale */}
                                    {/* <Box marginTop={'10px'}>
                                        <Box display={'flex'} columnGap={'4px'} alignItems={'center'}>
                                            <img src={isDarkMode ? "/assets/webp/guidd.webp" : "/assets/webp/guidl.webp"} alt="" />
                                            <Text
                                                sx={{
                                                    fontSize: '14px',
                                                    color: isDarkMode ? '#FFFFFF80' : '#00000080',
                                                }}
                                            >
                                                Guidance Scale
                                            </Text>
                                        </Box>
                                        <Box display={'flex'} columnGap={'16px'} alignItems={'center'}>
                                            <SliderThumbWithTooltip
                                                value={formValues?.guidance_scale}
                                                min={0.5}
                                                max={7.5}
                                                step={0.5}
                                                onChange={(newValue) => setformValues((prev: any) => ({ ...prev, guidance_scale: newValue }))} />
                                            <Text
                                                sx={{
                                                    fontSize: '14px',
                                                    color: isDarkMode ? '#FFFFFF' : '#000000',
                                                }}
                                                className='whitespace-nowrap'
                                            >
                                                {formValues?.guidance_scale}
                                            </Text>
                                        </Box>
                                    </Box> */}

                                    {/* Steps */}
                                    <Box marginTop={'10px'}>
                                        {/* <Box display={'flex'} columnGap={'4px'} alignItems={'center'}>
                                            <img src={isDarkMode ? "/assets/webp/stepd.webp" : "/assets/webp/stepl.webp"} alt="" />
                                            <Text
                                                sx={{
                                                    fontSize: '14px',
                                                    color: isDarkMode ? '#FFFFFF80' : '#00000080',
                                                }}
                                            >
                                                Steps
                                            </Text>
                                        </Box> */}

                                        <Box display={'flex'} columnGap={'16px'} alignItems={'center'}>
                                            {/* slider */}
                                            {/* <SliderThumbWithTooltip
                                                value={formValues?.steps}
                                                min={10}
                                                max={100}
                                                step={10}
                                                onChange={(newValue) => setformValues((prev: any) => ({ ...prev, steps: newValue }))} />
                                            <Text
                                                sx={{
                                                    fontSize: '14px',
                                                    color: isDarkMode ? '#FFFFFF' : '#000000',
                                                }}
                                                className='whitespace-nowrap'
                                            >
                                                {formValues?.steps}
                                            </Text> */}
                                        </Box>
                                    </Box>

                                    {/* width height speed */}
                                    <Box marginTop={'24px'} display={'flex'} columnGap={'10px'} justifyContent={'space-between'}>
                                        <Box display={'flex'} flexDirection={'column'}>
                                            <Text fontSize={'14px'} color={isDarkMode ? '#FFFFFF80' : '#00000080'}>
                                                Width
                                            </Text>
                                            <Input
                                                sx={{
                                                    color: isDarkMode ? '#FFFFFF' : '#000000',
                                                    fontSize: '14px',
                                                    border: '0px',
                                                    outline: 'none',
                                                    display: 'flex',
                                                    marginTop: '8px',
                                                    padding: '16px 24px',
                                                    borderRadius: '8px',
                                                    alignItems: 'center',
                                                    maxWidth: '102px',
                                                    backgroundColor: isDarkMode ? 'rgb(17, 10, 43)' : '#FFFFFF',
                                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
                                                    ':before': {
                                                        border: 'none',
                                                    },
                                                }}
                                                name="width"
                                                onChange={handleChange}
                                                value={formValues?.width}
                                                type="number"
                                            />
                                        </Box>

                                        <Box display={'flex'} flexDirection={'column'}>
                                            <Text fontSize={'14px'} color={isDarkMode ? '#FFFFFF80' : '#00000080'}>
                                                Height
                                            </Text>
                                            <Input
                                                sx={{
                                                    color: isDarkMode ? '#FFFFFF' : '#000000',
                                                    fontSize: '14px',
                                                    border: 'none',
                                                    outline: 'none',
                                                    display: 'flex',
                                                    marginTop: '8px',
                                                    padding: '16px 24px',
                                                    borderRadius: '8px',
                                                    alignItems: 'center',
                                                    maxWidth: '102px',
                                                    backgroundColor: isDarkMode ? 'rgb(17, 10, 43)' : '#FFFFFF',
                                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
                                                    ':before': {
                                                        border: 'none',
                                                    },
                                                }}
                                                name="height"
                                                onChange={handleChange}
                                                value={formValues?.height}
                                                type="number"
                                            />
                                        </Box>

                                        <Box display={'flex'} flexDirection={'column'}>
                                            <Text fontSize={'14px'} color={isDarkMode ? '#FFFFFF80' : '#00000080'}>
                                                Speed
                                            </Text>
                                            <Input
                                                sx={{
                                                    color: isDarkMode ? '#FFFFFF' : '#000000',
                                                    fontSize: '14px',
                                                    border: 'none',
                                                    outline: 'none',
                                                    display: 'flex',
                                                    marginTop: '8px',
                                                    padding: '16px 24px',
                                                    borderRadius: '8px',
                                                    alignItems: 'center',
                                                    maxWidth: '102px',
                                                    backgroundColor: isDarkMode ? 'rgb(17, 10, 43)' : '#FFFFFF',
                                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
                                                    ':before': {
                                                        border: 'none',
                                                    },
                                                }}
                                                name="speed"
                                                onChange={handleChange}
                                                value={formValues?.speed}
                                            />
                                        </Box>
                                    </Box>

                                    {/* Seed */}
                                    <Box marginTop={'24px'}>
                                        <Box display={'flex'} justifyContent={'space-between'}>
                                            <Box display={'flex'} columnGap={'4px'} alignItems={'center'}>
                                                <BsHash size={16} className={isDarkMode ? "text-[#FFFFFF]" : "text-[#000000] "} />
                                                <Text
                                                    sx={{
                                                        fontSize: '14px',
                                                        color: isDarkMode ? '#FFFFFF80' : '#00000080',
                                                    }}
                                                >
                                                    Seed
                                                </Text>
                                                <Tooltip title="Using different seed numbers will produce distinct variations of your image.">
                                                    <Box sx={{ cursor: 'pointer' }}>
                                                        <AiOutlineExclamationCircle size={12} className={isDarkMode ? "text-[#FFFFFF]" : "text-[#000000] "} />
                                                    </Box>
                                                </Tooltip>
                                                <Box backgroundColor={isDarkMode ? 'rgb(17, 10, 43)' : '#FFFFFF'} borderRadius={'35px'} className='px-[10px] py-[4px]'>
                                                    <Text fontSize={'12px'} className={`${isDarkMode ? "text-[#FFFFFF]" : "#000000"}`}>PRO</Text>
                                                </Box>
                                            </Box>
                                            <Box display={'flex'} alignItems={'center'} columnGap={'8px'}>
                                                <Text
                                                    sx={{
                                                        fontSize: '14px',
                                                        color: isDarkMode ? '#FFFFFF80' : '#00000080',
                                                    }}
                                                >
                                                    random
                                                </Text>
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" value="" className="sr-only peer" />
                                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-primary"></div>
                                                </label>

                                            </Box>
                                        </Box>

                                        <input
                                            disabled={randomSeed}
                                            style={{
                                                color: isDarkMode ? '#FFFFFF' : '#000000',
                                                fontSize: '14px',
                                                border: 'none',
                                                outline: 'none',
                                                display: 'flex',
                                                marginTop: '8px',
                                                padding: '16px 24px',
                                                borderRadius: '8px',
                                                alignItems: 'center',
                                                width: '100%',
                                                backgroundColor: isDarkMode ? 'rgb(17, 10, 43)' : '#FFFFFF',
                                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
                                                opacity: randomSeed ? '50%' : '100%',
                                            }}
                                            name="seed"
                                            onChange={handleChange}
                                            value={formValues?.seed}
                                            type="number"
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                    </Box>
                    {/* center */}
                    <Box width={'100%'}>
                        {
                            isLoading ? <Loader /> :
                                <Box>
                                    <Box
                                        minHeight={'fit-content'}
                                        marginTop={"40px"}
                                    >
                                        <Box>
                                            {newImages?.length ? (
                                                newImages?.map((item, index) => (
                                                    <>
                                                        {item.progressing ? (
                                                            <Box onClick={() => setItem(item)} key={index} sx={{ cursor: 'pointer' }}>
                                                                <PaintingProgress
                                                                    height={`${newImages?.length
                                                                        ? (newImages[newImages?.length - 1].meta.H ||
                                                                            Number(newImages[newImages?.length - 1].meta.height)) / 1.6
                                                                        : 315
                                                                        }px`}
                                                                />
                                                            </Box>
                                                        ) : (
                                                            <Box
                                                                key={index}
                                                                sx={{
                                                                    height: `${newImages?.length
                                                                        ? (newImages[newImages?.length - 1].meta.H ||
                                                                            Number(newImages[newImages?.length - 1].meta.height)) / 1.6
                                                                        : 315
                                                                        }px`,
                                                                    position: 'relative',
                                                                    padding: '0px',
                                                                    background: `url('${item.output[0]}') no-repeat center !important`,
                                                                    backgroundSize: 'cover !important',

                                                                    '&:hover': {
                                                                        background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.73) 80%), url('${item.output[0]}') no-repeat center !important`,
                                                                        backgroundSize: 'cover !important',
                                                                    },
                                                                    cursor: 'pointer',
                                                                }}
                                                                onMouseEnter={() => mouseEnter(index, 'addImage')}
                                                                onMouseLeave={mouseLeave}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        height: `${newImages?.length
                                                                            ? (newImages[newImages?.length - 1].meta.H ||
                                                                                Number(newImages[newImages?.length - 1].meta.height)) / 1.6
                                                                            : 315
                                                                            }px`,
                                                                        borderRadius: '10px',
                                                                    }}
                                                                    onClick={() => {
                                                                        setItem(item);
                                                                    }}
                                                                ></Box>
                                                                {/* Popup  */}
                                                                {addImageHover && (
                                                                    <Box>
                                                                        <Box position={'absolute'} zIndex={'100'} top={'16px'} left={'8px'}>
                                                                        </Box>
                                                                        <Box position={'absolute'} zIndex={'100'} bottom={'16px'} left={'8px'}>
                                                                            {item.title && (
                                                                                <Text textAlign={'start'} color={'white'}>
                                                                                    {item.title}
                                                                                </Text>
                                                                            )}
                                                                        </Box>
                                                                    </Box>
                                                                )}
                                                            </Box>
                                                        )}
                                                    </>
                                                ))
                                            ) : (
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        borderRadius: '10px',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        boxShadow: 'none',
                                                        height: `${newImages?.length
                                                            ? (newImages[newImages?.length - 1].meta.H ||
                                                                Number(newImages[newImages?.length - 1].meta.height)) / 1.6
                                                            : 315
                                                            }px`,
                                                    }}
                                                    className='w-[90%] md:w-[60%]'
                                                    style={{ backgroundColor: isDarkMode ? 'rgb(28, 15, 58)' : '#FFFFFF', marginTop: `${data ? "180px" : "100px"}`, marginLeft: "30px" }}
                                                >
                                                    {
                                                        data ?
                                                            <img
                                                                src={data?.url as any}
                                                                alt={data?.revised_prompt as any}
                                                                onClick={() => handleImageDownload(data?.url)}
                                                                // preview={false}
                                                                className='cursor-pointer rounded-[10px] '
                                                            /> :
                                                            <AiFillPlusCircle size={48} className='text-white cursor-pointer' />
                                                    }
                                                </Box>
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                        }
                    </Box>
                </Box>
            </Box >
            <Box zIndex={'1000'} position={'relative'}>
                {item && (
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        zIndex={'1000'}
                        position={'fixed'}
                        flexDirection={'row'}
                        justifyContent="center"
                        top={'0'}
                    >
                        <Box backgroundColor={'rgba(0,0,0,0.8)'} width={'99vw'} height={'100vh'}></Box>
                        <div
                            ref={popupRef}
                            // padding={{ xs: '0px', md: '16px' }}
                            color={isDarkMode ? 'white !important' : 'black !important'}
                            width={{ xs: '90vw', lg: '1000px' }}
                            maxHeight={'97vh'}
                            position={'absolute'}
                            className={`scrollStyle rounde-[16px] bg-${isDarkMode ? "#131219" : "white"}`}
                            overflow={'hidden scroll'}
                        >
                            <Box style={{ position: 'relative', zIndex: '100' }}>
                                <Box
                                    width={'fit-content'}
                                    sx={{ cursor: 'pointer' }}
                                    position={'absolute'}
                                    top={'8px'}
                                    right={'8px'}
                                    onClick={clickHandler}
                                >
                                    <RxCross1 className={isDarkMode ? "text-[#FFFFFF]" : "text-[#000000] "} />
                                </Box>
                            </Box>
                        </div>
                    </Box>
                )}


            </Box>
        </Container >
    )
}

export default ImageGenerator