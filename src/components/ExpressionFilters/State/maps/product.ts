import { FilterExpression, FilterState } from "../types";
import { isExpression } from "../guards";
import { ProductListUrlQueryParams } from "@dashboard/products/urls";
import { ProductFilterInput } from "@dashboard/graphql";


export const mapFilterToFilterQueryParams = (state: FilterState): ProductListUrlQueryParams => {
  return state
  .filter(f => isExpression(f))
  .reduce<ProductListUrlQueryParams>((prev: ProductListUrlQueryParams, curr: FilterExpression) => {
    const { rightOperand } = curr

    if (rightOperand.dataType === "category" && rightOperand.type === "autocomplete") {
      prev["categories"] = rightOperand.selected.map(s => s.id)
    }

    if (rightOperand.dataType === "channel" && rightOperand.type === "dropdown") {
      prev["channel"] = rightOperand.selected.id
    }

    if (rightOperand.dataType === "product-type" && rightOperand.type === "autocomplete") {
      prev["productTypes"] = rightOperand.selected.map(s => s.id)
    }

    if (rightOperand.dataType === "price" && rightOperand.type === "number") {
      prev["price"] = { priceFrom: rightOperand.value }
    }

    if (rightOperand.dataType === "price" && rightOperand.type === "range") {
      prev["price"] = { priceFrom: rightOperand.left, priceTo: rightOperand.right }
    }

    if (rightOperand.dataType === "collection" && rightOperand.type === "autocomplete") {
      prev["collection"] = rightOperand.selected.map(s => s.id)
    }

    return prev
  }, {})
}

export const mapInputToFilter = (filterInput: ProductFilterInput): FilterState => {
  
}