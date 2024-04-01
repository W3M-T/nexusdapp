import React from 'react'
import Chatai from './index';
import Tabs from '../../shared/components/ui/Tabs/index';
import { Container } from '@chakra-ui/react';

function MainChatAi() {
    return (
        <div>
            <Container maxW={"container.xl"}>
                <Tabs chat={true} />
                <Chatai />
            </Container >
        </div>
    )
}

export default MainChatAi