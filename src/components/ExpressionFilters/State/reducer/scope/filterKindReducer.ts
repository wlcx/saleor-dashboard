import { ChangeFilterKindAction } from ".."
import { isMatchFilterKind } from "../../guards"
import { FilterState } from "../../types"
import { defaultConditionForKind } from "../condition"
import { defaultRightOperandForKind } from "../rightOperand"

export const filterKindReducer = (state: FilterState, action: ChangeFilterKindAction): FilterState => state.map((item) => {
  if (!isMatchFilterKind(item, action.payload.currentKind)) return item


  console.log("SELECT NEW KIND", action.payload)

  return {
    ...item,
    filterKind: {
      selected: action.payload.newValue
    },
    condition: defaultConditionForKind(action.payload.newValue),
    rightOperand: defaultRightOperandForKind(action.payload.newValue)
  }
})