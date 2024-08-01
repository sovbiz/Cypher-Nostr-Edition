<template>
  <div class="mx-auto p-4 mt-10 relative">
    <div v-if="eventData" class=" p-6 relative z-10 text-center">
      <div class="flex justify-center mb-4">
        <img :src="eventData.picture || ''" alt="Profile Picture" class="w-32 h-32 rounded-full border-4 border-white" />
      </div>
      <div class="text-center">
        <h2 class="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-8xl uppercase">{{ eventData.name || 'No Name' }}</h2>
        <!-- <p class="text-gray-200">{{ eventData.display_name || eventData.nip05 || 'No Display Name' }}</p> -->
      </div>
      <div class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl my-4">
        <p>{{ eventData.about || 'No About Information' }}</p>
      </div>


      <div class="mt-10 flex items-center justify-center gap-x-6">
            <NuxtLink
              :to="localePath('/shop')"
              class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >{{ t("viewProjectsButton") }}</NuxtLink
            >



            <NuxtLink
              :to="localePath('/notes')"
              class="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
              >{{ t("getStartedLink") }}
              <span aria-hidden="true">→</span></NuxtLink
            >
          </div>


      <!-- <div class="mt-4">
        <a :href="'lightning:' + (eventData.lud16 || '')" class="text-blue-300">{{ eventData.lud16 || 'No Lightning Address' }}</a>
      </div> -->

