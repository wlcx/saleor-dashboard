import React from "react"
import { useAutocompleteFiltersCollectionsLazyQuery } from "@dashboard/graphql"
import { toCollectionValue } from "./../../State/maps"
import { Autocomplete } from "./../Autocomplete"
import { useFilterContext } from "../../State/context"
import { AutocompleteOperand, Value } from "../../State/types"

export const CollectionOperand = ({ operand }: { operand: AutocompleteOperand }) => {
  const context = useFilterContext()
  const [load, { loading, data }] = useAutocompleteFiltersCollectionsLazyQuery();
  const collections = data ? data.collections.edges.map(toCollectionValue) : []

  const handleChange = (search) => {
    load({
      variables: {
        first: 10,
        search
      }
    })
  }

  const handleSelect = (operand: AutocompleteOperand, selected: Value[]) => {
    context.changeAutocompleteOperand(operand, selected)
  }


  return (
    <Autocomplete
      onSelect={handleSelect}
      operand={operand}
      placeholder="Set collection"
      onChange={handleChange}
      items={collections}
    />
  )
}