<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAxiosApiStore } from "@/stores/axiosApi";
import { storeToRefs } from "pinia";
import Datepicker from "vue3-datepicker";

const picked = ref(new Date());
const apiStore = useAxiosApiStore();
const { personalInfo } = storeToRefs(apiStore);

onMounted(() => {
  apiStore.dispatch("personalInfo", null);
});
</script>

<template>
  <div class="p-8 pb-0">
    <h1 class="text-4xl font-bold mb-4 text-orange-500">Game</h1>
  </div>
  <div>
    {{ personalInfo }}
  </div>
</template>
