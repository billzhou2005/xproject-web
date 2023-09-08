<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAxiosApiStore } from "@/stores/axiosApi";
import { storeToRefs } from "pinia";
import Datepicker from "vue3-datepicker";
import axiosClient from "@/stores/axiosClient";

const apiStore = useAxiosApiStore();
const { response, personalInfo } = storeToRefs(apiStore);

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
const handleFileUpload = () => {
  // const formData = new FormData();
  // formData.append("file", file.value);
  // apiStore.dispatch("fileUpload", formData);
  fileUploadProcess();
};

async function fileUploadProcess() {
  await method1();
  await method2();
}

const fileNameReturn = ref(null);
const method1 = () => {
  return new Promise((resolve, reject) => {
    console.log("file.value:", file.value);
    if (file.value === null) {
      alert("未选择文件！");
      return;
    }
    const formData = new FormData();
    formData.append("file", file.value);
    axiosClient
      .post("file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJ1c2VycVR4bTIwMjMwNTIwMjA1MTI5MCIsIk5pY2tuYW1lIjoiYmlsbHpob3UyMDA4IiwiZXhwIjoxNjk2MDM5ODk3LCJpc3MiOiJwY21hbGwifQ.pwVHFtMkFbq5SERuzso_9iPQ_xoky3ur1tiR9BQSVCY",
        },
      })
      .then((res) => {
        console.log("method1", res);
        fileNameReturn.value = res.data.data;
        console.log("fileNameReturn.value", fileNameReturn.value);
        resolve();
      });
  });
};
const params = ref({ photos: [] });
const method2 = () => {
  return new Promise((resolve, reject) => {
    if (personalInfo.value.photos !== undefined) {
      personalInfo.value.photos.unshift(fileNameReturn.value);
      params.value.photos = personalInfo.value.photos;
    } else {
      params.value.photos.unshift(fileNameReturn.value);
      personalInfo.value.photos = params.value.photos;
    }
    console.log("personalInfo.photos", personalInfo.value.photos);
    axiosClient
      .post("user/update", params.value, {
        headers: {
          "x-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJ1c2VycVR4bTIwMjMwNTIwMjA1MTI5MCIsIk5pY2tuYW1lIjoiYmlsbHpob3UyMDA4IiwiZXhwIjoxNjk2MDM5ODk3LCJpc3MiOiJwY21hbGwifQ.pwVHFtMkFbq5SERuzso_9iPQ_xoky3ur1tiR9BQSVCY",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.msg === "success") {
          alert("图片上传成功！");
        }
        resolve();
      });
  });
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
      @click="handleFileUpload"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      上传文件
    </button>
  </div>
  <div>
    {{ response }}
    {{ personalInfo }}
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
