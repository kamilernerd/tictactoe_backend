import express, {Request, Response, NextFunction} from 'express';
import * as path from "path";
import * as WebSocket from 'ws';
import { SocketMessage, SocketMessageType } from "./types/types";
import { randomUUID } from "crypto";

(async () => {
  const app = express();

  app.use('/public', express.static('public'))

  app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, './view/index.html'));
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.info(
      `${req.ip} / ${
        req.method
      } - ${req.url} - ${req.headers['user-agent']}`
    );
    next();
  });

  const server = app.listen(process.env.PORT, () => {
    console.info(`::Server started at port ${process.env.PORT}`);
  });

  const wss = new WebSocket.Server({
    noServer: true,
    path: '/ws',
  });

  wss.on('connection', (ws) => {
    ws.on('message', (data) => {
      const body = JSON.parse(data as any) as SocketMessage;

      switch (body.type) {
	case SocketMessageType.JOIN:
	  // Add player to existing game.
	    ws.send(JSON.stringify({
	      "gameId": "hei"
	    }));
	  break;
	case SocketMessageType.READ:
	  // Read the lastest state of a game.
	  break;
	case SocketMessageType.CREATE:
	  // Create a new game.
	  break;
	case SocketMessageType.UPDATE:
	  // Update existing game.
	  break;
	default:
	  break;
      }
    });
  });

  server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, socket => {
      wss.emit('connection', socket, request);
    });
  });

})();
