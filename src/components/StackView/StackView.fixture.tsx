import { StackView } from "./StackView";

const fixtures = {
  row: (
    <StackView direction={"row"} width={600} height={50}>
      <StackView flex bgColor={"green"} />
      <StackView flex bgColor={"blue"} />
    </StackView>
  ),
  column: (
    <StackView direction={"column"} width={600} height={200}>
      <StackView flex bgColor={"green"} />
      <StackView flex bgColor={"yellow"} />
      <StackView grow={2} bgColor={"magenta"} />
    </StackView>
  ),
};

export default fixtures;
