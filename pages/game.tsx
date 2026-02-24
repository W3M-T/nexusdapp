import type { NextPage } from "next";
import { MetaHead } from "../shared/components/ui/MetaHead";
import Game from "../views/Game/Game";
import { route } from "../shared/utils/routes";

const GamePage: NextPage = () => {
  return (
    <>
      <MetaHead metaTitle={route.game.name} />
      <Game />
    </>
  );
};

export default GamePage;
