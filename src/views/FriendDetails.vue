<script setup>
import PersonalCard from "../components/PersonalCard.vue";
import PersonalGallery from "../components/PersonalGallery.vue";
import PersonalEdit from "../components/PersonalEdit.vue";
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useAxiosApiStore } from "@/stores/axiosApi";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";

const route = useRoute();

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const isImageUpload = ref(false);
const ImageUpload = (data) => {
  isImageUpload.value = data;
};

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
  apiStore.dispatch("personalInfo", { userId: route.params.userId });
};
onMounted(() => {
  console.log("userId:", route.params.userId);
  apiStore.dispatch("personalInfo", { userId: route.params.userId });
});
</script>

<template>
  <div class="p-8 pb-0 text-orange-500">
    <h1 class="text-4xl font-bold mb-4">FriendDetails</h1>
  </div>
  <div v-if="!isEdit" class="mx-auto">
    <PersonalGallery
      :personalInfo="personalInfo"
      @changeImageUpload="ImageUpload"
    />
  </div>
  <div v-if="!isEdit && !isImageUpload" class="mx-auto">
    <PersonalCard :personalInfo="personalInfo" />
  </div>

  <div v-if="isEdit && !isImageUpload" class="mx-auto">
    <PersonalEdit :personalInfo="personalInfo" />
  </div>

  <div
    v-if="route.params.userId === user.userId"
    class="flex justify-center items-center px-8 py-8"
  >
    <button
      v-if="!isEdit && !isImageUpload"
      @click="userStore.logout"
      class="btn-info btn-info-gray"
    >
      退出登陆
    </button>
    <button
      v-if="!isEdit && !isImageUpload"
      @click="handleEdit"
      class="btn btn-blue"
    >
      编辑
    </button>
    <button
      v-if="isEdit && !isImageUpload"
      @click="cancelSubmit"
      class="btn-info btn-info-gray"
    >
      取消修改
    </button>
    <button
      v-if="isEdit && !isImageUpload"
      @click="handleSubmit"
      class="btn btn-blue"
    >
      确认修改
    </button>
  </div>
</template>

<style scoped>
/* my css with @apply */
</style>
