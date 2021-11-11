import { Image, ImageProps } from "react-native";
import emptyLogo from "~/assets/empty_logo.png";

type Props = {
  size: number;
  sourceUri?: string;
  placeholderUri?: string;
} & Omit<ImageProps, "defaultSource" | "source">;

export const Logo = ({ size, sourceUri, placeholderUri = emptyLogo, ...rest }: Props) => {
  return (
    <Image
      {...rest}
      defaultSource={{
        uri: placeholderUri,
        width: size,
        height: size,
      }}
      source={{
        uri: sourceUri,
        width: size,
        height: size,
      }}
    />
  );
};
