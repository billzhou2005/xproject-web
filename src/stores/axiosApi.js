import axios from 'axios'
import { ref, computed } from 'vue';
import { defineStore } from 'pinia'

export const useAxiosApiStore = defineStore('axios-api', () => {
    const axiosClient = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
    });
    const response = ref({})
    const msg = ref('success')
    const dispatch = (token, addr, params) => {
      axiosClient
      .post(addr, params, {
        headers: {
          "x-token": token
        },
      })
      .then(({ data }) => {
        console.log("axiosApiStore data:",data);
        response.value = data.data;
        msg.value = data.msg
      })
      .catch((err) => {
        console.log(err);
      });
    }    
    return { 
      msg,
      response,
      dispatch,
     };
})