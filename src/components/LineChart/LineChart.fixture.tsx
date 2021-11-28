import { LineChart, LineChartPoint } from "~/components";
import { Fixture } from "~/components/_utils";

const points: LineChartPoint[] = [
  { x: 1637824260, y: 4295.028, label: "4295.0280" },
  { x: 1637825220, y: 4299.22, label: "4299.2200" },
  { x: 1637826060, y: 4290, label: "4290.0000" },
  { x: 1637826960, y: 4293.141, label: "4293.1410" },
  { x: 1637828100, y: 4314.065, label: "4314.0650" },
  { x: 1637828820, y: 4295.3, label: "4295.3000" },
  { x: 1637830320, y: 4286.58, label: "4286.5800" },
  { x: 1637830560, y: 4275.625, label: "4275.6250" },
  { x: 1637831700, y: 4270.562, label: "4270.5620" },
  { x: 1637832540, y: 4281.174, label: "4281.1740" },
];

export default (
  <Fixture pad={"40px"}>
    <LineChart
      color={"brand"}
      width={"600px"}
      height={"320px"}
      paddingBottom={50}
      paddingTop={50}
      paddingLeft={30}
      paddingRight={30}
      points={points}
    />
  </Fixture>
);
