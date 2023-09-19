<script setup>
import { ref } from "vue";
import { defineEmits } from "vue";

defineProps({
  data: Array,
  chatIdSelected: String,
});
const imgUrl = import.meta.env.VITE_IMG_URL;

const emit = defineEmits(["clickContact"]);
const clickContact = (index) => {
  emit("clickContact", index);
};
</script>

<template>
  <div class="contact" v-for="(contact, index) in data">
    <div class="content-left">
      <img
        class="avatar"
        :src="imgUrl + contact.users[0].avatar"
        alt="avatar"
        @click="clickContact(index)"
        style="cursor: pointer"
      />
      <span
        v-if="chatIdSelected === contact.chatId"
        style="color: blue; cursor: pointer"
        @click="clickContact(index)"
      >
        {{ contact.users[0].nickname }}
      </span>
      <span
        v-else="chatIdSelected === contact.chatId"
        style="color: black; cursor: pointer"
        @click="clickContact(index)"
      >
        {{ contact.users[0].nickname }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.content-left {
  text-align: left;
}
.content-left span,
img {
  padding-left: 0;
  vertical-align: middle;
  display: inline-block;
  float: none;
  cursor: default;
}
.avatar {
  height: 40px;
  width: 60px;
  padding: 3px 12px 3px 12px;
}
</style>
