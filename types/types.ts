// Game interfaces
export type GamePlayers = Array<String>

export type BoardState = Array<Array<number>>

export type BaseGameState = {
  player: string,
  state: BoardState,
}

export type GameState = {
  players: GamePlayers,
  id: string,
  state: BoardState
}

export enum SocketMessageType {
  CREATE = "CREATE",
  JOIN = "JOIN",
  UPDATE = "UPDATE",
  READ = "READ",
}

export interface SocketMessage {
  type: SocketMessageType
  data?: GameState | BaseGameState
}

// InMemoryDB interfaces
export interface IRecord {
  id: string
}

export interface IInMemoryDB<T extends IRecord> {
  set(value: T): void,
  get(id: string): T | undefined
}

