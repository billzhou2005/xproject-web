<script setup>
import { ref, computed, watch } from 'vue'
import axiosClient from "@/stores/axiosClient"

import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia';

import { useRouter } from 'vue-router'
const router = useRouter()

const nickname = ref(null)
const gender = ref("none")
const email = ref(null)
const password = ref(null)
const repeatPassword = ref(null)
const isAgree = ref(false)
const handleSubmit = () => {
  if ( nickname.value.length < 6 ) {
    alert("昵称不能少于6个字符")
    return
  }
  if ( !email.value || !password.value) {
    alert("邮箱名称或密码不能为空！")
    return
  }
  if (password.value !== repeatPassword.value) {
    alert("两次输入密码不一致！")
    return
  }
  if (!isAgree.value) {
    alert("要同意网站注册协议！")
    return
  }
  const keyword = ref({});
  keyword.value = {
    nickname: nickname.value,
    gender: gender.value,
    email: email.value,
    password: password.value,
    agreement: isAgree.value
  }
  console.log(keyword)
  axiosClient
      .post("user/registerByEmail", keyword.value)
      .then(({ data }) => {
        console.log("register:",data);
      });
}

// const handleToHome = () => {
//   if (isLogin) {
//     router.push("/");
//   }
// }
// watch(user,handleToHome)

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
                  注册
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="nickname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">您的昵称</label>
                      <input v-model="nickname" type="nickname" name="nickname" id="nickname" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="abc12345" required="">
                  </div>
                  <div>
                    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">性别</label>
                    <select v-model="gender" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="male">男</option>
                      <option value="female">女</option>
                      <option value="none">未定</option>
                    </select>
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">您的电子邮件地址</label>
                      <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">密码</label>
                      <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </div>
                  <div>
                      <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">重复密码</label>
                      <input v-model="repeatPassword" type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </div>
                  <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input v-model="isAgree" id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">同意网站注册协议</label>
                      </div>
                  </div>
                  <button @click="handleSubmit" type="submit" class="w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" >注册</button>
                  <router-link
                    :to="{ name: 'guest' }"
                    class="inline-flex items-center px-2 h-full transition-colors hover:bg-orange-500 hover:text-white"
                  >
                  已经有账号? 登陆
                  </router-link>
              </form>
          </div>
      </div>
  </div>
</section>

</template>

