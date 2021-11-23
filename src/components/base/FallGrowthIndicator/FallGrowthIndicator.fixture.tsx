import { FallGrowthIndicator } from "~/components";
import { Fixture } from "~/components/_utils";

export default {
  fall: (
    <Fixture>
      <FallGrowthIndicator>-224.45</FallGrowthIndicator>
    </Fixture>
  ),
  growth: (
    <Fixture>
      <FallGrowthIndicator>1200.34</FallGrowthIndicator>
    </Fixture>
  ),
  zero: (
    <Fixture>
      <FallGrowthIndicator>0.00</FallGrowthIndicator>
    </Fixture>
  ),
};
