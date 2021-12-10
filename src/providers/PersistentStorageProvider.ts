export interface PersistentStorageProvider<Value> {
    update(value: Value): Promise<void>;
    fetch(): Promise<Value | undefined>;
    clear(): Promise<void>;
}