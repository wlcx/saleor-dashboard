import {
  attrDataType,
  ConditionValue,
  FilterKind,
  Operand,
  Value,
} from "../../State/types";

export const defaultRightOperandForKind = (kindValue: Value): Operand => {
  if (kindValue.dataType === "category") {
    return {
      type: "autocomplete",
      dataType: kindValue.dataType,
      selected: [],
      typedPhase: "",
    };
  }

  if (kindValue.dataType === "channel") {
    return {
      type: "dropdown",
      dataType: kindValue.dataType,
      selected: null,
    };
  }

  if (kindValue.dataType === "product-type") {
    return {
      type: "autocomplete",
      dataType: kindValue.dataType,
      selected: [],
      typedPhase: "",
    };
  }

  if (kindValue.dataType === "collection") {
    return {
      type: "autocomplete",
      dataType: kindValue.dataType,
      selected: [],
      typedPhase: "",
    };
  }

  if (kindValue.dataType === "price") {
    return {
      type: "number",
      dataType: kindValue.dataType,
      value: 0,
    };
  }

  if (kindValue.dataType === attrDataType("DROPDOWN")) {
    return {
      type: "autocomplete",
      dataType: kindValue.dataType,
      selected: [],
      typedPhase: "",
    };
  }

  if (kindValue.dataType === attrDataType("MULTISELECT")) {
    return {
      type: "autocomplete",
      dataType: kindValue.dataType,
      selected: [],
      typedPhase: "",
    };
  }

  if (kindValue.dataType === attrDataType("NUMERIC")) {
    return {
      type: "number",
      dataType: kindValue.dataType,
      value: 0,
    };
  }

  if (kindValue.dataType === attrDataType("BOOLEAN")) {
    return {
      type: "dropdown",
      dataType: kindValue.dataType,
      selected: null,
    };
  }

  if (kindValue.dataType === "attr:SWATCH") {
    return null;
  }

  if (kindValue.dataType === "attr:DATE") {
    return null;
  }

  if (kindValue.dataType === "attr:DATE_TIME") {
    return null;
  }

  return null;
};

export const defaultRightOperandForCondition = (
  kindValue: FilterKind,
  newCondition: ConditionValue,
): Operand => {
  if (
    ["price", attrDataType("NUMERIC")].includes(kindValue.selected.dataType)
  ) {
    if (newCondition === "is between") {
      return {
        type: "range",
        dataType: kindValue.selected.dataType,
        left: 0,
        right: 0,
      };
    }
  }

  return defaultRightOperandForKind(kindValue.selected);
};
