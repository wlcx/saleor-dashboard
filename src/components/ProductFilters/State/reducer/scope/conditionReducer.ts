import { ChangeConditionAction } from ".."
import { isMatchCondition } from "../../guards"
import { FilterState } from "../../types"
import { defaultRightOperandForCondition } from "../rightOperand"

export const conditionReducer = (state: FilterState, action: ChangeConditionAction) => state.map((item) => {
  if (!isMatchCondition(item, action.payload.currentConditon)) return item

  return {
    ...item,
    condition: {
      ...item.condition,
      selected: action.payload.newValue
    },
    rightOperand: defaultRightOperandForCondition(item.filterKind, action.payload.newValue)
  }
})