import { Box } from "@saleor/macaw-ui/next";
import React from "react";

interface AppLogoProps {
  backgroundColor: string;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  backgroundColor,
  children,
}) => (
  <Box
    width="s10"
    height="s10"
    display="flex"
    placeItems="center"
    borderRadius={3}
    data-test-id="app-logo"
    __backgroundColor={backgroundColor}
  >
    {children}
  </Box>
);
