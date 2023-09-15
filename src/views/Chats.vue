<script setup>
import Chat from "../components/Chat.vue";
import Contact from "../components/Contact.vue";
import { computed, onMounted, onBeforeUnmount, ref, watch } from "vue";
import ContactData from "@/stores/contacts.json";
import { useUserStore } from "@/stores/user";
import { useStompClientStore } from "@/stores/stompClient";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const route = useRoute();
const userStore = useUserStore();
const { user, isLogin } = storeToRefs(userStore);

const stompClientStore = useStompClientStore();
const { client } = storeToRefs(stompClientStore);

const chatcontent = ref(null);
const textMsg = ref(null);
const contacts = ref([]);
contacts.value = ContactData.contacts;

const goToBottom = () => {
  setTimeout(() => {
    chatcontent.value.scrollTop = chatcontent.value.scrollHeight;
  }, 100);
};

const handlerSendText = () => {
  console.log("send text:", textMsg.value);
  textMsg.value = "";
};
const changeContact = (val) => {
  console.log("got index:", val);
};

// watch(chats.value, goToBottom)

onMounted(() => {
  console.log("userId:", route.params.userId);
  //goToBottom()
});
</script>

<template>
  <div class="container">
    <div class="contacts">
      <Contact :data="contacts" @clickContact="changeContact" />
    </div>
    <div class="chatting">
      <div ref="chatcontent" class="chats">
        <Chat :data="chats" />
      </div>
      <div>
        <input
          v-model="textMsg"
          type="text"
          @keyup.enter.native="handlerSendText"
        />
        <button class="favorite styled" type="button" @click="handlerSendText">
          发 送
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 20px 20px;
  display: grid;
  grid-template-columns: 226px 380px;
}
.contacts {
  border: 1px solid #000;
  border-radius: 5px 5px;
  height: 420px;
  width: 220px;
  overflow-x: hidden;
  overflow-y: auto;
}
.chats {
  border: 1px solid #000;
  border-radius: 5px 5px;
  height: 420px;
  width: 380px;
  overflow-x: hidden;
  overflow-y: auto;
}
input {
  margin: 0.4rem 0.4rem;
  width: 260px;
  height: 30px;
}
.styled {
  border: 0;
  line-height: 2.5;
  margin: 0.4rem 0.4rem;
  padding: 0 20px;
  font-size: 1rem;
  text-align: center;
  color: #fff;
  text-shadow: 1px 1px 1px #000;
  border-radius: 10px;
  background-color: rgb(12, 2, 151);
  background-image: linear-gradient(
    to top left,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.2) 30%,
    rgba(0, 0, 0, 0)
  );
  box-shadow: inset 2px 2px 3px rgba(255, 255, 255, 0.6),
    inset -2px -2px 3px rgba(0, 0, 0, 0.6);
}

.styled:hover {
  background-color: rgb(0, 60, 255);
}

.styled:active {
  box-shadow: inset -2px -2px 3px rgba(255, 255, 255, 0.6),
    inset 2px 2px 3px rgba(0, 0, 0, 0.6);
}
</style>
