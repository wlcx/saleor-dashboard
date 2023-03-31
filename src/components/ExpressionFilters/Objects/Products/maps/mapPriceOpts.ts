import { FilterExpression, NumberOperand, RangeOperand } from "@dashboard/components/ExpressionFilters/State/types"
import { ProductListFilterOpts } from "@dashboard/products/components/ProductListPage"

type Price = ProductListFilterOpts["price"]

export const mapPriceOpts = (price: Price): FilterExpression => {
  const rightOperand = price.value.max === "0" ? {
    type: "number",
    dataType: "price",
    value: parseFloat(price.value.min),
  } as NumberOperand: {
    type: "range",
    dataType: "price",
    left: parseFloat(price.value.min),
    right: parseFloat(price.value.max),
  } as RangeOperand

  return {
    filterKind: {
      selected: { id: "price", name: "price", displayName: "Price", dataType: "price" }
    },
    condition: {
      selected: "is",
      choices: ["is", "is between"]
    },
    rightOperand
  }
}