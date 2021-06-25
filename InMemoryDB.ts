import { IRecord, IInMemoryDB } from './types/types';

class InMemoryDB<T extends IRecord> implements IInMemoryDB<T> {
  private static instance: any | null = null;

  private database: Record<string, T> = {};

  private constructor() {}

  public static getInstance() {
    if (InMemoryDB.instance === null) {
      InMemoryDB.instance = new InMemoryDB();
    }
    return InMemoryDB.instance;
  }

  public set(value: T): void {
    if (InMemoryDB.getInstance() === null) {
      return;
    }

    this.database[value.id] = value;
  }

  public get(id: string): T | undefined {
    if (InMemoryDB.getInstance() === null) {
      return;
    }
    return this.database[id];
  }
}

export default InMemoryDB;
