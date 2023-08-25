import { Client } from '@stomp/stompjs';
import { ref, computed } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useStompClientStore = defineStore('stomp-client', () => {
  const chatsMsg = ref([])

  const client = new Client({
    brokerURL: 'ws://192.168.0.102:15674/ws',
    connectHeaders: {
      login: "xproject",
      passcode: "zhoumb1202",
    },
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });
  
  client.onConnect = function (frame) {
    console.log(frame)
    //const exchange = '/exchange/xproject/awesome-game-8821';
    const exchange2 = '/exchange/xproject/awesome-chat-8821';
    //client.subscribe(exchange, responseCallback, { id: "billzhou" });//订阅消息
    client.subscribe(exchange2, responseCallback);//订阅消息
  };
  
  const responseCallback = (message) => {
    const msg = JSON.parse(message.body)
    console.log(msg)
    chatsMsg.value.push(msg)
  }

  client.onStompError = function (frame) {
    // Will be invoked in case of error encountered at Broker
    // Bad login/passcode typically will cause an error
    // Complaint brokers will set `message` header with a brief message. Body may contain details.
    // Compliant brokers will terminate the connection after any error
    console.log('Broker reported error: ' + frame.headers['message']);
    console.log('Additional details: ' + frame.body);
  };
  
  const textMsgPublisher = (textMsg) => {
    const exchange2 = '/exchange/xproject/awesome-chat-8821';
    var body = {"sender":{"userId":"uid202302","name":"Katty","avatar":"./avatar2.jpg"},"category":"text","content":textMsg,"receiver":{"userId":"uid202301","name":"Bill","avatar":"./avatar1.jpg"}};
    client.publish({ destination: exchange2, body: body });
    //store.state.client.send(exchange2, {}, JSON.stringify(body));
    //client.value.send({ destination: '/topic/test01', body: 'First Message' });
  }
  return { 
    chatsMsg,
    client,
    textMsgPublisher
   }
})

// HMR (Hot Module Replacement)
// make sure to pass the right store definition, `useStompClientStore` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStompClientStore, import.meta.hot))
}