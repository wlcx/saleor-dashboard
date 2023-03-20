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
import { ProductFilters } from "@dashboard/components/ProductFilters";

export interface FilterProps<TFilterKeys extends string = string> {
  currencySymbol?: string;
  errorMessages?: FilterErrorMessages<TFilterKeys>;
  menu: IFilter<TFilterKeys>;
  onFilterAdd: (filter: Array<FilterElement<string>>) => void;
  onFilterAttributeFocus?: (id?: string) => void;
}

export const Filter = ({
  currencySymbol,
  menu,
  onFilterAdd,
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
    onFilterAdd(data);
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
      <div ref={anchor}>
        <ProductFilters />
        <Popper
          className={sprinkles({
            backgroundColor: "surfaceNeutralPlain",
            overflowY: "scroll",
            boxShadow: "modal",
            zIndex: "3",
          })}
          style={{
            width: "376px",
            height: "450px",
          }}
          open={isFilterMenuOpened}
          anchorEl={anchor.current}
          transition
          disablePortal
          placement="bottom-start"
          modifiers={{
            flip: {
              enabled: false,
            },
            hide: {
              enabled: false,
            },
            preventOverflow: {
              boundariesElement: "scrollParent",
              enabled: false,
            },
          }}
        >
          {() => (
            <Grow>
              <FilterContent
                errorMessages={errorMessages}
                errors={filterErrors}
                dataStructure={menu}
                currencySymbol={currencySymbol}
                filters={data}
                onClear={handleClear}
                onFilterPropertyChange={dispatch}
                onFilterAttributeFocus={onFilterAttributeFocus}
                onSubmit={handleSubmit}
              />
            </Grow>
          )}
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

Filter.displayName = "Filter";
