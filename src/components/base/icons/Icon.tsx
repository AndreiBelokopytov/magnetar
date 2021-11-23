const DEFAULT_SIZE = 24;

type Props = React.SVGProps<SVGSVGElement>;

export const Icon = ({ width = DEFAULT_SIZE, height = DEFAULT_SIZE, children, ...rest }: Props) => {
  return (
    <svg width={width} height={height} fill={"currentColor"} {...rest}>
      {children}
    </svg>
  );
};
