<script setup>
import { ref, onMounted } from 'vue';
import NDK from '@nostr-dev-kit/ndk';
import setup from "~/config/setup";
import { bech32 } from "bech32";

const bytesToHex = (bytes) => {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
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
const pageSize = 3; // Number of events per page

const extractMediaUrl = (content) => {
  const regex = /(https?:\/\/[^\s]+(?:png|jpg|mp4))/g;
  const matches = content.match(regex);
  return matches ? matches[0] : null;
};

const cleanedContent = (content) => {
  const mediaRegex = /(https?:\/\/[^\s]+(?:png|jpg|mp4))/g;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const cleaned = content.replace(mediaRegex, '').replace(urlRegex, '').trim();
  return cleaned;
};

const fetchEvents = async (pageNumber) => {
  const relays = [
    'wss://relay.damus.io'
  ];

  const ndk = new NDK({ explicitRelayUrls: setup.relays });

  await ndk.connect(); // Connect to the relay

  // Define the filter
  const filter = { kinds: [30023], authors: [skHex] };

  const fetchedEvents = await ndk.fetchEvents(filter);
  console.log(fetchedEvents);

  // Process fetched events
  const newEvents = Array.from(fetchedEvents).slice(pageNumber * pageSize, (pageNumber + 1) * pageSize).map(event => {
    const imageTag = event.tags.find(tag => tag[0] === "image");
    const summaryTag = event.tags.find(tag => tag[0] === "summary");
    const titleTag = event.tags.find(tag => tag[0] === "title");
    return {
      ...event,
      image: imageTag ? imageTag[1] : null,
      summary: summaryTag ? summaryTag[1] : null,
      title: titleTag ? titleTag[1] : null,
    };
  });

  if (pageNumber === 0) {
    events.value = newEvents;
  } else {
    events.value = [...events.value, ...newEvents];
  }

  isLoading.value = false; // Set loading to false after fetching events
};

onMounted(async () => {
  await fetchEvents(page.value);
});

const loadMore = async () => {
  page.value += 1;
  await fetchEvents(page.value);
};

const { t } = useI18n({ useScope: "local" });
</script>

<i18n lang="json">
{
  "da": {
    "title": "NOTER",
    "subtitle": "Udviklingsnotater med emner fra projekter, men også generelle ting om Bitcoin, Lightning, Nostr, Relay Setup, E-cash, DVM things, udvikling,.."
  },
  "de": {
    "title": "NOTIZEN",
    "subtitle": "Entwicklungsnotizen mit Themen aus Projekten, aber auch allgemeine Sachen über Bitcoin, Lightning, Nostr, Nostr, Relay Setup, E-cash, DVM things, Entwicklung,.."
  },
  "en": {
    "title": "NOTES",
    "subtitle": "Development notes with topics from projects but also general stuff about Bitcoin, Lightning, Nostr, Nostr, Relay Setup, E-cash, DVM things, Development,.. "
  },
  "es": {
    "title": "NOTAS",
    "subtitle": "Notas de desarrollo con temas de proyectos pero también cosas generales sobre Bitcoin, Lightning, Nostr, Nostr, Relay Setup, E-cash, DVM things, desarrollo,.."
  },
  "fr": {
    "title": "NOTES",
    "subtitle": "Notes de développement avec des sujets provenant de projets mais aussi des choses générales sur Bitcoin, Lightning, Nostr, Nostr, Relay Setup, E-cash, DVM things, développement,.."
  },
  "nl": {
    "title": "NOTITIES",
    "subtitle": "Ontwikkelingsnotities met onderwerpen van projecten maar ook algemene dingen over Bitcoin, Lightning, Nostr, Nostr, Relay Setup, E-cash, DVM things, ontwikkeling,.."
  },
  "pt": {
    "title": "NOTAS",
    "subtitle": "Notas de desenvolvimento com tópicos de projetos, mas também coisas gerais sobre Bitcoin, Lightning, Nostr, Nostr, Relay Setup, E-cash, DVM things, desenvolvimento,.."
  }
}
</i18n>

<template>
  <div class="bg-colorBgLight dark:bg-colorBgDark my-24">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          {{ t("title") }}
        </h2>
        <!-- <p class="mt-2 text-lg leading-8 text-gray-900 dark:text-gray-100">
          {{ t("subtitle") }}
        </p> -->
      </div>
      <div v-if="isLoading" class="text-center my-10">
        <svg
          class="animate-spin h-8 w-8 text-gray-500 dark:text-gray-300 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p class="mt-2 text-gray-500 dark:text-gray-300">Loading events...</p>
      </div>
      <div v-else>
        <div v-if="events.length === 0" class="text-center mt-12">
          <p>No Notes found</p>
        </div>
        <div v-else class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 mt-12">
          <article v-for="(event, index) in events" :key="index" class="flex flex-col items-start">
            <NuxtLink :to="localePath('/note/' + event.id)">
              <div class="relative w-full">
                <img :src="event.image || '/placeholder-img.png'" alt="Event Image" class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] border dark:border-white" />
                <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>
              </div>
            </NuxtLink>
            <div class="max-w-xl">
              <div class="mt-8 flex items-center gap-x-4 text-xs">
                <time :datetime="new Date(event.created_at * 1000).toISOString()" class="text-gray-500 dark:text-white">
                  {{ new Date(event.created_at * 1000).toLocaleDateString() }}
                </time>
              </div>
              <div class="group relative">
                <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white dark:text-gray-100">
                  <NuxtLink :to="localePath('/note/' + event.id)">
                    <span class="absolute inset-0"></span>
                    {{ event.title }}
                  </NuxtLink>
                </h3>
                <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-900 dark:text-gray-100">
                  {{ event.summary }}
                </p>
              </div>
            </div>
          </article>
        </div>
        <div class="text-center mt-8" v-if="!events.length === 0">
          <button @click="loadMore" class="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Load More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
