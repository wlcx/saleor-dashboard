import {
  AutocompleteFiltersProductTypesQuery,
  ChannelFragment,
  InitialProductFilterAttributesQuery,
  AutocompleteFiltersCategoriesQuery,
  AutocompleteFiltersCollectionsQuery
} from "@dashboard/graphql"
import { DataType, Value } from "../types"

export type AttributEdge = InitialProductFilterAttributesQuery["attributes"]["edges"][number]
export type CategoryEdge = AutocompleteFiltersCategoriesQuery["categories"]["edges"][number]
export type ProductTypeEdge = AutocompleteFiltersProductTypesQuery["productTypes"]["edges"][number]
export type CollectionEdge = AutocompleteFiltersCollectionsQuery["collections"]["edges"][number]

export const toAttributeValue = (edge: AttributEdge): Value => {
  const { id, name, inputType } = edge.node

  return {
    id,
    name,
    displayName: `${name} (not supported)`,
    dataType: `attr:${inputType}` as DataType
  }
}

export const toCategoryValue = (edge: CategoryEdge): Value => {
  const { id, name } = edge.node

  return {
    id,
    name,
    displayName: name,
    dataType: "category"
  }
}

export const toChannelValue = (edge: ChannelFragment): Value => {
  const { id, name } = edge

  return {
    id,
    name,
    displayName: name,
    dataType: "channel"
  }
}

export const toProductTypeValue = (edge: ProductTypeEdge): Value => {
  const { id, name } = edge.node

  return {
    id,
    name,
    displayName: name,
    dataType: "product-type"
  }
}

export const toCollectionValue = (edge: CollectionEdge): Value => {
  const { id, name } = edge.node

  return {
    id,
    name,
    displayName: name,
    dataType: "collection"
  }
}

