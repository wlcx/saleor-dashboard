import { Box,Button } from "@saleor/macaw-ui/next"
import React from "react"

import { useFilterContext } from "../State/context"
import { FilterState } from "../State/types"

const FooterContainer = ({ children }) => (
  <Box
    marginTop={11}
    display="flex"
    flexWrap="nowrap"
    flexDirection="row"
    width="100%"
    justifyContent="space-between"
  >
    {children}
  </Box>
)

interface FooterProps {
  onShowClick: (filters: FilterState) => void
}

export const Footer = ({ onShowClick }: FooterProps) => {
  const { addEmptyExpression, filters } = useFilterContext()

  const handleClear = () => {
    console.log("clearing filters...")
  }

  return (
    <FooterContainer>
      <Button variant="secondary" onClick={addEmptyExpression}>Add filter</Button>
      <Box display="flex">
        <Button onClick={handleClear} variant="tertiary">Clear filters</Button>
        <Button onClick={() => onShowClick(filters)}>Show results</Button>
      </Box>
    </FooterContainer>
  )
}