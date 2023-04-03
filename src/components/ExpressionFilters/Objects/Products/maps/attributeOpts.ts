import {
  attrDataType,
  FilterExpression,
  Operand,
} from "@dashboard/components/ExpressionFilters/State/types";
import {
  AttributeFilterOpts,
  ProductListFilterOpts,
} from "@dashboard/products/components/ProductListPage";

type Attributes = ProductListFilterOpts["attributes"];

const dropdownType = (attr: AttributeFilterOpts): Operand => ({
  type: "autocomplete",
  dataType: attrDataType(attr.inputType),
  selected: attr.value.map(v => ({
    id: v,
    name: v,
    displayName: v,
    dataType: attrDataType(attr.inputType),
  })),
  typedPhase: "",
});

const booleanType = (attr: AttributeFilterOpts): Operand => {
  const booleanValue = attr.value[0];

  return {
    type: "dropdown",
    dataType: attrDataType(attr.inputType),
    selected: {
      id: booleanValue,
      name: booleanValue,
      displayName: booleanValue ? "Yes" : "No",
      dataType: attrDataType(attr.inputType),
      slug: booleanValue,
    },
  };
};

const numericRangeType = (attr: AttributeFilterOpts): Operand => ({
  type: "range",
  dataType: attrDataType(attr.inputType),
  left: parseFloat(attr.value[0]),
  right: parseFloat(attr.value[1]),
});

const numericNumberType = (attr: AttributeFilterOpts): Operand => ({
  type: "number",
  dataType: attrDataType(attr.inputType),
  value: parseFloat(attr.value[0]),
});

const defaultType = (): Operand => ({
  type: "dropdown",
  dataType: "empty",
  selected: null,
});

const getRightOperand = (attr: AttributeFilterOpts): Operand => {
  if (["DROPDOWN", "MULTISELECT"].includes(attr.inputType)) {
    return dropdownType(attr);
  }

  if (attr.inputType === "BOOLEAN") {
    return booleanType(attr);
  }

  if (attr.inputType === "NUMERIC" && attr.value.length === 2) {
    return numericRangeType(attr);
  }

  if (attr.inputType === "NUMERIC" && attr.value.length === 1) {
    return numericNumberType(attr);
  }

  return defaultType();
};

export const mapAttributeOpts = (attributes: Attributes): FilterExpression[] =>
  attributes.map(attr => {
    const entry: FilterExpression = {
      filterKind: {
        selected: {
          id: attr.id,
          name: attr.name,
          displayName: attr.name,
          dataType: attrDataType(attr.inputType),
        },
      },
      condition: {
        selected: "is",
        choices: ["is"],
      },
      rightOperand: getRightOperand(attr),
    };

    return entry;
  });
