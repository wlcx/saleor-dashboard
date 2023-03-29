import { Box } from "@saleor/macaw-ui/next"
import React, { ReactNode } from "react"

interface GroupsItem {
  children: ReactNode
  asWhere?: boolean
  nested?: boolean
}

export const GroupsItem = ({ asWhere, nested, children }: GroupsItem) => (
    <>
      <Box paddingY={3}>
        {asWhere ? "Where" : "And"}
      </Box>
      <Box
        backgroundColor={nested ? "surfaceNeutralSubdued" : undefined}
      >
        <Box __display="inline-block">
          {children}
        </Box>
      </Box>
    </>
  )

GroupsItem.displayName = "Groups.Item"