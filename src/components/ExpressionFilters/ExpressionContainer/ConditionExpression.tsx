import React from "react"
import { Expression } from "@saleor/macaw-ui/next"
import { Condition as ConditionObject, ConditionValue } from "../State/types"
import { useFilterContext } from "../State/context"


export const ConditionExpression = ({ condition }: { condition: ConditionObject }) => {
  const context = useFilterContext()

  const handleConditonClick = (newCondition: ConditionValue) => {
    context.changeCondition(condition, newCondition)
  }

  return (
    <Expression.Condition currentConditon={condition.selected}>
    {condition.choices.map(cnd => (
      <Expression.ConditionItem key={cnd} onClick={() => handleConditonClick(cnd)}>{cnd}</Expression.ConditionItem>
    ))}
  </Expression.Condition>
  )
}