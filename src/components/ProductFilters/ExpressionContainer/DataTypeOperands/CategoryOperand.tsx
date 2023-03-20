import React from "react"
import { useAutocompleteFiltersCategoriesLazyQuery } from "@dashboard/graphql"
import { toCategoryValue } from "./../../State/maps"
import { Autocomplete } from "./../Autocomplete"
import { useFilterContext } from "../../State/context"
import { AutocompleteOperand, Value } from "../../State/types"

export const CategoryOperand = ({ operand }: { operand: AutocompleteOperand }) => {
  const context = useFilterContext()
  const [load, { loading, data }] = useAutocompleteFiltersCategoriesLazyQuery();
  const categories = data ? data.categories.edges.map(toCategoryValue) : []

  const handleChange = (search) => {
    load({ variables: { search }})
  }

  const handleSelect = (operand: AutocompleteOperand, selected: Value[]) => {
    context.changeAutocompleteOperand(operand, selected)
  }

  return (
    <Autocomplete
      onSelect={handleSelect}
      operand={operand}
      placeholder="Set category"
      onChange={handleChange}
      items={categories}
    />
  )
}