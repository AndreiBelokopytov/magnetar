export abstract class PersistentStorageProvider<T> {
  abstract update(value: T): Promise<void>;
  abstract fetch(): Promise<T | undefined>;
  abstract clear(): Promise<void>;
}
