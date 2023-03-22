import { Button, Expression, RemoveIcon, sprinkles } from "@saleor/macaw-ui/next"
import React from "react"
import { OperandFactory } from "../Objects/Products/OperandFactory"
import { FilterKindDropdown } from "../Objects/Products/FilterKindDropdown"
import { useFilterContext } from "../State/context"
import { ConditionValue, FilterExpression } from "../State/types"

interface ExpressionContainerProps {
  expression: FilterExpression
}

export const ExpressionContainer = ({ expression }: ExpressionContainerProps) => {
  const context = useFilterContext()
  const { rightOperand, filterKind, condition } = expression

  const handleConditonClick = (newCondition: ConditionValue) => {
    context.changeCondition(condition, newCondition)
  }

  const handleRemoveClick = () => {
    context.removeExpression(filterKind)
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
      <Button
        onClick={handleRemoveClick}
        className={sprinkles({
          color: "iconNeutralSubdued",
          padding: 3
        })}
        variant="tertiary"
        size="small"
        icon={<RemoveIcon />}
      />
    </Expression>
  )
}