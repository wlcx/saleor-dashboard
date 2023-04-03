import React from "react";

import { attrDataType, FilterKind, Operand } from "../../State/types";
import {
  AttributeBooleanOperand,
  AttributeDropdownOperand,
  AttributeNumericOperand,
  CategoryOperand,
  ChannelOperand,
  CollectionOperand,
  EmptyOperand,
  PriceOperand,
  ProductTypeOperand,
} from "./DataTypeOperands";

interface OperandFactoryProps {
  operand: Operand;
  kind: FilterKind;
}

export const OperandFactory = ({ operand, kind }: OperandFactoryProps) => {
  if (operand.dataType === "category" && operand.type === "autocomplete") {
    return <CategoryOperand operand={operand} />;
  }

  if (operand.dataType === "channel" && operand.type === "dropdown") {
    return <ChannelOperand operand={operand} />;
  }

  if (operand.dataType === "product-type" && operand.type === "autocomplete") {
    return <ProductTypeOperand operand={operand} />;
  }

  if (operand.dataType === "collection" && operand.type === "autocomplete") {
    return <CollectionOperand operand={operand} />;
  }

  if (
    operand.dataType === "price" &&
    (operand.type === "number" || operand.type === "range")
  ) {
    return <PriceOperand operand={operand} />;
  }

  if (
    operand.dataType === attrDataType("DROPDOWN") &&
    operand.type === "autocomplete"
  ) {
    return <AttributeDropdownOperand operand={operand} kind={kind} />;
  }

  if (
    operand.dataType === attrDataType("MULTISELECT") &&
    operand.type === "autocomplete"
  ) {
    return <AttributeDropdownOperand operand={operand} kind={kind} />;
  }

  if (
    operand.dataType === attrDataType("BOOLEAN") &&
    operand.type === "dropdown"
  ) {
    return <AttributeBooleanOperand operand={operand} />;
  }

  if (
    operand.dataType === attrDataType("NUMERIC") &&
    (operand.type === "number" || operand.type === "range")
  ) {
    return <AttributeNumericOperand operand={operand} />;
  }

  return <EmptyOperand />;
};
