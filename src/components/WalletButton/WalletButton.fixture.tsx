import { Fixture } from "~/components/_utils";
import { WalletButton } from "~/components";
import { Text } from "grommet";

const primary = () => (
  <Fixture>
    <WalletButton>
      <Text>It's a Button</Text>
    </WalletButton>
  </Fixture>
);

const disabled = () => (
  <Fixture>
    <WalletButton disabled>
      <Text>It's a disabled Button</Text>
    </WalletButton>
  </Fixture>
);

const loading = () => (
  <Fixture>
    <WalletButton loading>
      <Text>It's a loading Button</Text>
    </WalletButton>
  </Fixture>
);

export default { primary, disabled, loading };
