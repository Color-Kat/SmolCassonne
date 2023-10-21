import React, {memo} from 'react';
import {twJoin} from "tailwind-merge";
import {Tile} from "@pages/GamePage/classes/TilesDeck.tsx";
import {Unit} from "@pages/GamePage/classes/Units.ts";
import {MapContext} from "@pages/GamePage/gameContext.ts";

interface MapTileProps {
    tile: Tile;
    tileSize: number;
}

interface UnitOnTileProps {
    unit: Unit;
    position: 0 | 1 | 2 | 3;
}

function getCommandColor(team: string): string {
    return {
        red: '#f43f5e',
        green: '#22c55e',
        blue: '#0ea5e9',
    }[team] ?? 'magenta';
}

const UnitOnTile: React.FC<UnitOnTileProps> = memo(({
                                                        unit,
                                                        position
                                                    }) => {
    const {setUnitInformation} = React.useContext(MapContext);

    return (
        <img
            onClick={() => setUnitInformation(unit)}
            className={twJoin(
                "rounded-md h-20 absolute z-10 cursor-pointer object-contain",
                "border-4",
                position === 0 && "-top-5 left-1/2 -translate-x-1/2",
                position === 1 && "-right-2 top-1/2 -translate-y-1/2",
                position === 2 && "-bottom-2 left-1/2 -translate-x-1/2",
                position === 3 && "-left-2 top-1/2 -translate-y-1/2"
            )}
            style={{
                borderColor: getCommandColor(unit.team)
            }}
            draggable="false"
            src={unit.image}
            alt={unit.name}
        />
    );
});

export const MapTile: React.FC<MapTileProps> = memo(({
                                                         tile,
                                                         tileSize,
                                                     }) => {

    const {setTileInformation} = React.useContext(MapContext);

    if (!tile.coords) return null;

    return (
        <li
            key={tile.id}
            style={{
                position: 'absolute',
                top: tile.coords.y,
                left: tile.coords.x,
            }}
            className={tile.className ?? ""}
            onClick={() => setTileInformation(tile)}
        >
            <div className="relative w-full h-full">
                {tile.units[0] && <UnitOnTile position={0} unit={tile.units[0]} />}
                {tile.units[1] && <UnitOnTile position={1} unit={tile.units[1]} />}
                {tile.units[2] && <UnitOnTile position={2} unit={tile.units[2]} />}
                {tile.units[3] && <UnitOnTile position={3} unit={tile.units[3]} />}

                {tile.Image(tileSize)}
            </div>
        </li>
    );
});