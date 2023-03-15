import { InitialProductFilterAttributesQuery, InitialProductFilterCategoriesQuery } from "@dashboard/graphql"
import { Value } from "../reducer"

export type AttributEdge = InitialProductFilterAttributesQuery["attributes"]["edges"][number]
export type CategoryEdge = InitialProductFilterCategoriesQuery["categories"]["edges"][number]

export const mapAttributes = (edge: AttributEdge): Value => {
  const { id, name, inputType } = edge.node

  return {
    id,
    name,
    displayName: name,
    dataType: `attr:${inputType}`
  }
}

export const mapCategories = (edge: CategoryEdge): Value => {
  const { id, name } = edge.node

  return {
    id,
    name,
    displayName: name,
    dataType: `category`
  }
}

