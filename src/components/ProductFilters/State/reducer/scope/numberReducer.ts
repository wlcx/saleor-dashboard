import { ChangeNumberAction } from ".."
import { isMatchRightOperand } from "../../guards"
import { FilterState } from "../../types"

export const numberReducer = (state: FilterState, action: ChangeNumberAction) => state.map((item) => {
  if (!isMatchRightOperand(item, action.payload.operand)) return item

  return {
    ...item,
    rightOperand: {
      ...item.rightOperand,
      value: action.payload.newValue
    }
  }
})