import InMemoryDB from '../InMemoryDB';
import { GamePlayers, BoardState, GameState } from '../types/types';

export default class Match {

  db: InMemoryDB<GameState> | null = null;

  constructor() {
    this.db = InMemoryDB.getInstance();
  }
  
  private createMatchKey(): string {
    return (Math.random() + 1).toString(36).substring(7);
  };

  public joinMatch(data: GameState): void {
  }

  public createMatch(data): GameState | undefined {
    if (this.db === null) {
      return;
    }

    const key = this.createMatchKey();

    this.db.set({
      id: key,
      ...data
    });

    return this.db.get(key);
  }

  public updateMatch(data: GameState): void {
  }

  public pollMatch(gameKey: string): void {
  }

}
