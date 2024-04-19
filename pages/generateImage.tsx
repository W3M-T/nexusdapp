// import { ImageGenerator } from '@src/components'
import React from 'react'
import ImageGenerator from '../views/ImageGeneration'
import { MainLayout } from '../shared/components/ui/MainLayout'
import { MetaHead } from '../shared/components/ui/MetaHead'

function ImageGeneratorPage() {
    return (
        <>
            <MetaHead metaTitle={"Generate Image"} />
            <MainLayout>
                <div className='back-bg pt-[50px] w-full'>
                    <ImageGenerator />
                </div>
            </MainLayout>
        </>
    )
}

export default ImageGeneratorPage