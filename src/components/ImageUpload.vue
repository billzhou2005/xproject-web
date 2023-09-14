<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useAxiosApiStore } from "@/stores/axiosApi";
import { storeToRefs } from "pinia";
import axiosClient from "@/stores/axiosClient";

const apiStore = useAxiosApiStore();
const { personalInfo } = storeToRefs(apiStore);
const emit = defineEmits(["finishImageUpload"]);
const handleFinish = () => {
  emit("finishImageUpload", true);
};

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

const user = JSON.parse(localStorage.user);
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
          "x-token":user.user.token
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
    //console.log("personalInfo.photos", personalInfo.value.photos);
    axiosClient
      .post("user/update", params.value, {
        headers: {
          "x-token":user.user.token
        },
      })
      .then((res) => {
        //console.log(res);
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
    <div class="flex flex-row items-center">
      <input @change="readURL" type="file" id="custom-input" hidden />
      <label
        for="custom-input"
        class="block text-slate-900 mr-4 py-2 px-4 rounded-md border-0 text-sm font-semibold bg-yellow-100 hover:bg-yellow-300 cursor-pointer"
      >
        选择文件
      </label>
      <label class="text-sm text-slate-500">{{ filename }}</label>
      <img id="blah" :src="previewFile" alt="预览" />
      <button
        :disabled="uploading"
        @click="handleFileUpload"
        class="bg-blue-500 disabled:bg-gray-300 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded"
      >
        上传文件
      </button>
      <span v-if="uploading">上传中 {{ count }}</span>
    </div>
    <button
      @click="handleFinish"
      class="bg-blue-500 disabled:bg-gray-300 hover:bg-blue-700 text-white font-bold mx-2 my-5 py-2 px-4 rounded"
    >
      返回
    </button>
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
