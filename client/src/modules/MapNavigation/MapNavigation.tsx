import React, {memo, ReactNode, useEffect, useRef, useState} from 'react';
import {twJoin} from "tailwind-merge";

interface MapNavigationProps {
    children: ReactNode;
    tileSize: number;
    mapSize: number;
    mapCenter: number;
}

export const MapNavigation: React.FC<MapNavigationProps> = memo(({
                                                                     children,
                                                                     tileSize,
                                                                     mapSize,
                                                                     mapCenter
                                                                 }) => {

    const mapNavigationRef = useRef<HTMLDivElement | null>(null);

    /* ----- Map navigation ----- */
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0); // Start dragging click position x
    const [startY, setStartY] = useState(0); // Start dragging click position y
    const [scrollLeft, setScrollLeft] = useState(mapCenter);
    const [scrollTop, setScrollTop] = useState(mapCenter);

    useEffect(() => {
        // Default scroll position - navigate map to the map center
        if (mapNavigationRef.current) {
            console.log(mapNavigationRef.current.offsetWidth, mapNavigationRef.current.offsetHeight);
            mapNavigationRef.current.scrollLeft = mapCenter + -(mapNavigationRef.current.offsetWidth / 2);
            mapNavigationRef.current.scrollTop = mapCenter + -(mapNavigationRef.current.offsetHeight / 2);
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
        const walkX = (x - startX); // Adjust scroll speed here
        const walkY = (y - startY); // Adjust scroll speed here
        mapNavigationRef.current!.scrollLeft = scrollLeft - walkX;
        mapNavigationRef.current!.scrollTop = scrollTop - walkY;
    };

    const handleMouseUpOnMap = () => {
        setIsDragging(false);
    };
    /* ----- Map navigation ----- */

    /* ----- Prevent wheel scroll ----- */
    const handleWheel = (e: any) => {
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
    const [scale, setScale] = useState(0.3);
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);

    const handleWheelZoom = (e) => {
        if (!mapNavigationRef.current) return;

        const boardContainer = mapNavigationRef.current;
        const delta = e.deltaY;
        const currentScale = scale;

        const zoomFactor = delta > 0 ?  0.9 : 1.1;

        const newScale = currentScale * zoomFactor;
        const minScale = 0.1;
        const maxScale = 4.0;

        if (newScale < minScale || newScale > maxScale) return;

        const boundRect = boardContainer.getBoundingClientRect();
        const mouseX = e.clientX - boundRect.left;
        const mouseY = e.clientY - boundRect.top;

        const deltaX = mouseX - (boundRect.width / 2 + boundRect.left);
        const deltaY = mouseY - (boundRect.height / 2 + boundRect.top);

        // const translateXOffset = deltaX * (1 - zoomFactor);
        // const translateYOffset = deltaY * (1 - zoomFactor);

        const translateXOffset = (mouseX - translateX) * (1 - zoomFactor);
        const translateYOffset = (mouseY - translateY) * (1 - zoomFactor);


        console.log(translateXOffset, translateYOffset);


        setScale(newScale);
        setTranslateX(translateX + translateXOffset);
        setTranslateY(translateY + translateYOffset);
    };
    /* ----- Zooming ----- */

    return (

        <div
            // className="h-full w-full"
            className="map-navigation relative select-none no-scrollbar w-full h-full "
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
            // onTouchStart={handleMouseDownOnMap}
            // onTouchMove={handleMouseMoveOnMap}
            onTouchEnd={handleMouseUpOnMap}
        >
            <div
                className="map-navagation__content "
                style={{
                    transformOrigin: "center center",
                    transition: "transform 0.3s ease-in-out",
                    transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`
                }}
            >
                {children}
            </div>
        </div>
    );
});