import {Unit} from "@pages/GamePage/classes/Units.ts";
import React, {memo, useCallback} from "react";
import {MapContext} from "@pages/GamePage/gameContext.ts";
import {twJoin} from "tailwind-merge";

interface UnitProps {
    unit: Unit;
}

export const UnitCard: React.FC<UnitProps> = memo(({unit}) => {
    const {setUnitInformation} = React.useContext(MapContext);

    const handleUnitClick = useCallback(() => {
        setUnitInformation(unit);
    }, []);

    return (
        <li>
            <img
                src={unit.image}
                alt={unit.name}
                onClick={handleUnitClick}
                className={
                    twJoin(
                        "object-contain h-12 cursor-pointer rounded-md",
                        unit.occupied && "opacity-50 border-2 border-red-400"
                    )
                }
            />
        </li>
    );
});