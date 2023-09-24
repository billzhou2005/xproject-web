<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAxiosApiStore } from "@/stores/axiosApi";
import { storeToRefs } from "pinia";
import axiosClient from "@/stores/axiosClient";
import { useUserStore } from "@/stores/user";

const imgUrl = import.meta.env.VITE_IMG_URL;
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const apiStore = useAxiosApiStore();
const { response, personalInfo } = storeToRefs(apiStore);

onMounted(() => {
  apiStore.dispatch("personalInfo", { userId: user.value.userId });
});
</script>

<template>
  <div class="p-8 pb-0">
    <h1 class="text-4xl font-bold mb-4 text-orange-500">Test</h1>
  </div>
  <div class="mx-auto">
    头像和财务
    <img :src="imgUrl + personalInfo.avatar" alt="avatar" />
    <h3>修改头像</h3>
    <h3>区块链币: {{ personalInfo.balance }}</h3>
    <h3>购买</h3>
    <h3>游戏币: {{ personalInfo.beans }}</h3>
    <h3>兑换</h3>
  </div>
  <div>
    {{ personalInfo }}
  </div>
</template>

<style scoped>
img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
</style>
