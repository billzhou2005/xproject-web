<script setup>
import { ref, computed, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia';

import { useRouter } from 'vue-router'
const router = useRouter()

const userStore = useUserStore()
const { user, isLogin } = storeToRefs(userStore)


const email = ref(null)
const password = ref(null)
const isAgree = ref(false)
const handleSubmit = () => {
  console.log("email:",email.value)
  console.log("password:",password.value)
  console.log("isAgree:",isAgree.value)
  if ( !email.value || !password.value) {
    alert("邮箱名称或密码不能为空！")
    return
  }
  const keyword = ref({});
  keyword.value = {
    email: email.value,
    password: password.value,
  }
  userStore.login(keyword.value)
}

const params = ref({});
params.value = {
  district: "",
  gender: "",
  maxHeight: 0,
  maxage: 0,
  minHeight: 0,
  minage: 0,
  order: 0,
  page: 0,
  pageSize: 10,
  province: "",
  userId: "string",
};
const handleToHome = () => {
  if (isLogin) {
    userStore.getFriends(params)
    router.push("/");
  }
}
watch(user,handleToHome)

</script>

<template>
<section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="/logo/icons8-logo-50.png" alt="logo">
          Delta Zoom    
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  登陆
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">邮件地址</label>
                      <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">密码</label>
                      <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </div>
                  <div class="flex items-center justify-end">
                     <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">忘记密码?</a>
                  </div>
                  <button @click="handleSubmit" type="submit" class="w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" >进入</button>
                  <router-link
                    :to="{ name: 'registration' }"
                    class="inline-flex items-center px-2 h-full transition-colors hover:bg-orange-500 hover:text-white"
                  >
                  没有账号? 注册
                  </router-link>
              </form>
          </div>
      </div>
  </div>
</section>

</template>

