import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';

import {router} from "./routes/router.js";
import {MultiPlayerController} from "./controllers/MultiPlayerController.js";

// console.log(new TestController());
const PORT = process.env.PORT || 5000;

const app = expressWs(express()).app;
// const WSServer = new ExpressWs(app);

app.use(cors());
app.use(express.json());

app.use('/', router);

app.ws('/multiplayer', new MultiPlayerController().initWebsocket);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})