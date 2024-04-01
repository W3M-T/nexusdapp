import React, { ReactNode } from 'react';

interface Props {
    loading: boolean;
}

function ChatLoader() {
    return (
        <div>
            <h1 className='flex justify-center items-center text-white font-semibold text-[16px] md:text-[25px]'>Please wait response will be  Generating...</h1>
            <div className='customloader'>
                <p>l</p>
                <p>o</p>
                <p>a</p>
                <p>d</p>
                <p>i</p>
                <p>n</p>
                <p>g</p>
            </div>

        </div>
    );
}

export default ChatLoader;
