
import { Expression } from "@saleor/macaw-ui/next"
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react"
import { AutocompleteOperand, Value } from "./../State/reducer"
import { useFilterContext } from "../State/context"
import { useTokenizedValue } from "../State/hooks"

interface AutocompleteProps {
  operand: AutocompleteOperand
  placeholder: string
  items: Value[]
  onChange: (searchInput: string) => void
}

export const Autocomplete = ({ operand, items, placeholder, onChange }: AutocompleteProps) => {
  const {
    value,
    changeAt,
    change,
    input,
    keyDown,
    clean,
    selected
  } = useTokenizedValue("")
  const context = useFilterContext()
  const [open, setOpen] = useState(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    keyDown(event);
    setOpen(true);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    change(event);
    onChange(input)
  };

  const handleClickItem = (item: Value) => {
    changeAt(item)
    setOpen(false);
  };

  const handleClickOutside = () => {
    clean();
    setOpen(false);
  }
  
  useEffect(() => {
    if (!selected.length) return

    context.changeRightOperand(operand, selected)
  }, [selected])


  return (
    <Expression.OperandAutocomplete
      open={open}
      placeholder={placeholder}
      value={value}
      onClickOutside={handleClickOutside}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    >
      {items.map(item => (
        <Expression.AutocompleteItem key={item.id} onClick={() => handleClickItem(item)}>
          {item.displayName}
        </Expression.AutocompleteItem>
      ))}
    </Expression.OperandAutocomplete>
  )
}