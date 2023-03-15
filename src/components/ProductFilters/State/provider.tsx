import React, { useReducer } from "react"
import { FilterContext } from "./context"
import { FilterKind, Value, filterReducer } from "./reducer"

export const FilterProvider = ({ children }) => {
  const [filters, dispatch] = useReducer(filterReducer, [])

  const changeFilterKind = (currentKind: FilterKind, newValue: Value) => {
    dispatch({ type: "CHANGE_FILTER_KIND", payload: { currentKind, newValue } })
  }

  const addEmptyExpression = () => {
    dispatch({ type: "ADD_EMPTY" })
  }

  return (
    <FilterContext.Provider value={{
      filters,
      changeFilterKind,
      addEmptyExpression
    }}>
      {children}
    </FilterContext.Provider>
  )
}