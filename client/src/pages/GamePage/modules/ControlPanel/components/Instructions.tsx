import React, {memo, useContext} from 'react';
import {GameStageContext} from "@pages/GamePage/gameContext.ts";
import {Loader} from "@UI/Loaders";

interface InstructionsProps {

}

const StageDescription: React.FC<{ title?: string, description?: string }> = memo(({
                                                                                                   title,
                                                                                                   description
                                                                                               }) => {
    return (
        <div className="flex flex-col justify-center p-4 gap-2">
            {title && <h3 className="text-2xl leading-6 text-left font-bold text-gray-600">{title}</h3>}

            {description && <p className="leading-4 text-justify">
                {description}
            </p>}
        </div>
    );
});

export const Instructions: React.FC<InstructionsProps> = memo(({}) => {
    const {stage} = useContext(GameStageContext);

    return (
        <div className="w-full rounded-xl bg-app/20 shadow-md flex flex- aspect-square my-7 text-center text-sm">
            {stage === 'notStarted' && <StageDescription title="Ожидание игроков" />}

            {stage === 'emptyMap' && <StageDescription title="Загрузка карты" />}

            {stage === 'takeTile' && <StageDescription
                title="Разместите тайл"
                description="Выберите тайл из колоды и поместите его на игровое поле так, чтобы его края соответствовали уже
                размещенным тайлам."
            />}

            {stage === 'tilePlaced' && <StageDescription
                title="Установите фишку"
                description="Размещение фишки: Вы можете разместить фишку на тайле, чтобы получить очки, когда объект будет завершен."
            />}

            {/*{stage === 'unitPlaced' && <div>*/}
            {/*    Фишка размещена*/}
            {/*</div>}*/}

            {/*{stage === 'scoring' && <div>*/}
            {/*    Подсчёт очков*/}
            {/*</div>}*/}

            {stage === 'endOfTurn' && <StageDescription title="Конец хода"/>}

            {stage === 'wait' && <StageDescription title="Ход оппонента"/>}
            <Loader />

            {stage === 'gameOver' && <StageDescription title="Игра завершена"/>}

        </div>
    );
});