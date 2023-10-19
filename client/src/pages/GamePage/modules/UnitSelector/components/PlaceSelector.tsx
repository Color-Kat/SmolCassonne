import React, {memo} from 'react';
import tableWoodImage from "@assets/textures/tableWood.png";
import {twJoin} from "tailwind-merge";
import {Unit} from "@pages/GamePage/classes/Units.ts";
import {Tile} from "@pages/GamePage/classes/TilesDeck.tsx";

import {MapContext} from '@pages/GamePage/mapContext.ts';

interface PlaceSelectorProps {
    selectedUnit: Unit | null;
    setMap: React.Dispatch<React.SetStateAction<Tile[]>>;
    PlacedTile: any;

    closeSelectingUnit: () => void;
}

interface UnitPlaceProps {
    selectedUnit: Unit | null;
    position: 0 | 1 | 2 | 3;
    setMap: React.Dispatch<React.SetStateAction<Tile[]>>;
    closeSelectingUnit: () => void;
}

const UnitPlace: React.FC<UnitPlaceProps> = memo(({
                                                      selectedUnit,
                                                      position,
                                                      setMap,
                                                      closeSelectingUnit,
                                                  }) => {
    const {map, tileSize, setTooltip} = React.useContext(MapContext);

    // Place unit on the placed tile
    const placeUnit = () => {
        const canBePlaced = selectedUnit?.canBePlacedOnMap(position, map, tileSize)

        if (selectedUnit && canBePlaced) {
            // Add unit to the tile on the map
            setMap(prev => {
                const newMap = [...prev];
                newMap[newMap.length - 1] = (new Tile(newMap[newMap.length - 1])).setUnit(selectedUnit, position);
                return newMap;
            });

            closeSelectingUnit(); // Close unit selecting modal
        }

        if(!canBePlaced) setTooltip("На этом объекте уже стоит другая фишка");
    };

    return (
        <button
            className={twJoin(
                "rounded-full bg-gray-300/30 border-2 border-gray-300 w-12 h-12 absolute z-10",
                selectedUnit && "hover:bg-gray-300/50",
                position === 0 && "top-0 left-1/2 -translate-x-1/2",
                position === 1 && "right-0 top-1/2 -translate-y-1/2",
                position === 2 && "bottom-0 left-1/2 -translate-x-1/2",
                position === 3 && "left-0 top-1/2 -translate-y-1/2"
            )}
            disabled={!selectedUnit}
            onClick={placeUnit}
        ></button>
    );
});

export const PlaceSelector: React.FC<PlaceSelectorProps> = memo(({
                                                                     selectedUnit,
                                                                     setMap,
                                                                     PlacedTile,
                                                                     closeSelectingUnit,
                                                                 }) => {

    return (
        <div
            className="bg-white p-4 rounded-xl shadow-xl max-w-sm w-full flex flex-col justify-center gap-5 cursor-default"
            style={{
                background: `url(${tableWoodImage})`,
                backgroundRepeat: "repeat"
            }}
        >
            <h2 className="text-xl text-white font-semibold text-center">
                Установка фишки
            </h2>

            <div className="mx-auto w-max h-max relative">

                <UnitPlace selectedUnit={selectedUnit} position={0} setMap={setMap} closeSelectingUnit={closeSelectingUnit}/>
                <UnitPlace selectedUnit={selectedUnit} position={1} setMap={setMap} closeSelectingUnit={closeSelectingUnit}/>
                <UnitPlace selectedUnit={selectedUnit} position={2} setMap={setMap} closeSelectingUnit={closeSelectingUnit}/>
                <UnitPlace selectedUnit={selectedUnit} position={3} setMap={setMap} closeSelectingUnit={closeSelectingUnit}/>

                <PlacedTile/>
            </div>

            <button
                onClick={closeSelectingUnit}
                className="text-gray-200 px-8 py-1.5 rounded-md bg-gray-300/20 hover:bg-gray-300/40 w-max mx-auto"
            >
                Пропустить
            </button>
        </div>
    );
});