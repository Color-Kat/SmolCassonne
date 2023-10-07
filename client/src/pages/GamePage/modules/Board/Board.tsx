import { Helmet } from "react-helmet";
import React, { MouseEvent, useState } from "react";
import TilesDeck, { ITile } from "../../classes/TilesDeck";
import { twJoin } from "tailwind-merge";

interface BoardProps {
    currentTile: ITile | undefined;
    setTooltip: React.Dispatch<React.SetStateAction<string>>;
    endOfTurn: () => void;
}

interface IMapTile extends ITile {
    coords: {
        x: number;
        y: number;
    };
}

export const Board: React.FC<BoardProps> = ({
    currentTile,
    setTooltip,
    endOfTurn
}) => {
    const tileSize = 198;
    const [map, setMap] = useState<IMapTile[]>([]);

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [showTile, setShowTile] = useState(false);

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = event;
        setPosition({ x: clientX, y: clientY });
    }

    const handleMouseEnter = () => {
        setShowTile(true);
    }

    const handleMouseLeave = () => {
        setShowTile(false);
    }

    const placeTile = (e: MouseEvent<HTMLDivElement>) => {
        if (!currentTile) return;
        const { clientX: mouseX, clientY: mouseY } = e;

        setMap(map => ([
            ...map,
            {
                ...currentTile,
                coords: {
                    x: mouseX - mouseX % tileSize - tileSize,
                    y: mouseY - mouseY % tileSize
                }
            }
        ]));

        endOfTurn();
    }

    // const getClickPosition(e, spaces, tileSize) {
    //     let x = e.clientX
    //     let y = e.clientY

    //     let placement = spaces.filter(space => {
    //         return (_.inRange(y, space[0], space[0]+tileSize)) &&   (_.inRange(x, space[1], space[1]+tileSize))
    //       // update neighbor to true
    //     })
    //     placeTile(placement[0])
    //   }

    return (
        <div
            className={twJoin(
                "h-screen flex flex-1 relative",
                showTile && currentTile && "cursor-none"    
            )}
            onMouseMove={handleMouseMove}
            onMouseOver={handleMouseEnter}
            onMouseOut={handleMouseLeave}
            onClick={placeTile}
        >
            {showTile && currentTile && (
                <img
                    className=""
                    src={`/tiles/${currentTile.design}.png`} // Укажите путь к вашей картинке
                    alt=""
                    style={{
                        position: 'absolute',
                        left: position.x - 200 - tileSize / 2 + 'px', // Смещение относительно курсора
                        top: position.y - 50 - tileSize / 2 + 'px',
                        width: tileSize + 'px',
                        height: tileSize + 'px',
                        transform: `rotate(${90 * currentTile.rotation}deg)`,
                        zIndex: 100, // Задайте z-index, чтобы изображение было выше остальных элементов
                    }}
                />
            )}

            <ul className="relative w-full h-full">
                {map.map(tile => {
                    return (
                        <li
                            key={tile.id}
                            style={{
                                position: 'absolute',
                                top: tile.coords.y,
                                left: tile.coords.x,
                            }}
                        >
                            <img
                                className="rounded-sm"
                                src={`/tiles/${tile.design}.png`} 
                                alt=""
                                style={{
                                    width: tileSize + 'px',
                                    height: tileSize + 'px',
                                    transform: `rotate(${90 * tile.rotation}deg)`
                                }}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};