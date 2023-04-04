import { useFilterContext } from "@dashboard/components/ExpressionFilters/State/context";
import { DropdownOperand } from "@dashboard/components/ExpressionFilters/State/types";
import { Expression } from "@saleor/macaw-ui/next";
import React from "react";

const obtainTriggerText = (operand: DropdownOperand) => {
  if (operand.selected) {
    return operand.selected.displayName;
  }

  return "Set value";
};

export const AttributeBooleanOperand = ({
  operand,
}: {
  operand: DropdownOperand;
}) => {
  const context = useFilterContext();

  const handleChange = (value: boolean) => {
    context.changeDropdownOperand(operand, {
      id: String(value),
      name: String(value),
      displayName: value ? "Yes" : "No",
      dataType: "attr:BOOLEAN",
      slug: String(value),
    });
  };

  return (
    <Expression.OperandDropdown triggerText={obtainTriggerText(operand)}>
      <Expression.OperandDropdownItem
        key="yes"
        onClick={() => handleChange(true)}
      >
        Yes
      </Expression.OperandDropdownItem>
      <Expression.OperandDropdownItem
        key="no"
        onClick={() => handleChange(false)}
      >
        No
      </Expression.OperandDropdownItem>
    </Expression.OperandDropdown>
  );
};
