import axios from "axios";
import { ref, computed } from "vue";
import { defineStore, acceptHMRUpdate } from "pinia";
import { useUserStore } from "./user";
import { storeToRefs } from "pinia";
// import ApiAddrs from "./apiAddrs.json";
import apiAddrs from "./apiAddrs";
import { useRouter } from "vue-router";

export const useAxiosApiStore = defineStore("axios-api", () => {
  const router = useRouter();
  const userStore = useUserStore();
  const { user, isLogin } = storeToRefs(userStore);
  const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });
  const response = ref({});
  const personalInfo = ref({});
  const friends = ref([]);
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
    apiAddrs.data.forEach((element) => {
      if (element.name === name) {
        addr = element.addr;
      }
    });
    console.log("addr:", addr, "token:", token, "params:", params);
    axiosClient
      .post(addr, params, {
        headers: {
          "x-token": token,
        },
      })
      .then(({ data }) => {
        console.log("axiosApiStore data:", data);
        if (data.msg !== "success") {
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
    dispatch,
  };
});

// HMR (Hot Module Replacement)
// make sure to pass the right store definition, `useUserStore` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
