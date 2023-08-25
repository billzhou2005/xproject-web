<script setup>
import FriendItem from './FriendItem.vue';

defineProps({
  friends: {
    required: true,
    type: Array,
  }
})

</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5 px-8">
    <FriendItem v-for="friend of friends" :key="friend.userId" :friend="friend" />
  </div>
  <div v-if="!friends.length" class="flex justify-center text-gray-600 p-8">
    There are no friends data
  </div>
</template>


