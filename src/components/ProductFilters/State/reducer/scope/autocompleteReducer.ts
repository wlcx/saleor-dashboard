import { ChangeAutocompleteAction } from ".."
import { isMatchRightOperand } from "../../guards"
import { FilterState } from "../../types"

export const autocompleteReducer = (state: FilterState, action: ChangeAutocompleteAction) => state.map((item) => {
  if (!isMatchRightOperand(item, action.payload.operand)) return item

  return {
    ...item,
    rightOperand: {
      ...item.rightOperand,
      selected: action.payload.newValues
    }
  }
})