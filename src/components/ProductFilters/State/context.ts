import { useContext, createContext } from "react";
import { AutocompleteOperand, Condition, ConditionValue, DropdownOperand, FilterKind, NumberOperand, RangeOperand, TextOperand, Value } from "./types";
import { filterReducer } from "./reducer";

interface FilterContextState {
  filters: ReturnType<typeof filterReducer>,
  addEmptyExpression: () => void
  changeFilterKind: (currentKind: FilterKind, newValue: Value) => void
  changeCondition: (currentCondition: Condition, newValue: ConditionValue) => void
  changeDropdownOperand: (operand: DropdownOperand, newValue: Value) => void
  changeAutocompleteOperand: (operand: AutocompleteOperand, newValues: Value[]) => void
  changeRangeOperand: (operand: RangeOperand, leftValue: number, rightValue: number) => void
  changeNumberOperand: (operand: NumberOperand, newValue: number) => void
  changeTextOperand: (operand: TextOperand, newValue: string) => void
}

export const FilterContext = createContext<FilterContextState>(null)

export const useFilterContext = () => {
  const context = useContext(FilterContext)

  if (!context) {
    throw Error("Use FilterContxt within its provider.")
  }

  return context
}