<script setup>
import { ref,computed, onMounted } from 'vue'
import { useStompClientStore } from '@/stores/stompClient';
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia';

defineProps({
  msg: String,
})

const textMsg = ref(String)
textMsg.value = "Hello"
const stompClientStore = useStompClientStore()


const userStore = useUserStore()
const { user, isLogin, friends } = storeToRefs(userStore)

const keyword = ref({
    email: '421238871@qq.com',
    password: '000000',
});

const params = ref({
  district: "",
  gender: "",
  maxHeight: 0,
  maxage: 0,
  minHeight: 0,
  minage: 0,
  order: 0,
  page: 0,
  pageSize: 10,
  province: "",
  userId: "string",
});

const handlerSendText = () => {
  console.log("send text:",textMsg.value)
  const exchange2 = '/exchange/xproject/awesome-chat-8821';
  var body = {"sender":{"userId":"uid202302","name":"Katty","avatar":"./avatar2.jpg"},"category":"text","content":textMsg.value,"receiver":{"userId":"uid202301","name":"Bill","avatar":"./avatar1.jpg"}};
  stompClientStore.client.publish({ 
    destination: exchange2, 
    body: JSON. stringify(body),
    skipContentLengthHeader: true,
   })
  //textMsgPublisher(textMsg.value)
  //textMsg.value = ""
}

onMounted(() => {
  stompClientStore.client.activate();
})

</script>

<template>
  <p>{{ user }}</p>

  <div class="card">
    <button :disabled = "isLogin" type="button" @click="userStore.login(keyword)">login</button>
    <button type="button" @click="userStore.getFriends(params)">getFriends</button>
  </div>
  <p> isLogin: {{ isLogin }}</p>
  <p>{{ friends }}</p>
  <div class="publish">
    <button type="button" @click="handlerSendText">publish</button>
  </div>
  <p>{{ stompClientuserStore.chatsMsg }}</p>

</template>

<style scoped>
button {
  border: 1px solid;
}
</style>
