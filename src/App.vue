<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useStompClientStore } from "@/stores/stompClient";

const stompClientStore = useStompClientStore();
onMounted(() => {
  stompClientStore.client.activate();
});
onBeforeUnmount(() => {
  stompClientStore.client.deactivate();
})
</script>

<template>
  <router-view />
</template>

<style scoped></style>
