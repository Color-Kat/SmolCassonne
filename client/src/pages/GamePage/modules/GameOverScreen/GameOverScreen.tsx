import React, {memo, useContext, useMemo} from 'react';
import {RippleButton} from "@components/Buttons";
import {PurpleButton} from "@UI/Buttons";
import {GameStageContext, MapContext, MultiplayerContext} from "@pages/GamePage/gameContext.ts";
import {IUser} from "@/store/auth/auth.slice.ts";
import {Team} from "@pages/GamePage/classes/teams.ts";
import TilesDeck from "@pages/GamePage/classes/TilesDeck.tsx";

interface GameOverScreenProps {
    winners: Team[];
    setWinners: React.Dispatch<React.SetStateAction<Team[]>>;

    roomId: string;
    setRoomId: React.Dispatch<React.SetStateAction<string>>;
    user: IUser;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = memo(({
                                                                       winners,
                                                                       setWinners,
                                                                       roomId,
                                                                       setRoomId,
                                                                       user
                                                                   }) => {
    const {setStage} = useContext(GameStageContext);
    const {myTeamColor, setMyTeamColor, setDeck, setTeams, setMap} = useContext(MapContext);
    const {leaveRoom} = useContext(MultiplayerContext);

    const gameResult = useMemo(() => {
        const myTeamIndex = winners.findIndex((team) => team.color === myTeamColor);
        console.log('hereeee', myTeamIndex, myTeamColor, winners)
        return {
            myScore: winners[myTeamIndex].score,
            myPlace: myTeamIndex + 1
        }
    }, [winners, myTeamColor]);

    const exit = () => {
        setMyTeamColor(null);
        setTeams({});
        setMap([]);
        setRoomId("");
        setStage("notStarted");
        setDeck(new TilesDeck().getShuffledDeck());
        setWinners([]);

        leaveRoom(roomId);
    }

    return (
        <div className="flex justify-center items-center h-full w-full absolute inset-0 bg-black/50 z-20">
            <div className="flex flex-col p-7 bg-app rounded-3xl">
                {/* Congratulations */}
                {gameResult.myPlace == 1 && <div className="text-gray-500 text-sm">
                    Поздравляем с победой!
                </div>}

                <h1 className="font-bold text-2xl text-gray-700">
                    Игра завершена
                </h1>

                {/* Count of connected players */}

                {/* My place */}
                <div className="my-8 mx-auto text-center">
                    <div className="text-gray-500 text-base font-semibold">
                        Вы заняли
                    </div>
                    <div className="text-4xl font-bold text-slate-700">
                        {gameResult.myPlace} место
                    </div>

                    <div className="text-gray-500  text-base font-semibold mt-2">
                        Ваш счёт: {gameResult.myScore}
                    </div>
                </div>

                {/* Opponents */}
                <div className="flex gap-3 mx-auto">
                    {winners.map((team, i) => (
                        <div
                            className="p-1.5 px-7 rounded-xl bg-gray-300"
                            key={team.color}
                        >

                            <div className="text-semibol text-lg text-gray-600 tracking-widest">
                                <b>{i + 1}</b> место
                            </div>

                            <div
                                className="text-3xl font-bold"
                                style={{color: team.getTeamColor()}
                                }>
                                {team.name}
                            </div>

                        </div>
                    ))}
                </div>

                <RippleButton
                    onClick={exit}
                    ButtonComponent={PurpleButton}
                    className="w-full mt-8"
                >
                    Покинуть комнату
                </RippleButton>
            </div>
        </div>
    );
});