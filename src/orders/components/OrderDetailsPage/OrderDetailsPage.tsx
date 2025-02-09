import {
  extensionMountPoints,
  mapToMenuItemsForOrderDetails,
  useExtensions,
} from "@dashboard/apps/hooks/useExtensions";
import { TopNav } from "@dashboard/components/AppLayout/TopNav";
import CardMenu from "@dashboard/components/CardMenu";
import { CardSpacer } from "@dashboard/components/CardSpacer";
import { useDevModeContext } from "@dashboard/components/DevModePanel/hooks";
import Form from "@dashboard/components/Form";
import { DetailPageLayout } from "@dashboard/components/Layouts";
import { Metadata, MetadataIdSchema } from "@dashboard/components/Metadata";
import Savebar from "@dashboard/components/Savebar";
import {
  OrderDetailsFragment,
  OrderDetailsQuery,
  OrderErrorFragment,
  OrderStatus,
  TransactionActionEnum,
} from "@dashboard/graphql";
import { SubmitPromise } from "@dashboard/hooks/useForm";
import useNavigator from "@dashboard/hooks/useNavigator";
import { defaultGraphiQLQuery } from "@dashboard/orders/queries";
import { orderListUrl } from "@dashboard/orders/urls";
import { ConfirmButtonTransitionState } from "@saleor/macaw-ui";
import React from "react";
import { useIntl } from "react-intl";

import { getMutationErrors, maybe } from "../../../misc";
import OrderChannelSectionCard from "../OrderChannelSectionCard";
import OrderCustomer from "../OrderCustomer";
import OrderCustomerNote from "../OrderCustomerNote";
import OrderDraftDetails from "../OrderDraftDetails/OrderDraftDetails";
import { FormData as OrderDraftDetailsProductsFormData } from "../OrderDraftDetailsProducts";
import OrderFulfilledProductsCard from "../OrderFulfilledProductsCard";
import OrderHistory, { FormData as HistoryFormData } from "../OrderHistory";
import OrderInvoiceList from "../OrderInvoiceList";
import { OrderPaymentOrTransaction } from "../OrderPaymentOrTransaction/OrderPaymentOrTransaction";
import OrderUnfulfilledProductsCard from "../OrderUnfulfilledProductsCard";
import { messages } from "./messages";
import Title from "./Title";
import {
  createMetadataHandler,
  createOrderMetadataIdSchema,
  filteredConditionalItems,
  hasAnyItemsReplaceable,
} from "./utils";

export interface OrderDetailsPageProps {
  order: OrderDetailsFragment | OrderDetailsFragment;
  shop: OrderDetailsQuery["shop"];
  shippingMethods?: Array<{
    id: string;
    name: string;
  }>;
  loading: boolean;
  saveButtonBarState: ConfirmButtonTransitionState;
  errors: OrderErrorFragment[];
  onOrderLineAdd?: () => void;
  onOrderLineChange?: (
    id: string,
    data: OrderDraftDetailsProductsFormData,
  ) => void;
  onOrderLineRemove?: (id: string) => void;
  onShippingMethodEdit?: () => void;
  onBillingAddressEdit();
  onFulfillmentApprove(id: string);
  onFulfillmentCancel(id: string);
  onFulfillmentTrackingNumberUpdate(id: string);
  onOrderFulfill();
  onProductClick?(id: string);
  onPaymentCapture();
  onMarkAsPaid();
  onPaymentRefund();
  onPaymentVoid();
  onShippingAddressEdit();
  onOrderCancel();
  onNoteAdd(data: HistoryFormData);
  onProfileView();
  onOrderReturn();
  onInvoiceClick(invoiceId: string);
  onInvoiceGenerate();
  onInvoiceSend(invoiceId: string);
  onTransactionAction(transactionId: string, actionType: TransactionActionEnum);
  onAddManualTransaction();
  onSubmit(data: MetadataIdSchema): SubmitPromise;
}

