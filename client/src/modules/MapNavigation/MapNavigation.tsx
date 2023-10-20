import React, {memo, ReactNode, useEffect, useRef, useState} from 'react';
import {twJoin} from "tailwind-merge";

interface MapNavigationProps {
    children: ReactNode;
    tileSize: number;
    mapSize: number;
    mapCenter: number;

    setForwardScale: React.Dispatch<React.SetStateAction<number>>;
}

export const MapNavigation: React.FC<MapNavigationProps> = memo(({
                                                                     children,
                                                                     tileSize,
                                                                     mapSize,
                                                                     mapCenter,

                                                                     setForwardScale
                                                                 }) => {

    const mapNavigationRef = useRef<HTMLDivElement | null>(null);

    /* ----- Map navigation ----- */
    const [startX, setStartX] = useState(0); // Start dragging click position x
    const [startY, setStartY] = useState(0); // Start dragging click position y
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        // Default scroll position - navigate map to the map center
        if (mapNavigationRef.current) {
            mapNavigationRef.current.scrollLeft = mapCenter - (mapNavigationRef.current.offsetWidth / 2);
            mapNavigationRef.current.scrollTop = mapCenter - (mapNavigationRef.current.offsetHeight / 2);
        }
    }, []);

    const handleMouseDownOnMap = (e: React.MouseEvent) => {
        if (!mapNavigationRef.current) return;

        setIsDragging(true);

        setStartX(e.pageX);
        setStartY(e.pageY);
        setScrollLeft(mapNavigationRef.current.scrollLeft);
        setScrollTop(mapNavigationRef.current.scrollTop);
    };

    const handleMouseMoveOnMap = (e: React.MouseEvent) => {
        if (!isDragging) return;

        const x = e.clientX;
        const y = e.clientY;
        const walkX = (startX - x); // Adjust scroll speed here
        const walkY = (startY - y); // Adjust scroll speed here
        mapNavigationRef.current!.scrollLeft = scrollLeft + walkX;
        mapNavigationRef.current!.scrollTop = scrollTop + walkY;
    };

    const handleMouseUpOnMap = () => {
        setIsDragging(false);
    };
    /* ----- Map navigation ----- */

    /* ----- Prevent wheel scroll ----- */
    const handleWheel = (e: MouseEvent) => {
        e.preventDefault();

        return false;
    };

    useEffect(() => {
        if (mapNavigationRef.current)
            mapNavigationRef.current!.addEventListener('wheel', handleWheel, {passive: false});

        return () => {
            if (mapNavigationRef.current)
                mapNavigationRef.current!.removeEventListener('wheel', handleWheel);
        };
    }, []);
    /* ----- Prevent wheel scroll ----- */

    /* ----- Zooming ----- */
    const [scale, setScale] = useState(1.0);
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    const handleWheelZoom = (e: any) => {
        if (!mapNavigationRef.current) return;

        // Get scale
        const zoomFactor = e.deltaY > 0 ? 0.8 : 1.2;
        const newScale = scale * zoomFactor;
        const minScale = 0.5;
        const maxScale = 2.0;
        if (newScale < minScale || newScale > maxScale) return;

        const containerRect = mapNavigationRef.current.getBoundingClientRect();

        const newMouseX = e.clientX - containerRect.left + mapNavigationRef.current.scrollLeft;
        const newMouseY = e.clientY - containerRect.top + mapNavigationRef.current.scrollTop;

        setScale(newScale);
        setForwardScale(newScale);
        setMouseX(newMouseX);
        setMouseY(newMouseY);
    };
    /* ----- Zooming ----- */


    return (

        <div
            // className="h-full w-full"
            className={twJoin(
                "map-navigation absolute inset-0 select-none no-scrollbar w-full h-full",
            )}
            ref={mapNavigationRef} // Добавьте ссылку на контейнер
            style={{
                width: "100%",
                height: "100%",
                overflow: "scroll",
                cursor: isDragging ? "grabbing" : "grab",
            }}
            onWheel={handleWheelZoom} // Добавьте обработчик колесика мыши
            onMouseDown={handleMouseDownOnMap}
            onMouseMove={handleMouseMoveOnMap}
            onMouseUp={handleMouseUpOnMap}
            onMouseLeave={handleMouseUpOnMap}
        >
            <div
                className="map-navagation__content"
                style={{
                    position: "absolute",
                    transformOrigin: `${mouseX}px ${mouseY}px`,
                    transition: "transform 0.3s ease-in-out, transform-origin 0.3s ease-out",
                    transform: `scale(${scale})`
                }}
            >
                {children}
            </div>
        </div>
    );
});