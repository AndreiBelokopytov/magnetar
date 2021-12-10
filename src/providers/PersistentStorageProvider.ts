export interface PersistentStorageProvider<Value, DataType, Request = undefined> {
    update(value: Value): Promise<void>;
    fetch(request?: Request): Promise<void>;
    clear(): Promise<void>;
    data: DataType | undefined;
}