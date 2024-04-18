import React from 'react'
import User from '../views/User'
import { MainLayout } from '../shared/components/ui/MainLayout'
import { MetaHead } from '../shared/components/ui/MetaHead'
import { Container } from '@chakra-ui/react'
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo'

function UserPage() {
    const { account } = useGetAccountInfo();
    return (
        <>
            <MetaHead metaTitle='Profile' />
            <MainLayout>
                <div className='pt-[50px] w-full '>
                    <Container maxW={"container.xl"}>
                        {
                            account?.address ? <User /> :
                                <div>
                                    <h1 className='flex  justify-center h-[30vh] flex-col items-center gap-x-[15px] text-white text-[25px] font-bold'>Please Connect the Wallet</h1>
                                </div>
                        }
                    </Container>
                </div>
            </MainLayout >
        </>
    )
}

export default UserPage