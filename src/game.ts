import InMemoryDB from 'InMemoryDB';
import { GamePlayers, BoardState, GameState } from '../types/types';

export default class Match {

  db: InMemoryDB<GameState> | null = null;

  constructor() {
    this.db = InMemoryDB.getInstance();
  }
  
  private function createMatchKey(): string {
    return (Math.random() + 1).toString(36).substring(7);
  };

  public function joinMatch(data: GameState) {
  }

  public function createMatch(data) {
    if (this.db === null) {
      return false;
    }

    console.log("create match", data);

    const key = this.createMatchKey();

    this.db.set({
      id: key,
      ...data
    });

    console.log(this.db.get(key));
  }

  public function updateMatch(data: GameState) {
  }

  public function pollMatch(gameKey: string) {
  }

}
