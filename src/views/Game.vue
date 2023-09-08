<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAxiosApiStore } from "@/stores/axiosApi";
import { storeToRefs } from "pinia";
import Datepicker from "vue3-datepicker";
import axiosClient from "@/stores/axiosClient";

const apiStore = useAxiosApiStore();
const { response } = storeToRefs(apiStore);

const previewFile = ref(null);
const file = ref(null);
const filename = computed(() => {
  console.log("file.value:", file.value);
  if (file.value !== null) {
    return file.value.name;
  }
});

function readURL(input) {
  console.log("input files:", input.target.files[0]);
  previewFile.value = input.target.files[0];
  file.value = input.target.files[0];

  if (input.target.files && input.target.files[0]) {
    let reader = new FileReader();
    reader.onload = (e) => {
      previewFile.value = e.target.result;
    };
    reader.readAsDataURL(input.target.files[0]);
  }
}
const handleUplpoad = () => {
  const formData = new FormData();
  formData.append("file", file.value);
  apiStore.dispatch("fileUpload", formData);
};

onMounted(() => {
  apiStore.dispatch("personalInfo", null);
});
</script>

<template>
  <div class="p-8 pb-0">
    <h1 class="text-4xl font-bold mb-4 text-orange-500">Game</h1>

    <div class="flex flex-row items-center">
      <input @change="readURL" type="file" id="custom-input" hidden />
      <label
        for="custom-input"
        class="block text-slate-700 mr-4 py-2 px-4 rounded-md border-0 text-sm font-semibold bg-stone-100 hover:bg-stone-300 cursor-pointer"
      >
        选择文件
      </label>
      <label class="text-sm text-slate-500">{{ filename }}</label>
    </div>

    <img id="blah" :src="previewFile" alt="your image" />
    <button
      @click="handleUplpoad"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      上传文件
    </button>
  </div>
  <div>
    {{ response }}
  </div>
</template>

<style scoped>
img {
  max-width: 180px;
}
input[type="file"] {
  padding: 10px;
  background: #2d2d2d;
}
</style>
