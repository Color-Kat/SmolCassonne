import React, {memo} from 'react';

interface YourMoveProps {

}

export const YourMove: React.FC<YourMoveProps> = memo(({}) => {


    return (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-app/70 rounded-lg pt-3 pb-1.5 px-6 z-10 pointer-events-none">
            <div className="text-gray-900 animate-bounce">
                Ваш ход
            </div>
        </div>
    );
});