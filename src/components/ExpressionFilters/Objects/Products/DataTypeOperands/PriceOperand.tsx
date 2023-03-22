import React, { ChangeEvent } from "react"
import { useFilterContext } from "../../../State/context"
import { Expression } from "@saleor/macaw-ui/next"
import { NumberOperand, RangeOperand } from "../../../State/types"
import { isRangeOperand } from "../../../State/guards"

const Single = ({ operand }: { operand: NumberOperand }) => {
  const context = useFilterContext()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    context.changeNumberOperand(operand, parseFloat(event.target.value))
  }

  return (
    <Expression.OperandNumber
      sign="$"
      onChange={handleChange}
      value={operand.value as unknown as string}
      placeholder="Set value"
    />
  )
}

const Range = ({ operand }: { operand: RangeOperand }) => {
  const context = useFilterContext()

  const handleChangeFrom = (event: ChangeEvent<HTMLInputElement>) => {
    context.changeRangeOperand(operand, parseFloat(event.target.value), operand.right)
  }

  const handleChangeTo = (event: ChangeEvent<HTMLInputElement>) => {
    context.changeRangeOperand(operand, operand.left, parseFloat(event.target.value))
  }

  return (
    <Expression.OperandRange
      sign="$"
      onFromChange={handleChangeFrom}
      onToChange={handleChangeTo}
      placeholderFrom="From"
      placeholderTo="To"
      from={operand.left as unknown as string}
      to={operand.right as unknown as string}
    />
  )
}

export const PriceOperand = ({ operand }: { operand: NumberOperand | RangeOperand }) => {
  if (isRangeOperand(operand)) {
    return (<Range operand={operand} />)
  }

  return (<Single operand={operand} />)
}