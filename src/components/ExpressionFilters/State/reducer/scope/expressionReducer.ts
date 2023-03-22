import { RemoveExpressionAction } from ".."
import { isExpression, isMatchFilterKind } from "../../guards"
import { FilterState } from "../../types"

export const expressionReducer = (state: FilterState, action: RemoveExpressionAction): FilterState =>
  state.filter((item) => 
    !isExpression(item) || !isMatchFilterKind(item, action.payload.currentKind)
  )