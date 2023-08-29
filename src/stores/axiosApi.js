import axios from 'axios'
import { ref, computed } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useUserStore } from './user'
import { storeToRefs } from 'pinia';
import ApiAddrs from './apiAddrs.json'
import { useRouter } from 'vue-router'

export const useAxiosApiStore = defineStore('axios-api', () => {
    const router = useRouter()
    const apiAddrs = ref([])
    apiAddrs.value = ApiAddrs.data
    const userStore = useUserStore()
    const { user, isLogin } = storeToRefs(userStore)
    const axiosClient = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
    });
    const response = ref({})
    const friends = ref([])
    const msg = ref('success')


    let addr = 'none'
    const dispatch = (name, params) => {
      let token = ''
      console.log("api dispatch",name)
      if (name !== 'login') {
        token = user.value.token
      }
      apiAddrs.value.forEach(element => {
        if (element.name === name) {
          addr = element.addr
        }
      });
      axiosClient
      .post(addr, params, {
        headers: {
          "x-token": token
        },
      })
      .then(({ data }) => {
        console.log("axiosApiStore data:",data);
        if (data.msg !== 'success') {
          return
        }

        msg.value = data.msg
        switch (name) {
          case 'login':
            user.value = data.data
            isLogin.value = true
            console.log("user:", user, "router push ...")
            router.push("/");
          break;
          case 'seekFriends':
            friends.value = data.data.fdss
          break;
          default:
            response.value = data.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }    
    return { 
      msg,
      response,
      friends,
      dispatch,
     };
})

// HMR (Hot Module Replacement)
// make sure to pass the right store definition, `useUserStore` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}