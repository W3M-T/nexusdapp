import { Container } from '@chakra-ui/react'
import React from 'react'
import FollowingNfts from '../views/FollowingNft'
import { MainLayout } from '../shared/components/ui/MainLayout'
import { MetaHead } from '../shared/components/ui/MetaHead'

function FollowingNftPage() {
    return (
        <>
            <MetaHead metaTitle={"Following Nfts"} />
            <MainLayout>
                <div className='back-bg pt-[50px] w-full '>
                    <Container maxW={"container.xl"}>
                        <FollowingNfts />
                    </Container>
                </div>
            </MainLayout>
        </>
    )
}

export default FollowingNftPage