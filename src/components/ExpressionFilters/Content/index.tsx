import { CircularProgress } from "@material-ui/core";
import { Box, Dropdown } from "@saleor/macaw-ui/next";
import React from "react";

export const Content = ({ children }) => (
  <Dropdown.Content align="start">
    <Box
      borderWidth={1}
      borderColor="neutralPlain"
      borderStyle="solid"
      borderRadius={3}
      backgroundColor="surfaceNeutralPlain"
      padding={7}
      __minWidth="610px"
    >
      {children}
    </Box>
  </Dropdown.Content>
);

export const Loader = () => (
  <Box display="flex" justifyContent="center" paddingY={3}>
    <CircularProgress size={11} />
  </Box>
);
