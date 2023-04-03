import { FilterExpression } from "@dashboard/components/ExpressionFilters/State/types";
import { ProductListFilterOpts } from "@dashboard/products/components/ProductListPage";

import { channel } from "../value";

type Channel = ProductListFilterOpts["channel"];

export const mapChannelOpts = (givenChannel: Channel): FilterExpression => {
  const { id, label, value } = givenChannel.choices.find(
    ch => ch.value === givenChannel.value,
  );

  return {
    filterKind: {
      selected: channel(),
    },
    condition: {
      selected: "is",
      choices: ["is"],
    },
    rightOperand: {
      type: "dropdown",
      dataType: "channel",
      selected: {
        id,
        name: label,
        displayName: label,
        slug: value,
        dataType: "channel",
      },
    },
  };
};
