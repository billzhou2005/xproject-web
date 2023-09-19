import { Client } from "@stomp/stompjs";
import { ref, computed } from "vue";
import { defineStore, acceptHMRUpdate } from "pinia";

export const useStompClientStore = defineStore("stomp-client", () => {
  const chatsMsg = ref([]);
  const chatLineSelected = ref({});

  const subscribedChatIds = ref([]);

  const client = new Client({
    brokerURL: "ws://1.116.14.156:15674/ws",
    connectHeaders: {
      login: "xproject",
      passcode: "zhoumb1202",
    },
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 5000,
    heartbeatOutgoing: 5000,
  });

  const exchange = "/exchange/xproject.topic/";
  client.onConnect = function (frame) {
    console.log(frame);
    //const exchange = '/exchange/xproject/awesome-game-8821';
    //client.subscribe(exchange, responseCallback, { id: "billzhou" });//订阅消息
    // client.subscribe(
    //   exchange + "chat-personal-1wv5-TzlOGeJuiNwndSUL",
    //   responseCallback
    // ); //订阅消息
  };

  const responseCallback = (message) => {
    //console.log("received messange:", message)
    const msg = JSON.parse(message.body);
    console.log("received message.body:", msg);
    let nid = msg.chatId.replace(/chat-personal-/g,"")
    if(chatLineSelected.value.chatId === nid) {
      chatsMsg.value.push(msg);
    }
  };

  client.onStompError = function (frame) {
    // Will be invoked in case of error encountered at Broker
    // Bad login/passcode typically will cause an error
    // Complaint brokers will set `message` header with a brief message. Body may contain details.
    // Compliant brokers will terminate the connection after any error
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
  };

  const msgPublisher = (body) => {
    // var body = {"sender":sender,"category":category,"content":content,"receivers":receivers, time:new Date()};
    let isFound = false;
    console.log("body.chatId",body.chatId)
    console.log("subscribedChatIds.value",subscribedChatIds.value)

    subscribedChatIds.value.forEach((chatId) => {
      if (chatId === body.chatId) {
        isFound = true;
      }
    });
    if (!isFound) {
      const subscription = client.subscribe(exchange + body.chatId, responseCallback); //订阅消息
      subscribedChatIds.value.push(body.chatId);
      console.log("subscription:",subscription)
      // // unsubscribe to stop receiving
      // subscription.unsubscribe();
    }

    client.publish({
      destination: exchange + body.chatId,
      body: JSON.stringify(body),
    });
  };
  return {
    chatsMsg,
    chatLineSelected,
    client,
    subscribedChatIds,
    msgPublisher,
  };
});

// HMR (Hot Module Replacement)
// make sure to pass the right store definition, `useStompClientStore` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStompClientStore, import.meta.hot));
}
