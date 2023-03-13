import { Expression } from "@saleor/macaw-ui/next"
import React from "react"
import { FilterExpression, Operand } from "./../State/reducer"
import { useFilterContext } from "../State/context"


interface OperandFactoryProps {
  operand: Operand
}

const AttributeOperand = () => {}
const CategoryOperand = () => {}
const ChannelOperand = () => {}
const CollectionOperand = () => {}
const PriceOperand = () => {}
const ProductTypeOperand = () => {}
const ProductKindOperand = () => {}
const StockStatusOperand = () => {}


const AttributeNumericOperand = () => {}
const AttributeBooleanOperand = () => {}
const AttributeDropdownOperand = () => {}


export const OperandFactory = ({ operand }: OperandFactoryProps) => {
  const context = useFilterContext()


  if (operand.type === "category" && operand.isLoading === false) {
    return (
      <Expression.OperandDropdown triggerText={operand.selected.displayName}>
        {operand.choices.map((item) => (
          <Expression.OperantDropdownItem key={item.id}>{item.displayName}</Expression.OperantDropdownItem>
        ))}
      </Expression.OperandDropdown>
    )
  }

  if (operand.type === "category" && operand.isLoading === true) {
    return (
      <Expression.OperandDropdown triggerText={operand.selected.displayName}>
        <div>Loading...</div>
      </Expression.OperandDropdown>
    )
  }

  if (operand.type === "query") {
    return (<Expression.OperandText
      onChange={() => { }}
      value={operand.value}
      placeholder="Set value"
    />)
  }

  return null
}