import { appsMessages } from "@dashboard/apps/messages";
import { InstalledApp } from "@dashboard/apps/types";
import { AppUrls } from "@dashboard/apps/urls";
import { isAppInTunnel } from "@dashboard/apps/utils";
import Link from "@dashboard/components/Link";
import { Box, Chip, List, sprinkles, Text } from "@saleor/macaw-ui/next";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useLocation } from "react-router";

import { AppAvatar } from "../AppAvatar/AppAvatar";
import AppPermissions from "../AppPermissions";
import { AppManifestUrl } from "./AppManifestUrl";
import { messages } from "./messages";

export const InstalledAppListRow: React.FC<InstalledApp> = props => {
  const { app, isExternal, logo } = props;
  const intl = useIntl();

  const location = useLocation();

  return (
    <Link
      href={AppUrls.resolveAppUrl(app.id)}
      state={{ from: location.pathname }}
      className={sprinkles({ display: "contents" })}
      inline={false}
      disabled={!app.isActive}
    >
      <List.Item
        padding="s4"
        borderTopStyle="solid"
        borderWidth={1}
        borderColor="neutralPlain"
        justifyContent="space-between"
        flexDirection="row"
        flexWrap="wrap"
        transition={"ease"}
        backgroundColor={{
          default: !app.isActive ? "surfaceNeutralSubdued" : undefined,
          hover: "surfaceNeutralSubdued",
        }}
        cursor={app.isActive ? "pointer" : "not-allowed"}
      >
        <Box
          gap="s2"
          alignItems="center"
          display="grid"
          __gridTemplateColumns="1fr auto"
        >
          <AppAvatar logo={logo} />
          <Box
            display="flex"
            gap="s1"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Box display="flex" gap="s2">
              <Text variant="bodyStrong">{app.name}</Text>
              <Text variant="body" color="textNeutralSubdued">
                {`v${app.version}`}
              </Text>
              {isExternal && (
                <Chip data-test-id="app-external-label" size="large">
                  <Text variant="caption" size="small">
                    <FormattedMessage {...appsMessages.externalApp} />
                  </Text>
                </Chip>
              )}
              {app.manifestUrl && isAppInTunnel(app.manifestUrl) ? (
                <Text
                  variant="caption"
                  color="textNeutralSubdued"
                  data-test-id="app-tunnel-label"
                >
                  {`(${intl.formatMessage(messages.tunnelDevelopment)})`}
                </Text>
              ) : null}
            </Box>
            {app.manifestUrl && (
              <AppManifestUrl manifestUrl={app.manifestUrl} />
            )}
          </Box>
        </Box>
        <Box
          display="flex"
          marginTop={{ mobile: "s1.5", desktop: "s0" }}
          flexDirection="row"
          justifyContent={{ mobile: "flex-end", desktop: "flex-start" }}
          gap="s3"
        >
          <Box marginLeft="auto" display="flex" alignItems="center" gap="s5">
            {!app.isActive && (
              <Text variant="caption" color="textNeutralSubdued">
                <FormattedMessage {...messages.appDisabled} />
              </Text>
            )}
            <AppPermissions permissions={app.permissions} />
          </Box>
        </Box>
      </List.Item>
    </Link>
  );
};

export default InstalledAppListRow;
