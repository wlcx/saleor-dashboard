import { useContext, createContext } from "react";
import { FilterState } from "./reducer";

interface FilterContextState {
  filters: FilterState,
  dispatch: () => void
}

export const FilterContext = createContext<FilterContextState>(null)

export const useFilterContext = () => {
  const context = useContext(FilterContext)

  if (!context) {
    throw Error("Use FilterContxt within its provider.")
  }

  return context
}