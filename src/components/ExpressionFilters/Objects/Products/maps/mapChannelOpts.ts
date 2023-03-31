import { FilterExpression } from "@dashboard/components/ExpressionFilters/State/types"
import { ProductListFilterOpts } from "@dashboard/products/components/ProductListPage"

type Channel = ProductListFilterOpts["channel"]

export const mapChannelOpts = (channel: Channel): FilterExpression => {
  const { id, label } = channel.choices.find(ch => ch.id === channel.value)

  return {
    filterKind: {
      selected: { id: "channel", name: "channel", displayName: "channel", dataType: "channel" }
    },
    condition: {
      selected: "is",
      choices: ["is"]
    },
    rightOperand: {
      type: "dropdown",
      dataType: "channel",
      selected: {
        id,
        name: label,
        displayName: label,
        dataType: "channel"
      }
    }
  }
}