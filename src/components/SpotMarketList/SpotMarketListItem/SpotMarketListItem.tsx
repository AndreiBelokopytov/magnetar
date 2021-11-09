import { observer } from "mobx-react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SpotMarketListItemVM } from "./SpotMarketListItemVM";
import { Spacer } from "../../Spacer";

type Props = {
  model: SpotMarketListItemVM;
};

const IMAGE_SIZE = 36;

export const SpotMarketListItem = observer(({ model }: Props) => {
  return (
    <TouchableOpacity>
      <View style={styles.root}>
        <View style={styles.image}>
          <Image
            source={{
              uri: model.imageUrl,
              width: IMAGE_SIZE,
              height: IMAGE_SIZE,
            }}
          />
        </View>
        <View>
          <Text>{model.pair}</Text>
          <Text>{model.ticker}</Text>
        </View>
        <Spacer />
        <View style={styles.right}>
          <Text>{model.lastPrice}</Text>
          <Text>{model.change}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  image: {
    marginRight: 16,
  },
  right: {
    alignItems: "flex-end",
  },
});
