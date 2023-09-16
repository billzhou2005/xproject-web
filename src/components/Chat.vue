<script setup>
import { ref } from 'vue'

defineProps({
  data: Array,
  user: Object,
})
const imgUrl = import.meta.env.VITE_IMG_URL;

</script>

<template>
    <div class="chat" v-for = "chat in data">
        <div class="content-right" v-if="chat.sender.userId === user.userId ">
          <span> {{ chat.content }} </span>
          <img class="avatar" :src="imgUrl+chat.sender.avatar" alt="avatar"/>
        </div>
        <div class="content-left" v-else>
          <img class="avatar" :src="imgUrl+chat.sender.avatar" alt="avatar" />
          <span> {{ chat.content }} </span>
        </div>
    </div>
</template>

<style scoped>
.chat {
  display: grid;
  grid-template-columns: 380px;
  align-items: left;
  padding: 3px 3px 3px 3px;
}
.avatar {
  display: inline-block;
  height: 40px;
  width: 40px;
  padding: 3px 3px 3px 3px;
}
.content-left {
  text-align: left;
  width: 360px;
}
.content-right {
  display: inline-block;
  text-align: right;
  width: 360px;
}

</style>
