import { DataType, FilterExpression, Operand } from "@dashboard/components/ExpressionFilters/State/types"
import { AttributeFilterOpts, ProductListFilterOpts } from "@dashboard/products/components/ProductListPage"

type Attributes = ProductListFilterOpts["attributes"]


const getRightOperand = (attr: AttributeFilterOpts): Operand => {
  if (["DROPDOWN", "MULTISELECT"].includes(attr.inputType)) {
    return {
      type: "autocomplete",
      dataType: `attr:${attr.inputType}` as DataType,
      selected: attr.value.map((v) => ({
        id: v,
        name: v,
        displayName: v,
        dataType: `attr:${attr.inputType}` as DataType
      })),
      typedPhase: "",
    }
  }

  if (attr.inputType === "BOOLEAN") {
    console.log("ADAS", attr)
    const booleanValue = attr.value[0]
    return {
      type: "dropdown",
      dataType: `attr:${attr.inputType}` as DataType,
      selected: {
        id: booleanValue,
        name: booleanValue,
        displayName: booleanValue ? "Yes" : "No",
        dataType: `attr:${attr.inputType}` as DataType,
        slug: booleanValue
      },
    }
  }

  if (attr.inputType === "NUMERIC", attr.value.length === 2) {
    return {
      type: "range",
      dataType: `attr:${attr.inputType}` as DataType,
      left: parseFloat(attr.value[0]),
      right: parseFloat(attr.value[1])
    }
  }

  if (attr.inputType === "NUMERIC", attr.value.length === 1) {
    return {
      type: "number",
      dataType: `attr:${attr.inputType}` as DataType,
      value: parseFloat(attr.value[0]),
    }
  }

  return {
    type: "dropdown",
    dataType: "empty",
    selected: null,
  }
}

export const mapAttributeOpts = (attributes: Attributes): FilterExpression[] => {
  return attributes.map(attr => {
    const entry: FilterExpression = {
      filterKind: {
        selected: {
          id: attr.id,
          name: attr.name,
          displayName: attr.name,
          dataType: `attr:${attr.inputType}` as DataType
        },
      },
      condition: {
        selected: "is",
        choices: ["is"]
      },
      rightOperand: getRightOperand(attr)
    }


    return entry
  })
}