import { Expression } from "@saleor/macaw-ui/next"
import React from "react"
import { FilterExpression } from "./../State/reducer"
import { OperandFactory } from "./OperandFactory"

interface ExpressionContainerProps {
  expression: FilterExpression
}

export const ExpressionContainer = ({ expression }: ExpressionContainerProps) => {
  const { leftOperand, rightOperand, condition } = expression

  return (
    <Expression>
      <OperandFactory operand={leftOperand} />
      <Expression.Condition currentConditon={condition.selected}>
        {condition.choices.map(cnd => (
          <Expression.ConditionItem key={cnd}>{cnd}</Expression.ConditionItem>
        ))}
      </Expression.Condition>
      <OperandFactory operand={rightOperand} />
    </Expression>
  )
}