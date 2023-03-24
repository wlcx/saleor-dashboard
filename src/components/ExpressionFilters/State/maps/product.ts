import { FilterExpression, FilterState, NumberOperand, RangeOperand } from "../types";
import { isExpression } from "../guards";
import { ProductListUrlQueryParams } from "@dashboard/products/urls";
import { ProductListFilterOpts } from "@dashboard/products/components/ProductListPage";


export const mapFilterToFilterQueryParams = (state: FilterState): ProductListUrlQueryParams => {
  return state
  .filter(f => isExpression(f))
  .reduce<ProductListUrlQueryParams>((prev: ProductListUrlQueryParams, curr: FilterExpression) => {
    const { rightOperand } = curr

    if (rightOperand.dataType === "category" && rightOperand.type === "autocomplete") {
      prev.categories = rightOperand.selected.map(s => s.id)
    }

    if (rightOperand.dataType === "channel" && rightOperand.type === "dropdown") {
      prev.channel = rightOperand.selected.id
    }

    if (rightOperand.dataType === "product-type" && rightOperand.type === "autocomplete") {
      prev.productTypes = rightOperand.selected.map(s => s.id)
    }

    if (rightOperand.dataType === "price" && rightOperand.type === "number") {
      prev.priceFrom= String(rightOperand.value)
    }

    if (rightOperand.dataType === "price" && rightOperand.type === "range") {
      prev.priceFrom= String(rightOperand.left)
      prev.priceTo = String(rightOperand.right)
    }

    if (rightOperand.dataType === "collection" && rightOperand.type === "autocomplete") {
      prev.collections = rightOperand.selected.map(s => s.id)
    }

    return prev
  }, {})
}

export const mapFilterOptsToFilterState = (filterInput: ProductListFilterOpts): FilterState => {
  const { categories, channel, productType, price, collections } = filterInput
  const filterState: FilterState = []


  if (categories.displayValues.length > 0) {
    filterState.push({
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
    })
  }

  if (channel.active) {
    const { id, label } = channel.choices.find(ch => ch.id === channel.value)

    filterState.push({
      filterKind: {
        selected: { id: "channel", name: "channel", displayName: "channel", dataType: "channel" }
      },
      condition: {
        selected: "is",
        choices: ["is"]
      },
      rightOperand: {
        type: "dropdown",
        dataType: "channel",
        selected: {
          id,
          name: label,
          displayName: label,
          dataType: "channel"
        }
      }
    })
  }

  if (productType.displayValues.length > 0) {
    filterState.push({
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
    })
  }

  if (price.active) {
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

    filterState.push({
      filterKind: {
        selected: { id: "price", name: "price", displayName: "Price", dataType: "price" }
      },
      condition: {
        selected: "is",
        choices: ["is", "is between"]
      },
      rightOperand
    })
  }

  if (collections.displayValues.length > 0) {
    filterState.push({
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
    })
  }



  return filterState
}