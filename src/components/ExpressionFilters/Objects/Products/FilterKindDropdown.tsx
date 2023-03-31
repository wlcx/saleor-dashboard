import { useInitialProductFilterAttributesQuery } from "@dashboard/graphql";
import React from "react";

import { FilterKindSelecor } from "../../ExpressionContainer/FilterKindSelector";
import { toAttributeValue } from "../../State/maps";
import { FilterKind, FilterState, Value } from "../../State/types";
import { useFilterContext } from "../../State/context";
import { isExpression } from "../../State/guards";

interface ExpressionContainerProps {
  filterKind: FilterKind;
}

const staticChoices: Value[] = [
  {
    id: "category",
    name: "category",
    displayName: "Category",
    dataType: "category",
  },
  {
    id: "channel",
    name: "channel",
    displayName: "Channel",
    dataType: "channel",
  },
  {
    id: "product-type",
    name: "product-type",
    displayName: "Product type",
    dataType: "product-type",
  },
  { id: "price", name: "price", displayName: "Price", dataType: "price" },
  {
    id: "collection",
    name: "collection",
    displayName: "Collection",
    dataType: "collection",
  },
];

const byAlreadySelected = (filters: FilterState) => (current: Value) => {
  return !filters
    .filter(isExpression)
    .some(f => f.filterKind.selected.id === current.id)
}

const useFilterKindOptions = () => {
  const { filters } = useFilterContext();

  const { data: attributesData, loading: attributesLoading } =
    useInitialProductFilterAttributesQuery();

  const loading = attributesLoading;
  const attributeValues = attributesData.attributes.edges.map(toAttributeValue);
  const choices = staticChoices
    .concat(attributeValues)
    .filter(byAlreadySelected(filters));

  return {
    loading,
    choices,
  };
};

export const FilterKindDropdown = ({
  filterKind,
}: ExpressionContainerProps) => {
  const { loading, choices } = useFilterKindOptions();

  return (
    <FilterKindSelecor
      filterKind={filterKind}
      choices={choices}
      loading={loading}
    />
  );
};
