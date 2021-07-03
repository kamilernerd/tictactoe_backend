// Game interfaces
import WebSocket from 'ws';

export type GamePlayers = {
  p1: string | null;
  p2: string | null;
};

export type BoardState = Array<Array<number>>;

export interface IJoinGame {
  id: string;
  player: string;
}

export interface IBaseGameState {
  player: string;
  state: BoardState;
}

export interface IGameState {
  id: string;
  players: GamePlayers;
  state: BoardState;
  connections?: {
    p1: WebSocket | null;
    p2: WebSocket | null;
  };
}

export enum SocketMessageType {
  CREATE = 'CREATE',
  JOIN = 'JOIN',
  UPDATE = 'UPDATE',
  READ = 'READ',
}

type SocketMessageDataUnion = IGameState | IBaseGameState | IJoinGame;

export interface ISocketMessage {
  type: SocketMessageType;
  data: SocketMessageDataUnion;
}

// InMemoryDB interfaces
export interface IRecord {
  id: string;
}

export interface IInMemoryDB<T extends IRecord> {
  set(value: T): void;
  get(id: string): T | undefined;
}
