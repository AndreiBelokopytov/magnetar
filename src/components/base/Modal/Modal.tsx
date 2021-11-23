import { Box, Button, Layer, LayerProps, Stack } from "grommet";
import { Close } from "grommet-icons";
import React from "react";

type Props = LayerProps & {
  open?: boolean;
  children: React.ReactNode | React.ReactNode[];
  onClose?: () => void;
};

export const Modal = ({ children, open, onClose, ...rest }: Props) => {
  const handleClose = () => onClose?.();

  return open ? (
    <Layer {...rest}>
      <Stack anchor={"top-right"}>
        <Box align="center" justify="center" gap="small" direction="row" alignSelf="center" pad="large">
          {children}
        </Box>
        <Box margin={{ top: "8px", right: "8px" }}>
          <Button icon={<Close />} onClick={handleClose} />
        </Box>
      </Stack>
    </Layer>
  ) : null;
};
