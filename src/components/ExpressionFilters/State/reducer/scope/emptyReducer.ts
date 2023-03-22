import { ConditionOperator, FilterState } from "../../types"

export const emptyReducer = (state: FilterState): FilterState => state.concat([{
  filterKind: {
    selected: { id: "empty", name: "empty", displayName: "Select value", dataType: "empty" },
  },
  rightOperand: {
    type: "text",
    dataType: "empty",
    value: ""
  },
  condition: {
    selected: "is",
    choices: Object.values(ConditionOperator)
  }
}])