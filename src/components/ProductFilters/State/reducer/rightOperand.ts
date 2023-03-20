import { ConditionValue, FilterKind, Operand, Value } from "../types"

export const defaultRightOperandForKind = (kindValue: Value): Operand => {
  if (kindValue.dataType === "category") {
    return {
      type: "autocomplete",
      dataType: kindValue.dataType,
      selected: [],
      typedPhase: "",
    }
  }

  if (kindValue.dataType === "channel") {
    return {
      type: "dropdown",
      dataType: kindValue.dataType,
      selected: null,
    }
  }

  if (kindValue.dataType === "product-type") {
    return {
      type: "autocomplete",
      dataType: kindValue.dataType,
      selected: [],
      typedPhase: "",
    }
  }

  if (kindValue.dataType === "collection") {
    return {
      type: "autocomplete",
      dataType: kindValue.dataType,
      selected: [],
      typedPhase: "",
    }
  }

  if (kindValue.dataType === "price") {
    return {
      type: "number",
      dataType: kindValue.dataType,
      value: 0
    }
  }

  if (kindValue.dataType === "attr:DROPDOWN") {
    return {
      type: "dropdown",
      dataType: kindValue.dataType,
      selected: null,
    }
  }


  if (kindValue.dataType === "attr:MULTISELECT") {
    return {
      type: "autocomplete",
      dataType: kindValue.dataType,
      selected: [],
      typedPhase: "",
    }
  }

  if (kindValue.dataType === "attr:NUMERIC") {
    return {
      type: "number",
      dataType: kindValue.dataType,
      value: 0
    }
  }

  if (kindValue.dataType === "attr:BOOLEAN") {
    return {
      type: "dropdown",
      dataType: kindValue.dataType,
      selected: null,
    }
  }

  if (kindValue.dataType === "attr:SWATCH") {

    console.log("SWATCH TO COVER")
    return null
  }

  if (kindValue.dataType === "attr:DATE") {

    console.log("DATE TO COVER")
    return null
  }

  if (kindValue.dataType === "attr:DATE_TIME") {

    console.log("DATE_TIME TO COVER")
    return null
  }

  return null
}

export const defaultRightOperandForCondition = (kindValue: FilterKind, newCondition: ConditionValue) => {
  if (["price", "attr:NUMERIC"].includes(kindValue.selected.dataType)) {
    if (newCondition === "is between") {
      return {
        type: "range",
        dataType: kindValue.selected.dataType,
        left: 0,
        right: 0
      }
    }
  }

  return defaultRightOperandForKind(kindValue.selected)
}