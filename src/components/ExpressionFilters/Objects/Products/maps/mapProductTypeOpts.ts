import { FilterExpression } from "@dashboard/components/ExpressionFilters/State/types";
import { ProductListFilterOpts } from "@dashboard/products/components/ProductListPage";

import { productType } from "../value";

type ProductType = ProductListFilterOpts["productType"];

export const mapProductTypeOpts = (
  givenProductType: ProductType,
): FilterExpression => ({
  filterKind: {
    selected: productType(),
  },
  condition: {
    selected: "is",
    choices: ["is"],
  },
  rightOperand: {
    type: "autocomplete",
    dataType: "product-type",
    selected: givenProductType.displayValues.map(({ label, value }) => ({
      id: value,
      name: label,
      displayName: label,
      dataType: "product-type",
    })),
    typedPhase: "",
  },
});
