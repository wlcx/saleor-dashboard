import { Expression } from "@saleor/macaw-ui/next";
import React from "react";

import { Loader } from "../Content";
import { FilterKind, Value } from "../State/types";
import { useFilterContext } from "./../State/context";

interface FilterKindProps {
  filterKind: FilterKind;
  choices: Value[];
  loading?: boolean;
  onEnd: () => void;
}

export const FilterKindSelecor = ({
  filterKind,
  choices,
  loading,
  onEnd,
}: FilterKindProps) => {
  const context = useFilterContext();

  const handleFilterKindChange = (newKind: Value) => {
    context.changeFilterKind(filterKind, newKind);
  };

  return (
    <Expression.OperandDropdown
      onScrollEnd={onEnd}
      triggerText={filterKind.selected.displayName}
    >
      {choices.map(item => (
        <Expression.OperandDropdownItem
          key={item.id}
          onClick={() => handleFilterKindChange(item)}
        >
          {item.displayName}
        </Expression.OperandDropdownItem>
      ))}
      {loading && <Loader />}
    </Expression.OperandDropdown>
  );
};
