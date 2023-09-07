<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAxiosApiStore } from "@/stores/axiosApi";
import { storeToRefs } from "pinia";
import Datepicker from "vue3-datepicker";

const picked = ref(new Date());
const apiStore = useAxiosApiStore();
const { personalInfo } = storeToRefs(apiStore);

const inputFile = ref(null);

function readURL(input) {
  console.log("input files:",input.target.files[0]);
    inputFile.value = input.target.files[0]
    if (input.target.files && input.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          inputFile.value = e.target.result;
        };
        reader.readAsDataURL(input.target.files[0]);
    }
}

onMounted(() => {
  apiStore.dispatch("personalInfo", null);
});
</script>

<template>
  <div class="p-8 pb-0">
    <h1 class="text-4xl font-bold mb-4 text-orange-500">Game</h1>
    <input type='file' @change="readURL" />
    <img id="blah" :src="inputFile" alt="your image" />
  </div>
  <div>
    {{ personalInfo }}
  </div>
</template>

<style scoped>
  img{
    max-width:180px;
  }
  input[type=file]{
  padding:10px;
  background:#2d2d2d;}
</style>
