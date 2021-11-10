import { observer } from "mobx-react";
import { SpotMarketListItem, SpotMarketListItemVM } from "./SpotMarketListItem";

type Props = {
  items: SpotMarketListItemVM[];
};

export const SpotMarketList = observer(({ items }: Props) => {
  return (
    <>
      {items.map((item) => (
        <SpotMarketListItem model={item} key={item.pair} />
      ))}
    </>
  );
});
