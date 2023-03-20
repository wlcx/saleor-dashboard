import React from "react"
import { useAutocompleteFiltersCategoriesLazyQuery } from "@dashboard/graphql"
import { toCategoryValue } from "./../../../State/maps"
import { Autocomplete } from "./../../Autocomplete"
import { useFilterContext } from "../../../State/context"
import { AutocompleteOperand, NumberOperand, Operand, Value } from "../../../State/types"
import { DropdownOperand } from "@dashboard/components/ProductFilters/State/types"

export const AttributeNumericOperand = ({ operand }: { operand: NumberOperand }) => {
  const context = useFilterContext()


  return null
}