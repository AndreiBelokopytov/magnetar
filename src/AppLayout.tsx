import React from "react";
import { StackView } from "~/components";
import { observer } from "mobx-react";
import { colors } from "~/theme";

type Props = {
  children: React.ReactNode;
};

const MAX_WIDTH = 460;

export const AppLayout = observer(({ children }: Props) => {
  return (
    <StackView direction={"row"} flex justifyContent={"center"} bgColor={colors.accentBackground}>
      <StackView flex width={MAX_WIDTH} maxWidth={MAX_WIDTH} bgColor={colors.background}>
        {children}
      </StackView>
    </StackView>
  );
});
