<script setup>
import { ref } from "vue";
defineProps({
  friend: {
    required: true,
    type: Object,
  },
});
const imgUrl = import.meta.env.VITE_IMG_URL;
const user = ref({});
user.value = JSON.parse(localStorage.user);
</script>

<template>
  <div class="bg-white shadow rounded-xl hover:scale-105 transition-all">
    <router-link
      :to="{ name: 'friendDetails', params: { userId: friend.userId } }"
    >
      <img
        :src="imgUrl + friend.avatar"
        alt="avatar"
        class="rounded-t-xl w-full h-48 object-cover"
      />
    </router-link>
    <div class="p-3 grid grid-cols-2 gap-4">
      <div class="mx-2">
        <h3 class="font-bold">{{ friend.nickname }}</h3>
        <p>{{ friend.gender }}</p>
        <p>{{ friend.introduce }}</p>
      </div>
      <div v-if="friend.userId !== user.user.userId" class="mx-4 my-2">
        <router-link :to="{ name: 'chats', params: { userId: friend.userId } }">
          <img
            class="h-12 float-right"
            :src="imgUrl + 'icon/chat.svg'"
            alt="chat SVG"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>
