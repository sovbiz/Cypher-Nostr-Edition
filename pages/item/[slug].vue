<template>
  <div>
    <div v-if="event !== null">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <TabGroup as="div" class="flex flex-col-reverse" v-if="event.images && event.images.length">
            <!-- Thumbnail images -->
            <div class="mx-auto mt-6 w-full max-w-2xl block lg:max-w-none">
              <TabList class="grid grid-cols-4 gap-6">
                <Tab
                  v-for="(image, index) in event.images"
                  :key="index"
                  class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  v-slot="{ selected }"
                >
                  <span class="sr-only">Image {{ index + 1 }}</span>
                  <span class="absolute inset-0 overflow-hidden rounded-md">
                    <img
                      :src="image"
                      alt="Event Image"
                      class="h-full w-full object-cover object-center"
                    />
                  </span>
                  <span
                    :class="[
                      selected ? 'ring-indigo-500' : 'ring-transparent',
                      'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2',
                    ]"
                    aria-hidden="true"
                  />
                </Tab>
              </TabList>
            </div>

            <!-- Main image display -->
            <TabPanels class="aspect-h-1 aspect-w-1 w-full">
              <TabPanel v-for="(image, index) in event.images" :key="index">
                <img
                  :src="image"
                  alt="Event Image"
                  class="h-full w-full object-cover object-center sm:rounded-lg"
                />
              </TabPanel>
            </TabPanels>
          </TabGroup>

          <!-- Event info -->
          <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {{ event.title }}
            </h1>

            <div class="mt-3">
              <h2 class="sr-only">Event information</h2>


              <p
                  v-if="filtersList == 'Bitcoin'"
                  class="text-3xl text-gray-900 dark:text-white"
                >
                  {{ (event.price * btcprices).toFixed(8) }}
                  <BitcoinIcon class="h-6 w-6 inline" aria-hidden="true" />
                </p>

                <p
                  v-if="filtersList == 'Sats'"
                  class="text-3xl text-gray-900 dark:text-white"
                >
                  {{ (event.price * btcprices * 100000000).toFixed(0) }}
                  <SatoshiV2Icon class="h-6 w-6 inline" aria-hidden="true" />
                </p>

                <p
                  v-if="filtersList == 'Fiat'"
                  class="text-3xl text-gray-900 dark:text-white"
                >
                {{ event.price }} {{ event.denomination }}
                </p>











            </div>

            <div class="w-full dark:text-white basis-full">
              <span class="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                <span class="flex w-2.5 h-2.5 bg-green-400 rounded-full mr-1.5 flex-shrink-0"></span>
                {{ t("Instock") }}
              </span>
            </div>

            <div class="mt-6 space-y-6 text-base text-gray-700 dark:text-white">
              <!-- Event description rendered as markdown -->
              <p>{{ event.summary }}</p>
            </div>

            <div class="mt-6">
              <button
                class="snipcart-add-item max-w-xs flex-1 bg-colorBtnLight hover:bg-colorBtnHoverLight dark:bg-colorBtnDark dark:hover:bg-colorBtnHoverDark border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white dark:text-black dark:hover:text-white sm:w-full"
                @click="cartAddStore()"
                :disabled="event.stock === 0"
              >
                {{ t("Addtocart") }}
              </button>
            </div>

            <section aria-labelledby="details-heading" class="mt-12" v-if="event.features">
              <h2 id="details-heading" class="sr-only">Additional details</h2>
              <div class="border-t divide-y divide-gray-200">
                <div>
                  <h3>
                    <button
                      type="button"
                      class="group relative w-full py-6 flex justify-between items-center text-left"
                      aria-controls="disclosure-1"
                      aria-expanded="false"
                    >
                      <span class="text-gray-900 dark:text-white text-sm font-medium">Features</span>
                      <span class="ml-6 flex items-center">
                        <svg class="block h-6 w-6 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <div class="pb-6 prose prose-sm">
                    <ul role="list" class="dark:text-white">
                      <li v-for="feature in event.features" :key="feature" class="dark:text-white">{{ feature }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div class="mt-0 md:mt-12">
        <div
          v-html="event.fulldescription"
          class="max-w-7xl dark:prose-invert prose md:prose-lg lg:prose-xl dark:md:prose-lg-invert dark:lg:prose-xl-invert mx-auto dark:text-white pb-16 px-4 md:px-0 mt-24"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Disclosure,
  RadioGroup,
  TabGroup,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from "@headlessui/vue";
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import NDK from '@nostr-dev-kit/ndk';
import setup from "~/config/setup";
import { bech32 } from "bech32";
import { useProjectStore } from "~/store/shopcart";
import { useFiltersStore } from '~/store/currency';
import {
  BitcoinIcon,
  SatoshiV2Icon
} from '@bitcoin-design/bitcoin-icons-vue/filled';


const cartStore = useProjectStore();
const { addToCart } = cartStore;

import ticker from "~/config/setup";


const btcprice = await $fetch(
  "https://api.coinbase.com/v2/exchange-rates?currency=" +
    ticker.fiat.denomination
);

const btcprices = Number(btcprice.data.rates.BTC).toFixed(8);

console.log(btcprices)

const filtersStore = useFiltersStore();
const { filtersList } = storeToRefs(filtersStore);


const npubToHex = (npub) => {
  const decoded = bech32.decode(npub);
  const pubkeyBytes = bech32.fromWords(decoded.words);
  return Array.from(pubkeyBytes).map(byte => byte.toString(16).padStart(2, '0')).join('');
};

const skHex = npubToHex(setup.nostradmin);

const route = useRoute();
const slugroute = route.params.slug;
const event = ref(null);

onBeforeMount(async () => {
  const ndk = new NDK({ explicitRelayUrls: setup.relays });
  await ndk.connect(); // Connect to the relay

  // Define the filter to fetch the event by its ID
  const filter = {
    kinds: [30402],
    authors: [skHex],
    ids: [slugroute]
  };
  
  const fetchedEvent = await ndk.fetchEvent(filter);
  event.value = fetchedEvent || null;
  
  // Extract image URLs if available in tags
  if (event.value && event.value.tags) {
    event.value.images = event.value.tags
      .filter(tag => tag[0] === 'image')
      .map(tag => tag[1]);

    // Extract other event details
    event.value.title = event.value.tags.find(tag => tag[0] === 'title')?.[1] || 'No Title';
    event.value.summary = event.value.tags.find(tag => tag[0] === 'summary')?.[1] || event.value.content;
    event.value.price = event.value.tags.find(tag => tag[0] === 'price')?.[1] || '0';
    event.value.denomination = event.value.tags.find(tag => tag[0] === 'price')?.[2] || '0';
  }
});

function cartAddStore() {
  if (event.value) {
    addToCart({
      id: event.value.id,
      amount: 1,
      image: event.value.images ? event.value.images[0] : null,
      title: event.value.title,
      price: event.value.price,
    });
  }
}

const { t } = useI18n({ useScope: "local" });
</script>
<i18n lang="json">
  {
    "da": {
      "Addtocart": "Tilføj til kurv",
      "Nostock": "Udsolgt",
      "Lastitems": "Få på lager",
      "Instock": "På lager",
      "Warning": "Ups, det ser ud til, at du ikke har valgt en produktvariation"
    },
    "de": {
      "Addtocart": "In den Warenkorb legen",
      "Nostock": "Ausverkauft",
      "Lastitems": "Letzte Stücke",
      "Instock": "Auf Lager",
      "Warning": "Hoppla, sieht so aus, als hättest du keine Produktvariante ausgewählt"
    },
    "en": {
      "Addtocart": "Add to cart",
      "Nostock": "Out of stock",
      "Lastitems": "Last items",
      "Instock": "In stock",
      "Warning": "Woops looks like you didn't select a product variation"
    },
    "es": {
      "Addtocart": "Añadir a la cesta",
      "Nostock": "Agotado",
      "Lastitems": "Últimas piezas",
      "Instock": "En stock",
      "Warning": "Ups, parece que no seleccionaste una variación del producto"
    },
    "fr": {
      "Addtocart": "Ajouter au panier",
      "Nostock": "Rupture de stock",
      "Lastitems": "Dernières pièces",
      "Instock": "Disponible",
      "Warning": "Oups, on dirait que vous n'avez pas sélectionné une variation de produit"
    },
    "nl": {
      "Addtocart": "Voeg toe aan winkelkar",
      "Nostock": "Uitverkocht",
      "Lastitems": "Laatste stuks",
      "Instock": "In voorraad",
      "Warning": "Oeps, het lijkt erop dat je geen productvariatie hebt geselecteerd"
    },
    "pt": {
      "Addtocart": "Adicionar ao carrinho",
      "Nostock": "Fora de estoque",
      "Lastitems": "Últimos itens",
      "Instock": "Em estoque",
      "Warning": "Ops, parece que você não selecionou uma variação do produto"
    }
  }
  </i18n>
  