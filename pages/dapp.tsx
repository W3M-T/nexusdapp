import React from 'react'
import Home from '../views/Home/Home'
import { MetaHead } from '../shared/components/ui/MetaHead'

function DappPage() {
    return (
        <>
            <MetaHead metaTitle={"dApp"} />
            <Home />
        </>
    )
}

export default DappPage