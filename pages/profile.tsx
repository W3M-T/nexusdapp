import React from 'react'
import User from '../views/User'
import { MainLayout } from '../shared/components/ui/MainLayout'
import { MetaHead } from '../shared/components/ui/MetaHead'
import { Container } from '@chakra-ui/react'

function UserPage() {
    return (
        <>
            <MetaHead metaTitle='Profile' />
            <MainLayout>
                <div className='pt-[70px] w-full '>
                    <Container maxW={"container.xl"}>
                        <User />
                    </Container>
                </div>
            </MainLayout >
        </>
    )
}

export default UserPage