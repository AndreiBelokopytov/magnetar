import { TouchableOpacity, TouchableOpacityProps, ViewStyle, StyleSheet } from "react-native";
import { StackView, Typography } from "~/components";
import { borderRadius, colors } from "~/theme";

type Props = {
  color?: string;
  fontColor?: string;
  style?: ViewStyle;
} & Omit<TouchableOpacityProps, "style">;

export const Button = ({ color, fontColor, style, children, ...rest }: Props) => {
  return (
    <TouchableOpacity {...rest}>
      <StackView
        direction={"row"}
        pl={24}
        pr={24}
        pt={8}
        pb={8}
        style={style}
        bgColor={colors.primary}
        borderRadius={borderRadius.button}
      >
        <Typography style={styles.primary}>{children}</Typography>
      </StackView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primary: {
    color: colors.white,
  },
});
