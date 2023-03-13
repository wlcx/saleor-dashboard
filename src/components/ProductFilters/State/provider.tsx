import React, { useReducer } from "react"
import { FilterContext } from "./context"
import { filterReducer } from "./reducer"

export const FilterProvider = ({ children }) => {
  const [filters, dispatch] = useReducer(filterReducer, [])

  return (
    <FilterContext.Provider value={{ filters, dispatch }}>
      {children}
    </FilterContext.Provider>
  )
}