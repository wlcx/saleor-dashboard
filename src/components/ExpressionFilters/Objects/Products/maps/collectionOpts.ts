import { FilterExpression } from "@dashboard/components/ExpressionFilters/State/types";
import { ProductListFilterOpts } from "@dashboard/products/components/ProductListPage";

import { collection } from "../value";

type Collection = ProductListFilterOpts["collections"];

export const mapCollectionOpts = (
  givenCollections: Collection,
): FilterExpression => ({
  filterKind: {
    selected: collection(),
  },
  condition: {
    selected: "is",
    choices: ["is"],
  },
  rightOperand: {
    type: "autocomplete",
    dataType: "collection",
    selected: givenCollections.displayValues.map(({ label, value }) => ({
      id: value,
      name: label,
      displayName: label,
      dataType: "collection",
    })),
    typedPhase: "",
  },
});
