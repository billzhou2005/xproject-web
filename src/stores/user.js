import { ref, computed } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia'
import axiosClient from "./axiosClient"

export const useUserStore = defineStore('user', () => {
    const user = ref(null)
    const isLogin = ref(false)
    const friends = ref([])
    async function login(keyword) {
        await axiosClient
        .post("user/loginByEmail", keyword)
        .then(({ data }) => {
          console.log(data);
          user.value = data.data
          if (data.msg === "success") {
            localStorage.setItem("token", data.data.token);
            isLogin.value = true
          } else {
            isLogin.value = false
            localStorage.setItem("token", "");
            alert("用户名或密码错");
          }
        }).catch((err) => {
          console.log(err);
        });
    }
    function getFriends(keyword) {
      console.log("token",localStorage.getItem("token"))
      axiosClient
      .post("user/seekFriends", keyword, {
        headers: {
          "x-token":localStorage.getItem("token")
        },
      })
      .then(({ data }) => {
        console.log("getFriends",data.data);
        friends.value = data.data.fdss;
      });
  }

    return { 
        user,
        isLogin,
        friends,
        login,
        getFriends,
    }
})

// HMR (Hot Module Replacement)
// make sure to pass the right store definition, `useUserStore` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}