<script setup>
import { ref, computed, toRefs } from "vue";
import menuOptions from "@/stores/menuOptions";

const props = defineProps({
  personalInfo: Object,
});
const imgUrl = import.meta.env.VITE_IMG_URL;

const { personalInfo } = toRefs(props);

const annualIncome = computed(() => {
  if (personalInfo.value.annualIncome !== undefined) {
    return menuOptions.annualIncome[personalInfo.value.annualIncome].text;
  }
});

function getDisplayStr(arr) {
  let dispStr = "";
  if (arr === undefined) {
    return dispStr;
  }

  arr.forEach((element) => {
    dispStr += element;
    dispStr += ",";
  });
  return dispStr.slice(0, -1);
}
const favoriteSport = computed(() => {
  return getDisplayStr(personalInfo.value.favoriteSport);
});
const languageSpoken = computed(() => {
  return getDisplayStr(personalInfo.value.languageSpoken);
});
const seekRelation = computed(() => {
  return getDisplayStr(personalInfo.value.seekRelation);
});
const favoriteFun = computed(() => {
  return getDisplayStr(personalInfo.value.favoriteFun);
});
const favoriteFood = computed(() => {
  return getDisplayStr(personalInfo.value.favoriteFood);
});
const pets = computed(() => {
  return getDisplayStr(personalInfo.value.pets);
});
</script>

<template>
  <div class="grid grid-cols-2 gap-2 mt-2 mx-10">
    <h3>昵称：{{ personalInfo.nickname }}</h3>
    <h3>性别：{{ personalInfo.gender }}</h3>
    <h3>生日：{{ personalInfo.birthday }}</h3>
    <h3>账号：{{ personalInfo.accountName }}</h3>
    <h3>电子邮件地址：{{ personalInfo.email }}</h3>
    <h3>省份(或市)：{{ personalInfo.province }}</h3>
    <h3>市区（或县）：{{ personalInfo.district }}</h3>
    <h3>身高：{{ personalInfo.height }} (cm)</h3>
    <h3>体重：{{ personalInfo.weight }} (kg)</h3>
    <h3>婚姻状况：{{ personalInfo.maritalStatus }}</h3>
    <h3>性格：{{ personalInfo.character }}</h3>
    <h3>教育程度：{{ personalInfo.education }}</h3>
    <h3>语言：{{ languageSpoken }}</h3>
    <h3>宗教信仰：{{ personalInfo.religion }}</h3>
    <h3>居住情况：{{ personalInfo.livingSituation }}</h3>
    <h3>寻找关系：{{ seekRelation }}</h3>
    <h3>职业：{{ personalInfo.occupation }}</h3>
    <h3>职业状况：{{ personalInfo.employmentStatus }}</h3>
    <h3>年收入：{{ annualIncome }}</h3>
    <h3>爱好：{{ favoriteFun }}</h3>
    <h3>喜爱的食物：{{ favoriteFood }}</h3>
    <h3>喜欢的运动：{{ favoriteSport }}</h3>
    <h3>是否饮酒：{{ personalInfo.drink }}</h3>
    <h3>是否吸烟：{{ personalInfo.smoke }}</h3>
    <h3>是否有宠物：{{ pets }}</h3>
    <h3>犯罪历史：{{ personalInfo.criminalHistory }}</h3>
    <h3>简介：{{ personalInfo.introduce }}</h3>
  </div>
</template>

<style scoped></style>
