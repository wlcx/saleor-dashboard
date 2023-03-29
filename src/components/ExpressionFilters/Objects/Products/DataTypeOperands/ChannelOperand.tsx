import useAppChannel from "@dashboard/components/AppLayout/AppChannelContext"
import { Expression } from "@saleor/macaw-ui/next"
import React from "react"

import { useFilterContext } from "../../../State/context"
import { toChannelValue } from "../../../State/maps"
import { DropdownOperand, Value } from "../../../State/types"

const obtainTriggerText = (operand: DropdownOperand) => {
  if (operand.selected) {
    return operand.selected.displayName
  }

  return  "Pick channel"
}

export const ChannelOperand = ({ operand }: { operand: DropdownOperand }) => {
  const context = useFilterContext()
  const { availableChannels } = useAppChannel(false);
  const channels = availableChannels.map(toChannelValue)

  const handleChange = (channel: Value) => {
    context.changeDropdownOperand(operand, channel)
  }

  return (
    <Expression.OperandDropdown triggerText={obtainTriggerText(operand)}>
      {channels.map((item) => (
        <Expression.OperantDropdownItem
          key={item.id}
          onClick={() => handleChange(item)}
        >
          {item.displayName}
        </Expression.OperantDropdownItem>
      ))}
    </Expression.OperandDropdown>
  )
}