import { useEffect, useRef } from "react";
import { WalletAdapter, WalletAdapterFactory, WalletType } from "~/adapters";
import { useFactory } from "~/DIContainer";

export function useWalletAdapter(walletType: WalletType = WalletType.unknown) {
  const walletAdapter = useRef<WalletAdapter | undefined>(undefined);
  const walletAdapterFactory = useFactory<WalletAdapter, [WalletType]>(WalletAdapterFactory);

  if (!walletAdapter.current) {
    walletAdapter.current = walletAdapterFactory?.(walletType);
  }

  useEffect(() => {
    walletAdapter.current?.init();

    return () => walletAdapter.current?.dispose();
  }, [walletAdapter]);

  return walletAdapter.current;
}
