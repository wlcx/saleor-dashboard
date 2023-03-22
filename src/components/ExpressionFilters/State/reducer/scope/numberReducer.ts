import { ChangeNumberAction } from ".."
import { isMatchRightOperand } from "../../guards"
import { FilterState } from "../../types"

export const numberReducer = (state: FilterState, action: ChangeNumberAction): FilterState => state.map((item) => {
  if (
    !isMatchRightOperand(item, action.payload.operand) ||
    item.rightOperand.type !== "number"
  ) return item

  return {
    ...item,
    rightOperand: {
      ...item.rightOperand,
      value: action.payload.newValue
    }
  }
})