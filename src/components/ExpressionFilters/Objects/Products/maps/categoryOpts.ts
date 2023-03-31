import { FilterExpression } from "@dashboard/components/ExpressionFilters/State/types"
import { ProductListFilterOpts } from "@dashboard/products/components/ProductListPage"

type Catgories = ProductListFilterOpts["categories"]

export const mapCategoryOpts = (categories: Catgories): FilterExpression => {
  return {
    filterKind: {
      selected: { id: "category", name: "category", displayName: "category", dataType: "category" }
    },
    condition: {
      selected: "is",
      choices: ["is"]
    },
    rightOperand: {
      type: "autocomplete",
      dataType: "category",
      selected: categories.displayValues.map(({ label, value }) => ({
        id: value,
        name: label,
        displayName: label,
        dataType: "category"
      })),
      typedPhase: "",
    }
  }
}