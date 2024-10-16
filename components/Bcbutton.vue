<script setup>
import { onMounted, defineProps } from 'vue';

// Load the Bitcoin Connect API and launch the modal
const loadBitcoinConnect = async () => {
  const { launchModal } = await import('https://esm.sh/@getalby/bitcoin-connect@3.5.3');
  // launchModal()
};

onMounted(() => {
  loadBitcoinConnect();
});

// Define props with default values
const props = defineProps({
  invoice: {
    type: String,
    required: true, // This prop must be provided by the parent
  },
  title: {
    type: String,
    default: 'Pay with Bitcoin', // Default value if not provided
  },
  preimage: {
    type: String,
    default: "",
  },
});

</script>

<template>

  <bc-pay-button :title="props.title" :invoice="props.invoice" :preimage="props.preimage">
  </bc-pay-button>

</template>
