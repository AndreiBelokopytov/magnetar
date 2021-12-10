import { PersistentStorageProvider } from "./PersistentStorageProvider";
import { makeObservable, observable } from "mobx";
import { v5 as uuid } from "uuid";

const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

interface Stringify {
    toString(): string;
};

export class LocalStorageProvider<T extends Stringify, R> implements PersistentStorageProvider<T, undefined, R> {
    private _key: string;

    @observable
    private _data: string | undefined;

    get data(): R | undefined {
        return this._data !== undefined ? this._factoryFn(this._data) : undefined;
    }
    
    async fetch(): Promise<void> {
        this._data = localStorage.getItem(this._key) ?? undefined;
    }

    async update(value: T) {
        const data = value.toString();

        localStorage.setItem(this._key, data);
        this._data = data;
    }

    constructor(key: string, private _factoryFn: (data: string) => R) {
        this._key = uuid(key, MY_NAMESPACE);
        makeObservable(this);
    }
}