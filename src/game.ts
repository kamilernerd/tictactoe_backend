import InMemoryDB from '../InMemoryDB';
import { IBaseGameState, IGameState, IJoinGame } from '../types/types';
import WebSocket from 'ws';

export default class Match {
  public db: InMemoryDB<IGameState> | null = null;

  constructor() {
    this.db = InMemoryDB.getInstance();
  }

  private createMatchKey(): string {
    return (Math.random() + 1).toString(36).substring(7);
  }

  public joinMatch(
    data: IJoinGame,
    ws: WebSocket
  ): Omit<IGameState, 'connections'> | undefined {
    if (!data) {
      return;
    }

    const currentGame = this.db && this.db.get(data.id);

    if (!currentGame) {
      return;
    }

    // Can't join game, p1 missing. Remove game.
    if (
      currentGame.players.p1 === null ||
      (currentGame.connections && currentGame.connections.p1 === null)
    ) {
      // delete game
      return;
    }

    currentGame.players.p2 = data.player;
    currentGame.connections!!.p2 = ws;

    this.db && this.db.set(currentGame);

    return {
      id: currentGame.id,
      players: currentGame.players,
      state: currentGame.state,
    };
  }

  public createMatch(
    data: IBaseGameState,
    ws: WebSocket
  ): IGameState | undefined {
    if (this.db === null) {
      return;
    }

    const key = this.createMatchKey();

    this.db.set({
      id: key,
      players: {
        p1: data.player,
        p2: null,
      },
      connections: {
        p1: ws,
        p2: null,
      },
      state: data.state,
    });

    const updatedState = this.db.get(key);

    return {
      id: updatedState!!.id,
      players: updatedState!!.players,
      state: updatedState!!.state,
    };
  }

  public updateMatch(data: IGameState): IGameState | undefined {
    if (!data) {
      return;
    }

    this.db &&
      this.db.set({
        ...data,
      });
    return data;
  }

  public pollMatch(gameKey: string): void {}
}
