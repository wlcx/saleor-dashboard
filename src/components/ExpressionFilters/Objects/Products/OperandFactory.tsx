import React from "react"

import { FilterKind, Operand } from "../../State/types"
import { AttributeBooleanOperand, AttributeDropdownOperand, AttributeNumericOperand, CategoryOperand, ChannelOperand, CollectionOperand, EmptyOperand, PriceOperand, ProductTypeOperand } from "./DataTypeOperands"

interface OperandFactoryProps {
  operand: Operand
  kind: FilterKind
}

export const OperandFactory = ({ operand, kind }: OperandFactoryProps) => {
  if (operand.dataType === "category" && operand.type === "autocomplete") {
    return (
      <CategoryOperand operand={operand} />
    )
  }

  if (operand.dataType === "channel" && operand.type === "dropdown") {
    return (
      <ChannelOperand operand={operand} />
    )
  }

  if (operand.dataType === "product-type" && operand.type === "autocomplete") {
    return (
      <ProductTypeOperand operand={operand} />
    )
  }

  if (operand.dataType === "collection" && operand.type === "autocomplete") {
    return (
      <CollectionOperand operand={operand} />
    )
  }

  if (operand.dataType === "price" && (operand.type === "number" || operand.type === "range")) {
    return (
      <PriceOperand operand={operand} />
    )
  }

  if (operand.dataType === "attr:DROPDOWN" && operand.type === "autocomplete") {
    return (
      <AttributeDropdownOperand operand={operand} kind={kind} />
    )
  }

  if (operand.dataType === "attr:BOOLEAN" && operand.type === "dropdown") {
    return (
      <AttributeBooleanOperand operand={operand} />
    )
  }

  if (operand.dataType === "attr:NUMERIC" && (operand.type === "number" || operand.type === "range")) {
    return (
      <AttributeNumericOperand operand={operand} />
    )
  }


  return <EmptyOperand />
}