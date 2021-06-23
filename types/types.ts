// Game interfaces
export type GamePlayers = Array<String>

export type BoardState = Array<Array<number>>

export interface IJoinGame {
  id: string,
  player: string,
}

export interface IBaseGameState {
  player: string,
  state: BoardState,
}

export interface IGameState {
  players: GamePlayers,
  id: string,
  state: BoardState,
}

export enum SocketMessageType {
  CREATE = "CREATE",
  JOIN = "JOIN",
  UPDATE = "UPDATE",
  READ = "READ",
}

type SocketMessageDataUnion = IGameState | IBaseGameState | IJoinGame

export interface ISocketMessage {
  type: SocketMessageType,
  data: SocketMessageDataUnion,
}

// InMemoryDB interfaces
export interface IRecord {
  id: string,
}

export interface IInMemoryDB<T extends IRecord> {
  set(value: T): void,
  get(id: string): T | undefined,
}

