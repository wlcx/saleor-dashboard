import { useAutocompleteProductFilterAttributesQuery } from "@dashboard/graphql";
import React, { useEffect, useState } from "react";

import { FilterKindSelecor } from "../../ExpressionContainer/FilterKindSelector";
import { useFilterContext } from "../../State/context";
import { isExpression } from "../../State/guards";
import { toAttributeValue } from "../../State/maps";
import { FilterKind, FilterState, Value } from "../../State/types";
import { category, channel, collection, price, productType } from "./value";

interface ExpressionContainerProps {
  filterKind: FilterKind;
}

const staticChoices: Value[] = [
  category(),
  channel(),
  productType(),
  price(),
  collection(),
];

const byAlreadySelected = (filters: FilterState) => (current: Value) =>
  !filters
    .filter(isExpression)
    .some(f => f.filterKind.selected.id === current.id);

const useFilterKindOptions = () => {
  const [choices, setChoices] = useState(staticChoices);
  const [loading, setLoading] = useState(false);
  const { filters } = useFilterContext();

  const {
    data: attributesData,
    loading: attributesLoading,
    refetch,
  } = useAutocompleteProductFilterAttributesQuery({
    variables: { first: 10 },
  });

  const loadMore = async () => {
    const { hasNextPage, endCursor: after } = attributesData.search.pageInfo;
    if (!hasNextPage) {
      return;
    }
    setLoading(true);
    await refetch({ first: 10, after });
    setLoading(false);
  };

  useEffect(() => {
    if (attributesLoading || !attributesData) {
      return;
    }

    setChoices(c =>
      c.concat(attributesData.search.edges.map(toAttributeValue)),
    );
  }, [attributesLoading, attributesData]);

  return {
    loading: attributesLoading || loading,
    choices: choices.filter(byAlreadySelected(filters)),
    loadMore,
  };
};

export const FilterKindDropdown = ({
  filterKind,
}: ExpressionContainerProps) => {
  const { loading, choices, loadMore } = useFilterKindOptions();

  const handleEnd = () => {
    loadMore();
  };

  return (
    <FilterKindSelecor
      onEnd={handleEnd}
      filterKind={filterKind}
      choices={choices}
      loading={loading}
    />
  );
};
