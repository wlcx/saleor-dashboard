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


export type Value = {
  id: string
  name: string
  displayName: string
  dataType: string
}

type DropdownOperand =
  | {
    type: "dropdown",
    dataType: string,
    selected: Value,
    isLoading: true
  }
  | {
    type: "dropdown_loading",
    dataType: string,
    selected: Value,
    isLoading: false
    choices: Value[]
  };


export type AutocompleteOperand = {
  type: "autocomplete",
  dataType: string,
  selected: Value[],
  typedPhase: string,
}




// type AutocompleteOperand =
//   {
//     type: "autocomplete",
//     dataType: string,
//     selected: Value[],
//     typedPhase: string,
//     isLoading: true
//   } |
//   {
//     type: "autocomplete_loading",
//     dataType: string,
//     selected: Value[],
//     isLoading: false
//     choices: Value[]
//   };


type RangeOperand = {
  type: "range",
  dataType: string,
  sign?: string
  left: number
  right: number
}

type TextOperand = {
  type: "text"
  dataType: string,
  value: string
};

type NumberOperand = {
  type: "number",
  dataType: string,
  value: number
};

export type Operand =
  | DropdownOperand
  | AutocompleteOperand
  | RangeOperand
  | TextOperand
  | NumberOperand

export type FilterKind = {
  selected: Value
}

export interface FilterExpression {
  filterKind: FilterKind
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

const getRightOperandByKind = (kindValue: Value): Operand => {
  if (kindValue.dataType === "category") {
    return {
      type: "autocomplete",
      dataType: kindValue.dataType,
      selected: [],
      typedPhase: "",
    }
  }

  if (kindValue.dataType.includes("attr:")) {
    const attrInputType = kindValue.dataType.split(":")[1]

    console.log("attrInputType", attrInputType)
  }

  return {
    type: "text",
    dataType: "product-type",
    value: ""
  }
}

export const filterReducer = (state: FilterState, action) => {
  switch (action.type) {
    case "ADD_EMPTY":
      return state.concat([{
        filterKind: {
          selected: { id: "product-type", name: "product-type", displayName: "Product type", dataType: "product-type" },
        },
        rightOperand: {
          type: "text",
          dataType: "product-type",
          value: ""
        },
        condition: {
          selected: "is",
          choices: Object.values(ConditionOperator)
        }
      }])
    case "CHANGE_FILTER_KIND":
      return state.map((item) => {
        if (isExpression(item) && item.filterKind === action.payload.currentKind) {
          return {
            ...item,
            filterKind: {
              selected: action.payload.newValue
            },
            rightOperand: getRightOperandByKind(action.payload.newValue)
          }
        }

        return item
      })
      
    default:
      return state
  }

}