import React from 'react'
import { MainLayout } from '../shared/components/ui/MainLayout'
import { Container } from '@chakra-ui/react'
import { MetaHead } from '../shared/components/ui/MetaHead'
import CommunityGallery from '../views/Gallery'

function CommunityGalleryPage() {
    return (
        <>
            <MetaHead metaTitle={"Community Gallery"} />
            <MainLayout metaTitle="Community Gallery">
                <div className='pt-[50px] w-full'>
                    <Container maxW="container.xl">
                        <CommunityGallery />
                    </Container>
                </div>
            </MainLayout>
        </>
    )
}

export default CommunityGalleryPage