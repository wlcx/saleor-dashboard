import { AutocompleteOperand, Condition, ConditionValue, DropdownOperand, FilterKind, FilterState, NumberOperand, RangeOperand, TextOperand, Value } from "../types"
import { autocompleteReducer, conditionReducer, dropdownReducer, emptyReducer, expressionReducer, filterKindReducer, initReducer, numberReducer, rangeReducer } from "./scope"

export type AddEmptyAaction = {
  type: "ADD_EMPTY"
}

export type InitAction = {
  type: "INIT",
  payload: { filters: FilterState }
}

export type ChangeFilterKindAction = {
  type: "CHANGE_FILTER_KIND",
  payload: { currentKind: FilterKind, newValue: Value }
}

export type ChangeDropdownAction = {
  type: "CHANGE_DROPDOWN",
  payload: { operand: DropdownOperand, newValue: Value }
}

export type ChangeAutocompleteAction = {
  type: "CHANGE_AUTOCOMPLETE",
  payload: { operand: AutocompleteOperand, newValues: Value[] }
}

export type ChangeRangeAction = {
  type: "CHANGE_RANGE",
  payload: { operand: RangeOperand, leftValue: number, rightValue: number }
}

export type ChangeNumberAction = { 
  type: "CHANGE_NUMBER",
  payload: { operand: NumberOperand, newValue: number }
}

export type ChangeTextAction = {
  type: "CHANGE_TEXT",
  payload: { operand: TextOperand, newValue: string }
}

export type ChangeConditionAction = {
  type: "CHANGE_CONDITION",
  payload: { currentConditon: Condition, newValue: ConditionValue }
}

export type RemoveExpressionAction = {
  type: "REMOVE_EXPRESSION",
  payload: { currentKind: FilterKind }
}

export type FilterAction =
  | AddEmptyAaction
  | InitAction
  | ChangeFilterKindAction
  | ChangeDropdownAction
  | ChangeAutocompleteAction
  | ChangeRangeAction
  | ChangeNumberAction
  | ChangeTextAction
  | ChangeConditionAction
  | RemoveExpressionAction


export const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
  switch (action.type) {
    case "ADD_EMPTY":
      return emptyReducer(state)
    case "INIT":
      return initReducer(state, action)
    case "CHANGE_FILTER_KIND":
      return filterKindReducer(state, action)
    case "CHANGE_DROPDOWN":
      return dropdownReducer(state, action)
    case "CHANGE_AUTOCOMPLETE":
      const x = autocompleteReducer(state, action)
      console.log("input", state)
      console.log("generated", x)
      return x
    case "CHANGE_NUMBER":
      return numberReducer(state, action)
    case "CHANGE_RANGE":
      return rangeReducer(state, action)
    case "CHANGE_CONDITION":
      return conditionReducer(state, action)
    case "REMOVE_EXPRESSION":
      return expressionReducer(state, action)
    default:
      return state
  }
}
