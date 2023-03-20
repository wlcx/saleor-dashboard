import { Expression } from "@saleor/macaw-ui/next"
import React from "react"
import { ConditionValue, FilterExpression } from "./../State/reducer"
import { OperandFactory } from "./OperandFactory"
import { FilterKindDropdown } from "./FilterKindDropdown"
import { useFilterContext } from "../State/context"

interface ExpressionContainerProps {
  expression: FilterExpression
}

export const ExpressionContainer = ({ expression }: ExpressionContainerProps) => {
  const context = useFilterContext()
  const { rightOperand, filterKind, condition } = expression

  const handleConditonClick = (newCondition: ConditionValue) => {
    context.changeCondition(condition, newCondition)
  }

  return (
    <Expression>
      <FilterKindDropdown filterKind={filterKind} />
      <Expression.Condition currentConditon={condition.selected}>
        {condition.choices.map(cnd => (
          <Expression.ConditionItem key={cnd} onClick={() => handleConditonClick(cnd)}>{cnd}</Expression.ConditionItem>
        ))}
      </Expression.Condition>
      <OperandFactory operand={rightOperand} />
    </Expression>
  )
}