import { InitAction } from ".."
import { FilterState } from "../../types"

export const initReducer = (state: FilterState, action: InitAction): FilterState => {
  return action.payload.filters
}