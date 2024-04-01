/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FiRefreshCw } from 'react-icons/fi';
import ShowResponse from './showResponse';
import ChatLoader from '../../shared/components/ui/chatLoader';
import { generateResponse } from "../../shared/services/openai/openai"
import { Button, Divider, Text, Tooltip, useMediaQuery } from '@chakra-ui/react';
import Swal from "sweetalert2"
import Container from '../../shared/components/ui/Container';

function Chatai() {
    const isDarkMode: boolean = true;
    const [selectedQuestion, setSelectedQuestion] = useState<string>('')
    const isMobile = useMediaQuery('(max-width:600px)');
    const [msg, setMsg] = useState<any[]>([]);
    const [message, setMessage] = useState<string>('');
    const [loading, setloading] = useState(false)
    const [regenerating, setRegenerating] = useState(false);

    const chatHeight = useRef<any>();
    const chatScroll = useRef<any>();
    const formRef = useRef<HTMLFormElement | null>(null);

    const mainbox = { backgroundColor: isDarkMode ? 'rgb(28, 15, 58)' : '#FAFAFA', borderRadius: '32px' };

    const setOptions = [
        {
            img: "/assets/webp/cryptoexd.webp",
            title: 'Community  X',
            questions: [
                'What  is  crypto?',
                'What  is  $WATER  ?',
                'What  Is  the  NEXUS  Dapp?',
                'What  Team  Is  Behind  The  NEXUS  Dapp?',
            ],
        },
        {
            img: "/assets/webp/capabilityd.webp",
            title: '$ NEXUS',
            questions: [
                'What  IS  $NEXUS  utility?',
                'What  is  the  NEXUS  tokenomics?',
                'Does  the  $NEXUS  burn?',
                'What  is  the  price  of  $NEXUS?'
            ],
        },
        {
            img: "/assets/webp/everyd.webp",
            title: 'NEXUS  Dapp',
            questions: [
                'Can  I  start  a  pool?',
                'Does  it  cost  to  use  the  Nexus  Dapp?',
                'What  are  the  features  of  the  NEXUS  Dapp?',
                'Who  is  AWOL?',
            ],
        },
    ];

    useEffect(() => {
        chatScroll?.current?.scrollTo(0, chatHeight?.current?.clientHeight);
    }, [msg]);

    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);


    const handleQuestionClick = (question: string) => {
        setSelectedQuestion(question);
        setMessage(question);
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (message === "") {
                Swal.fire({
                    title: "Please Enter the Message"
                })
            } else {
                setloading(true);
                const newQuestion = {
                    question: message,
                    user: 'User',
                    sendTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    date: new Date(),
                };
                setMsg((prev) => [...prev, newQuestion]);
                const data = await generateResponse(message);
                const newResponse = {
                    msg: data,
                    user: 'Pensy AI',
                    sendTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    date: new Date(),
                };
                setMsg((prev) => [...prev, newResponse]);
                setMessage("");
                setloading(false);
            }
        } catch (error: any) {
            Swal.fire({
                title: error.message,
                icon: "error"
            })
            setloading(false);
        }
    };

    const resetChat = () => {
        setMessage("");
        setMsg([])
    }

    const newLocal = (
        <Tooltip title="Reset Chat" style={{ cursor: 'pointer' }}>
            <div>
                <div className='reset rounded-full px-[10px] py-[10px]' onClick={resetChat}>
                    <AiOutlineArrowLeft size={19} className='text-white' />
                </div>
            </div>
        </Tooltip>
    );

    const handleRegenerate = async () => {
        setRegenerating(true);
        try {
            const prevMsgIndex = msg.length - 2;
            if (prevMsgIndex >= 0) {
                const prevMsg = msg[prevMsgIndex].question;
                const data = await generateResponse(prevMsg);
                const newResponse = {
                    msg: data,
                    user: 'Pensy AI',
                    sendTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
                    date: new Date(),
                };
                setMsg((prev) => [...prev.slice(0, -1), newResponse]);
            }
        } catch (error) {
        } finally {
            setRegenerating(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };


    return (
        <div className='pt-[40px]   w-full flex justify-center items-center'>
            <div className='w-full' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', flexDirection: 'column' }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            ...mainbox,
                            width: '100%',
                            position: 'relative',
                        }}
                        className='px-[50px] py-[70px]'
                    >
                        <Container>
                            <h1 className='text-[18px] text-center fw-full lex justify-center items-center md:text-[40px] font-extrabold text-[#FFFFFF] mb-[10px]' color={'#FFFFFF'}>
                                Chat PensyAI
                            </h1>
                        </Container>
                        <div
                            ref={chatHeight}
                            className={`${msg.length ? "mt-[20px] md:mt-[20px] " : undefined} flex gap-[6px] flex-col ${msg.length && "w-[100%]"} justify-center`}
                        >
                            <div className={`flex w-full justify-end gap-x-[12px] gap-y-[16px]  items-cente flex-row  md:flex-row ${isMobile ? "flex-row" : "flex-row"} mb-[15px]`}>
                                <Text className={`more-ai  whitespace-nowrap`} >
                                    More
                                </Text>
                                {newLocal}
                            </div>
                            {
                                loading ?
                                    <ChatLoader />
                                    :
                                    <div className='flex'>
                                        {!msg.length ? (
                                            <div className='flex justify-between flex-wrap gap-[20px]' >
                                                {setOptions.map((item, idx) => (
                                                    <div key={idx} className='flex flex-col gap-[8px]'>
                                                        <div className='flex  items-center flex-col gap-[8px]'>
                                                            <img src={item.img} alt="logo" />
                                                            <Text className={item.title == "$ NEXUS" ? "text-[24px] font-extrabold text-[#FFFFFF]" : `text-[24px] font-bold text-[#FFFFFF]`} color={'#FFFFFF'}>
                                                                {item.title}
                                                            </Text>
                                                        </div>
                                                        {item.questions.map((ques, idx) => (
                                                            <div
                                                                key={idx}
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    backgroundColor: isDarkMode ? 'rgb(17, 10, 43)' : '#F1F1F1',
                                                                    border: '1px solid',
                                                                    borderColor: isDarkMode ? '#1D1E23' : '#E5E6E9',
                                                                    padding: '16px 24px',
                                                                    borderRadius: '16px',
                                                                    maxWidth: '230px',
                                                                    cursor: 'pointer',
                                                                    minWidth: "200px",
                                                                    maxHeight: "300px",
                                                                    minHeight: "10px",
                                                                    height: "70px"
                                                                }}
                                                                // className={`flex justify-between p-x`}
                                                                onClick={() => handleQuestionClick(ques)}
                                                            >
                                                                <Text className='text-[13px] font-semibold text-[#FFFF]'>
                                                                    {ques}
                                                                </Text>
                                                                <div className='flex justify-end cursor-pointer'>
                                                                    <BsArrowRight size={24} className='text-[#FFF]' />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : null}
                                        <ShowResponse loading={loading} msg={msg} />
                                    </div>
                            }
                            <div>
                                {msg.length > 1 && msg[msg.length - 1].user && (
                                    <Button
                                        onClick={() => handleRegenerate()}
                                        disabled={regenerating}
                                        style={{
                                            backgroundColor: isDarkMode ? 'rgb(17, 10, 43)' : '#F1F1F1',
                                            borderRadius: "20px",
                                            marginTop: "10px",
                                            padding: "10px 20px",
                                            marginLeft: "3.3vw"
                                        }}
                                        className='rounded-[20px] mt-[10px] ml-[3.3vw] '
                                    >
                                        <div className='flex gap-x-[5px] items-center justify-center'>
                                            <FiRefreshCw color={isDarkMode ? '#FFFFFF' : '#292D32'} />
                                            <Text className={isDarkMode ? "text-white" : "text-[#292D32]"} color={isDarkMode ? '#FFFFFF' : '#292D32'}>
                                                {regenerating ? 'Re-generating' : 'Re-generate'}
                                            </Text>
                                        </div>
                                    </Button>
                                )}
                            </div>
                            {/* </Spin> */}
                        </div>
                    </div>

                    <form style={{ width: '100%' }} onSubmit={handleSubmit} ref={formRef}>
                        <div
                            style={{
                                backgroundColor: isDarkMode ? 'rgb(28, 15, 58)' : '#F1F1F1',
                            }}
                            className={`flex flex-wrap border gap-x-[14px] border-[#E5E6E9] rounded-full px-[32px] pt-[16px] pb-[3px] w-full mt-[55px]`}
                        >
                            <textarea
                                placeholder="Type Your Message..."
                                style={{
                                    backgroundColor: isDarkMode ? 'rgb(28, 15, 58)' : '#F1F1F1',
                                }}
                                className='flex flex-1 break-words resize-none outline-[0] border-none text-[#FFFFFF]'
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <hr className='h-[1px]' />
                            <button type='button' className='pb-[7px] outline-none border-none bg-transparent'>
                                <LazyLoadImage width={'33px'} height={'33px'} src={"/assets/webp/micicond.svg"} alt="bg" className='cursor-not-allowed' />
                            </button>

                            <button type="submit" className='pb-[7px] outline-none border-none bg-transparent'>
                                <LazyLoadImage width={'33px'} height={'33px'} src={"/assets/webp/sendicon.webp"} alt="bg" style={{ cursor: loading ? "not-allowed" : "pointer" }} />
                            </button>
                        </div>

                    </form>
                </div>
            </div >
        </div >
    );
}

export default Chatai;
