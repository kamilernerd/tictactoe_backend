export type GamePlayers = Array<String>

export type BoardState = Array<Array<number>>

export type GameState = {
  players: GamePlayers,
  gameId: String,
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
  data?: GameState
}
