import React from "react"
import { useFilterContext } from "@dashboard/components/ExpressionFilters/State/context";
import { DropdownOperand } from "@dashboard/components/ExpressionFilters/State/types"
import { Expression } from "@saleor/macaw-ui/next";


const obtainTriggerText = (operand: DropdownOperand) => {
  if (operand.selected) {
    return operand.selected.displayName
  }

  return  "Set value"
}

export const AttributeBooleanOperand = ({ operand }: { operand: DropdownOperand }) => {
  const context = useFilterContext()

  const handleChange = (value: boolean) => {
    context.changeDropdownOperand(operand, {
      id: String(value),
      name: String(value),
      displayName: value ? "Yes" : "No",
      dataType: "attr:BOOLEAN",
      slug: String(value)
    })
  }

  return (
    <Expression.OperandDropdown triggerText={obtainTriggerText(operand)}>
      <Expression.OperantDropdownItem key="yes" onClick={() => handleChange(true)}>
        Yes
      </Expression.OperantDropdownItem>
      <Expression.OperantDropdownItem key="no" onClick={() => handleChange(false)}>
        No
      </Expression.OperantDropdownItem>
    </Expression.OperandDropdown>
  )
}