<script setup>
import ticker from "~/config/setup";

const btcprice = await $fetch(
  "https://api.coinbase.com/v2/exchange-rates?currency=BTC"
);

const btcprices = Number(btcprice.data.rates.USD).toFixed(2);
</script>
<template>
  <div>
    <p
      class="text-xs leading-5 text-black dark:text-black dark:text-white mt-12 block text-center"
    >
      Bitcoin Ticker: {{ btcprices }} $
    </p>
  </div>
</template>
