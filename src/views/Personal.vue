
<script setup>
import PersonalCard from "../components/PersonalCard.vue";
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useAxiosApiStore } from '@/stores/axiosApi'
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const apiStore = useAxiosApiStore()
const { personalInfo } = storeToRefs(apiStore)

onMounted(() => {
  apiStore.dispatch('personalInfo', null)
});
</script>


<template>
  <div class="p-8 pb-0 text-orange-500">
    <h1 class="text-4xl font-bold mb-4">个人信息</h1>
  </div>
  <div class="mx-auto">
    <PersonalCard :personalInfo = "personalInfo" />
  </div>
  <div class="px-8 py-8">
    <button @click="userStore.logout" class="w-32 mx-2 btn-exit btn-exit-gray">
      退出登陆
    </button>
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

  .btn-exit {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn-exit-gray {
    @apply bg-gray-500 text-white;
  }
  .btn-exit-gray:hover {
    @apply bg-gray-700;
  }
</style>