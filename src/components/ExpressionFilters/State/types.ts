import { AttributeInputTypeEnum } from "@dashboard/graphql"

export type LiteralUnion<X> = X[keyof X]

export const ConditionOperator = {
  IS_EQUAL_TO: "is equal to",
  IS: "is",
  IS_BETWEEN: "is between"
} as const

export const LogicOperator = {
  AND: "and",
  OR: "or"
} as const

export type ConditionValue = LiteralUnion<typeof ConditionOperator>

type UnsupportedAttributeTypes = "REFERENCE" | "FILE" | "PLAIN_TEXT" | "RICH_TEXT"
type SupportedAttributeTypes = Omit<typeof AttributeInputTypeEnum, UnsupportedAttributeTypes>

export type DataType =
  | `attr:${keyof SupportedAttributeTypes}`
  | "category"
  | "channel"
  | "collection"
  | "product-type"
  | "price"
  | "empty"

export interface Condition {
  selected: ConditionValue
  choices: ConditionValue[]
}

export interface Value {
  id: string
  name: string
  displayName?: string
  dataType: DataType
  slug?: string
}

export interface DropdownOperand {
  type: "dropdown",
  dataType: DataType,
  selected: Value,
}


export interface AutocompleteOperand {
  type: "autocomplete",
  dataType: DataType,
  selected: Value[],
  typedPhase: string,
}


export interface RangeOperand {
  type: "range",
  dataType: DataType,
  left: number
  right: number
}

export interface TextOperand {
  type: "text"
  dataType: DataType,
  value: string
}

export interface NumberOperand {
  type: "number",
  dataType: DataType,
  value: number
}

export type Operand =
  | DropdownOperand
  | AutocompleteOperand
  | RangeOperand
  | TextOperand
  | NumberOperand

export interface FilterKind {
  selected: Value
}

export interface FilterExpression {
  filterKind: FilterKind
  rightOperand: Operand
  condition: Condition
}

export type FilterState = Array<FilterExpression | LiteralUnion<typeof LogicOperator>>
