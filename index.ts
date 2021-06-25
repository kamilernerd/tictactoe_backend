import express, { Request, Response, NextFunction } from 'express';
import * as path from 'path';
import Match from './src/game';
import * as WebSocket from 'ws';
import {
  IBaseGameState,
  IJoinGame,
  ISocketMessage,
  SocketMessageType,
} from './types/types';

(async () => {
  const app = express();

  app.use('/public', express.static('public'));

  app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, './view/index.html'));
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.info(
      `${req.ip} / ${req.method} - ${req.url} - ${req.headers['user-agent']}`
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

  const game = new Match();

  app.use('/db', (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(game.db);
  });

  wss.on('connection', (ws) => {
    ws.on('message', (data) => {
      const body = JSON.parse(data.toString()) as ISocketMessage;

      switch (body.type) {
        case SocketMessageType.JOIN:
          const joinData = body && body.data;

          console.log('join data,', joinData);

          const matchData = game.joinMatch(joinData as IJoinGame);

          if (!matchData) {
            break;
          }

          ws.send(JSON.stringify(matchData));
          break;
        case SocketMessageType.READ:
          // Read the lastest state of a game.
          break;
        case SocketMessageType.CREATE:
          const createData = body.data && body.data;
          const match = game.createMatch(createData as IBaseGameState);

          if (!match) {
            break;
          }

          ws.send(JSON.stringify(match));
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
    wss.handleUpgrade(request, socket, head, (socket) => {
      wss.emit('connection', socket, request);
    });
  });
})();
