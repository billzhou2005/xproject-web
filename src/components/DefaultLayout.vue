<script setup>
import Navbar from "../components/Navbar.vue";
import router from "../router";
import { onMounted } from "vue";

// onMounted(() => {
//   router.push('/guest')
// })
</script>

<template>
  <navbar />
  <main>
    <div class="max-w-[1200px] mx-auto">
      <router-view />
    </div>
  </main>
</template>


