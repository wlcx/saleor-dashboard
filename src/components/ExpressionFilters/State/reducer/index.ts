import {
  AutocompleteOperand,
  Condition,
  ConditionValue,
  DropdownOperand,
  FilterKind,
  FilterState,
  NumberOperand,
  RangeOperand,
  TextOperand,
  Value,
} from "../types";
import {
  autocompleteReducer,
  dropdownReducer,
  emptyReducer,
  expressionReducer,
  initReducer,
  numberReducer,
  rangeReducer,
} from "./scope";

export interface AddEmptyAaction {
  type: "ADD_EMPTY";
}

export interface InitAction {
  type: "INIT";
  payload: { filters: FilterState };
}

export interface ClearAction {
  type: "CLEAR"
}


export interface ChangeFilterKindAction {
  type: "CHANGE_FILTER_KIND";
  payload: { currentKind: FilterKind; newValue: Value };
}

export interface ChangeDropdownAction {
  type: "CHANGE_DROPDOWN";
  payload: { operand: DropdownOperand; newValue: Value };
}

export interface ChangeAutocompleteAction {
  type: "CHANGE_AUTOCOMPLETE";
  payload: { operand: AutocompleteOperand; newValues: Value[] };
}

export interface ChangeRangeAction {
  type: "CHANGE_RANGE";
  payload: { operand: RangeOperand; leftValue: number; rightValue: number };
}

export interface ChangeNumberAction {
  type: "CHANGE_NUMBER";
  payload: { operand: NumberOperand; newValue: number };
}

export interface ChangeTextAction {
  type: "CHANGE_TEXT";
  payload: { operand: TextOperand; newValue: string };
}

export interface ChangeConditionAction {
  type: "CHANGE_CONDITION";
  payload: { currentConditon: Condition; newValue: ConditionValue };
}

export interface RemoveExpressionAction {
  type: "REMOVE_EXPRESSION";
  payload: { currentKind: FilterKind };
}

export type FilterAction =
  | AddEmptyAaction
  | InitAction
  | ClearAction
  | ChangeFilterKindAction
  | ChangeDropdownAction
  | ChangeAutocompleteAction
  | ChangeRangeAction
  | ChangeNumberAction
  | ChangeTextAction
  | ChangeConditionAction
  | RemoveExpressionAction;

export const filterReducer = (
  state: FilterState,
  action: FilterAction,
): FilterState => {
  switch (action.type) {
    case "ADD_EMPTY":
      console.log("ADD_EMPTY")
      return emptyReducer(state);
    case "CLEAR":
      console.log("CLEAR")

      return [];
    case "INIT":
      console.log("INIT", action.payload)

      return initReducer(state, action);
    case "CHANGE_DROPDOWN":
      console.log("CHANGE_DROPDOWN")

      return dropdownReducer(state, action);
    case "CHANGE_AUTOCOMPLETE":
      console.log("CHANGE_AUTOCOMPLETE")

      return autocompleteReducer(state, action);
    case "CHANGE_NUMBER":
      console.log("CHANGE_NUMBER")

      return numberReducer(state, action);
    case "CHANGE_RANGE":
      console.log("CHANGE_RANGE")

      return rangeReducer(state, action);
    case "REMOVE_EXPRESSION":
      console.log("REMOVE_EXPRESSION")

      return expressionReducer(state, action);
    default:
      return state;
  }
};
