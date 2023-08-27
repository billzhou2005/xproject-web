
<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useUserStore } from '@/stores/user'
import { useAxiosApiStore } from '@/stores/axiosApi'
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const { user, isLogin } = storeToRefs(userStore)

const apiStore = useAxiosApiStore()
const { msg, response } = storeToRefs(apiStore)

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

const addr = "user/seekFriends"

const data = ref({});

const axiosCallTest = () => {
  console.log("token",user.value.token)
  console.log("addr",addr)
  console.log("params.value",params.value)
  apiStore.dispatch('seekFriends', params.value)
}

onMounted(() => {

});
</script>


<template>
  <div class="p-8 pb-0">
    <h1 class="text-4xl font-bold mb-4 text-orange-500">Personal info</h1>
  </div>
  <div class="px-8">
    <button @click="userStore.logout" class="btn btn-blue">
      Logout
    </button>
    <p>isLogin: {{ isLogin }}</p>
    <p>{{ user.token }}</p>
  </div>
  <div class="px-8">
    <button @click="axiosCallTest" class="btn btn-blue">
      axiosCall test
    </button>
    <p>response: {{ msg }}</p>
    <p>{{ response }}</p>
  </div>
</template>

<style scoped>
/* my css with @apply */
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn-blue {
    @apply bg-blue-500 text-white;
  }
  .btn-blue:hover {
    @apply bg-blue-700;
  }
</style>