import { ref, computed } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia'
import axiosClient from "./axiosClient"
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const user = ref(null)
    const isLogin = ref(false)
    
    const logout = () => {
      user.value = null  
      isLogin.value =false
      localStorage.removeItem('user')  
      router.push("/guest");
    }

    function login(keyword) {
        axiosClient
        .post("user/loginByEmail", keyword)
        .then(({ data }) => {
          console.log(data);
          user.value = data.data
          if (data.msg === "success") {
            isLogin.value = true
          } else {
            isLogin.value = false
            alert("用户名或密码错");
          }
        }).catch((err) => {
          console.log(err);
        });
    }
    return { 
        user,
        isLogin,
        login,
        logout,
    }
},
{
  persist: true,
})

// HMR (Hot Module Replacement)
// make sure to pass the right store definition, `useUserStore` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}