const OrderDetailsPage: React.FC<OrderDetailsPageProps> = props => {
  const {
    loading,
    order,
    shop,
    saveButtonBarState,
    errors,
    onBillingAddressEdit,
    onFulfillmentApprove,
    onFulfillmentCancel,
    onFulfillmentTrackingNumberUpdate,
    onNoteAdd,
    onOrderCancel,
    onOrderFulfill,
    onPaymentCapture,
    onPaymentRefund,
    onPaymentVoid,
    onShippingAddressEdit,
    onProfileView,
    onInvoiceClick,
    onInvoiceGenerate,
    onInvoiceSend,
    onOrderReturn,
    onOrderLineAdd,
    onOrderLineChange,
    onOrderLineRemove,
    onShippingMethodEdit,
    onTransactionAction,
    onAddManualTransaction,
    onMarkAsPaid,
    onSubmit,
  } = props;
  const navigate = useNavigator();
  const intl = useIntl();

  const isOrderUnconfirmed = order?.status === OrderStatus.UNCONFIRMED;
  const canCancel = order?.status !== OrderStatus.CANCELED;
  const canEditAddresses = order?.status !== OrderStatus.CANCELED;
  const canFulfill = order?.status !== OrderStatus.CANCELED;
  const notAllowedToFulfillUnpaid =
    shop?.fulfillmentAutoApprove &&
    !shop?.fulfillmentAllowUnpaid &&
    !order?.isPaid;
  const unfulfilled = (order?.lines || []).filter(
    line => line.quantityToFulfill > 0,
  );

  const handleSubmit = async (data: MetadataIdSchema) => {
    const result = await onSubmit(data);
    return getMutationErrors(result);
  };

  const initial = createOrderMetadataIdSchema(order);

  const saveLabel = isOrderUnconfirmed
    ? { confirm: intl.formatMessage(messages.confirmOrder) }
    : undefined;

  const allowSave = () => {
    if (!isOrderUnconfirmed) {
      return loading;
    } else if (!order?.lines?.length) {
      return true;
    }
    return loading;
  };

  const selectCardMenuItems = filteredConditionalItems([
    {
      item: {
        label: intl.formatMessage(messages.cancelOrder),
        onSelect: onOrderCancel,
      },
      shouldExist: canCancel,
    },
    {
      item: {
        label: intl.formatMessage(messages.returnOrder),
        onSelect: onOrderReturn,
      },
      shouldExist: hasAnyItemsReplaceable(order),
    },
  ]);

  const { ORDER_DETAILS_MORE_ACTIONS } = useExtensions(
    extensionMountPoints.ORDER_DETAILS,
  );

  const extensionMenuItems = mapToMenuItemsForOrderDetails(
    ORDER_DETAILS_MORE_ACTIONS,
    order?.id,
  );

  const context = useDevModeContext();

  const openPlaygroundURL = () => {
    context.setDevModeContent(defaultGraphiQLQuery);
    context.setVariables(`{ "id": "${order?.id}" }`);
    context.setDevModeVisibility(true);
  };

  return (
    <Form
      confirmLeave
      initial={initial}
      onSubmit={handleSubmit}
      mergeData={false}
    >
      {({ set, triggerChange, data, submit }) => {
        const handleChangeMetadata = createMetadataHandler(
          data,
          set,
          triggerChange,
        );

        return (
          <DetailPageLayout>
            <TopNav href={orderListUrl()} title={<Title order={order} />}>
              <CardMenu
                menuItems={[
                  ...selectCardMenuItems,
                  ...extensionMenuItems,
                  {
                    label: intl.formatMessage(messages.openGraphiQL),
                    onSelect: openPlaygroundURL,
                    testId: "graphiql-redirect",
                  },
                ]}
              />
            </TopNav>

            <DetailPageLayout.Content data-test-id="order-fulfillment">
              {!isOrderUnconfirmed ? (
                <OrderUnfulfilledProductsCard
                  showFulfillmentAction={canFulfill}
                  notAllowedToFulfillUnpaid={notAllowedToFulfillUnpaid}
                  lines={unfulfilled}
                  onFulfill={onOrderFulfill}
                  loading={loading}
                />
              ) : (
                <>
                  <OrderDraftDetails
                    order={order}
                    errors={errors}
                    loading={loading}
                    onOrderLineAdd={onOrderLineAdd}
                    onOrderLineChange={onOrderLineChange}
                    onOrderLineRemove={onOrderLineRemove}
                    onShippingMethodEdit={onShippingMethodEdit}
                  />
                  <CardSpacer />
                </>
              )}
              {order?.fulfillments?.map(fulfillment => (
                <OrderFulfilledProductsCard
                  dataTestId="fulfilled-order-section"
                  key={fulfillment.id}
                  fulfillment={fulfillment}
                  fulfillmentAllowUnpaid={shop?.fulfillmentAllowUnpaid}
                  order={order}
                  onOrderFulfillmentCancel={() =>
                    onFulfillmentCancel(fulfillment.id)
                  }
                  onTrackingCodeAdd={() =>
                    onFulfillmentTrackingNumberUpdate(fulfillment.id)
                  }
                  onOrderFulfillmentApprove={() =>
                    onFulfillmentApprove(fulfillment.id)
                  }
                >
                  <Metadata
                    isLoading={loading}
                    data={data[fulfillment.id]}
                    onChange={x => handleChangeMetadata(x, fulfillment.id)}
                  />
                </OrderFulfilledProductsCard>
              ))}
              <OrderPaymentOrTransaction
                order={order}
                shop={shop}
                onTransactionAction={onTransactionAction}
                onPaymentCapture={onPaymentCapture}
                onPaymentVoid={onPaymentVoid}
                onPaymentRefund={onPaymentRefund}
                onMarkAsPaid={onMarkAsPaid}
                onAddManualTransaction={onAddManualTransaction}
              />
              <Metadata
                isLoading={loading}
                data={data[order?.id]}
                onChange={x => handleChangeMetadata(x, order?.id)}
              />
              <OrderHistory
                history={order?.events}
                orderCurrency={order?.total?.gross.currency}
                onNoteAdd={onNoteAdd}
              />
            </DetailPageLayout.Content>
            <DetailPageLayout.RightSidebar>
              <OrderCustomer
                canEditAddresses={canEditAddresses}
                canEditCustomer={false}
                order={order}
                errors={errors}
                onBillingAddressEdit={onBillingAddressEdit}
                onShippingAddressEdit={onShippingAddressEdit}
                onProfileView={onProfileView}
              />
              <CardSpacer />
              <OrderChannelSectionCard channel={order?.channel} />
              <CardSpacer />
              {!isOrderUnconfirmed && (
                <>
                  <OrderInvoiceList
                    invoices={order?.invoices}
                    onInvoiceClick={onInvoiceClick}
                    onInvoiceGenerate={onInvoiceGenerate}
                    onInvoiceSend={onInvoiceSend}
                  />
                  <CardSpacer />
                </>
              )}
              <OrderCustomerNote note={maybe(() => order.customerNote)} />
            </DetailPageLayout.RightSidebar>
            <Savebar
              labels={saveLabel}
              onCancel={() => navigate(orderListUrl())}
              onSubmit={submit}
              state={saveButtonBarState}
              disabled={allowSave()}
            />
          </DetailPageLayout>
        );
      }}
    </Form>
  );
};

OrderDetailsPage.displayName = "OrderDetailsPage";
export default OrderDetailsPage;
