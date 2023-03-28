import { Expression } from "@saleor/macaw-ui/next";
import React from "react";

import { ConditionExpression, RemoveButton } from "../../ExpressionContainer";
import { Groups } from "../../Groups";
import { useFilterContext } from "../../State/context";
import { isExpression } from "../../State/guards";
import { FilterProvider } from "../../State/provider";
import { FilterAction, filterReducer } from "../../State/reducer";
import { FilterState } from "../../State/types";
import { FilterKindDropdown } from "./FilterKindDropdown";
import { filterKindReducer } from "./filterKindReducer";
import { OperandFactory } from "./OperandFactory";

const FilterExpressions = () => {
  const { filters } = useFilterContext();

  return (
    <Groups>
      {filters.filter(isExpression).map((filter, index) => (
        <Groups.Item key={filter.filterKind.selected.id} asWhere={index === 0}>
          <Expression>
            <FilterKindDropdown filterKind={filter.filterKind} />
            <ConditionExpression condition={filter.condition} />
            <OperandFactory operand={filter.rightOperand} />
            <RemoveButton filterKind={filter.filterKind} />
          </Expression>
        </Groups.Item>
      ))}
    </Groups>
  );
};

interface ProductFiltersProps {
  onShowClick: (filtersInput: FilterState) => void;
  filter: FilterState;
}

const reducer = (state: FilterState, action: FilterAction): FilterState => {
  const reducedState = filterReducer(state, action);

  if (action.type === "CHANGE_FILTER_KIND") {
    return filterKindReducer(state, action);
  }

  return reducedState;
};

export const ExpressionProductFilters = ({
  onShowClick,
  filter,
}: ProductFiltersProps) => (
  <FilterProvider filter={filter} reducer={reducer} onShowClick={onShowClick}>
    <FilterExpressions />
  </FilterProvider>
);
