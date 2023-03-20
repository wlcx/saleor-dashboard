import { ConditionOperator, FilterState } from "../../types"

export const emptyReducer = (state: FilterState) => state.concat([{
  filterKind: {
    selected: { id: "product-type", name: "product-type", displayName: "Product type", dataType: "product-type" },
  },
  rightOperand: {
    type: "text",
    dataType: "product-type",
    value: ""
  },
  condition: {
    selected: "is",
    choices: Object.values(ConditionOperator)
  }
}])