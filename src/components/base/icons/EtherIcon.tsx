import React from "react";
import { normalizeColor } from "grommet/utils";
import { useTheme } from "styled-components";
import { Icon } from "./Icon";

type Props = React.SVGProps<SVGSVGElement>;

export const EtherIcon = (props: Props) => {
    return (
        <Icon {...props} viewBox="0 0 24 24">
            <path d="M11.9979 1L11.845 1.50135V16.0482L11.9979 16.1955L18.9957 12.2041L11.9979 1Z"/>
            <path d="M11.998 1L5 12.2041L11.998 16.1955V9.13483V1Z"/>
            <path d="M11.998 17.474L11.9117 17.5754V22.7572L11.998 23L19 13.4846L11.998 17.474Z"/>
            <path d="M11.998 23V17.4739L5 13.4846L11.998 23Z"/>
            <path d="M11.9979 16.1955L18.9957 12.2041L11.9979 9.13483V16.1955Z"/>
            <path d="M5 12.2041L11.998 16.1955V9.13483L5 12.2041Z"/>
        </Icon>
    )
};