import { ChangeDropdownAction } from ".."
import { isMatchRightOperand } from "../../guards"
import { FilterState } from "../../types"

export const dropdownReducer = (state: FilterState, action: ChangeDropdownAction) => state.map((item) => {
  if (!isMatchRightOperand(item, action.payload.operand)) return item

  return {
    ...item,
    rightOperand: {
      ...item.rightOperand,
      selected: action.payload.newValue
    }
  }
})