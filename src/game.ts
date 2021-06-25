import InMemoryDB from '../InMemoryDB';
import {
  GamePlayers,
  BoardState,
  IGameState,
  IJoinGame,
  IBaseGameState,
} from '../types/types';

export default class Match {
  public db: InMemoryDB<IGameState> | null = null;

  constructor() {
    this.db = InMemoryDB.getInstance();
  }

  private createMatchKey(): string {
    return (Math.random() + 1).toString(36).substring(7);
  }

  public joinMatch(data: IJoinGame): IGameState | undefined {
    if (!data) {
      return;
    }

    const currentGame = this.db && this.db.get(data.id);

    if (!currentGame) {
      return;
    }

    // Max 2 players per match
    if (currentGame.players.length === 2) {
      return;
    }

    currentGame.players.push(data.player[0]);

    console.error('CURRENT MATCH', currentGame);

    this.db && this.db.set(currentGame);

    return currentGame;
  }

  public createMatch(data: IBaseGameState): IGameState | undefined {
    if (this.db === null) {
      return;
    }

    const key = this.createMatchKey();

    this.db.set({
      id: key,
      players: [data.player[0]],
      state: data.state,
    });

    return this.db.get(key);
  }

  public updateMatch(data: IGameState): void {}

  public pollMatch(gameKey: string): void {}
}