<div class="flex justify-center items-center mt-12">

      <Lighningmodal :lud16="eventData.lud16"/>


      <a
      v-if="links.nostr"
      :href="links.nostr"
      target="_blank"
      class="text-colorHighLight dark:text-colorHighDark inline mx-3"
    >
      <span class="sr-only">Nostr</span>
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        class="h-6 w-6 fill-black dark:fill-white "
        viewBox="0 0 875 875"
        style="enable-background: new 0 0 875 875"
        xml:space="preserve"
      >
        <path
          class="st0"
          d="M684.7,485.6c0.2,12.6-11.9,51.5-38.7,81.3c-26.7,29.8-56,20.8-58.4,20.2s-3.1-4.5-7.9-3.8s-9.6,6.2-18.9,7.2
      s-17.5,1.7-26.1-1.4c-4.5,0.7-5.1,0.7-7.2,2.2s-17.8,10.8-21.6,11.5c0,7.2-1.4,44.6,0,55.9s3.8,25.7,7.5,36s2.7,10.6,7.5,9.9
      s13.4,0.3,15.8,4.1c2.4,3.8,1.4,6.5,5.5,8.2s60.7,17.1,99.4,19.2c26.7,0.7,42.9,2.7,52.1,19.5c1.4,7.9,7.5,13,11.3,14.1
      s8.2,2.1,12,5.8s1,8.2,5.5,11.7c4.5,3.4,14.7,8.6,25.4,13.7s15.1,13.4,15.8,16.1s1.7,11,1.7,11s-8.9,0-11-2.1s-2.7-5.8-2.7-5.8
      s-6.2,1-7.5,3.4s0.7,2.7-7.9,0.7s-11.7-3.8-18.2-8.6s-16.5-17.1-25-16.8c4.1,8.2,5.8,8.2,10.6,11s8.2,5.8,8.2,5.8l-7.2,4.5
      c0,0-4.5,2.1-14.7-0.7s-11.7-4.5-12.7-10.6s0-9.3-2.7-14.4s-4.1-15.8-22.3-21.3c-18.2-5.5-66.5-21.3-100.1-24.7s-22.6-2.7-28.1-1.4
      s-15.8,4.5-26.4-1.4S481,732,480.3,725.5s-1.7-11,0-19.2s3.4-19.9,1.7-26.7s-14.1-55.9-19.9-64.1c-13,1-50.7-0.7-50.7-0.7
      s-2.4-0.7-17.5,5.8s-36.5,13.8-46.8,19.9s-14.4,9.7-16.1,13.1c0.1,3-1.2,7.7-2.8,9.1s-12.5,2.4-12.5,2.4s-5.9,5.9-8.2,10
      c-6.9,9.6-55.2,125.1-66.5,149.8c-13.5,32.6-9.8,27.4-37.7,27.4s-8.1,0.3-8.1,0.3s-12.3,5.9-16.8,5.9s-18.9-2.4-26.4,0
      s-16.5,9.3-23.3,10.3s-4.9-1.3-8.4-3.7c-4-0.2-14.3-0.1-14.3-0.1s1.7-6.5,7.9-10.9c8.2-5.8,25.4-16.1,34.6-21.3s17.5-7.9,23.3-9.3
      s18.5-6.2,30.5-9.9s19.5-8.2,29.8-31.5s50.4-111.4,51.4-116.2c0.6-3,3.7-6.5,4.8-15.1c0.7-5.3-2.5-13,1.7-22.6
      c11-25,21.6-20.2,26.4-20.2s17.1,0.3,26.4-1.4s15.4-2.7,24.7-7.9s11.3-8.9,11.3-8.9l-19.9-3.4c0,0-18.5,0.7-25-4.5
      s-15.4-15.8-15.4-15.8l-7.5-7.2l1,8.6c0,0-5.1-8.9-6.5-10.3s-8.6-6.5-11.3-11.3s-7.5-25-7.5-25l-6.2,13l-1.7-18.9l-5.1,7.2
      l-2.7-16.1l-4.8,8.2l-3.4-14.4l-5.8,4.5l-2.4-10.3l-5.8-3.4c0,0-14.1-9.3-16.5-9.6s-4.5,3.4-4.5,3.4l1.4,12l-12.2-6.3l-7-11.9
      c0,0,2.4,4-9.6,7.5c-20.6,0-21.9-2.3-24.9-3.9c-1.3-6.6-5.6-10.1-5.6-10.1h-20.6l-0.3-6.9L141,468l0.7-10.3h-14.1l1-11.3h-8.9
      c0,0,3.1-9.3,25.7-23s25-16.5,46.3-17.1c21.3-0.7,32.9,2.7,46.3,8.2s38.7,13.7,43.9,17.5c11.3-9.9,28.5-19.9,34.3-19.9
      c1-2.4,6.2-12.3,18-17.6c35.3-15.8,108.1-34,131.5-35.5c31.2-2.1,7.9-1.4,39.1,2.1s54.2,7.5,69.6,12.7c12.6,4.2,25,9.6,34.3,2.1
      c4.3-1.8,11.8-1.3,17.8-5.1c30.7-25.1,34.7-32.4,43.6-42s20.1-24.9,22.5-45.1s4.5-58.3-10.6-88.1s-28.8-45.3-34.6-69.3
      s-8.2-61-6.2-73s5.1-22.3,6.9-30.5S658.1,7.9,668,6.2c9.9-1.7,17.8,1.4,22.3,4.8c4.5,3.4,11.7,6.3,13.4,10.3
      c0.3,1.7-1.4,6.5,8.2,8.2c9.6,1.7,16,4.2,16,4.2s15.6,4.3,3.1,7.7c-12.7,2.1-20.5-0.7-24.3,1.7s-7.2,10.1-9.6,11.1s-7.2,0.3-12,4.1
      s-9.6,6.9-12.7,14.4s-5.5,15.8-3.4,26.7s8.6,31.5,14.4,43.2s20.2,40.8,24.3,47.7s15.8,29.5,16.8,53.8s1,44.2,0,54.9
      s-10.8,51.6-35.5,85.9c-8.2,14.1-23.2,31.9-24.7,35c-1.5,3.1-3,4.9-1.6,7.6c4.6,9,12.9,22.1,14.7,29.2
      C679.8,463.5,684.5,473,684.7,485.6L684.7,485.6z"
        />
      </svg>
    </a>

  </div>

      <!-- <div v-if="eventData.website" class="mt-4">
        <a :href="eventData.website" target="_blank" class="text-blue-300">{{ eventData.website }}</a>
      </div> -->
    </div>
    <div v-if="eventData && eventData.banner" class="absolute top-0 left-0 w-full h-full z-0">
      <img :src="eventData.banner" alt="Banner" class="w-full h-full object-cover rounded-lg opacity-80" />
    </div>
    <div v-else class="text-center my-10">
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
          <p class="mt-2 text-gray-500 dark:text-gray-300">Loading Hero Profile...</p>
        </div>




  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import setup from "~/config/setup";
import NDK from "@nostr-dev-kit/ndk";
import { bech32 } from "bech32";
const { t } = useI18n({ useScope: "local" });

const links = setup.socialnavigation;

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

const fetchedEvent = ref('');

