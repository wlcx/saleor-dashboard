import { FilterErrorMessages, IFilter } from "@dashboard/components/Filter";
import { FilterProps, SearchPageProps } from "@dashboard/types";
import { Box } from "@saleor/macaw-ui/next";
import React, { ReactNode } from "react";
import SearchInput from "./SearchInput";
import { FilterState } from "@dashboard/components/ExpressionFilters/State/types";
import { ProductFilters } from "@dashboard/components/ExpressionFilters";
import useRouter from "use-react-router";
import { parse as parseQs } from "qs";
import { mapInputToFilter } from "@dashboard/components/ExpressionFilters/State/maps/product";

export interface FilterBarProps<TKeys extends string = string>
  extends Pick<FilterProps<TKeys>, "currencySymbol">,
  SearchPageProps {
  searchPlaceholder: string;
  errorMessages?: FilterErrorMessages<TKeys>;
  filterStructure: IFilter<TKeys>;
  actions?: ReactNode;
  filterState: FilterState
  onFilterUpdate: (filters: FilterState) => void
}

export const FilterBar: React.FC<FilterBarProps> = ({
  currencySymbol,
  filterStructure,
  initialSearch,
  searchPlaceholder,
  onSearchChange,
  onFilterUpdate,
  errorMessages,
  filterState,
  actions,
}: FilterBarProps) => {

  return (
    <>
      <Box
        display="grid"
        __gridTemplateColumns="1fr 1fr"
        gap={7}
        paddingBottom={5}
        paddingX={9}
        borderColor="neutralPlain"
        borderBottomStyle="solid"
        borderBottomWidth={1}
      >
        <Box display="flex" alignItems="center" gap={7}>
          <ProductFilters onShowClick={onFilterUpdate} filter={filterState} />
          <Box __width="320px">
            <SearchInput
              initialSearch={initialSearch}
              placeholder={searchPlaceholder}
              onSearchChange={onSearchChange}
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          {actions}
        </Box>
      </Box>
    </>
  );
}
FilterBar.displayName = "FilterBar";
