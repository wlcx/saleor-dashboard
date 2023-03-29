import { ExpressionProductFilters } from "@dashboard/components/ExpressionFilters";
import { FilterState } from "@dashboard/components/ExpressionFilters/State/types";
import { FilterProps, SearchPageProps } from "@dashboard/types";
import { Box } from "@saleor/macaw-ui/next";
import React, { ReactNode } from "react";
import SearchInput from "./SearchInput";

export interface FilterBarProps<TKeys extends string = string>
  extends Pick<FilterProps<TKeys>, "currencySymbol">,
  SearchPageProps {
  searchPlaceholder: string;
  actions?: ReactNode;
  filterState: FilterState
  onFilterUpdate: (filters: FilterState) => void
}

export const FilterBar: React.FC<FilterBarProps> = ({
  initialSearch,
  searchPlaceholder,
  onSearchChange,
  onFilterUpdate,
  filterState,
  actions,
}: FilterBarProps) => (
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
          <ExpressionProductFilters onShowClick={onFilterUpdate} filter={filterState} />
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
  )
FilterBar.displayName = "FilterBar";
