import React, {memo, useContext} from 'react';
import {RippleButton} from "@components/Buttons";
import {PurpleButton, RedBorderedButton} from "@UI/Buttons";
import {MapContext, MultiplayerContext} from "@pages/GamePage/gameContext.ts";
import {SimpleInput} from "@components/Inputs";
import {twMerge} from "tailwind-merge";
import {IUser} from "@/store/auth/auth.slice.ts";
import {RainbowLoader} from "@UI/Loaders";

interface StartGameScreenProps {
    roomId: string;
    setRoomId: React.Dispatch<React.SetStateAction<string>>;
    isConnectedToRoom: boolean;
    user: IUser;
}

export const StartGameScreen: React.FC<StartGameScreenProps> = memo(({
     roomId,
     setRoomId,
     isConnectedToRoom,
     user
 }) => {
    const {joinRoom, startGame, leaveRoom} = useContext(MultiplayerContext);
    const {teams} = useContext(MapContext);

    const handleLeaveRoom = () => {
        leaveRoom(roomId);
    }

    return (
        <div className="flex justify-center items-center h-full w-full absolute inset-0">
            {/*TODO loader*/}
            {/*<RainbowLoader className="mt-24"/>*/}

            {/* Join room */}
            {!isConnectedToRoom && <div className="flex flex-col gap-3 p-7 rounded-3xl bg-app">
                <h1 className="font-bold text-2xl text-gray-700 mb-5">
                    Подключитесь <br/>к комнате
                </h1>

                <input
                    id="roomId"
                    name="roomId"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    placeholder="Введите ID комнаты"
                    className={twMerge(
                        "w-full border border-gray-300 block p-2.5",
                        "focus:outline-none focus:ring-2 focus:ring-app-accent/50",
                        "bg-white/70 backdrop-blur-xl text-gray-900 text-sm rounded-lg",
                        "placeholder-gray-400",
                        "w-full"
                    )}
                />

                <RippleButton
                    onClick={() => joinRoom(roomId, user)}
                    ButtonComponent={PurpleButton}
                    className="w-full"
                >
                    Войти в комнату
                </RippleButton>
            </div>}


            {/* Start The Game */}
            {isConnectedToRoom && <div className="flex flex-col  p-7 rounded-3xl bg-app">
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
            </div>}
        </div>
    );
});