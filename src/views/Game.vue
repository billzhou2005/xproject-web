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
    <h1 class="text-4xl font-bold mb-4 text-orange-500">成为会员</h1>
    <div>
      <p>专员精准服务</p>
      <p>服务到相亲结婚成功</p>
      <p>约会服务费折扣20%</p>
    </div>
    <div>VIP会员:12800元/5年, 1年内结婚退款30%</div>
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
