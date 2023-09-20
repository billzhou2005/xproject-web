<script setup>
import { ref } from "vue";
import { defineEmits } from "vue";

defineProps({
  data: Array,
  chatIdSelected: String,
});
const imgUrl = import.meta.env.VITE_IMG_URL;
const user = ref({});
user.value = JSON.parse(localStorage.user);

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
        :src="imgUrl + contact.avatar"
        alt="avatar"
        @click="clickContact(index)"
        style="cursor: pointer"
      />
      <span
        v-if="chatIdSelected === contact.chatId"
        style="color: blue; cursor: pointer"
        @click="clickContact(index)"
      >
        {{ contact.name }}
      </span>
      <span
        v-else="chatIdSelected === contact.chatId"
        style="color: black; cursor: pointer"
        @click="clickContact(index)"
      >
        {{ contact.name }}
      </span>
      <span style="padding-left: 5px; color: red" v-for="u in contact.users">
        <slot v-if="u.userId === user.user.userId && u.unreadCount > 0">{{
          u.unreadCount
        }}</slot>
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
