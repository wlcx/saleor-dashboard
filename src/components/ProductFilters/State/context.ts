import { useContext, createContext } from "react";
import { FilterKind, FilterState, Operand, Value } from "./reducer";

interface FilterContextState {
  filters: FilterState,
  addEmptyExpression: () => void
  changeFilterKind: (currentKind: FilterKind, newValue: Value) => void
  changeRightOperand: (operand: Operand, newValues: Value[]) => void
}

export const FilterContext = createContext<FilterContextState>(null)

export const useFilterContext = () => {
  const context = useContext(FilterContext)

  if (!context) {
    throw Error("Use FilterContxt within its provider.")
  }

  return context
}