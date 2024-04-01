import { Container } from '@chakra-ui/react'
import React from 'react'
import MyCreation from '../views/MyCreation'
import { MainLayout } from '../shared/components/ui/MainLayout'
import { MetaHead } from '../shared/components/ui/MetaHead'

function MyCreationPage() {
    return (
        <>
            <MetaHead metaTitle={"My Creation"} />
            <MainLayout metaTitle="My Creation">
                <div className='back-bg pt-[50px] w-full'>
                    <Container maxW={"container.xl"}>
                        <MyCreation />
                    </Container>
                </div>
            </MainLayout>
        </>
    )
}

export default MyCreationPage