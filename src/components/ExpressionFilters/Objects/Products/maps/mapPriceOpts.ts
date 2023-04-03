import {
  FilterExpression,
  NumberOperand,
  RangeOperand,
} from "@dashboard/components/ExpressionFilters/State/types";
import { ProductListFilterOpts } from "@dashboard/products/components/ProductListPage";

import { price } from "../value";

type Price = ProductListFilterOpts["price"];

export const mapPriceOpts = (givenPrice: Price): FilterExpression => {
  const rightOperand =
    givenPrice.value.max === "0"
      ? ({
          type: "number",
          dataType: "price",
          value: parseFloat(givenPrice.value.min),
        } as NumberOperand)
      : ({
          type: "range",
          dataType: "price",
          left: parseFloat(givenPrice.value.min),
          right: parseFloat(givenPrice.value.max),
        } as RangeOperand);

  return {
    filterKind: {
      selected: price(),
    },
    condition: {
      selected: "is",
      choices: ["is", "is between"],
    },
    rightOperand,
  };
};
