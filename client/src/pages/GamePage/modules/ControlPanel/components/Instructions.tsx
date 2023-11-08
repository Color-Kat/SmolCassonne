import React, {memo, useContext} from 'react';
import {GameStageContext} from "@pages/GamePage/gameContext.ts";

interface InstructionsProps {

}

export const Instructions: React.FC<InstructionsProps> = memo(({}) => {
    const {stage} = useContext(GameStageContext);

    return (
        <div className="w-full rounded-lg bg-white/20 flex-1 my-7">
            {stage === 'notStarted' && <div>
                Ожидание игроков
            </div>}

            {stage === 'emptyMap' && <div>
                Загрузка карты
            </div>}

            {stage === 'takeTile' && <div>
                Возьмите тайл из колоды и разместите его на карту так, чтобы его стороны совпадали с уже поставленными тайлами
            </div>}

            {stage === 'tilePlaced' && <div>
                Вы можете разместить фишку на тайле, чтобы получить очки при завершении объекта.
            </div>}

            {stage === 'unitPlaced' && <div>
                Фишка размещена
            </div>}

            {stage === 'scoring' && <div>
                Подсчёт очков
            </div>}

            {stage === 'endOfTurn' && <div>
                Конец хода
            </div>}

            {stage === 'wait' && <div>
                Ход оппонента, ожидайте
            </div>}

            {stage === 'gameOver' && <div>
                Игра завершена
            </div>}
        </div>
    );
});