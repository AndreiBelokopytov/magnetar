import Svg, { SvgProps } from "react-native-svg";

type Props = SvgProps;

const DEFAULT_SIZE = 24;

export const Icon = ({ width = DEFAULT_SIZE, height = DEFAULT_SIZE, children, ...rest }: Props) => {
  return (
    <Svg width={width} height={height} fill={"currentColor"} {...rest}>
      {children}
    </Svg>
  );
};
