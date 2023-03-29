import { useInitialProductFilterAttributesQuery } from "@dashboard/graphql";
import React from "react";

import { FilterKindSelecor } from "../../ExpressionContainer/FilterKindSelector";
import { toAttributeValue } from "../../State/maps";
import { FilterKind, Value } from "../../State/types";

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

const useFilterKindOptions = () => {
  const { data: attributesData, loading: attributesLoading } =
    useInitialProductFilterAttributesQuery();

  const attributeValues = attributesData.attributes.edges.map(toAttributeValue);

  const loading = attributesLoading;
  const choices = staticChoices.concat(attributeValues);

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
