import { useContext, createContext } from "react";
import { AutocompleteOperand, Condition, ConditionValue, FilterState, DropdownOperand, FilterKind, NumberOperand, RangeOperand, TextOperand, Value } from "./types";

export interface FilterContextState {
  filters: FilterState,
  addEmptyExpression: () => void
  changeFilterKind: (currentKind: FilterKind, newValue: Value) => void
  changeCondition: (currentCondition: Condition, newValue: ConditionValue) => void
  changeDropdownOperand: (operand: DropdownOperand, newValue: Value) => void
  changeAutocompleteOperand: (operand: AutocompleteOperand, newValues: Value[]) => void
  changeRangeOperand: (operand: RangeOperand, leftValue: number, rightValue: number) => void
  changeNumberOperand: (operand: NumberOperand, newValue: number) => void
  changeTextOperand: (operand: TextOperand, newValue: string) => void
  removeExpression: (currentKind: FilterKind) => void
}

export const FilterContext = createContext<FilterContextState>(null)

export const useFilterContext = () => {
  const context = useContext(FilterContext)

  if (!context) {
    throw Error("Use FilterContxt within its provider.")
  }

  return context
}