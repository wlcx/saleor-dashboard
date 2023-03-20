import { ChangeRangeAction } from ".."
import { isMatchRightOperand } from "../../guards"
import { FilterState } from "../../types"

export const rangeReducer = (state: FilterState, action: ChangeRangeAction) => state.map((item) => {
  if (!isMatchRightOperand(item, action.payload.operand)) return item

  return {
    ...item,
    rightOperand: {
      ...item.rightOperand,
      left: action.payload.leftValue,
      right: action.payload.rightValue
    }
  }
})