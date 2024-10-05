<template>
  <div class="bg-colorBgLight dark:bg-colorBgDark">
    <div>
      <!-- Mobile filter dialog -->
      <TransitionRoot as="template" :show="mobileFiltersOpen">
        <Dialog as="div" class="relative z-50 lg:hidden" @close="mobileFiltersOpen = false">
          <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 z-40 flex">
            <TransitionChild
              as="template"
              enter="transition ease-in-out duration-300 transform"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel
                class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-colorBgLight dark:bg-colorBgDark py-4 pb-6 shadow-xl"
              >
                <div class="flex items-center justify-between px-4">
                  <h2 class="text-lg font-medium text-gray-900 dark:text-white">{{ t("Filters") }}</h2>
                  <button
                    type="button"
                    class="relative -mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 dark:text-white hover:text-gray-500 dark:text-white"
                    @click="mobileFiltersOpen = false"
                  >
                    <span class="absolute -inset-0.5" />
                    <span class="sr-only">Close menu</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div class="mt-4">
                  <div class="border-t border-gray-200 pb-4 pt-4">
                    <button
                      @click="resetFilters"
                      class="ml-4 mb-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                      Clear Filters
                    </button>

                    <fieldset>
                      <legend class="w-full px-2">
                        <button
                          type="button"
                          class="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500"
                          aria-controls="filter-section-0"
                          aria-expanded="false"
                        >
                          <span class="text-sm font-medium text-gray-900 dark:text-white">{{ t("Inventory") }}</span>
                        </button>
                      </legend>
                      <div class="px-4 pb-2 pt-2" id="filter-section-0">
                        <div class="space-y-2">
                          <div class="flex items-center">
                            <input
                              id="color-0-mobile"
                              name="inventory"
                              value=""
                              type="radio"
                              v-model="minimumStock"
                              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              for="color-0-mobile"
                              class="ml-3 text-sm text-gray-600 dark:text-white"
                              >{{ t("Allitems") }}</label>
                          </div>
                          <div class="flex items-center">
                            <input
                              id="color-1-mobile"
                              name="inventory"
                              value="1"
                              type="radio"
                              v-model="minimumStock"
                              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              for="color-1-mobile"
                              class="ml-3 text-sm text-gray-600 dark:text-white"
                              >{{ t("Instock") }}</label>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>

                  <!-- Categories Filter -->
                  <Disclosure as="div" class="border-t border-gray-200 pb-4 pt-2">
                    <template #default="slotProps">
                      <fieldset>
                        <legend class="w-full px-2">
                          <DisclosureButton
                            class="flex w-full items-center justify-between p-2 text-gray-400 dark:text-white hover:text-gray-500"
                          >
                            <span class="text-sm font-medium text-gray-900 dark:text-white">Categories</span>
                            <span class="ml-6 flex h-7 items-center">
                              <ChevronDownIcon
                                :class="[slotProps?.open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']"
                                aria-hidden="true"
                              />
                            </span>
                          </DisclosureButton>
                        </legend>
                        <DisclosurePanel class="px-4 pb-2">
                          <div v-for="section in categories" :key="section.name" class="space-y-6">
                            <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center mt-2.5">
                              <input
                                :id="`${section.id}-${optionIdx}-mobile`"
                                name="category"
                                :value="option.label"
                                v-model="selectedCategory"
                                type="radio"
                                class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label :for="`${section.id}-${optionIdx}-mobile`" class="ml-3 text-sm text-gray-500 dark:text-white">{{ option.label }}</label>
                            </div>
                          </div>
                        </DisclosurePanel>
                      </fieldset>
                    </template>
                  </Disclosure>

                  <!-- Variations Filter -->
                  <Disclosure as="div" class="border-t border-gray-200 pb-4 pt-4">
                    <template #default="slotProps">
                      <fieldset>
                        <legend class="w-full px-2">
                          <DisclosureButton
                            class="flex w-full items-center justify-between p-2 text-gray-400 dark:text-white hover:text-gray-500"
                          >
                            <span class="text-sm font-medium text-gray-900 dark:text-white">Variations</span>
                            <span class="ml-6 flex h-7 items-center">
                              <ChevronDownIcon
                                :class="[slotProps?.open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform']"
                                aria-hidden="true"
                              />
                            </span>
                          </DisclosureButton>
                        </legend>
                        <DisclosurePanel class="px-4 pb-2">
                          <div v-for="section in filters" :key="section.name" class="space-y-6">
                            <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center mt-2.5">
                              <input
                                :id="`${section.id}-${optionIdx}-mobile`"
                                name="variation"
                                :value="option.label"
                                v-model="selectedVariation"
                                type="radio"
                                class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label :for="`${section.id}-${optionIdx}-mobile`" class="ml-3 text-sm text-gray-500 dark:text-white">{{ option.label }}</label>
                            </div>
                          </div>
                        </DisclosurePanel>
                      </fieldset>
                    </template>
                  </Disclosure>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>

      <main class="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
        <div class="border-b border-gray-200 pb-10 pt-24">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{{ t("title") }}</h1>
          <p class="mt-4 text-base text-gray-500 dark:text-white">{{ t("subtitle") }}</p>
        </div>

        <div class="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          <aside>
            <h2 class="sr-only">Filters</h2>
            <button
              @click="resetFilters"
              class="hidden lg:block mb-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Clear Filters
            </button>
            <button type="button" class="inline-flex items-center lg:hidden" @click="mobileFiltersOpen = true">
              <span class="text-sm font-medium text-gray-700 dark:text-white">{{ t("Filters") }}</span>
              <PlusIcon class="ml-1 h-5 w-5 flex-shrink-0 text-gray-400 dark:text-white" aria-hidden="true" />
            </button>

            <div class="hidden lg:block">
              <div class="space-y-2.5">
                <!-- Inventory Filter -->
                <fieldset>
                  <legend class="block text-sm font-medium text-gray-900 dark:text-white">{{ t("Inventory") }}</legend>
                  <div class="space-y-3 pt-6">
                    <div class="flex items-center">
                      <input id="color-0" name="inventory" value="" type="radio" v-model="minimumStock" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" checked />
                      <label for="color-0" class="ml-3 text-sm text-gray-600 dark:text-white">{{ t("Allitems") }}</label>
                    </div>
                    <div class="flex items-center">
                      <input id="color-1" name="inventory" value="1" type="radio" v-model="minimumStock" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <label for="color-1" class="ml-3 text-sm text-gray-600 dark:text-white">{{ t("Instock") }}</label>
                    </div>
                  </div>
                </fieldset>

                <!-- Categories Filter -->
                <div>
                  <legend class="block text-sm font-medium text-gray-900 dark:text-white mt-12">{{ t("Categories") }}</legend>
                  <div v-for="(section, sectionIdx) in categories" :key="section.name">
                    <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center mt-2.5">
                      <input :id="`${section.id}-${optionIdx}`" name="category" :value="option.label" type="radio" v-model="selectedCategory" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <label :for="`${section.id}-${optionIdx}`" class="ml-3 text-sm text-gray-600 dark:text-white">{{ option.label }}</label>
                    </div>
                  </div>
                </div>

                <!-- Variations Filter -->
                <div>
                  <legend class="block text-sm font-medium text-gray-900 dark:text-white mt-12">{{ t("Variations") }}</legend>
                  <div v-for="(section, sectionIdx) in filters" :key="section.name">
                    <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center mt-2.5">
                      <input :id="`${section.id}-${optionIdx}`" name="variation" :value="option.label" type="radio" v-model="selectedVariation" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      <label :for="`${section.id}-${optionIdx}`" class="ml-3 text-sm text-gray-600 dark:text-white">{{ option.label }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <!-- Products Section -->
          <section aria-labelledby="product-heading" class="lg:col-span-2 lg:mt-0 xl:col-span-3">
            <div class="bg-colorBgLight dark:bg-colorBgDark">
              <div class="mx-auto max-w-2xl px-4 py-16 md:py-0 sm:px-6 lg:max-w-7xl lg:px-2">
                <div v-if="isLoading" class="text-center my-10">
                  <svg class="animate-spin h-8 w-8 text-gray-500 dark:text-gray-300 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p class="mt-2 text-gray-500 dark:text-gray-300">Loading events...</p>
                </div>

                <div v-else>
                  <div v-if="events.length === 0" class="text-center">
                    <p>No Notes found</p>
                  </div>

                  <div v-else class="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
                    <div v-for="event in events" :key="event.id" class="relative">
                      <NuxtLink :to="localePath('/item/' + event.id)">
                        <div class="relative h-72 w-full overflow-hidden rounded-lg">
                          <img :src="event.image || '/placeholder-img.png'" class="h-full w-full object-cover object-center" />
                        </div>
                        <div class="relative mt-4">
                          <h3 class="text-lg font-extrabold text-gray-900 dark:text-white">{{ event.title }}</h3>
                          <p class="mt-1 text-sm text-gray-500 line-clamp-2">{{ event.summary }}</p>
                        </div>
                        <div class="flex justify-between mt-4">
                          <p v-if="filtersList == 'Bitcoin'" class="float-left dark:text-white font-semibold text-black">
                            {{ (event.price * btcprices).toFixed(8) }}
                            <BitcoinIcon class="h-6 w-6 inline" aria-hidden="true" />
                          </p>

                          <p v-if="filtersList == 'Sats'" class="float-left dark:text-white font-semibold text-black">
                            {{ (event.price * btcprices * 100000000).toFixed(0) }}
                            <SatoshiV2Icon class="h-6 w-6 inline" aria-hidden="true" />
                          </p>

                          <p v-if="filtersList == 'Fiat'" class="float-left dark:text-white font-semibold text-black">
                            {{ event.price }} {{ event.denomination }}
                          </p>
                        </div>

                        <div>
                          <span v-if="event.stock < 5 && event.stock > 0" class="text-orange-400">{{ t('Lastitems') }}</span>
                          <span v-if="event.stock == 0" class="text-red-400">{{ t('Nostock') }}</span>
                          <span v-if="event.stock > 5" class="text-green-400">{{ t('Instock') }}</span>
                        </div>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import NDK from '@nostr-dev-kit/ndk';
import setup from '~/config/setup';
import { bech32 } from 'bech32';
import { useI18n } from 'vue-i18n';
import { useFiltersStore } from '~/store/currency';
import { storeToRefs } from 'pinia';
import { useProjectStore } from '~/store/shopcart';
import { BitcoinIcon, SatoshiV2Icon, NoDollarsIcon } from '@bitcoin-design/bitcoin-icons-vue/filled';
import data from '~/config/products';

const btcprice = await $fetch('https://api.coinbase.com/v2/exchange-rates?currency=' + setup.fiat.denomination);
const btcprices = Number(btcprice.data.rates.BTC).toFixed(8);

const products = ref(data);

const bytesToHex = (bytes) => {
  return Array.from(bytes).map((byte) => byte.toString(16).padStart(2, '0')).join('');
};

const npubToHex = (npub) => {
  const decoded = bech32.decode(npub);
  const pubkeyBytes = bech32.fromWords(decoded.words);
  return bytesToHex(Uint8Array.from(pubkeyBytes));
};

const skHex = npubToHex(setup.nostradmin);
const events = ref([]);
const isLoading = ref(true);
const page = ref(0);
const pageSize = 12;

const fetchEvents = async (pageNumber) => {
  const ndk = new NDK({ explicitRelayUrls: setup.relays });
  await ndk.connect();

  const filter = { kinds: [30402], authors: [skHex] };
  const fetchedEvents = await ndk.fetchEvents(filter);

  const newEvents = Array.from(fetchedEvents)
    .slice(pageNumber * pageSize, (pageNumber + 1) * pageSize)
    .map((event) => {
      const imageTag = event.tags.find((tag) => tag[0] === 'image');
      const summaryTag = event.tags.find((tag) => tag[0] === 'summary');
      const titleTag = event.tags.find((tag) => tag[0] === 'title');
      const priceTag = event.tags.find((tag) => tag[0] === 'price');
      const stockTag = event.tags.find((tag) => tag[0] === 'stock') || [0, 10];

      return {
        ...event,
        image: imageTag ? imageTag[1] : null,
        summary: summaryTag ? summaryTag[1] : event.content,
        title: titleTag ? titleTag[1] : 'Untitled Event',
        price: priceTag ? priceTag[1] : '0',
        denomination: priceTag ? priceTag[2] : '0',
        stock: stockTag[1] ? Number(stockTag[1]) : 10,
      };
    });

  if (pageNumber === 0) {
    events.value = newEvents;
  } else {
    events.value = [...events.value, ...newEvents];
  }

  isLoading.value = false;
};

onMounted(async () => {
  await fetchEvents(page.value);
});

const loadMore = async () => {
  page.value += 1;
  await fetchEvents(page.value);
};

const filtersStore = useFiltersStore();
const { filtersList } = storeToRefs(filtersStore);

const cartStore = useProjectStore();
const { addToCart } = cartStore;

const { t } = useI18n({ useScope: 'local' });

const minimumStock = ref('');
const selectedCategory = ref('');
const selectedVariation = ref('');

const filters = computed(() => {
  const variationSet = new Set();
  products.value.forEach((product) => {
    product.variations.forEach((variation) => variationSet.add(variation));
  });

  return Array.from(variationSet).map((variation) => ({
    id: variation.toLowerCase().replace(/\s+/g, '-'),
    name: variation,
    options: [{ value: variation.toLowerCase().replace(/\s+/g, '-'), label: variation }],
  }));
});

const categories = computed(() => {
  const categorySet = new Set();
  products.value.forEach((product) => {
    product.category.forEach((category) => categorySet.add(category));
  });

  return Array.from(categorySet).map((category) => ({
    id: category.toLowerCase().replace(/\s+/g, '-'),
    name: category,
    options: [{ value: category.toLowerCase().replace(/\s+/g, '-'), label: category }],
  }));
});

const resetFilters = () => {
  selectedCategory.value = '';
  selectedVariation.value = '';
  minimumStock.value = '';
};

const mobileMenuOpen = ref(false);
const mobileFiltersOpen = ref(false);
</script>
<i18n lang="json">
{
  "da": {
    "Addtocart": "Tilføj til kurv",
    "Nostock": "Udsolgt",
    "Lastitems": "Få på lager",
    "Instock": "På lager",
    "Filters": "Filtre",
    "Inventory": "Lager",
    "title": "Se alle vores produkter",
    "subtitle": "Opdag alle vores produkter, der er tilgængelige gennem bitcoin eller lightning-køb!",
    "Allitems": "Alle varer"
  },
  "de": {
    "Addtocart": "In den Warenkorb",
    "Nostock": "Ausverkauft",
    "Lastitems": "Letzte Stücke",
    "Instock": "Auf Lager",
    "Filters": "Filter",
    "Inventory": "Inventar",
    "title": "Durchsuchen Sie unsere Produkte",
    "subtitle": "Entdecken Sie alle unsere Produkte, die über Bitcoin oder Lightning-Kauf verfügbar sind!",
    "Allitems": "Alle Artikel"
  },
  "en": {
    "Addtocart": "Add to cart",
    "Nostock": "Out of stock",
    "Lastitems": "Last items",
    "Instock": "In stock",
    "Filters": "Filters",
    "Inventory": "Inventory",
    "title": "Browse our products",
    "subtitle": "Discover all our products that are available through bitcoin or lightning purchase!",
    "Allitems": "All items"
  },
  "es": {
    "Addtocart": "Añadir a la cesta",
    "Nostock": "Agotado",
    "Lastitems": "Últimas piezas",
    "Instock": "En stock",
    "Filters": "Filtros",
    "Inventory": "Inventario",
    "title": "Explora nuestros productos",
    "subtitle": "¡Descubre todos nuestros productos disponibles para compra con bitcoin o lightning!",
    "Allitems": "Todos los artículos"
  },
  "fr": {
    "Addtocart": "Ajouter au panier",
    "Nostock": "Rupture de stock",
    "Lastitems": "Dernières pièces",
    "Instock": "Disponible",
    "Filters": "Filtres",
    "Inventory": "Inventaire",
    "title": "Parcourir nos produits",
    "subtitle": "Découvrez tous nos produits disponibles à l'achat via bitcoin ou lightning!",
    "Allitems": "Tous les articles"
  },
  "nl": {
    "Addtocart": "In de winkelwagen",
    "Nostock": "Uitverkocht",
    "Lastitems": "Laatste stuks",
    "Instock": "Op voorraad",
    "Filters": "Filters",
    "Inventory": "Voorraad",
    "title": "Blader door onze producten",
    "subtitle": "Ontdek al onze producten die beschikbaar zijn voor aankoop via bitcoin of lightning!",
    "Allitems": "Alle artikelen"
  },
  "pt": {
    "Addtocart": "Adicionar ao carrinho",
    "Nostock": "Fora de estoque",
    "Lastitems": "Últimos itens",
    "Instock": "Em estoque",
    "Filters": "Filtros",
    "Inventory": "Inventário",
    "title": "Veja todos os nossos produtos",
    "subtitle": "Descubra todos os nossos produtos disponíveis para compra com bitcoin ou lightning!",
    "Allitems": "Todos os itens"
  }
}
</i18n>
