import { useEffect, useRef } from "react";
import { WalletAdapter, WalletAdapterFactory } from "~/adapters";
import { useFactory } from "~/DIContainer";
import { WalletType } from "~/domain";

export function useWalletAdapter(walletType: WalletType) {
  const walletAdapter = useRef<WalletAdapter | undefined>(undefined);
  const walletAdapterFactory = useFactory<WalletAdapter, [WalletType]>(WalletAdapterFactory);

  if (!walletAdapter.current) {
    walletAdapter.current = walletAdapterFactory?.(walletType);
  }

  useEffect(() => {
    walletAdapter.current?.init();

    return () => walletAdapter.current?.dispose();
  }, [walletAdapter.current]);

  return walletAdapter.current;
}
