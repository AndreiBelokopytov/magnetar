import { Box, Button, Card, Text } from "grommet";
import { CheckBox, HorizontalLine, IconButton, MarketVM } from "~/components";
import { ArrowDownUp } from "react-bootstrap-icons";
import React from "react";
import { PriceInput } from "./PriceInput";

type Props = {
  market: MarketVM;
};

export const OrderForm = ({ market }: Props) => {
  const [isLimit, setLimit] = React.useState(false);
  const [isSell, setSell] = React.useState(false);
  const handelToggleBuySell = () => setSell(!isSell);

  return (
    <Card pad={"24px"}>
      <PriceInput autoFocus label={"You pay"} model={isSell ? market.baseToken : market.quoteToken} />
      <Box direction={"row"} justify={"center"}>
        <IconButton Icon={ArrowDownUp} onClick={handelToggleBuySell} />
      </Box>
      <PriceInput label={"Receive"} disabled={!isLimit} model={isSell ? market.quoteToken : market.baseToken} />
      <Box margin={{ vertical: "24px" }} alignSelf={"start"}>
        <CheckBox label={"Limit order"} checked={isLimit} onChange={setLimit} />
      </Box>
      <HorizontalLine />
      <Box margin={{ vertical: "24px" }}>
        <Box direction={"row"} justify={"between"}>
          <Text size={"small"} color={"light-2"}>
            Fee
          </Text>
        </Box>
        <Box direction={"row"} justify={"between"} margin={{ top: "16px" }}>
          <Text color={"light-2"}>Total</Text>
        </Box>
      </Box>
      <Button primary size={"large"} label={"Place order"} />
    </Card>
  );
};
