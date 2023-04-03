import { Value } from "@dashboard/components/ExpressionFilters/State/types";

export const productType = (): Value => ({
  id: "product-type",
  name: "product-type",
  displayName: "Product type",
  dataType: "product-type",
});

export const price = (): Value => ({
  id: "price",
  name: "price",
  displayName: "Price",
  dataType: "price",
});

export const channel = (): Value => ({
  id: "channel",
  name: "channel",
  displayName: "Channel",
  dataType: "channel",
});

export const collection = (): Value => ({
  id: "collection",
  name: "Collections",
  displayName: "Collections",
  dataType: "collection",
});

export const category = (): Value => ({
  id: "category",
  name: "category",
  displayName: "category",
  dataType: "category",
});
