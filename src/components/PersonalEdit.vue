<script setup>
import { ref, computed, watch, toRefs, onMounted } from "vue";
import Datepicker from "vue3-datepicker";
import menuOptions from "@/stores/menuOptions";
const props = defineProps({
  personalInfo: Object,
});

const { personalInfo } = toRefs(props);

const picked = ref(new Date(personalInfo.value.birthday));

watch(picked, (val) => {
  console.log("val:", val.toLocaleDateString("sv-SE"));
  personalInfo.value.birthday = val.toLocaleDateString("sv-SE");
});

const annualIncome = ref(personalInfo.value.annualIncome);
const onChangeAnnualIncome = () => {
  personalInfo.value.annualIncome = parseInt(annualIncome.value);
};

const favoriteSport = ref(null);
const favoriteFun = ref(null);
const favoriteFood = ref(null);
const languageSpoken = ref(null);
const seekRelation = ref(null);
const pets = ref(null);
const onChangeFavoriteSport = () => {
  personalInfo.value.favoriteSport = favoriteSport.value.split(",");
};
const onChangeFavoriteFood = () => {
  personalInfo.value.favoriteFood = favoriteFood.value.split(",");
};
const onChangeFavoriteFun = () => {
  personalInfo.value.favoriteFun = favoriteFun.value.split(",");
};
const onChangeLanguageSpoken = () => {
  personalInfo.value.languageSpoken = languageSpoken.value.split(",");
};
const onChangeSeekRelation = () => {
  personalInfo.value.seekRelation = seekRelation.value.split(",");
};
const onChangePets = () => {
  personalInfo.value.pets = favoriteSport.pets.split(",");
};

function getDisplayStr(arr) {
  let dispStr = "";
  arr.forEach((element) => {
    dispStr += element;
    dispStr += ",";
  });
  return dispStr.slice(0, -1);
}

onMounted(() => {
  favoriteSport.value = getDisplayStr(personalInfo.value.favoriteSport);
  favoriteFood.value = getDisplayStr(personalInfo.value.favoriteFood);
  favoriteFun.value = getDisplayStr(personalInfo.value.favoriteFun);
  languageSpoken.value = getDisplayStr(personalInfo.value.languageSpoken);
  seekRelation.value = getDisplayStr(personalInfo.value.seekRelation);
  pets.value = getDisplayStr(personalInfo.value.pets);
});
</script>

<template>
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
          v-model="personalInfo.nickname"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
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
          v-model="personalInfo.gender"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="grid-state"
        >
          <option value="男">男</option>
          <option value="女">女</option>
          <option value="未定">未定</option>
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
          @change="onChangeSeekRelation"
          v-model="seekRelation"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="grid-state"
        >
          <option>未定</option>
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
          个人介绍
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          v-model="personalInfo.introduce"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
        />
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
          v-model="personalInfo.maritalStatus"
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
          v-model="personalInfo.height"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="number"
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
          v-model="personalInfo.weight"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="number"
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
          v-model="personalInfo.province"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
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
          v-model="personalInfo.district"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
        />
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          语言
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          @change="onChangeLanguageSpoken"
          v-model="languageSpoken"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
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
          v-model="personalInfo.education"
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
          v-model="personalInfo.occupation"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
        />
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          职业状况
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          v-model="personalInfo.employmentStatus"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
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
          v-model="annualIncome"
          @change="onChangeAnnualIncome()"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="grid-state"
        >
          <option
            v-for="option in menuOptions.annualIncome"
            :key="option.value"
            :value="option.value"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          居住情况
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          v-model="personalInfo.livingSituation"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
        />
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
          v-model="personalInfo.character"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
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
          v-model="personalInfo.drink"
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
          v-model="personalInfo.smoke"
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
          @change="onChangeFavoriteFun"
          v-model="favoriteFun"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
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
          @change="onChangeFavoriteFood"
          v-model="favoriteFood"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
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
          @change="onChangeFavoriteSport"
          v-model="favoriteSport"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
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
          @change="onChangePets"
          v-model="pets"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
        />
      </div>
    </div>

    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-full-name"
        >
          宗教信仰
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          v-model="personalInfo.religion"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-full-name"
          type="text"
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
          v-model="personalInfo.criminalHistory"
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
