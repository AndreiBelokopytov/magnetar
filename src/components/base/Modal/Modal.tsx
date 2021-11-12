import { ModalProps, Modal as RNModal, Pressable, StyleSheet, ViewStyle } from "react-native";
import { StackView } from "~/components";
import { borderRadius } from "~/theme";

type Props = {
  onClose?: () => void;
  contentStyle?: ViewStyle;
} & ModalProps;

export const Modal = ({ children, visible, onClose, contentStyle, ...rest }: Props) => {
  const handleBackdropPress = () => onClose?.();

  return (
    <RNModal {...rest} transparent onRequestClose={handleBackdropPress} visible={visible}>
      <Pressable style={styles.backdrop} onPress={handleBackdropPress} />
      <StackView flex alignItems={"center"} justifyContent={"center"} pointerEvents={"box-none"}>
        <StackView alignItems={"center"} justifyContent={"center"} style={[styles.content, contentStyle]}>
          {children}
        </StackView>
      </StackView>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, .4)",
  },
  content: {
    width: 400,
    height: 300,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, .2)",
    borderRadius: borderRadius.base * 2,
  },
});
