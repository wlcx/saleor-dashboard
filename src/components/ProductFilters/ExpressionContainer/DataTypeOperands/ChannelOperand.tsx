import React from "react"
import { AutocompleteOperand } from "./../../State/reducer"
import { useAutocompleteFiltersCategoriesLazyQuery } from "@dashboard/graphql"
import { mapCategories } from "./../../State/maps"
import { Autocomplete } from "./../Autocomplete"

export const ChannelOperand = ({ operand }: { operand: AutocompleteOperand }) => {
  const [load, { loading, data }] = useAutocompleteFiltersCategoriesLazyQuery();
  const categories = data ? data.categories.edges.map(mapCategories) : []

  const handleChange = (search) => {
    load({ variables: { search }})
  }

  return (
    <Autocomplete
      operand={operand}
      placeholder="Set channel"
      onChange={handleChange}
      items={categories}
    />
  )
}