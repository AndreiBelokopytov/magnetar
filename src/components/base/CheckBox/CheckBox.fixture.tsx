import { Fixture } from "~/components/_utils";
import { CheckBox } from "~/components";
import React from "react";

const CheckBoxFixture = () => {
  const [isChecked, setChecked] = React.useState(false);

  return (
    <Fixture>
      <CheckBox label={"check me!"} checked={isChecked} onChange={setChecked} />
    </Fixture>
  );
};

export default <CheckBoxFixture />;
