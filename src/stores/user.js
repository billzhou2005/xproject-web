import { ref, computed } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia'
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

    return { 
        user,
        isLogin,
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