import { FilterExpression } from "@dashboard/components/ExpressionFilters/State/types"
import { ProductListFilterOpts } from "@dashboard/products/components/ProductListPage"

type ProductType = ProductListFilterOpts["productType"]

export const mapProductTypeOpts = (productType: ProductType): FilterExpression => {
  return {
    filterKind: {
      selected: { id: "product-type", name: "product-type", displayName: "product-type", dataType: "product-type" }
    },
    condition: {
      selected: "is",
      choices: ["is"]
    },
    rightOperand: {
      type: "autocomplete",
      dataType: "product-type",
      selected: productType.displayValues.map(({ label, value }) => ({
        id: value,
        name: label,
        displayName: label,
        dataType: "product-type"
      })),
      typedPhase: "",
    }
  }
}