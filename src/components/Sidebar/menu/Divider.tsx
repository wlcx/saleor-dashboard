import { List, Text } from "@saleor/macaw-ui/next";
import React from "react";

import { SidebarMenuItem } from "./types";

interface Props {
  menuItem: SidebarMenuItem;
}

export const Divider: React.FC<Props> = ({ menuItem }) => (
  <List.Divider paddingY={menuItem.paddingY ?? "s1.5"} paddingX="s1">
    <Text variant="caption" size="small" color="textNeutralSubdued">
      {menuItem.label}
    </Text>
  </List.Divider>
);
