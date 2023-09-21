<script setup>
import Chat from "../components/Chat.vue";
import Contact from "../components/Contact.vue";
import { computed, onMounted, onBeforeUnmount, ref, watch } from "vue";
import { useUserStore } from "@/stores/user";
import { useStompClientStore } from "@/stores/stompClient";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useAxiosApiStore } from "@/stores/axiosApi";

const apiStore = useAxiosApiStore();
const { chatLineList } = storeToRefs(apiStore);

const route = useRoute();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const stompClientStore = useStompClientStore();
const { chat, chatsMsg, chatIdSelected } = storeToRefs(stompClientStore);

const chatcontent = ref(null);
const textMsg = ref(null);
const friendId = ref(null);

const chatsMsgCount = computed(() => {
  if (chatsMsg.value === null) {
    return 0;
  } else {
    return chatsMsg.value.length;
  }
});
const goToBottom = () => {
  setTimeout(() => {
    chatcontent.value.scrollTop = chatcontent.value.scrollHeight;
  }, 100);
};
watch(chatsMsgCount, goToBottom);
// watch(chatsMsgCount, (value, oldValue) => {
//   console.log("chatMsg changed", value, oldValue);
//   goToBottom();
// });

const handlerSendText = () => {
  console.log("chatIdSelected:", chatIdSelected.value);
  if (chatIdSelected.value === null) {
    alert("未选择联系人！");
    return;
  }
  chat.value.sender = {
    nickname: user.value.nickname,
    avatar: user.value.avatar,
    userId: user.value.userId,
  };
  chat.value.recipients.push(friendId.value);
  chat.value.chatId = chatIdSelected.value;
  chat.value.category = "text";
  chat.value.content = textMsg.value;
  chat.value.time = new Date();

  stompClientStore.msgPublisher(chat.value);
  textMsg.value = "";
};
const changeContact = (val) => {
  console.log("got index:", val);
  chatIdSelected.value = chatLineList.value[val].chatId;
  params.value = {
    userId: user.value.userId,
    chatId: chatIdSelected.value,
    page: 0,
    pageSize: 20,
  };
  apiStore.dispatch("getHistoryByChatId", params.value);
};

const params = ref({});

onMounted(() => {
  chatsMsg.value = null;
  chatIdSelected.value = null;
  console.log("userId:", route.params.userId);
  if (route.params.userId !== "none") {
    params.value = {
      userId1: user.value.userId,
      userId2: route.params.userId,
      page: 0,
      pageSize: 20,
    };
    apiStore.dispatch("getHistoryByUserId", params.value);
  } else {
    apiStore.dispatch("chatLineList", {
      page: 0,
      pageSize: 1000,
    });
  }
  //goToBottom()
});
</script>

<template>
  <div class="container">
    <div class="contacts">
      <Contact
        :data="chatLineList"
        :chatIdSelected="chatIdSelected"
        @clickContact="changeContact"
      />
    </div>
    <div class="chatting">
      <div ref="chatcontent" class="chats">
        <Chat :data="chatsMsg" :user="user" />
      </div>
      <div>
        <input
          class="shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
  margin-top: 30px;
  display: grid;
  grid-template-columns: 226px 380px;
  justify-content: center;
}
.contacts {
  border: 2px solid #000;
  border-radius: 5px 5px;
  height: 420px;
  width: 220px;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 5px 3px 3px grey;
}
.chats {
  border: 2px solid #000;
  border-radius: 5px 5px;
  height: 420px;
  width: 380px;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 5px 3px 3px grey;
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
