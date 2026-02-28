import type { NextPage } from "next";
import { MetaHead } from "../shared/components/ui/MetaHead";
import NexusGame from "../views/NexusGame/NexusGame";

const NexusGamePage: NextPage = () => {
    return (
          <>
                <MetaHead metaTitle="Nexus Game" />
                <NexusGame />
          </>>
        );
};

export default NexusGamePage;</>
