import { ChangeAutocompleteAction } from ".."
import { isMatchRightOperand } from "../../guards"
import { FilterState } from "../../types"

export const autocompleteReducer = (state: FilterState, action: ChangeAutocompleteAction): FilterState => state.map((item) => {
  if (
    !isMatchRightOperand(item, action.payload.operand) ||
    item.rightOperand.type !== "autocomplete"
  ) {return item}

  return {
    ...item,
    rightOperand: {
      ...item.rightOperand,
      selected: action.payload.newValues
    }
  }
})