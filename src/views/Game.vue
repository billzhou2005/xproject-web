<script setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAxiosApiStore } from "@/stores/axiosApi";
import { storeToRefs } from "pinia";
import Datepicker from "vue3-datepicker";

const picked = ref(new Date());
const apiStore = useAxiosApiStore();
const { personalInfo } = storeToRefs(apiStore);

onMounted(() => {});
</script>

<template>
  <div class="p-8 pb-0">
    <h1 class="text-4xl font-bold mb-4 text-orange-500">Game</h1>
  </div>
  <div>
    {{ personalInfo }}
  </div>
  <div class="grid grid-cols-2 gap-4">
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          昵称
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
          value="Jane Doe"
        />
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          性别
        </label>
      </div>
      <div class="md:w-2/3">
        <select
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="grid-state"
        >
          <option>男</option>
          <option>女</option>
          <option>未定</option>
        </select>
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          寻找关系
        </label>
      </div>
      <div class="md:w-2/3">
        <select
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="grid-state"
        >
          <option>交友</option>
          <option>找对象</option>
        </select>
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          婚姻状况
        </label>
      </div>
      <div class="md:w-2/3">
        <select
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="grid-state"
        >
          <option>单身</option>
          <option>已婚</option>
        </select>
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          生日
        </label>
      </div>
      <div class="md:w-2/3">
        <Datepicker
          v-model="picked"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        />
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          身高（厘米）
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
          value="Jane Doe"
        />
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          体重（公斤）
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
          value="Jane Doe"
        />
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          省份（市）
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
          value="Jane Doe"
        />
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          县市（区）
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
          value="Jane Doe"
        />
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          教育经历
        </label>
      </div>
      <div class="md:w-2/3">
        <select
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="grid-state"
        >
          <option>初中及以下</option>
          <option>高中</option>
          <option>本科</option>
          <option>硕士</option>
          <option>博士</option>
        </select>
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          职业
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
          value="Jane Doe"
        />
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          年收入
        </label>
      </div>
      <div class="md:w-2/3">
        <select
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="grid-state"
        >
          <option>0-50000</option>
          <option>50000-100000</option>
          <option>100000-200000</option>
          <option>20万以上</option>
          <option>50万以上</option>
          <option>100万以上</option>
        </select>
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          性格
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
          value="Jane Doe"
        />
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          酒量
        </label>
      </div>
      <div class="md:w-2/3">
        <select
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="grid-state"
        >
          <option>从不</option>
          <option>一点点</option>
          <option>经常</option>
          <option>酗酒</option>
        </select>
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          吸烟
        </label>
      </div>
      <div class="md:w-2/3">
        <select
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="grid-state"
        >
          <option>从不</option>
          <option>一点点</option>
          <option>经常</option>
        </select>
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          爱好
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
          value="Jane Doe"
        />
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          喜爱的食物
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
          value="Jane Doe"
        />
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          喜欢的运动
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
          value="Jane Doe"
        />
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          犯罪历史
        </label>
      </div>
      <div class="md:w-2/3">
        <select
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="grid-state"
        >
          <option>无</option>
          <option>有</option>
        </select>
      </div>
    </div>
  </div>
</template>
