import React from 'react'
import CommunityGallery from '../views/CommunityGallery'
import { MainLayout } from '../shared/components/ui/MainLayout'
import { Container } from '@chakra-ui/react'
import { MetaHead } from '../shared/components/ui/MetaHead'

function CommunityGalleryPage() {
    return (
        <>
            <MetaHead metaTitle={"Community Gallery"} />
            <MainLayout metaTitle="Community Gallery">
                <div className='back-bg pt-[50px] w-full'>
                    <Container maxW="container.xl">
                        <CommunityGallery />
                    </Container>
                </div>
            </MainLayout>
        </>
    )
}

export default CommunityGalleryPage