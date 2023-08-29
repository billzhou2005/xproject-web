<script setup>
import YouTubeButton from './YouTubeButton.vue';

defineProps({
  friend: {
    required: true,
    type: Object
  }
})
const imgUrl = "http://1.116.14.156:5186/uploads/";

</script>

<template>
  <div
    class="bg-white shadow rounded-xl hover:scale-105 transition-all"
  >
    <img
      :src="imgUrl + friend.userId + '/' + friend.avatar"
      alt="avatar"
      class="rounded-t-xl w-full h-48 object-cover"
    />
    <div class="p-3">
      <h3 class="font-bold">{{ friend.nickname }}</h3>
      <div class="flex items-center justify-between">
        <YouTubeButton :href="friend.introduce" />
      </div>
    </div>
  </div>
</template>


