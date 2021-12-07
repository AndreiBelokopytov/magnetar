import { Box, Text } from "grommet";
import { GradientText } from "./GradientText";

export const PageFooter = () => {
    return (
        <Box direction="row" height="100%" align="center">
            <Box flex={{grow: 1}}>
                <Text size="small" weight={500}>
                    © 2021 Open DeFi Foundation
                </Text>
            </Box>
            <Box>
                <Text size="small" weight={500}>
                    <GradientText>
                        powered by Injective
                    </GradientText>
                </Text>
            </Box>
            <Box flex={{grow: 1}}></Box>
        </Box>
    );
}