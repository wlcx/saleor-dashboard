import { FilterExpression } from "@dashboard/components/ExpressionFilters/State/types";
import { ProductListFilterOpts } from "@dashboard/products/components/ProductListPage";

import { category } from "../value";

type Catgories = ProductListFilterOpts["categories"];

export const mapCategoryOpts = (
  givenCategories: Catgories,
): FilterExpression => ({
  filterKind: {
    selected: category(),
  },
  condition: {
    selected: "is",
    choices: ["is"],
  },
  rightOperand: {
    type: "autocomplete",
    dataType: "category",
    selected: givenCategories.displayValues.map(({ label, value }) => ({
      id: value,
      name: label,
      displayName: label,
      dataType: "category",
    })),
    typedPhase: "",
  },
});
