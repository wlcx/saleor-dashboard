import { FilterExpression } from "@dashboard/components/ExpressionFilters/State/types"
import { ProductListFilterOpts } from "@dashboard/products/components/ProductListPage"

type Collection = ProductListFilterOpts["collections"]

export const mapCollectionOpts = (collections: Collection): FilterExpression => {
  return {
    filterKind: {
      selected: { id: "collection", name: "Collections", displayName: "Collections", dataType: "collection" }
    },
    condition: {
      selected: "is",
      choices: ["is"]
    },
    rightOperand: {
      type: "autocomplete",
      dataType: "collection",
      selected: collections.displayValues.map(({ label, value }) => ({
        id: value,
        name: label,
        displayName: label,
        dataType: "collection"
      })),
      typedPhase: "",
    }
  }
}