import React, { ReactNode } from "react"
import { Box } from "@saleor/macaw-ui/next"

interface GroupsItem {
  children: ReactNode
  asWhere?: boolean
  nested?: boolean
}

export const GroupsItem = ({ asWhere, nested, children }: GroupsItem) => {
  return (
    <>
      <Box paddingY={3}>
        {asWhere ? "Where" : "Or/And"}
      </Box>
      <Box
        backgroundColor={nested ? "surfaceNeutralSubdued" : undefined}
        padding={3}
      >
        {children}
      </Box>
    </>
  )
}

GroupsItem.displayName = "Groups.Item"