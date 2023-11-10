import React, {memo, useContext, useState} from 'react';
import {RippleButton} from "@components/Buttons";
import {PurpleButton, RedBorderedButton} from "@UI/Buttons";
import {MapContext, MultiplayerContext} from "@pages/GamePage/gameContext.ts";

import mapIcon from "@assets/icons/map.png";
import {getUnitsByTeam, Unit} from "@pages/GamePage/classes/Units.ts";
import {twJoin} from "tailwind-merge";

interface StartGameScreenProps {
    roomId: string;
}

export const StartGameScreen: React.FC<StartGameScreenProps> = memo(({
                                                                         roomId,
                                                                     }) => {
    const {startGame, leaveRoom} = useContext(MultiplayerContext);
    const {teams, setMyTeamColor, myTeamColor} = useContext(MapContext);

    const listOfUnits = getUnitsByTeam(myTeamColor);
    const [unitInformation, setUnitInformation] = useState<Unit | null>(null);
    const [selectedUnits, setSelectedUnits] = useState([]);


    const handleLeaveRoom = () => {
        leaveRoom(roomId);
        setMyTeamColor(null);
    }

    return (
        <div className="flex justify-center items-center h-full w-full absolute inset-0">
            <div className="flex gap-3 relative items-stre">
                {/* Start The Game */}
                <div className="flex flex-col p-7 rounded-l-3xl rounded-r-lg bg-app">
                    <div className="text-gray-500 text-sm">
                        Комната #{roomId}
                    </div>

                    <h1 className="font-bold text-2xl text-gray-700">
                        Если все в сборе <br/>
                        начните игру
                    </h1>

                    {/* Count of connected players */}
                    <div className="text-5xl font-bold text-slate-700 my-auto mx-auto">
                        <div>{Object.keys(teams).length} / 4</div>
                        <div className="text-sm mt-1 font-semibold text-slate-400 text-right">Игроков</div>
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

                {/*  My units selector  */}
                <div
                    className="flex flex-col gap-3 p-7 flex-1 rounded-r-3xl rounded-l-lg bg-app w-screen max-w-md relative"
                >
                    <h2 className="font-bold text-2xl text-gray-700">
                        Выбор Смолян
                    </h2>

                    <div
                        className="flex flex-wrap gap-1.5 overflow-y-auto no-scrollbar"
                    >
                        {[...listOfUnits, ...listOfUnits, ...listOfUnits].map((unit) => (
                            <button
                                className={twJoin(
                                    "h-",
                                    // "hover:from-indigo-300 hover:to-blue-400",
                                    // "text-slate-600 font-bold",
                                    "flex flex-col items-center justify-between gap-0.25 relative"
                                )}
                                key={unit.id}
                                onMouseOver={() => {
                                    setUnitInformation(unit);
                                }}
                                onMouseLeave={() => {
                                    setUnitInformation(null);
                                }}
                                onClick={() => {
                                    // Add unit to my units
                                }}
                                title={unit.name}
                            >

                                <div className="p-1 bg-gradient-to-tr from-purple-600 to-indigo-500 h-20 rounded-lg">
                                    <img
                                        className={twJoin(
                                            "rounded-md h-full cursor-pointer",
                                        )}
                                        draggable="false"
                                        src={unit.image}
                                        alt={unit.name}
                                    />
                                </div>

                                <div>
                                    {unit.name.split(' ')[0]}
                                </div>

                            </button>
                        ))}
                    </div>

                    {/*  Unit information  */}

                    <div className="border-t-2 border-slate-300 mt-2 pt-2 h-[75px] relative">
                        {unitInformation ? <>
                            <b>Бонус:</b><br/>
                            {unitInformation?.bonusDescription}
                        </> : <div className="text-center font-semibold h-full flex items-center" style={{
                            // @ts-ignore
                            textWrap: 'balance'
                        }}>
                            Выберите 5 Смолян, которые будут в вашей колоде
                        </div>}
                    </div>
                </div>

            </div>
        </div>
    );
});