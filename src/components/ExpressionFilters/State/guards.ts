import { Condition, ConditionOperator, FilterExpression, FilterKind, FilterState, LiteralUnion, LogicOperator, Operand, RangeOperand } from "./types"

export const isExpression = (x: any): x is FilterExpression => {
  return "condition" in x
}

export const isLogicalOperator = (x: any): x is LiteralUnion<typeof LogicOperator> => {
  return Object.values(LogicOperator).includes(x)
}

export const isConditionOperator = (x: any): x is Condition => {
  return Object.values(ConditionOperator).includes(x)
}

export const isRangeOperand = (x: any): x is RangeOperand => {
  return "left" in x
}

export const isMatchRightOperand = (stateItem: FilterState[number], operand: Operand): stateItem is FilterExpression => {
  return isExpression(stateItem) && stateItem.rightOperand === operand
}

export const isMatchCondition = (stateItem: FilterState[number], condition: Condition): stateItem is FilterExpression => {
  return isExpression(stateItem) && stateItem.condition === condition
}

export const isMatchFilterKind = (stateItem: FilterState[number], kind: FilterKind): stateItem is FilterExpression => {
  return isExpression(stateItem) && stateItem.filterKind === kind
}