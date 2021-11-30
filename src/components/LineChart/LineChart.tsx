import { LineChartPoint } from "~/components";
import { scaleLinear } from "d3-scale";
import React, { useContext, useRef } from "react";
import { useBoundingRect } from "~/hooks";
import styled from "styled-components";
import { normalizeColor } from "grommet/utils";
import { ThemeContext, ThemeType } from "grommet";

type Props = {
  width: string;
  height: string;
  paddingTop?: number;
  paddingBottom?: number;
  points: LineChartPoint[];
  color?: string;
};

const DEFAULT_COLOR = "accent-1";

export const LineChart = ({
  width,
  height,
  points,
  paddingTop = 0,
  paddingBottom = 0,
  color = DEFAULT_COLOR,
  ...rest
}: Props) => {
  const theme = useContext<ThemeType>(ThemeContext);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const boundingRect = useBoundingRect(containerRef);
  const values = points.map((el) => el.y);
  const whiteColor = normalizeColor("white", theme);

  const minY = Math.min.apply(null, values);
  const maxY = Math.max.apply(null, values);

  const textFont = theme.text?.medium;
  const textHeight = textFont?.height;
  const ticksCount = points.length * 2 - 2;

  const xScale = React.useMemo(
    () =>
      scaleLinear()
        .domain([0, points.length - 1])
        .range([0, boundingRect.width]),
    [points.length, boundingRect.width]
  );
  const yScale = React.useMemo(
    () =>
      scaleLinear()
        .domain([minY, maxY])
        .range([boundingRect.height - paddingTop, paddingBottom]),
    [minY, maxY, boundingRect.height, paddingTop, paddingBottom]
  );

  const path = points.length > 0 ? `M${points.map((p, index) => `${xScale(index)},${yScale(p.y)}`).join("L")}` : "";
  const ticks: JSX.Element[] = [];
  for (let i = 0; i < ticksCount; i++) {
    const isEven = i % 2 === 0;
    const leftIndex = i / 2;
    const pointIndex = isEven ? i / 2 : Math.ceil(i / 2);

    ticks.push(
      <Tick key={i}>
        <TickLine
          x={xScale(leftIndex)}
          y={0}
          width={xScale((i + 1) / 2) - xScale(i / 2)}
          height={boundingRect.height}
          even={isEven}
        />
        <TickText
          x={xScale(pointIndex)}
          y={textHeight}
          height={textHeight}
          fontSize={textFont?.size}
          textAnchor={"middle"}
        >
          {points[pointIndex].label}
        </TickText>
        <TickPoint color={color} cx={xScale(pointIndex)} cy={yScale(points[pointIndex].y)} r={5} />
      </Tick>
    );
  }

  return (
    <Container {...rest} style={{ width, height }} ref={containerRef}>
      <svg width={"100%"} height={"100%"} overflow={"visible"}>
        <defs>
          <linearGradient id="tickGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={whiteColor} stopOpacity={0} />
            <stop offset="50%" stopColor={whiteColor} stopOpacity={1} />
            <stop offset="100%" stopColor={whiteColor} stopOpacity={0} />
          </linearGradient>
        </defs>

        <path fill={"none"} strokeWidth={2} stroke={normalizeColor("accent-1", theme)} d={path} />
        {ticks}
      </svg>
    </Container>
  );
};

type TickLineProps = {
  width: number;
  height: number;
  even?: boolean;
};

const TickLine = styled.rect`
  stroke-width: 1;
  stroke: url(#tickGradient);

  stroke-dasharray: ${({ width, height, even }: TickLineProps) =>
    even ? `0, ${width * 2 + height}, ${height}` : `0, ${width}, ${height}, ${width + height}`};
`;

const TickText = styled.text`
  fill: ${({ theme }) => normalizeColor("light-1", theme)};
  stroke-width: 0;
`;

const TickPoint = styled.circle`
  fill: ${({ theme, color }) => normalizeColor(color ?? DEFAULT_COLOR, theme)};
`;

const Tick = styled.g`
  stroke-opacity: 0;
  fill-opacity: 0;
  &:hover,
  &:focus {
    ${TickLine} {
      stroke-opacity: 0.7;
    }

    ${TickText} {
      fill-opacity: 1;
    }

    ${TickPoint} {
      fill-opacity: 1;
    }
  }
`;

const Container = styled.div`
  display: inline-block;
`;
