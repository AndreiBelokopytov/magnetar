import { Box, Text } from "grommet";
import { GradientText } from "../gradientText";

export const PageFooter = () => {
    return (
        <Box direction="row" height="100%" align="center">
            <Box flex={{grow: 1}}>
                <Text size="small" weight={500}>
                    © 2021 Open DeFi Foundation
                </Text>
            </Box>
            <Box>
                <Text
                    size="small"
                    weight={500}
                    style={{
                        letterSpacing: '0.5px',
                        opacity: 0.5
                    }}
                >
                    <GradientText
                        text="powered by Injective"
                        colors={[
                            [0, 134, 250, 1],
                            [0, 237, 254, 1]
                        ]}
                    />
                </Text>
            </Box>
            <Box flex={{grow: 1}}></Box>
        </Box>
    );
}