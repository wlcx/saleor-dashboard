import {
  AutocompleteFiltersCategoriesQuery,
  AutocompleteFiltersCollectionsQuery,
  AutocompleteFiltersProductTypesQuery,
  ChannelFragment,
  InitialProductFilterAttributesQuery,
  LoadAttributeValuesQuery,
} from "@dashboard/graphql";

import { attrDataType, DataType, Value } from "../types";

export type AttributEdge =
  InitialProductFilterAttributesQuery["attributes"]["edges"][number];
export type AttributeCoutanleEdge =
  LoadAttributeValuesQuery["attribute"]["choices"]["edges"][number];
export type CategoryEdge =
  AutocompleteFiltersCategoriesQuery["categories"]["edges"][number];
export type ProductTypeEdge =
  AutocompleteFiltersProductTypesQuery["productTypes"]["edges"][number];
export type CollectionEdge =
  AutocompleteFiltersCollectionsQuery["collections"]["edges"][number];

export const toAttributeValueCountable =
  (dataType: DataType) =>
  (countableEdge: AttributeCoutanleEdge): Value => {
    const { id, name, slug } = countableEdge.node;

    return {
      id,
      name,
      displayName: `${name} (not supported)`,
      dataType,
      slug,
    };
  };

export const toAttributeValue = (edge: AttributEdge): Value => {
  const { id, name, inputType, slug } = edge.node;

  return {
    id,
    name,
    displayName: `${name} (${inputType})`,
    dataType: attrDataType(inputType),
    slug,
  };
};

export const toCategoryValue = (edge: CategoryEdge): Value => {
  const { id, name } = edge.node;

  return {
    id,
    name,
    displayName: name,
    dataType: "category",
  };
};

export const toChannelValue = (edge: ChannelFragment): Value => {
  const { id, name, slug } = edge;

  return {
    id,
    name,
    displayName: name,
    dataType: "channel",
    slug,
  };
};

export const toProductTypeValue = (edge: ProductTypeEdge): Value => {
  const { id, name } = edge.node;

  return {
    id,
    name,
    displayName: name,
    dataType: "product-type",
  };
};

export const toCollectionValue = (edge: CollectionEdge): Value => {
  const { id, name } = edge.node;

  return {
    id,
    name,
    displayName: name,
    dataType: "collection",
  };
};
