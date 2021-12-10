export interface PersistentStorageProvider<Value, Request = undefined, DataType> {
    update(value: Value): Promise<void>;
    fetch(request?: Request): Promise<void>;
    data: DataType | undefined;
}