<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAxiosApiStore } from "@/stores/axiosApi";
import { storeToRefs } from "pinia";
import axiosClient from "@/stores/axiosClient";

const apiStore = useAxiosApiStore();
const { response, personalInfo } = storeToRefs(apiStore);

const previewFile = ref(null);
const file = ref(null);
const uploading = ref(false);
const count = ref(0);
let countInterval;
const startUploading = () => {
  uploading.value = true;
  countInterval = setInterval(() => {
    count.value++;
  }, 1000);
};
const stopUploading = () => {
  uploading.value = false;
  clearInterval(countInterval);
  previewFile.value = "";
  file.value = null;
};

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
    startUploading();
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
          stopUploading();
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
    <h1 class="text-4xl font-bold mb-4 text-orange-500">Test</h1>
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
