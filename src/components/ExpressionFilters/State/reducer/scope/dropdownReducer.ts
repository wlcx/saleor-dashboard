import { ChangeDropdownAction } from ".."
import { isMatchRightOperand } from "../../guards"
import { FilterState } from "../../types"

export const dropdownReducer = (state: FilterState, action: ChangeDropdownAction): FilterState => state.map((item) => {
  if (
    !isMatchRightOperand(item, action.payload.operand) ||
    item.rightOperand.type !== "dropdown"
  ) return item

  return {
    ...item,
    rightOperand: {
      ...item.rightOperand,
      selected: action.payload.newValue
    }
  }
})