import { Button as RNButton, ButtonProps } from "react-native";

type Props = ButtonProps;

export const Button = (props: Props) => {
  return <RNButton {...props} />;
};
