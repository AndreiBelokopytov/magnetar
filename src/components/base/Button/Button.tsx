import { TouchableOpacity, TouchableOpacityProps, ViewStyle, StyleSheet, ActivityIndicator } from "react-native";
import { StackView, Typography } from "~/components";
import { borderRadius, colors } from "~/theme";

type Props = {
  color?: string;
  fontColor?: string;
  style?: ViewStyle;
  loading?: boolean;
} & Omit<TouchableOpacityProps, "style">;

export const Button = ({ color, fontColor, style, loading, disabled, children, ...rest }: Props) => {
  const isInactive = disabled || loading;
  const bgColor = isInactive ? colors.gray : colors.primary;

  return (
    <TouchableOpacity {...rest} disabled={isInactive}>
      <StackView
        direction={"row"}
        pl={24}
        pr={24}
        pt={8}
        pb={8}
        style={style}
        bgColor={bgColor}
        borderRadius={borderRadius.button}
      >
        {loading && <ActivityIndicator size={"small"} style={styles.activityIndicator} color={colors.white} />}
        <Typography style={styles.text}>{children}</Typography>
      </StackView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.white,
  },
  activityIndicator: {
    marginRight: 12,
  },
});
