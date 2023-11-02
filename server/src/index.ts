import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';

import {router} from "./routes/router.js";
import {MultiPlayerController} from "./controllers/MultiPlayerController.js";

// console.log(new TestController());
const PORT = process.env.PORT || 5000;

const wsServer = expressWs(express());
const app = wsServer.app;
// const WSServer = new ExpressWs(app);

app.use(cors());
app.use(express.json());

app.use('/', router);
app.ws('/multiplayer', new MultiPlayerController(wsServer).initWebsocket);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})