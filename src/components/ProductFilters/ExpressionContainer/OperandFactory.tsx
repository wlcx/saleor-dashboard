import React from "react"
import { CategoryOperand, ChannelOperand } from "./DataTypeOperands"
import { Operand } from "../State/reducer"

interface OperandFactoryProps {
  operand: Operand
}

export const OperandFactory = ({ operand }: OperandFactoryProps) => {

  if (operand.dataType === "category" && operand.type === "autocomplete") {
    return (
      <CategoryOperand operand={operand} />
    )
  }

  if (operand.dataType === "channel" && operand.type === "autocomplete") {
    return (
      <ChannelOperand operand={operand} />
    )
  }

  return null
}