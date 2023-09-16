<script setup>
import { computed, onBeforeMount, onMounted, ref } from "vue";
import Friends from "../components/Friends.vue";
import { storeToRefs } from "pinia";
import { useAxiosApiStore } from "@/stores/axiosApi";

const apiStore = useAxiosApiStore();
const { friends } = storeToRefs(apiStore);

const params = ref({});
params.value = {
  district: "",
  gender: "",
  maxHeight: 0,
  maxage: 0,
  minHeight: 0,
  minage: 0,
  order: 2,
  page: 0,
  pageSize: 20,
  province: "",
  userId: "string",
};

onMounted(() => {
  apiStore.dispatch("seekFriends", params.value);
});
</script>

<template>
  <div class="p-8 pb-0 text-orange-500">
    <h1 class="text-4xl font-bold mb-4">Friends</h1>
  </div>
  <Friends :friends="friends" />
</template>
