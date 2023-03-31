import React from "react"
import { AutocompleteOperand, FilterKind, Value } from "@dashboard/components/ExpressionFilters/State/types"
import { useFilterContext } from "@dashboard/components/ExpressionFilters/State/context"
import { useLoadAttributeValuesLazyQuery } from "@dashboard/graphql"
import { toAttributeValueCountable } from "@dashboard/components/ExpressionFilters/State/maps"
import { Autocomplete } from "@dashboard/components/ExpressionFilters/ExpressionContainer/Autocomplete"

export const AttributeDropdownOperand = ({ operand, kind }: { operand: AutocompleteOperand, kind: FilterKind }) => {
  const context = useFilterContext()
  const [load, { data: attributesData }] = useLoadAttributeValuesLazyQuery()
  const rawAttributes = attributesData ? attributesData.attribute.choices.edges : []
  const attributeValues = rawAttributes
    .map(toAttributeValueCountable(kind.selected.dataType));

  const handleChange = search => {
    load({ variables: { id: kind.selected.id, search, first: 10 } });
  };

  const handleSelect = (operand: AutocompleteOperand, selected: Value[]) => {
    context.changeAutocompleteOperand(operand, selected);
  };


  return (
    <Autocomplete
      onSelect={handleSelect}
      operand={operand}
      placeholder="Set attribute value"
      onChange={handleChange}
      items={attributeValues}
    />
  );


}