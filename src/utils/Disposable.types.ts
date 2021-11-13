export interface Disposable {
  dispose(): void;
}

export type Disposer = () => void;
