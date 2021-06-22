import { GamePlayers, BoardState } from '../types/types';

export default class Match {

  gameKey: string | null = null;
  players: GamePlayers | null = null;
  state: BoardState | null = null;

  constructor() {}

  private function createMatchKey(): string {
    return (Math.random() + 1).toString(36).substring(7);
  };

  function joinMatch() {
    
  }

  function createMatch() {

  }

  function updateMatch() {

  }

  function pollMatch() {

  }

}
