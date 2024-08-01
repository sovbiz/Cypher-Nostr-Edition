<template>
    <div>
      <div 
        class="inline-flex justify-center rounded-md px-3 py-2 text-sm font-semibold text-black dark:text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
        
      >
      <LightningCircleIcon
            class="h-8 w-8"
            aria-hidden="true"
            @click="open = true"
          />
    </div>
      <TransitionRoot as="template" :show="open">
        <Dialog class="relative z-10" @close="open = false">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>
  
          <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div class="absolute top-0 right-0 pt-4 pr-4">
                    <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="open = false">
                      <span class="sr-only">Close</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                  <Script async src="/Donate-Widgets.js"></Script>
    <div class="w-full mx-auto">
      <lightning-donate 
      :to="props.lud16"
        accent="#000"
        labels="🌻 1K,🌭 5K,🌽 10K"
    amounts="1000,5000,10000"
    initial-step="amount"
    comment="true"
      ></lightning-donate>
    </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps } from 'vue'
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { CheckIcon } from '@heroicons/vue/24/outline'
  
  import {
 LightningCircleIcon
} from "@bitcoin-design/bitcoin-icons-vue/filled";


  // Define props
  const props = defineProps({
    lud16: {
      type: String,
      required: true
    }
  })
  
  const open = ref(false)
  </script>
  