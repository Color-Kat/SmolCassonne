import React, {memo, useEffect} from 'react';
import tileBack from "@assets/tileBack.jpg";
import {IMapTile, Tile} from "@pages/GamePage/classes/TilesDeck.tsx";

interface ControlPanelProps {
    currentTile: Tile | undefined;
    setCurrentTile: React.Dispatch<React.SetStateAction<Tile | undefined>>;
    deck: Tile[];
    setDeck: React.Dispatch<React.SetStateAction<Tile[]>>;
}

export const ControlPanel: React.FC<ControlPanelProps> = memo(({
                                                                   currentTile,
                                                                   setCurrentTile,
                                                                   deck,
                                                                   setDeck
                                                               }) => {

    const takeTile = () => {
        if (deck.length == 0 || currentTile) return;

        const deckCopy = [...deck];
        setCurrentTile(deckCopy.pop()); // Retrieve the last tile in the deck

        // Save deck without the last tile
        setDeck(deckCopy);
    };

    const rotateTile = (rotateValue: number) => {
        if (!currentTile) return;

        // if (rotateValue < 0) rotateValue = 4 + rotateValue;
        //
        // setCurrentTile((tile) => (tile ?
        //     {
        //         ...tile,
        //         rotation: Math.abs((tile.rotation + rotateValue)) % 4
        //     } : undefined
        // ));

       setCurrentTile(tile => {
           if(!tile) return undefined;
           const newTile = new Tile(tile);
           return newTile.rotate(rotateValue);
       })

        console.log(currentTile);
    };

    const rotateTileLeft = () => rotateTile(-1);
    const rotateTileRight = () => rotateTile(1);

    useEffect(() => {
        function handleKeyPress(e: KeyboardEvent) {
            if (e.keyCode === 37) {
                // Arrow left
                rotateTileLeft();
            } else if (e.keyCode === 39) {
                // Arrow right
                rotateTileRight();
            }
        }

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [rotateTileLeft, rotateTileRight]);

    return (
        <div className="h-full w-56 flex flex-col items-center px-3 py-5 bg-gray-300 absolute z-50">
            <div className="w-48 h-48 relative mb-16  transition-all">
                 Top tile
                {deck.length > 0 && <img
                    src={currentTile ? `/tiles/${currentTile.design}.png` : tileBack}
                    onClick={() => !currentTile ? takeTile() : null}
                    alt=""
                    className="z-10 absolute top-2 hover:top-0 cursor-pointer w-full h-full rounded-md"
                    style={{
                        transform: currentTile ? `rotate(${90 * currentTile.rotation}deg)` : '',
                        transition: 'transform 0.25s ease-in-out'
                    }}
                />}

                {deck.length > 3 && <img src={tileBack} alt="" className="absolute w-full top-8  rounded-md"/>}
                {deck.length > 2 && <img src={tileBack} alt="" className="absolute w-full top-6  rounded-md"/>}
                {deck.length > 1 && <img src={tileBack} alt="" className="absolute w-full top-4  rounded-md"/>}
                {deck.length === 0 && <div className="absolute w-full h-full top-4 rounded-md flex-center text-black font-bold">Колода закончилась</div>}
            </div>

            <button
                className="w-full h-12 bg-zinc-500/70 hover:bg-zinc-500/50 rounded-md font-bold text-lg text-white mb-2"
                onClick={takeTile}
            >
                Взять тайл
            </button>

            <div className="flex justify-between w-full gap-3">
                <button onClick={rotateTileLeft}
                        className="h-8 bg-zinc-500/70 hover:bg-zinc-500/50 rounded-md text-white flex-1">Влево
                </button>
                <button onClick={rotateTileRight}
                        className="h-8 bg-zinc-500/70 hover:bg-zinc-500/50 rounded-md text-white flex-1">Вправо
                </button>
            </div>
        </div>
    );
});