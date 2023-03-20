import React, { useReducer } from "react"
import { FilterContext } from "./context"
import { AutocompleteOperand, Condition, ConditionValue, DropdownOperand, FilterKind, NumberOperand, RangeOperand, TextOperand, Value } from "./types"
import { filterReducer } from "./reducer"

export const FilterProvider = ({ children }) => {
  const [filters, dispatch] = useReducer(filterReducer, [])

  const changeFilterKind = (currentKind: FilterKind, newValue: Value) => {
    dispatch({ type: "CHANGE_FILTER_KIND", payload: { currentKind, newValue } })
  }

  const addEmptyExpression = () => {
    dispatch({ type: "ADD_EMPTY" })
  }

  const changeDropdownOperand = (operand: DropdownOperand, newValue: Value) => {
    dispatch({ type: "CHANGE_DROPDOWN", payload: { operand, newValue } })
  }

  const changeAutocompleteOperand = (operand: AutocompleteOperand, newValues: Value[]) => {
    dispatch({ type: "CHANGE_AUTOCOMPLETE", payload: { operand, newValues } })
  }

  const changeRangeOperand = (operand: RangeOperand, leftValue: number, rightValue: number) => {
    dispatch({ type: "CHANGE_RANGE", payload: { operand, leftValue, rightValue } })
  }

  const changeNumberOperand = (operand: NumberOperand, newValue: number) => {
    dispatch({ type: "CHANGE_NUMBER", payload: { operand, newValue } })
  }

  const changeTextOperand = (operand: TextOperand, newValue: string) => {
    dispatch({ type: "CHANGE_TEXT", payload: { operand, newValue } })
  }

  const changeCondition = (currentConditon: Condition, newValue: ConditionValue) => {
    dispatch({ type: "CHANGE_CONDITION", payload: { currentConditon, newValue } })
  }

  return (
    <FilterContext.Provider value={{
      filters,
      changeFilterKind,
      addEmptyExpression,
      changeCondition,
      changeDropdownOperand,
      changeAutocompleteOperand,
      changeRangeOperand,
      changeNumberOperand,
      changeTextOperand
    }}>
      {children}
    </FilterContext.Provider>
  )
}