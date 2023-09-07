<script setup>
import PersonalCard from "../components/PersonalCard.vue";
import PersonalGallery from "../components/PersonalGallery.vue";
import PersonalEdit from "../components/PersonalEdit.vue";
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useAxiosApiStore } from "@/stores/axiosApi";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const apiStore = useAxiosApiStore();
const { personalInfo, response } = storeToRefs(apiStore);
const isEdit = ref(false);
const handleEdit = () => {
  isEdit.value = !isEdit.value;
};
const handleSubmit = () => {
  isEdit.value = !isEdit.value;
  console.log("personalInfo:", personalInfo.value);
  apiStore.dispatch("userUpdate", personalInfo.value);
};
const cancelSubmit = () => {
  isEdit.value = !isEdit.value;
  apiStore.dispatch("personalInfo", null);
};
onMounted(() => {
  apiStore.dispatch("personalInfo", null);
});
</script>

<template>
  <div class="p-8 pb-0 text-orange-500">
    <h1 class="text-4xl font-bold mb-4">个人信息</h1>
  </div>
  <div v-if="!isEdit" class="mx-auto">
    <PersonalGallery :personalInfo="personalInfo" />
  </div>
  <div v-if="!isEdit" class="mx-auto">
    <PersonalCard :personalInfo="personalInfo" />
  </div>

  <div v-if="isEdit" class="mx-auto">
    <PersonalEdit :personalInfo="personalInfo" />
  </div>

  <div class="flex justify-center items-center px-8 py-8">
    <button
      v-if="!isEdit"
      @click="userStore.logout"
      class="btn-info btn-info-gray"
    >
      退出登陆
    </button>
    <button v-if="!isEdit" @click="handleEdit" class="btn btn-blue">
      编辑
    </button>
    <button v-if="isEdit" @click="cancelSubmit" class="btn-info btn-info-gray">
      取消修改
    </button>
    <button v-if="isEdit" @click="handleSubmit" class="btn btn-blue">
      确认修改
    </button>
  </div>
</template>

<style scoped>
/* my css with @apply */
</style>
