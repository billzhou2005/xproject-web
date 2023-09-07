<script setup>
import { ref,computed,reactive, onMounted } from 'vue'
import { useStompClientStore } from '@/stores/stompClient';
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia';
defineProps({
  personalInfo: Object,
})
const images = ref(['http://1.116.14.156:5186/uploads/samples/img_lights.jpg','http://1.116.14.156:5186/uploads/samples/img_mountains.jpg','http://1.116.14.156:5186/uploads/samples/img_nature.jpg','http://1.116.14.156:5186/uploads/samples/img_snow.jpg','http://1.116.14.156:5186/uploads/samples/img_mountains.jpg','http://1.116.14.156:5186/uploads/samples/img_nature.jpg','http://1.116.14.156:5186/uploads/samples/zmb01.png']);


const fullWidthImageIndex = ref(null)
const getImageClass = (i) =>{
    return {
            'fullWidthImage': fullWidthImageIndex.value === i
        }
}
const onImageClick = (i) =>{
  if (fullWidthImageIndex.value === i) {
    fullWidthImageIndex.value = null
  } else {
    fullWidthImageIndex.value = i
  }
  console.log("onImageClick",i);
}
const imageStart = reactive({ count: 0 })
const leftArrow = reactive({ type: 'info-left' })
const rightArrow = reactive({ type: 'info-right' })

const handleLeft = () =>{
  if(imageStart.count > 0) {
    imageStart.count -=1
  } 
  if((images.value.length - imageStart.count) > 4) {
    rightArrow.type = 'primary-right'
  } else {
    rightArrow.type = 'info-right'
  }
  if(imageStart.count > 0) {
    leftArrow.type = 'primary-left'
  } else {
    leftArrow.type = 'info-left'
  } 
}
const handleRight = () =>{
  if(images.value.length < 5) {
    return
  }
  if((images.value.length - imageStart.count) < 5) {
    rightArrow.type = 'info-right'
    return
  }
  imageStart.count += 1
  if((images.value.length - imageStart.count) > 4) {
    rightArrow.type = 'primary-right'
  } else {
    rightArrow.type = 'info-right'
  }
  if(imageStart.count > 0) {
    leftArrow.type = 'primary-left'
  } else {
    leftArrow.type = 'info-left'
  } 
}
onMounted(() => {
  if(images.value.length > 4) {
    rightArrow.type = 'primary-right'
  }
});
</script>

<template>
  <div v-if = "images.length > 0" class="mx-10 grid grid-cols-4 gap-2" >
    <div class="img_image" v-for="(img, i) in images.slice(imageStart.count,imageStart.count+4)">
      <img 
      :src= img 
      class="h-48 object-fill hover:scale-125 transition duration-500 cursor-pointer"
      @click="onImageClick(i+imageStart.count)"
      >
    </div>
  </div>
  <div class="flex justify-center items-center py-2">
    <div class="inline-flex">
      <button @click="handleLeft" :class="leftArrow.type">
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z"/></svg>
      </button>
      <button :class="rightArrow.type" @click="handleRight" >
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg>
      </button>
    </div>
  </div>
  <div class="flex justify-center items-center py-2">
    <img 
      :src= images[fullWidthImageIndex] 
      class="object-fill transition duration-500"
      >
  </div>
</template>

<style scoped>
.fullWidthImage {
  position: fixed; 
  left:20%; 
  top:20%; 
  width:60%; 
  z-index:100;
}
.img_image img {
  @apply object-fill cursor-pointer 
}

.primary-left {
  @apply bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l
}
.info-left {
  @apply bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l opacity-50 cursor-not-allowed
}
.primary-right {
  @apply bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r
}
.info-right {
  @apply bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r opacity-50 cursor-not-allowed
}

</style>
