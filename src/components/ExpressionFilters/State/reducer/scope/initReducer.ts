import { InitAction } from ".."
import { FilterState } from "../../types"

export const initReducer = (_, action: InitAction): FilterState => action.payload.filters