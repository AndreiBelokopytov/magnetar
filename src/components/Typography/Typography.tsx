import { TypographyVariant } from "./Typography.types";
import { Text, TextProps, StyleSheet } from "react-native";

type Props = {
  variant?: TypographyVariant;
} & TextProps;

export const Typography = ({ variant = "body", style, ...rest }: Props) => {
  return <Text {...rest} style={[style, styles[variant]]} />;
};

const styles = StyleSheet.create({
  typography: {
    // base style for Typography
  },
  body: {
    fontSize: 17,
  },
  subhead: {
    fontSize: 15,
  },
  footnote: {
    fontSize: 13,
  },
  h1: {
    fontSize: 34,
  },
  h2: {
    fontSize: 28,
  },
  h3: {
    fontSize: 22,
  },
});
