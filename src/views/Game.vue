<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'

const route = useRoute();

onMounted(() => {
})
</script>

<template>
  <div class="p-8 pb-0">
    <h1 class="text-4xl font-bold mb-4 text-orange-500">Game</h1>
    <div class="flex">
      <el-button type="primary" :icon="Edit" />
      <el-button type="primary" :icon="Share" />
      <el-button type="primary" :icon="Delete" />
      <el-button type="primary" :icon="Search">Search</el-button>
      <el-button type="primary">
        Upload<el-icon class="el-icon--right"><Upload /></el-icon>
      </el-button>
    </div>
  </div>
</template>





