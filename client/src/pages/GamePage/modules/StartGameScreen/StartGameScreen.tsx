import React, {memo, useContext, useState} from 'react';
import {RippleButton} from "@components/Buttons";
import {PurpleButton, RedBorderedButton} from "@UI/Buttons";
import {MapContext, MultiplayerContext} from "@pages/GamePage/gameContext.ts";


import {getUnitsByTeam, Unit} from "@pages/GamePage/classes/Units.ts";
import {twJoin} from "tailwind-merge";

import mapIcon from "@assets/icons/map.png";
import noUnitImage from "@assets/icons/noUnit.png";
import {BsFillPersonFill} from "react-icons/bs";
import {Team} from "@pages/GamePage/classes/teams.ts";

interface StartGameScreenProps {
    roomId: string;
}

const MY_UNITS_MAX_COUNT = 5;

export const StartGameScreen: React.FC<StartGameScreenProps> = memo(({
                                                                         roomId,
                                                                     }) => {
    const {startGame, leaveRoom} = useContext(MultiplayerContext);
    const {teams, setTeams, setMyTeamColor, myTeamColor, setTooltip} = useContext(MapContext);

    const listOfUnits = getUnitsByTeam(myTeamColor);
    const [unitInformation, setUnitInformation] = useState<Unit | null>(null);
    const [selectedUnits, setSelectedUnits] = useState<Unit[]>([]);

    const handleLeaveRoom = () => {
        leaveRoom(roomId);
        setMyTeamColor(null);
    }

    const handleReady = () => {
        if (selectedUnits.length < MY_UNITS_MAX_COUNT)
            return setTooltip("Выберите 5 Смолян");

        setTeams(prev => {
            const teams = {...prev}
            teams[myTeamColor]?.setUnits(selectedUnits);
            return teams;
        })

        startGame(roomId);
        setTooltip("");
    }

    return (
        <div className="flex flex-col justify-center items-center absolute inset-0 gap-3">
            <div className="flex items-stretch flex-col gap-3">
                <div className="flex gap-3 relative items-stre">
                    {/* Start The Game */}
                    <div className="flex flex-col p-7 rounded-tl-3xl rounded-r-lg rounded-b-lg bg-app">
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
                            onClick={handleReady}
                            ButtonComponent={PurpleButton}
                            className="w-full"
                        >
                            Я готов
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
                        className="flex flex-col gap-3 p-7 flex-1 rounded-tr-3xl rounded-l-lg rounded-b-lg bg-app w-screen max-w-md relative"
                    >
                        <h2 className="font-bold text-2xl text-gray-700">
                            Выбор Смолян
                        </h2>

                        <div
                            className="grid grid-cols-5 gap-1.5 overflow-y-auto no-scrollbar"
                        >
                            {listOfUnits.map((unit) => (
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
                                        setSelectedUnits(prev => {
                                            if (selectedUnits.some(selectedUnit => selectedUnit.id === unit.id)) {
                                                // Unselect unit
                                                return selectedUnits.filter(selectedUnit => selectedUnit.id !== unit.id);
                                            } else if(prev.length < MY_UNITS_MAX_COUNT) {
                                                // Select unit
                                                return [...prev, unit];
                                            } else return prev;
                                        })
                                    }}
                                    title={unit.name}
                                >

                                    <div
                                        className="p-0.5 bg-gradient-to-tr from-purple-200 to-indigo-300 h-20 rounded-lg"
                                    >
                                        <img
                                            className={twJoin(
                                                "rounded-md h-full cursor-pointer",
                                            )}
                                            draggable="false"
                                            src={unit.image}
                                            alt={unit.name}
                                        />
                                    </div>

                                    <div className="text-sm truncate max-w-[85px]">
                                        {unit.name.split(' ')[2]}
                                    </div>

                                </button>
                            ))}
                        </div>

                        {/*  Unit information  */}

                        <div className="border-t-2 border-slate-300 mt-2 pt-2 h-[75px] relative leading-5">
                            {unitInformation ? <>
                                <b>Бонус:</b><br/>
                                {unitInformation?.bonusDescription}
                            </> : <div className="text-center font-semibold h-full flex items-center" style={{
                                // @ts-ignore
                                textWrap: 'balance'
                            }}>
                                Выберите Смолян, которые будут в вашей колоде
                                ({selectedUnits.length}/{MY_UNITS_MAX_COUNT})
                            </div>}
                        </div>
                    </div>
                </div>

                {/* List of selected units */}
                <div className="rounded-b-3xl rounded-t-lg w-ful pb-7 p-3 bg-app">
                    <h2 className="font-bold text-xl text-gray-600 mb-1">
                        Ваша колода
                    </h2>
                    <div
                        className="flex flex-wrap gap-5 overflow-y-auto no-scrollbar"
                    >
                        {[0, 1, 2, 3, 4].map((unitNumber) => {
                            if (selectedUnits[unitNumber]) {
                                const unit = selectedUnits[unitNumber];
                                return (
                                    <button
                                        className={twJoin(
                                            "h-28 w-[85px]",
                                            "flex flex-col items-center gap-0.25 relative"
                                        )}
                                        key={unit.id}
                                        onClick={() => {
                                            // Unselect unit
                                            setSelectedUnits((prev) => (
                                                prev.filter(selectedUnit => selectedUnit.id !== unit.id)
                                            ));
                                        }}
                                        title={unit.name}
                                    >
                                        <div
                                            className="p-1 bg-gradient-to-tr from-purple-600 to-indigo-500 h-20 rounded-md"
                                        >
                                            <img
                                                className={twJoin(
                                                    "rounded-sm h-full cursor-pointer",
                                                )}
                                                draggable="false"
                                                src={unit.image}
                                                alt={unit.name}
                                            />
                                        </div>

                                        <div className="text-sm truncat text-center ">
                                            {unit.name.split(' ')[2]}
                                        </div>

                                    </button>
                                )
                            } else {
                                return (
                                    <button
                                        className="flex flex-col items-center justify-between w-[85px] gap-0.25 relative border-4 rounded-lg p-2 border-gray-600 h-28"
                                        key={unitNumber + 990}
                                        title="Пусто"
                                    >
                                        <BsFillPersonFill className="text-4xl text-slate-700"/>

                                        <div>Пусто</div>
                                    </button>
                                );
                            }
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
});