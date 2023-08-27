<script setup>
import { computed, onBeforeMount, onMounted, ref } from "vue";
import Friends from "../components/Friends.vue";
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia';
import axiosClient from "@/stores/axiosClient"

const userStore = useUserStore()
const { user, isLogin,friends } = storeToRefs(userStore)

const params = ref({});
params.value = {
  district: "",
  gender: "",
  maxHeight: 0,
  maxage: 0,
  minHeight: 0,
  minage: 0,
  order: 0,
  page: 0,
  pageSize: 10,
  province: "",
  userId: "string",
};

onMounted(() => {
  console.log("user:",isLogin, user)
  userStore.getFriends(params.value)
  // axiosClient
  //     .post("user/seekFriends", params.value, {
  //       headers: {
  //         "x-token":localStorage.getItem("token")
  //       },
  //     })
  //     .then(({ data }) => {
  //       console.log("getFriends",data.data);
  //       friends.value = data.data.fdss ;
  //     });
})

</script>


<template>
  <div class="p-8 pb-0 text-orange-500">
    <h1 class="text-4xl font-bold mb-4">Friends</h1>
  </div>
  <Friends :friends="friends" />

</template>

