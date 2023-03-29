import { ChangeConditionAction } from "../../State/reducer"
import { isMatchCondition } from "../../State/guards"
import { defaultRightOperandForCondition } from "./rightOperand"
import { FilterState } from "../../State/types"

export const conditionReducer = (state: FilterState, action: ChangeConditionAction): FilterState => state.map((item) => {
  if (!isMatchCondition(item, action.payload.currentConditon)) {return item}

  return {
    ...item,
    condition: {
      ...item.condition,
      selected: action.payload.newValue
    },
    rightOperand: defaultRightOperandForCondition(item.filterKind, action.payload.newValue)
  }
})