/* eslint-disable react/no-children-prop */
import React from 'react';
import { Box } from '@mui/system';
import ReactMarkdown from 'react-markdown';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function ShowResponse({ msg, loading }: { msg: any; loading: any }) {
    console.log("🚀 ~ ShowResponse ~ loading:", loading)
    const isDarkMode = true;

    const receivechatboxsty = {
        backgroundColor: isDarkMode ? 'rgb(17, 10, 43)' : '#CCCCCC40',
        color: isDarkMode ? '#FFFFFF' : '#000000',
    };


    return (
        <div className={`flex flex-col justify-start gap-3 ${!msg.length ? "" : "w-full"}`}>
            {msg.length
                ? msg.map((item: any, index: any) => (
                    <React.Fragment key={index}>
                        {item.user === 'Pensy AI' ? (
                            <Box display={'flex'} flexDirection={'column'}>
                                <Box display={'flex'} columnGap="8px">
                                    <Box>
                                        <LazyLoadImage src={'/assets/webp/pensyai.png'} width={'50px'} height={'55px'} alt="logo" className='rounded-md !mt-[10px]' />
                                    </Box>
                                    <Box display={'flex'} flexDirection={'column'} rowGap="6px">
                                        <Box
                                            style={receivechatboxsty}
                                            alignSelf={'self-start'}
                                            paddingX={'20px'}
                                            paddingY={'10px'}
                                            maxWidth={'750px'}
                                            className="scrollStyle"
                                            textAlign={'start'}
                                            borderRadius={'30px'}
                                        >
                                            <ReactMarkdown children={item.msg} />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        ) : (
                            <div className="flex justify-end self-end items-center gap-[12px]">
                                <Box display={'flex'} flexDirection={'column'} rowGap="6px" alignSelf={'end'} position={'relative'} className="flex justify-end">
                                    <div>
                                        <div>
                                            <h1
                                                style={{
                                                    backgroundColor: isDarkMode ? '#6737FF' : '#6737FF',
                                                    color: isDarkMode ? '#fff' : '#fff',
                                                    wordBreak: 'break-word',
                                                    textAlign: 'end',
                                                    alignSelf: 'self-end',
                                                    maxWidth: '750px',
                                                }}
                                                className="px-[20px] py-[10px] rounded-[30px]"
                                            >
                                                {item.question}
                                            </h1>
                                        </div>
                                        <h1 style={{ alignSelf: 'self-start', color: '#B6B6B6' }} className='flex justify-end mt-[5px] mr-[12px] text-[12px]'>
                                            {new Date(item.date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}
                                        </h1>
                                    </div>
                                </Box>
                            </div>
                        )}
                    </React.Fragment>
                ))
                : null}
        </div >
    );
}

export default ShowResponse;

