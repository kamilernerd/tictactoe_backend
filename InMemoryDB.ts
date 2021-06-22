import { IRecord, IInMemoryDB } from './types/types';

class InMemoryDB<T extends IRecord> implements IInMemoryDB<T> {

  private static instance: InMemoryDB<T> | null = null;
  
  private database: Record<string, T> = {};

  private constructor() {}

  public static function getInstance(): InMemoryDB<T> {
    if (InMemoryDB.instance === null) {
      InMemoryDB.instance = new InMemoryDB();
    }
    return InMemoryDB.instance;
  }

  public function set(value: T): void {
    if (InMemoryDB.getInstance() === null) {
      return;
    }
    
    this.database[value.id] = value;
  }

  public function get(id: string): T | undefined {
    if (InMemoryDB.getInstance() === null) {
      return;
    }
    return this.database[id];
  }
}

export default InMemoryDB;
