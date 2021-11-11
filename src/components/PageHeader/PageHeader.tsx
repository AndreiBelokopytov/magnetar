import React from "react";
import { Spacer, StackView, Typography, Button } from "~/components";

export const PageHeader = () => {
  return (
    <StackView
      direction={"row"}
      width={"100%"}
      height={60}
      alignItems={"center"}
      pl={32}
      pr={32}
      bgColor={"ghostwhite"}
    >
      <Typography variant={"h3"}>Magnetar</Typography>
      <Spacer />
      <Button title={"Connect wallet"} />
    </StackView>
  );
};
