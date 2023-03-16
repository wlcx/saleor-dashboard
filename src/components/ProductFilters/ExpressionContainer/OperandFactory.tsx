import { Expression } from "@saleor/macaw-ui/next"
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react"
import { AutocompleteOperand, FilterExpression, Operand, Value } from "./../State/reducer"
import { useFilterContext } from "../State/context"
import { useAutocompleteFiltersCategoriesLazyQuery, useAutocompleteFiltersCategoriesQuery } from "@dashboard/graphql"
import { mapCategories } from "../State/maps"
import { useTokenizedValue } from "../State/hooks"


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
  const {
    value,
    changeAt,
    change,
    input,
    keyDown,
    clean,
    tokens,
    selected
  } = useTokenizedValue("")
  const context = useFilterContext()
  const [open, setOpen] = useState(false);
  const [load, { loading, data }] = useAutocompleteFiltersCategoriesLazyQuery();
  const categories = data ? data.categories.edges.map(mapCategories) : []

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    keyDown(event);
    setOpen(true);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    change(event);
    load({ variables: { search: input }})
  };

  const handleClickItem = (category: Value) => {
    changeAt(category)
    setOpen(false);
  };

  const handleClickOutside = () => {
    clean();
    setOpen(false);
  }
  
  useEffect(() => {

    console.log("selected", tokens, selected)
  }, [tokens])



  return (
    <Expression.OperandAutocomplete
      open={open}
      placeholder="Set category"
      value={value}
      onClickOutside={handleClickOutside}
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