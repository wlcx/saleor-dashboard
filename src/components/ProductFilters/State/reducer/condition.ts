import { Condition, Value } from "../types"


export const defaultConditionForKind = (kindValue: Value): Condition => {
  if (["price", "attr:NUMERIC"].includes(kindValue.dataType)) {
    return {
      selected: "is",
      choices: ["is", "is between"]
    }
  }


  return {
    selected: "is",
    choices: ["is"]
  }
}