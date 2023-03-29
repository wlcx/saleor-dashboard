import { Box } from "@saleor/macaw-ui/next"
import React, { ReactNode } from "react"

interface GroupsProps {
  children: ReactNode
}

export const Groups = ({ children }: GroupsProps) => (
    <Box
      display="grid"
      fontSize="bodySmall"
      color="textNeutralDefault"
      gap={8}
      __gridTemplateRows="auto auto"
      __gridTemplateColumns="min-content max-content"
    >
      {children}
    </Box>
  )

Groups.displayName = "Groups"