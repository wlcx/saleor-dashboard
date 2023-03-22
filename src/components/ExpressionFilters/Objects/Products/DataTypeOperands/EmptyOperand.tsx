import React from "react"
import { Expression } from "@saleor/macaw-ui/next"

export const EmptyOperand = () => {
  return (
    <Expression.OperandText placeholder="Set value" disabled />
  )
}