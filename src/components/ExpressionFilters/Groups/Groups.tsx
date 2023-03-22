import React, { ReactNode } from "react"
import { Box } from "@saleor/macaw-ui/next"

interface GroupsProps {
  children: ReactNode
}

export const Groups = ({ children }: GroupsProps) => {
  return (
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
}

Groups.displayName = "Groups"