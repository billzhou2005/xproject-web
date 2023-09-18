import axios from "axios";
import { ref, computed } from "vue";
import { defineStore, acceptHMRUpdate } from "pinia";
import { useUserStore } from "./user";
import { storeToRefs } from "pinia";
import apiAddrs from "./apiAddrs";
import { useRouter } from "vue-router";
import { useStompClientStore } from "./stompClient";

export const useAxiosApiStore = defineStore("axios-api", () => {
  const router = useRouter();
  const userStore = useUserStore();
  const { user, isLogin } = storeToRefs(userStore);
  const stompClientStore = useStompClientStore();
  const { chatsMsg } = storeToRefs(stompClientStore);

  const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });
  const response = ref({});
  const personalInfo = ref({});
  const friends = ref([]);
  const chatHistory = ref({});

  const msg = ref("success");

  let addr = "none";
  const dispatch = (name, params) => {
    let token = "";
    console.log("api dispatch:", name);
    if (name === "login" || name === "registerByEmail") {
      token = "";
    } else {
      token = user.value.token;
    }
    let contentType = "application/json";
    if (name === "fileUpload") {
      contentType = "multipart/form-data";
    }

    apiAddrs.data.forEach((element) => {
      if (element.name === name) {
        addr = element.addr;
      }
    });
    // console.log("addr:", addr, "token:", token, "params:", params);
    // console.log("contentType:", contentType);
    axiosClient
      .post(addr, params, {
        headers: {
          "Content-Type": contentType,
          "x-token": token,
        },
      })
      .then(({ data }) => {
        console.log("axiosApiStore data:", data);
        if (data.msg !== "success") {
          alert(data.msg);
          return;
        }

        msg.value = data.msg;
        switch (name) {
          case "login":
            user.value = data.data;
            isLogin.value = true;
            console.log("user:", user, "router push ...");
            router.push("/");
            break;
          case "registerByEmail":
            alert("注册成功，请登陆！");
            router.push("/guest");
            break;
          case "seekFriends":
            friends.value = data.data.fdss;
            break;
          case "personalInfo":
            personalInfo.value = data.data;
            break;
          case "getHistoryByUserId":
            chatHistory.value = {
              chats: JSON.parse(data.data.chats),
              chatLine: JSON.parse(data.data.chatLine),
              total: data.data.total,
            };
            chatsMsg.value = JSON.parse(data.data.chats);
            chatsMsg.value.sort(function (a, b) {
              return b.time < a.time ? 1 : -1;
            });
          default: //userUpdate
            response.value = data.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return {
    msg,
    response,
    personalInfo,
    friends,
    chatHistory,
    dispatch,
  };
});

// HMR (Hot Module Replacement)
// make sure to pass the right store definition, `useUserStore` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
