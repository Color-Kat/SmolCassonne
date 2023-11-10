import React, {memo, useContext} from 'react';
import {RippleButton} from "@components/Buttons";
import {PurpleButton, RedBorderedButton} from "@UI/Buttons";
import {MapContext, MultiplayerContext} from "@pages/GamePage/gameContext.ts";
import {twJoin, twMerge} from "tailwind-merge";
import {IUser} from "@/store/auth/auth.slice.ts";
import {IRooms} from "@pages/GamePage/hooks/useMultiplayer.ts";

import mapIcon from "@assets/icons/map.png";

interface StartGameScreenProps {
    roomId: string;
}

export const StartGameScreen: React.FC<StartGameScreenProps> = memo(({
                                                                         roomId,
                                                                     }) => {
    const {startGame, leaveRoom} = useContext(MultiplayerContext);
    const {teams, setMyTeamColor} = useContext(MapContext);

    const handleLeaveRoom = () => {
        leaveRoom(roomId);
        setMyTeamColor(null);
    }

    return (
        <div className="flex justify-center items-center h-full w-full absolute inset-0">
            {/* Start The Game */}
            <div className="flex flex-col  p-7 rounded-3xl bg-app">
                <div className="text-gray-500 text-sm">
                    Комната #{roomId}
                </div>

                <h1 className="font-bold text-2xl text-gray-700">
                    Если все в сборе <br/>
                    начните игру
                </h1>

                {/* Count of connected players */}
                <div className="text-4xl font-bold text-slate-700 my-8 mx-auto">
                    {Object.keys(teams).length} / 4
                </div>

                <RippleButton
                    onClick={() => startGame(roomId)}
                    ButtonComponent={PurpleButton}
                    className="w-full"
                >
                    Начать игру
                </RippleButton>

                <RippleButton
                    onClick={handleLeaveRoom}
                    ButtonComponent={RedBorderedButton}
                    className="w-full mt-3 py-1.5"
                >
                    Назад
                </RippleButton>
            </div>
        </div>
    );
});