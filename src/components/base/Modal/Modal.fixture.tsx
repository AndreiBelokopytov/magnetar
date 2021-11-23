import { Modal } from "~/components";
import { useState } from "react";
import { Box, Button, Text } from "grommet";

export default () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const hideModal = () => {
    setModalIsOpen(false);
    setTimeout(() => {
      setModalIsOpen(true);
    }, 3000);
  };

  return (
    <Modal open={modalIsOpen} onClose={hideModal} onClickOutside={hideModal}>
      <Text>Modal</Text>
      <Box margin={{ top: "16px" }}>
        <Button onClick={hideModal}>Close modal</Button>
      </Box>
    </Modal>
  );
};
