import { isMatchFilterKind } from "../../State/guards";
import { ChangeFilterKindAction } from "../../State/reducer";
import { defaultConditionForKind } from "./condition";
import { FilterState } from "../../State/types";
import { defaultRightOperandForKind } from "./rightOperand";

export const filterKindReducer = (
  state: FilterState,
  action: ChangeFilterKindAction,
): FilterState =>
  state.map(item => {
    if (!isMatchFilterKind(item, action.payload.currentKind)) {
      return item;
    }

    return {
      ...item,
      filterKind: {
        selected: action.payload.newValue,
      },
      condition: defaultConditionForKind(action.payload.newValue),
      rightOperand: defaultRightOperandForKind(action.payload.newValue),
    };
  });
