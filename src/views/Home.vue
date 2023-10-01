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
  <div
    class="m-4 p-4 flex items-center justify-center bg-sky-200 text-black-500 text-3xl border-solid border-2 border-indigo-600"
  >
    2024元旦相约三亚活动火热招募中
  </div>
  <div class="p-4 pb-0 text-orange-500">
    <h3 class="text-2xl font-bold mb-4">Friends</h3>
  </div>
  <Friends :friends="friends" />
</template>
