import { Expression, Box } from "@saleor/macaw-ui/next"
import React from "react"
import { FilterKind, Value } from "./../State/reducer"
import { useFilterContext } from "../State/context"
import { useInitialProductFilterAttributesQuery } from "@dashboard/graphql"
import { mapAttributes } from "../State/maps"

interface ExpressionContainerProps {
  filterKind: FilterKind
}

const staticChoices = [
  { id: "category", name: "category", displayName: "Category", dataType: "category" },
  { id: "channel", name: "channel", displayName: "Channel", dataType: "channel" },
  { id: "product-type", name: "product-type", displayName: "Product type", dataType: "product-type" },
  { id: "price", name: "price", displayName: "Price", dataType: "price" },
  { id: "collection", name: "collection", displayName: "Collection", dataType: "collection" },
]


const useFilterKindOptions = () => {
  const { data: attributesData, loading: attributesLoading } = useInitialProductFilterAttributesQuery();

  const attributeValues = attributesData.attributes.edges.map(mapAttributes)

  const loading = attributesLoading
  const choices = staticChoices.concat(attributeValues)

  return {
    loading,
    choices
  }
}

export const FilterKindDropdown = ({ filterKind }: ExpressionContainerProps) => {
  const { loading, choices } = useFilterKindOptions()
  const context = useFilterContext()

  const handleFilterKindChange = (newKind: Value) => {
    context.changeFilterKind(filterKind, newKind)
  }

  return (
    <Expression.OperandDropdown triggerText={filterKind.selected.displayName}>
      {choices.map((item) => (
        <Expression.OperantDropdownItem
          key={item.id}
          onClick={() => handleFilterKindChange(item)}
        >
          {item.displayName}
        </Expression.OperantDropdownItem>
      ))}
      {loading && (
        <Box>loading...</Box>
      )}
    </Expression.OperandDropdown>
  )
}