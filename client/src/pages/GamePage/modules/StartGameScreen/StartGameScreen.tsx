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
    setRoomId: React.Dispatch<React.SetStateAction<string>>;
    freeRooms: IRooms;
    isConnectedToRoom: boolean;
    user: IUser;
}

export const StartGameScreen: React.FC<StartGameScreenProps> = memo(({
                                                                         roomId,
                                                                         setRoomId,
                                                                         freeRooms,
                                                                         isConnectedToRoom,
                                                                         user
                                                                     }) => {
    const {joinRoom, startGame, leaveRoom} = useContext(MultiplayerContext);
    const {teams, setMyTeamColor} = useContext(MapContext);

    const handleLeaveRoom = () => {
        leaveRoom(roomId);
        setMyTeamColor(null);
    }

    return (
        <div className="flex justify-center items-center h-full w-full absolute inset-0">
            {/*TODO loader*/}
            {/*<RainbowLoader className="mt-24"/>*/}

            {/* Join room */}
            {!isConnectedToRoom && <div className="flex gap-3">
                {/* Join by ID */}
                <div className="flex flex-col gap-3 p-7 rounded-l-3xl rounded-r-lg bg-app">
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
                </div>

                {/*  Select room from the list  */}
                <div className="flex flex-col gap-3 p-7 rounded-r-3xl rounded-l-lg bg-app max-h-[250px] max-w-md relative">
                    <h2 className="font-bold text-2xl text-gray-700">
                        Открытые комнаты
                    </h2>

                    {Object.keys(freeRooms).length == 0 && <div className="flex w-screen h-full">
                        <div className="text-sltate-600 my-auto text-lg">
                            Нет свободных комнат, <br/>
                            создайте новую.
                        </div>
                    </div>}

                    <div className="grid grid-cols-3 gap-3 overflow-y-auto no-scrollbar rounded-lg pt-1.5 pr-1.5 w-screen max-w-md">
                        {Object.values(freeRooms).map((room) => (
                            <button
                                className={twJoin(
                                    "bg-app-primary rounded-lg h-max py-2.5 px-2",
                                    "bg-gradient-to-tr from-blue-300 to-indigo-200",
                                    "hover:from-indigo-300 hover:to-blue-400",
                                    "text-slate-600 font-bold",
                                    "flex items-center justify-between gap-2.5 relative"
                                )}
                                key={room.roomId}
                                onClick={() => {
                                    setRoomId(room.roomId);
                                    joinRoom(room.roomId, user);
                                }}
                                title={room.roomId}
                            >
                                <div className="max-w-[85px] truncate">
                                    #{room.roomId}
                                </div>

                                <div className="font-semibold tracking-tighter">
                                    {room.playersCount} / 4
                                </div>

                                <div className="rounded-full w-3 h-3 bg-green-500 absolute -top-1.5 -right-1.5"></div>
                            </button>
                        ))}

                    </div>

                    {/*<img*/}
                    {/*    className="absolute h-full -bottom-6 -right-2 opacity-50 grayscal"*/}
                    {/*    src={mapIcon}*/}
                    {/*    alt=""*/}
                    {/*/>*/}
                </div>
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