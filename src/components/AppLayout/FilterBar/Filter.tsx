import {
  FilterContent,
  FilterElement,
  FilterErrorMessages,
  IFilter,
  InvalidFilters,
} from "@dashboard/components/Filter";
import useFilter from "@dashboard/components/Filter/useFilter";
import { extractInvalidFilters } from "@dashboard/components/Filter/utils";
import { ClickAwayListener, Grow, Popper } from "@material-ui/core";
import { sprinkles } from "@saleor/macaw-ui/next";
import React, { useMemo, useState } from "react";
import { getSelectedFilterAmount } from "./utils";
import { ExoressionProductFilters } from "@dashboard/components/ExpressionFilters";
import { FilterState } from "@dashboard/components/ExpressionFilters/State/types";

export interface FilterProps<TFilterKeys extends string = string> {
  currencySymbol?: string;
  errorMessages?: FilterErrorMessages<TFilterKeys>;
  menu: IFilter<TFilterKeys>;
  onFilterUpdate: (filter: FilterState) => void;
  onFilterAttributeFocus?: (id?: string) => void;
}

export const Filter = ({
  currencySymbol,
  menu,
  onFilterUpdate,
  onFilterAttributeFocus,
  errorMessages,
}: FilterProps) => {
  const anchor = React.useRef<HTMLDivElement>();
  const [isFilterMenuOpened, setFilterMenuOpened] = useState(false);
  const [filterErrors, setFilterErrors] = useState<InvalidFilters<string>>({});
  const [data, dispatch, reset] = useFilter(menu);

  // const isFilterActive = menu.some(filterElement => filterElement.active);
  // const selectedFilterAmount = useMemo(
  //   () => getSelectedFilterAmount(menu, data),
  //   [data, menu],
  // );

  const handleSubmit = () => {
    const invalidFilters = extractInvalidFilters(data, menu);

    if (Object.keys(invalidFilters).length > 0) {
      setFilterErrors(invalidFilters);
      return;
    }

    setFilterErrors({});
    // onFilterAdd(data);
    setFilterMenuOpened(false);
  };

  const handleClear = () => {
    reset();
    setFilterErrors({});
  };


  return (
    <ClickAwayListener
      onClickAway={event => {
        if ((event.target as HTMLElement).getAttribute("role") !== "option") {
          setFilterMenuOpened(false);
        }
      }}
      mouseEvent="onMouseUp"
    >
        <ExoressionProductFilters onShowClick={onFilterUpdate} />
    </ClickAwayListener>
  );
};

Filter.displayName = "Filter";
