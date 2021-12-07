import { Fixture } from "~/components/_utils";
import { OrderForm } from "~/components";
import { Grid } from "grommet";
import { marketsMock } from "~/components/_mocks";

export default (
  <Fixture>
    <Grid columns={["400px"]}>
      <OrderForm market={marketsMock[0]} />
    </Grid>
  </Fixture>
);
