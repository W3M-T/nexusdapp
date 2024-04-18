import { Container } from '@chakra-ui/react'
import React from 'react'
import MyCreation from '../views/MyCreation'
import { MainLayout } from '../shared/components/ui/MainLayout'
import { MetaHead } from '../shared/components/ui/MetaHead'
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo'

function MyCreationPage() {
    const { account } = useGetAccountInfo();
    return (
        <>
            <MetaHead metaTitle={"My Creation"} />
            <MainLayout metaTitle="My Creation">

                {
                    account?.address ?
                        <div className='back-bg pt-[50px] w-full'>
                            <Container maxW={"container.xl"}>

                                <MyCreation />
                            </Container>
                        </div>
                        :
                        <div className='pt-[50px] w-full'>
                            <h1 className='flex  justify-center h-[30vh] flex-col items-center gap-x-[15px] text-white text-[25px] font-bold'>Please Connect the Wallet</h1>
                        </div>
                }

            </MainLayout>
        </>
    )
}

export default MyCreationPage