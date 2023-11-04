import React, {memo, useContext} from 'react';
import {RippleButton} from "@components/Buttons";
import {PurpleButton} from "@UI/Buttons";
import {MultiplayerContext} from "@pages/GamePage/gameContext.ts";

interface StartGameScreenProps {

}

export const StartGameScreen: React.FC<StartGameScreenProps> = memo(({}) => {
    const {roomId, startGame} = useContext(MultiplayerContext);

    return (
        <div className="flex items-center h-full w-full absolute inset-0">
            <RippleButton onClick={() => startGame(roomId)} ButtonComponent={PurpleButton}>
                Начать игру
            </RippleButton>
        </div>
    );
});