import { injectable } from "inversify";
import MetaMaskOnBoarding from "@metamask/onboarding";

@injectable()
export class MetaMaskOnBoardingProviderImpl extends injectable()(MetaMaskOnBoarding) {
  constructor(props?: { forwarderOrigin?: string | undefined; forwarderMode?: "INJECT" | undefined }) {
    super(props);
  }
}