onMounted(async () => {
  const ndk = new NDK({ explicitRelayUrls: setup.relays });

  await ndk.connect();

  const filter = { kinds: [0], authors: [skHex] };

  const event = await ndk.fetchEvent(filter);

  if (event && event.content) {
    fetchedEvent.value = event.content;
  } else {
    fetchedEvent.value = 'No event content found';
  }

  // console.log(fetchedEvent.value);
});

const eventData = ref(null);

watch(fetchedEvent, (newVal) => {
  if (newVal) {
    try {
      eventData.value = JSON.parse(newVal);
    } catch (error) {
      console.error('Error parsing event data:', error);
      eventData.value = null;
    }
  }
});
</script>
<i18n lang="json">
  {
    "da": {
      "line1": "Demo-legitimationsoplysninger opdaget!",
      "line2": "Skift LNaddress, btcaddress og orderwebhook i ",
      "line3": "en åben Discord-kanal",
      "line4": "og midler sendes til en Prism-tegnebog for bidragsydere.",
      "line5": "Du kan også tage et kig på",
      "line6": "tjeklisten",
      "line7": "dette er ting, du stadig bør mærke / tilpasse før du sætter i produktion.",
      "line8": "du kan se det aktuelle WIP lokale admin UI",
      "adminPanel": "config/setup.json",
      "bitcoinWebstackTitle": "Sovereign Space",
      "proofOfWorkPudding": "Velkommen til vores digitale hjørne udforsk indhold og produkter",
      "buildBitcoinNostrDescription": "Byg Bitcoin & Nostr Ecosystem virksomheder og udnyt den bedste måde at farme bitcoin og stable sats! Leverer varer, tjenester og løsninger til bitcoin adoption og integration.",
      "viewProjectsButton": "Se Butik",
      "getStartedLink": "Begynd at læse"
    },
    "de": {
      "line1": "Demo-Zugangsdaten erkannt!",
      "line2": "Ändern Sie LNaddress, btcaddress und orderwebhook in der ",
      "line3": "einen offenen Discord-Kanal",
      "line4": "und Gelder werden an eine Prism-Wallet für Mitwirkende gesendet.",
      "line5": "Sie können auch einen Blick werfen auf",
      "line6": "die Checkliste",
      "line7": "das sind Dinge, die Sie noch kennzeichnen / anpassen sollten, bevor Sie in Produktion gehen.",
      "line8": "Sie können die aktuelle WIP lokale Admin-Oberfläche einsehen",
      "adminPanel": "config/setup.json",
      "bitcoinWebstackTitle": "Sovereign Space",
      "proofOfWorkPudding": "Willkommen in unserer digitalen Ecke erkunden Sie Inhalte und Produkte",
      "buildBitcoinNostrDescription": "Bauen Sie Bitcoin & Nostr Ökosystem-Unternehmen und nutzen Sie den besten Weg, um Bitcoin zu farmen und Sats zu stapeln! Bereitstellung von Waren, Dienstleistungen und Lösungen für die Bitcoin-Adoption und Integration.",
      "viewProjectsButton": "Shop ansehen",
      "getStartedLink": "Beginnen Sie mit dem Lesen"
    },
    "es": {
      "line1": "¡Credenciales de demostración detectadas!",
      "line2": "Cambia LNaddress, btcaddress y orderwebhook en el archivo ",
      "line3": "un canal abierto de Discord",
      "line4": "y los fondos se envían a una billetera Prism para colaboradores.",
      "line5": "También puedes echar un vistazo a",
      "line6": "la lista de verificación",
      "line7": "estas son cosas que todavía deberías personalizar antes de poner en producción.",
      "line8": "puedes ver la UI de administración local WIP actual",
      "adminPanel": "config/setup.json",
      "bitcoinWebstackTitle": "Espacio Soberano",
      "proofOfWorkPudding": "Bienvenido a nuestro rincón digital, explora contenido y productos",
      "buildBitcoinNostrDescription": "Construye negocios del ecosistema Bitcoin & Nostr y utiliza la mejor manera de farmear bitcoin y apilar sats! Ofreciendo bienes, servicios y soluciones para la adopción e integración de bitcoin.",
      "viewProjectsButton": "Ver Tienda",
      "getStartedLink": "Comenzar a leer"
    },
    "en": {
      "line1": "Demo Crendentials Detected!",
      "line2": "Change the LNaddress, btcaddress and orderwebhook in the ",
      "line3": "an open discord chanel",
      "line4": "and funds are send to a prism wallet for contributors.",
      "line5": "You can also have a look at",
      "line6": "the checklist ",
      "line7": "these are things you should still brand / customise before putting in production.",
      "line8": "you can view the current WIP local admin UI ",
      "adminPanel": "config/setup.json",
      "bitcoinWebstackTitle": "Sovereign Space",
      "proofOfWorkPudding": "Welcome to our digital corner explore content and products",
      "buildBitcoinNostrDescription": "Build Bitcoin & Nostr Ecosystem Businesses and utilise the best way to farm bitcoin and stack sats! Providing goods, services and solutions for bitcoin adoption and integrations.",
      "viewProjectsButton": "View Shop",
      "getStartedLink": "Start Reading "
    },
    "fr": {
      "line1": "Identifiants de démo détectés !",
      "line2": "Changez LNaddress, btcaddress et orderwebhook dans le fichier ",
      "line3": "un canal Discord ouvert",
      "line4": "et les fonds sont envoyés à un portefeuille Prism pour les contributeurs.",
      "line5": "Vous pouvez également jeter un œil à",
      "line6": "la liste de contrôle",
      "line7": "ce sont des choses que vous devriez encore personnaliser avant de mettre en production.",
      "line8": "vous pouvez consulter l'interface administrateur locale WIP actuelle",
      "adminPanel": "config/setup.json",
      "bitcoinWebstackTitle": "Espace Souverain",
      "proofOfWorkPudding": "Bienvenue dans notre coin numérique, explorez le contenu et les produits",
      "buildBitcoinNostrDescription": "Construisez des entreprises de l'écosystème Bitcoin & Nostr et utilisez la meilleure façon de farmer des bitcoins et d'empiler des sats! Fournissant des biens, des services et des solutions pour l'adoption et l'intégration du bitcoin.",
      "viewProjectsButton": "Voir la Boutique",
      "getStartedLink": "Commencer à lire"
    },
    "nl": {
      "line1": "Demo-credentials gedetecteerd!",
      "line2": "Wijzig LNaddress, btcaddress en orderwebhook in het ",
      "line3": "een open Discord-kanaal",
      "line4": "en fondsen worden verzonden naar een Prism-portemonnee voor bijdragers.",
      "line5": "Je kunt ook kijken naar",
      "line6": "de checklist",
      "line7": "dit zijn dingen die je nog moet brandmerken / aanpassen voordat je in productie gaat.",
      "line8": "u kunt de huidige WIP lokale admin UI bekijken",
      "adminPanel": "config/setup.json",
      "bitcoinWebstackTitle": "Soevereine Ruimte",
      "proofOfWorkPudding": "Welkom in onze digitale hoek, verken inhoud en producten",
      "buildBitcoinNostrDescription": "Bouw Bitcoin & Nostr Ecosysteem Bedrijven en gebruik de beste manier om bitcoin te farmen en sats te stapelen! Het leveren van goederen, diensten en oplossingen voor bitcoin adoptie en integratie.",
      "viewProjectsButton": "Bekijk Winkel",
      "getStartedLink": "Begin met lezen"
    },
    "pt": {
      "line1": "Credenciais de demonstração detectadas!",
      "line2": "Altere o LNaddress, btcaddress e orderwebhook no ",
      "line3": "um canal aberto do Discord",
      "line4": "e os fundos são enviados para uma carteira Prism para colaboradores.",
      "line5": "Você também pode dar uma olhada na",
      "line6": "lista de verificação",
      "line7": "estas são coisas que você ainda deve personalizar antes de colocar em produção.",
      "line8": "você pode ver a interface de administração local WIP atual",
      "adminPanel": "config/setup.json",
      "bitcoinWebstackTitle": "Espaço Soberano",
      "proofOfWorkPudding": "Bem-vindo ao nosso canto digital, explore conteúdo e produtos",
      "buildBitcoinNostrDescription": "Construa negócios do ecossistema Bitcoin & Nostr e utilize a melhor maneira de minerar bitcoin e acumular sats! Fornecendo bens, serviços e soluções para a adoção e integração do bitcoin.",
      "viewProjectsButton": "Ver Loja",
      "getStartedLink": "Comece a Ler"
    }
  }
  </i18n>
  