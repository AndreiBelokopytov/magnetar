import { TypographyVariant } from "~/components";
import { Text, TextProps, StyleSheet } from "react-native";

type Props = {
  variant?: TypographyVariant;
  overflowHidden?: boolean;
} & TextProps;

export const Typography = ({ variant = "body", overflowHidden, style, ...rest }: Props) => {
  return <Text {...rest} style={[style, styles[variant], overflowHidden ? styles.overflow : undefined]} />;
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
  overflow: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});
