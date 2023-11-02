import {useEffect, useRef} from "react";

interface IWebsocketServerResponse {
    method: string;
    [key: string]: any;
}

export const useWebsocket = (url: string, onEventCallback: (method: string, data: any) => void) => {
    // Ref for websocket connection
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        // Create a websocket connection
        socketRef.current = new WebSocket(url);

        // On open event
        socketRef.current.onopen = () => {
            console.log('Connected to the websocket server');
        };

        // Handle events from the server
        socketRef.current.onmessage = (event) => {
            const data: IWebsocketServerResponse = JSON.parse(event.data);
            console.log(data);

            onEventCallback(data.method, data);
        };

        // Close connection
        // return () => {
        //     socketRef.current?.close();
        // };
    }, []);

    const sendToWebsocket = (data: any) => {
        // if(socketRef.current?.readyState !== WebSocket.OPEN) return false;
        socketRef.current?.send(JSON.stringify(data));
    };

    return {
        sendToWebsocket,

    }
};