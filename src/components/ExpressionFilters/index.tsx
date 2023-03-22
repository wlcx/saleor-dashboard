import { Dropdown, DropdownButton } from "@saleor/macaw-ui/next"
import React from "react"
import { Groups } from "./Groups"
import { Footer } from "./Footer"
import { Content } from "./Content"
import { FilterProvider } from "./State/provider"
import { useFilterContext } from "./State/context"
import { ExpressionContainer } from "./ExpressionContainer"
import { isExpression } from "./State/guards"
import { FormattedMessage } from "react-intl"
import { FilterState } from "./State/types"

const FilterExpressions = () => {
  const { filters } = useFilterContext()

  return (
    <>
      {filters.map((filter, index) => {
        return (
          <Groups.Item asWhere={index === 0}>
            {isExpression(filter) && (
              <ExpressionContainer expression={filter} />
            )}
          </Groups.Item>
        )
      })}
    </>
  )
}

interface ProductFiltersProps {
  onShowClick: (filtersInput: FilterState) => void
}

export const ProductFilters = ({ onShowClick }: ProductFiltersProps) => {
  return (
    <FilterProvider>
      <Dropdown>
        <Dropdown.Trigger>
          <DropdownButton data-test-id="show-filters-button">
            <FormattedMessage
              id="FNpv6K"
              defaultMessage="Filters"
              description="button"
            />
          </DropdownButton>
        </Dropdown.Trigger>
        <Content>
          <Groups>
            <FilterExpressions />
          </Groups>
          <Footer onShowClick={onShowClick} />
        </Content>
      </Dropdown>
    </FilterProvider>
  )
}