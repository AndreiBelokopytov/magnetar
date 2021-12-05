import React from "react";
import { omit } from "lodash";

const DEFAULT_SIZE = 24;

export type ChildProps = {
  isActive?: boolean;
}

export type IconProps = {
  isActive?: boolean;
  children?: React.ReactNode | ((props: ChildProps) => React.ReactNode);
} & React.SVGProps<SVGSVGElement>;

export const Icon = ({ width = DEFAULT_SIZE, height = DEFAULT_SIZE, children, ...rest }: IconProps) => {
  const [ isActive, setIsActive ] = React.useState(false);

  return (
    <svg
      cursor={rest.onClick ? "pointer" : "default"}
      onMouseOver={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      width={width}
      height={height}
      fill={"currentColor"}
      {...(omit(rest, "isActive"))}
    >
      {children instanceof Function ? (
        children({ isActive: isActive || rest.isActive })
      ) : (
        children
      )}
    </svg>
  );
};
