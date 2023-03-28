import { Button, RemoveIcon, sprinkles } from "@saleor/macaw-ui/next"
import React from "react"
import { useFilterContext } from "../State/context"
import { FilterKind } from "../State/types"

export const RemoveButton = ({ filterKind }: { filterKind: FilterKind }) => {
  const context = useFilterContext()

  const handleRemoveClick = () => {
    context.removeExpression(filterKind)
  }
  return (
    <Button
      onClick={handleRemoveClick}
      className={sprinkles({
        color: "iconNeutralSubdued",
        padding: 3
      })}
      variant="tertiary"
      size="small"
      icon={<RemoveIcon />}
    />
  )
}