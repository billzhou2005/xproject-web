import axios from 'axios'
import { ref, computed } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useUserStore } from './user'
import { storeToRefs } from 'pinia';
import ApiAddrs from './apiAddrs.json'

export const useAxiosApiStore = defineStore('axios-api', () => {
    const apiAddrs = ref([])
    apiAddrs.value = ApiAddrs.data
    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)
    const axiosClient = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
    });
    const response = ref({})
    const friends = ref([])
    const msg = ref('success')


    let addr = 'none'
    const dispatch = (name, params) => {
      apiAddrs.value.forEach(element => {
        if (element.name === name) {
          addr = element.addr
        }
      });
      axiosClient
      .post(addr, params, {
        headers: {
          "x-token": user.value.token
        },
      })
      .then(({ data }) => {
        console.log("axiosApiStore data:",data);
        if (data.msg !== 'success') {
          return
        }

        msg.value = data.msg
        switch (name) {
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