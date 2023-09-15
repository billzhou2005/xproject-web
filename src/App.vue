<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { storeToRefs } from "pinia";
import { useStompClientStore } from "@/stores/stompClient";

const stompClientStore = useStompClientStore();
onMounted(() => {
  stompClientStore.client.activate();
});
</script>

<template>
  <router-view />
</template>

<style scoped></style>
