export const AVAILABLE_CHANNELS_FORM = {
  menageChannelsButton: "[data-test-id='channels-availability-manage-button']",
  // waiting for dev to add back
  // assignedChannels: "[data-test-id='expand-icon']",
  assignedChannels:
    '[data-test-id="channel-availability-item"] .MuiAccordionSummary-expandIcon',
  publishedRadioButtons: "[name*='isPublished']",
  availableForPurchaseRadioButtons: "[name*='isAvailableForPurchase']",
  radioButtonsValueTrue: "[value='true']",
  radioButtonsValueFalse: "[value='false']",
  visibleInListingsButton: "[name*='visibleInListings']",
  availableChannel: "[data-test-id*='channel-availability-item']",
};
