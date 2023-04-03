import { isExpression } from "@dashboard/components/ExpressionFilters/State/guards";
import {
  attrDataType,
  FilterExpression,
  FilterState,
} from "@dashboard/components/ExpressionFilters/State/types";
import { ProductListFilterOpts } from "@dashboard/products/components/ProductListPage";
import { ProductListUrlQueryParams } from "@dashboard/products/urls";

import { mapAttributeOpts } from "./attributeOpts";
import { mapCategoryOpts } from "./categoryOpts";
import { mapCollectionOpts } from "./collectionOpts";
import { mapChannelOpts } from "./mapChannelOpts";
import { mapPriceOpts } from "./mapPriceOpts";
import { mapProductTypeOpts } from "./mapProductTypeOpts";

export const mapFilterToFilterQueryParams = (
  state: FilterState,
): ProductListUrlQueryParams =>
  state
    .filter(f => isExpression(f))
    .reduce<ProductListUrlQueryParams>(
      (prev: ProductListUrlQueryParams, curr: FilterExpression) => {
        const { rightOperand, filterKind } = curr;

        if (
          rightOperand.dataType === "category" &&
          rightOperand.type === "autocomplete"
        ) {
          prev.categories = rightOperand.selected.map(s => s.id);
        }

        if (
          rightOperand.dataType === "channel" &&
          rightOperand.type === "dropdown"
        ) {
          prev.channel = rightOperand.selected.slug;
        }

        if (
          rightOperand.dataType === "product-type" &&
          rightOperand.type === "autocomplete"
        ) {
          prev.productTypes = rightOperand.selected.map(s => s.id);
        }

        if (
          rightOperand.dataType === "price" &&
          rightOperand.type === "number"
        ) {
          prev.priceFrom = String(rightOperand.value);
        }

        if (
          rightOperand.dataType === "price" &&
          rightOperand.type === "range"
        ) {
          prev.priceFrom = String(rightOperand.left);
          prev.priceTo = String(rightOperand.right);
        }

        if (
          rightOperand.dataType === "collection" &&
          rightOperand.type === "autocomplete"
        ) {
          prev.collections = rightOperand.selected.map(s => s.id);
        }

        if (
          rightOperand.dataType === attrDataType("DROPDOWN") &&
          rightOperand.type === "autocomplete"
        ) {
          prev["string-attributes"] = prev["string-attributes"] ?? {};
          prev["string-attributes"][filterKind.selected.slug] =
            rightOperand.selected.map(s => s.slug);
        }

        if (
          rightOperand.dataType === attrDataType("MULTISELECT") &&
          rightOperand.type === "autocomplete"
        ) {
          prev["string-attributes"] = prev["string-attributes"] ?? {};
          prev["string-attributes"][filterKind.selected.slug] =
            rightOperand.selected.map(s => s.slug);
        }

        if (
          rightOperand.dataType === attrDataType("BOOLEAN") &&
          rightOperand.type === "dropdown"
        ) {
          prev["boolean-attributes"] = prev["boolean-attributes"] ?? {};
          prev["boolean-attributes"][filterKind.selected.slug] = [
            rightOperand.selected.slug,
          ];
        }

        if (
          rightOperand.dataType === attrDataType("NUMERIC") &&
          rightOperand.type === "number"
        ) {
          prev["numeric-attributes"] = prev["numeric-attributes"] ?? {};
          prev["numeric-attributes"][filterKind.selected.slug] = [
            String(rightOperand.value),
          ];
        }

        if (
          rightOperand.dataType === attrDataType("NUMERIC") &&
          rightOperand.type === "range"
        ) {
          prev["numeric-attributes"] = prev["numeric-attributes"] ?? {};
          prev["numeric-attributes"][filterKind.selected.slug] = [
            String(rightOperand.left),
            String(rightOperand.right),
          ];
        }

        return prev;
      },
      {},
    );

export const mapFilterOptsToFilterState = (
  filterInput: ProductListFilterOpts,
): FilterState => {
  const { categories, channel, productType, price, collections, attributes } =
    filterInput;
  const filterState: FilterState = [];

  const activeAttributes = attributes.filter(a => a.active);

  if (categories.displayValues.length > 0) {
    filterState.push(mapCategoryOpts(categories));
  }

  if (channel.active) {
    filterState.push(mapChannelOpts(channel));
  }

  if (productType.displayValues.length > 0) {
    filterState.push(mapProductTypeOpts(productType));
  }

  if (price.active) {
    filterState.push(mapPriceOpts(price));
  }

  if (collections.displayValues.length > 0) {
    filterState.push(mapCollectionOpts(collections));
  }

  if (activeAttributes.length > 0) {
    filterState.push(...mapAttributeOpts(activeAttributes));
  }

  return filterState;
};
