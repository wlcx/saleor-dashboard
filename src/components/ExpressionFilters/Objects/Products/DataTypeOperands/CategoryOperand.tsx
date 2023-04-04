import { useAutocompleteFiltersCategoriesQuery } from "@dashboard/graphql";
import React, { useEffect, useState } from "react";

import { Autocomplete } from "../../../ExpressionContainer/Autocomplete";
import { useFilterContext } from "../../../State/context";
import { toCategoryValue } from "../../../State/maps";
import { AutocompleteOperand, Value } from "../../../State/types";

export const CategoryOperand = ({
  operand,
}: {
  operand: AutocompleteOperand;
}) => {
  const [categories, setCategories] = useState([]);
  const [localLoading, setLoading] = useState(false);
  const context = useFilterContext();
  const {
    data,
    loading: catLoading,
    variables,
    refetch,
  } = useAutocompleteFiltersCategoriesQuery({
    variables: { first: 10, search: "" },
  });
  const loading = catLoading || localLoading;

  const handleChange = async search => {
    setCategories([]);
    setLoading(true);
    await refetch({ first: 10, after: null, search });
    setLoading(false);
  };

  const handleSelect = (operand: AutocompleteOperand, selected: Value[]) => {
    context.changeAutocompleteOperand(operand, selected);
  };

  const handleEnd = async () => {
    const { endCursor: after, hasNextPage } = data.categories.pageInfo;

    if (!hasNextPage) {
      return;
    }
    setLoading(true);
    await refetch({ ...variables, after });
    setLoading(false);
  };

  useEffect(() => {
    if (loading || !data) {
      return;
    }

    setCategories(c => c.concat(data.categories.edges.map(toCategoryValue)));
  }, [data, loading]);

  return (
    <Autocomplete
      loading={loading}
      onEnd={handleEnd}
      onSelect={handleSelect}
      operand={operand}
      placeholder="Set category"
      onChange={handleChange}
      items={categories}
    />
  );
};
