import { Fixture } from "~/components/_utils";
import { Input } from "~/components";
import { Box, Text } from "grommet";
import { CurrencyBitcoin as BitcoinIcon, Wallet as WalletIcon } from "react-bootstrap-icons";

const labelRight = (
  <Box direction={"row"} align={"center"}>
    <WalletIcon />
    <Box margin={{ left: "8px" }}>{"1.323244 WBTC"}</Box>
  </Box>
);

const addonRight = (
  <Box direction={"row"} align={"center"}>
    <BitcoinIcon />
    <Box margin={{ left: "8px" }}>
      <Text color={"light-2"}>USDT</Text>
    </Box>
  </Box>
);

export default (
  <Fixture background={"dark-2"}>
    <Input autoFocus labelLeft={"You pay"} labelRight={labelRight} addonAfter={addonRight} />
  </Fixture>
);
