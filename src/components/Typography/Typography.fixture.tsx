import { Typography } from "./Typography";
import { TypographyVariant } from "./Typography.types";

const fixtures: Record<TypographyVariant, React.ReactNode> = {
  h1: <Typography variant={"h1"}>Title 1</Typography>,
  h2: <Typography variant={"h2"}>Title 2</Typography>,
  h3: <Typography variant={"h3"}>Title 3</Typography>,
  body: <Typography>Body</Typography>,
  subhead: <Typography variant={"subhead"}>Subhead</Typography>,
  footnote: <Typography variant={"footnote"}>Footnote</Typography>,
};

export default fixtures;
