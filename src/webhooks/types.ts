import {
  WebhookEventTypeAsyncEnum,
  WebhookEventTypeSyncEnum
} from "@saleor/graphql";

export interface WebhookFormData {
  syncEvents: WebhookEventTypeSyncEnum[];
  asyncEvents: WebhookEventTypeAsyncEnum[];
  isActive: boolean;
  name: string;
  secretKey: string | null;
  targetUrl: string;
}
