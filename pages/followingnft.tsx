import { Container } from '@chakra-ui/react'
import React from 'react'
import { MainLayout } from '../shared/components/ui/MainLayout'
import { MetaHead } from '../shared/components/ui/MetaHead'
import Following from '../views/Following'

function FollowingPage() {
    return (
        <>
            <MetaHead metaTitle={"Following Nfts"} />
            <MainLayout>
                <div className='back-bg pt-[50px] w-full '>
                    <Container maxW={"container.xl"}>
                        <Following />
                    </Container>
                </div>
            </MainLayout>
        </>
    )
}

export default FollowingPage