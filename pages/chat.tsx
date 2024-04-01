import React from 'react'
import MainChatAi from '../views/Chat/main'
import { MainLayout } from '../shared/components/ui/MainLayout'
import { MetaHead } from '../shared/components/ui/MetaHead'

function ChatPage() {
    return (
        <>
            <MetaHead metaTitle={"Chat Bot"} />
            <MainLayout>
                <div className='black-bg pt-[50px]'>
                    <MainChatAi />
                </div>
            </MainLayout>
        </>
    )
}

export default ChatPage