<template>
  <div>
    <ContentRenderer :value="parsedMarkdown" class="px-6 mt-24 prose dark:prose-invert mx-auto py-6" v-if="parsedMarkdown" />
    <!-- <p>{{ event }}</p> -->
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import NDK from '@nostr-dev-kit/ndk';
import setup from "~/config/setup";
import { bech32 } from "bech32";
import markdownParser from '@nuxt/content/transformers/markdown';

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

const route = useRoute();
const slugroute = route.params.slug;
const event = ref(null);
const eventContent = ref("");
const parsedMarkdown = ref(null);

onBeforeMount(async () => {
  const ndk = new NDK({ explicitRelayUrls: setup.relays });
  await ndk.connect(); // Connect to the relay
  
  // Define the filter
  const filter = {
    kinds: [30023],
    authors: [skHex],
    ids: [slugroute]
  };
  
  const fetchedEvent = await ndk.fetchEvent(filter); // Assuming fetchEvent fetches a single event
  event.value = fetchedEvent || null; // Assign the fetched event or null if not found
  
  // Extract and set markdown content from the event
  if (event.value && event.value.content) {
    eventContent.value = event.value.content; // Assuming the markdown content is in the 'content' field
    parsedMarkdown.value = await markdownParser.parse(null, eventContent.value); // Parse the markdown content
  }

  console.log(eventContent.value);
});

// const { t } = useI18n({ useScope: "local" });
</script>
