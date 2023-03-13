type LiteralUnion<X> = X[keyof X]

const ConditionOperator = {
  IS_EQUAL_TO: "is equal to",
  IS: "is",
  IS_BETWEEN: "is between"
} as const

const LogicOperator = {
  AND: "and",
  OR: "or"
} as const


type Value = {
  id: string
  name: string
  displayName: string
}

type DropdownOperand<T extends string> =
  | {
    type: T,
    selected: Value,
    isLoading: true
  }
  | {
    type: T,
    selected: Value,
    isLoading: false
    choices: Value[]
  };



type AutocompleteOperand<T extends string> =
  {
    type: T,
    selected: Value[],
    typedPhase: string,
    isLoading: true
  } |
  {
    type: T,
    selected: Value[],
    isLoading: false
    choices: Value[]
  };


type RangeOperand<T extends string> = {
  type: T,
  sign?: string
  left: number
  right: number
}

type TextOperand<T extends string> = {
  type: T
  value: string
};

type NumberOperand<T extends string> = {
  type: T,
  value: number
};

export type Operand =
  | DropdownOperand<"category">
  | AutocompleteOperand<"collections">
  | RangeOperand<"price">
  | TextOperand<"query">
  | NumberOperand<"size">

export interface FilterExpression {
  leftOperand: Operand
  rightOperand: Operand
  condition: {
    selected: LiteralUnion<typeof ConditionOperator>
    choices: LiteralUnion<typeof ConditionOperator>[]
  }
}

export type FilterState = Array<FilterExpression | LiteralUnion<typeof LogicOperator> | FilterState>

export const isExpression = (x: any): x is FilterExpression => {
  return "condition" in x
}

export const isLogicalOperator = (x: any): x is LiteralUnion<typeof LogicOperator> => {
  return Object.values(LogicOperator).includes(x)
}

export const isConditionOperator = (x: any): x is LiteralUnion<typeof ConditionOperator> => {
  return Object.values(ConditionOperator).includes(x)
}


export const filterReducer = (state: FilterState, action) => {
  switch (action.type) {
    case "ADD_EMPTY":
      return state.concat([{
        leftOperand: {
          type: "category",
          selected: { id: "product-type", name: "product-type", displayName: "Product type" },
          isLoading: false,
          choices: [
            { id: "category", name: "category", displayName: "Category" },
            { id: "channels", name: "channels", displayName: "Channels" }
          ]
        },
        rightOperand: {
          type: "query",
          value: ""
        },
        condition: {
          selected: "is",
          choices: Object.values(ConditionOperator)
        }
      }])
    default:
      return state
  }

}