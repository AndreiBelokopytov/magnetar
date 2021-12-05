import { normalizeColor } from "grommet/utils";
import { useTheme } from "styled-components";
import { Icon, IconProps, ChildProps } from "./Icon";

type Props = IconProps;

export const LogoutIcon = (props: Props) => {
    return (
        <Icon {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {({ isActive }: ChildProps) => {
                const theme = useTheme();
                const fillColor = isActive ? normalizeColor("accent-1", theme) : normalizeColor("light-3", theme);

                return (
                    <path
                        d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"
                        fill={fillColor}
                    />
                );
            }}
        </Icon>
    )
};