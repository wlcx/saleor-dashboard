import { Button, Dropdown } from "@saleor/macaw-ui/next"
import React from "react"
import { Groups } from "./Groups"
import { Footer } from "./Footer"
import { Content } from "./Content"
import { FilterProvider } from "./State/provider"
import { useFilterContext } from "./State/context"
import { ExpressionContainer } from "./ExpressionContainer"
import { isExpression } from "./State/reducer"

const FilterExpressions = () => {
  const { filters } = useFilterContext()

  console.log("current:", filters)

  return (
    <>
      {filters.map(filter => {

        return (
          <Groups.Item asWhere>
            {isExpression(filter) && (
              <ExpressionContainer expression={filter} />
            )}
          </Groups.Item>
        )
      })}
    </>
  )
}


export const ProductFilters = () => {
  return (
    <FilterProvider>
      <Dropdown>
        <Dropdown.Trigger>
          <Button variant="tertiary">Filters</Button>
        </Dropdown.Trigger>
        <Content>
          <Groups>
            <FilterExpressions />
          </Groups>
          <Footer />
        </Content>
      </Dropdown>
    </FilterProvider>
  )
}