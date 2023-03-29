
import { Expression } from "@saleor/macaw-ui/next"
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react"

import { useTokenizedValue } from "../State/hooks"
import { AutocompleteOperand, Value } from "../State/types"

interface AutocompleteProps {
  operand: AutocompleteOperand
  placeholder: string
  items: Value[]
  onChange: (searchInput: string) => void
  onSelect: (operand: AutocompleteOperand, selected: Value[]) => void
}

export const Autocomplete = ({ operand, items, placeholder, onChange, onSelect }: AutocompleteProps) => {
  const {
    value,
    changeAt,
    change,
    input,
    keyDown,
    clean,
    selected
  } = useTokenizedValue(operand.selected)
  const [open, setOpen] = useState(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    keyDown(event);
    setOpen(true);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    change(event);
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
    if (!selected.length) {return}

    onSelect(operand, selected)
  }, [selected])

  useEffect(() => {
    if (!input) {return}

    onChange(input)
  }, [input])

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