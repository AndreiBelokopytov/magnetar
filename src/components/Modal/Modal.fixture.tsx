import { Button, Modal, StackView, Typography } from "~/components";
import { useState } from "react";

export default () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const hideModal = () => {
    setModalIsOpen(false);
    setTimeout(() => {
      setModalIsOpen(true);
    }, 3000);
  };

  return (
    <Modal visible={modalIsOpen} onClose={hideModal} onRequestClose={hideModal}>
      <Typography>Modal</Typography>
      <StackView mt={16}>
        <Button onPress={hideModal}>Close modal</Button>
      </StackView>
    </Modal>
  );
};
