import { Expression } from "@saleor/macaw-ui/next"
import React, { ChangeEvent, useState } from "react"
import { AutocompleteOperand, FilterExpression, Operand, Value } from "./../State/reducer"
import { useFilterContext } from "../State/context"
import { useAutocompleteFiltersCategoriesLazyQuery, useAutocompleteFiltersCategoriesQuery } from "@dashboard/graphql"
import { mapCategories } from "../State/maps"


interface OperandFactoryProps {
  operand: Operand
}

const AttributeOperand = () => { }
const ChannelOperand = () => { }
const CollectionOperand = () => { }
const PriceOperand = () => { }
const ProductTypeOperand = () => { }
const ProductKindOperand = () => { }
const StockStatusOperand = () => { }


const AttributeNumericOperand = () => { }
const AttributeBooleanOperand = () => { }
const AttributeDropdownOperand = () => { }


const CategoryOperand = ({ operand }: { operand: AutocompleteOperand }) => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleKeyDown = () => setOpen(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value
    setValue(event.target.value);
    load({ variables: { search }})
  };

  const handleClickItem = (category: Value) => {
    console.log("clicked value", category)
    setOpen(false);
  };
  
  const [load, { loading, data }] = useAutocompleteFiltersCategoriesLazyQuery();
 
  const categories = data ? data.categories.edges.map(mapCategories) : []

  console.log("categories loaded: ", data)

  return (
    <Expression.OperandAutocomplete
      open={open}
      placeholder="Set category"
      value={value}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    >
      {categories.map(cat => (
        <Expression.AutocompleteItem key={cat.id} onClick={() => handleClickItem(cat)}>
          {cat.displayName}
        </Expression.AutocompleteItem>
      ))}
    </Expression.OperandAutocomplete>
  )
}


export const OperandFactory = ({ operand }: OperandFactoryProps) => {
  const context = useFilterContext()


  if (operand.dataType === "category" && operand.type === "autocomplete") {
    return (
      <CategoryOperand operand={operand} />
    )
  }

  return null
}