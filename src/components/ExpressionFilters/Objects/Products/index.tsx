import React from "react"
import { Groups } from "../../Groups"
import { FilterProvider } from "../../State/provider"
import { FilterState } from "../../State/types"
import { useFilterContext } from "../../State/context"
import { isExpression } from "../../State/guards"
import { Expression } from "@saleor/macaw-ui/next"
import { FilterKindDropdown } from "./FilterKindDropdown"
import { ConditionExpression, RemoveButton } from "../../ExpressionContainer"
import { OperandFactory } from "./OperandFactory"

const FilterExpressions = () => {
  const { filters } = useFilterContext()
console.log("overal", filters)
  return (
    <Groups>
      {filters.filter(isExpression).map((filter, index) => {
        return (
          <Groups.Item key={filter.filterKind.selected.id} asWhere={index === 0}>
            <Expression>
              <FilterKindDropdown filterKind={filter.filterKind} />
              <ConditionExpression condition={filter.condition} />
              <OperandFactory operand={filter.rightOperand} />
              <RemoveButton filterKind={filter.filterKind} />
            </Expression>
          </Groups.Item>
        )
      })}
    </Groups>
  )
}


interface ProductFiltersProps {
  onShowClick: (filtersInput: FilterState) => void
  filter: FilterState
}

export const ExpressionProductFilters = ({ onShowClick, filter }: ProductFiltersProps) => {
  return (
    <FilterProvider filter={filter} onShowClick={onShowClick}>
      <FilterExpressions />
    </FilterProvider >
  )
}