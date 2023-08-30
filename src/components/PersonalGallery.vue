<script setup>
import { ref,computed,reactive, onMounted } from 'vue'
import { useStompClientStore } from '@/stores/stompClient';
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia';

defineProps({
  personalInfo: Object,
})
const images = ref(['http://1.116.14.156:5186/uploads/samples/img_lights.jpg','http://1.116.14.156:5186/uploads/samples/img_mountains.jpg','http://1.116.14.156:5186/uploads/samples/img_nature.jpg','http://1.116.14.156:5186/uploads/samples/img_snow.jpg','http://1.116.14.156:5186/uploads/samples/img_mountains.jpg','http://1.116.14.156:5186/uploads/samples/img_nature.jpg','http://1.116.14.156:5186/uploads/samples/img_snow.jpg']);


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
const leftArrow = reactive({ color: 'gray' })
const rightArrow = reactive({ color: 'gray' })

const handleLeft = () =>{
  if(imageStart.count > 0) {
    imageStart.count -=1
  } 
  if((images.value.length - imageStart.count) > 4) {
    rightArrow.color = 'black'
  } else {
    rightArrow.color = 'gray'
  }
  if(imageStart.count > 0) {
    leftArrow.color = 'black'
  } else {
    leftArrow.color = 'gray'
  } 
}
const handleRight = () =>{
  if(images.value.length < 5) {
    return
  }
  if((images.value.length - imageStart.count) < 5) {
    rightArrow.color = 'gray'
    return
  }
  imageStart.count += 1
  if((images.value.length - imageStart.count) > 4) {
    rightArrow.color = 'black'
  } else {
    rightArrow.color = 'gray'
  }
  if(imageStart.count > 0) {
    leftArrow.color = 'black'
  } else {
    leftArrow.color = 'gray'
  } 
}
onMounted(() => {
  if(images.value.length > 4) {
    rightArrow.color = 'black'
  }
});
</script>

<template>
  <div v-if = "images.length > 0" class="grid grid-cols-4 gap-2" >
    <div class="img_image" v-for="(img, i) in images.slice(imageStart.count,imageStart.count+4)">
      <img 
      :src= img 
      :class="getImageClass(i)"
      @click="onImageClick(i)"
      >
    </div>
  </div>
  <div class="grid grid-cols-2 gap-2">
    <div>
      <svg @click="handleLeft" transform="translate(500 0)" cursor="pointer" width="48" height="48" viewBox="0 0 512 512" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg"><path :fill="leftArrow.color" d="M272,352l-0,94.201c-0,12.134 -7.309,23.073 -18.52,27.716c-11.21,4.644 -24.113,2.077 -32.693,-6.503c-45.522,-45.522 -143.645,-143.644 -183.13,-183.13c-15.621,-15.621 -15.621,-40.947 -0,-56.568l183.13,-183.13c8.58,-8.58 21.483,-11.147 32.693,-6.503c11.211,4.643 18.52,15.582 18.52,27.716l0,94.201l164.036,-0c7.417,-0 14.529,2.946 19.774,8.19c5.244,5.245 8.19,12.357 8.19,19.774c0,29.673 0,106.399 -0,136.072c0,7.417 -2.946,14.529 -8.19,19.774c-5.245,5.244 -12.357,8.19 -19.774,8.19l-164.036,-0Zm-223.029,-112.971c-9.373,9.373 -9.373,24.569 -0,33.942c39.485,39.485 137.607,137.607 183.13,183.13c4.003,4.003 10.025,5.201 15.257,3.034c5.231,-2.167 8.642,-7.272 8.642,-12.934c0,-42.564 0,-110.201 0,-110.201l180.036,0c3.173,0 6.216,-1.26 8.46,-3.504c2.244,-2.244 3.504,-5.287 3.504,-8.46l0,-136.072c0,-3.173 -1.26,-6.216 -3.504,-8.46c-2.244,-2.244 -5.287,-3.504 -8.46,-3.504l-180.036,0l0,-110.201c-0,-5.662 -3.411,-10.767 -8.642,-12.934c-5.232,-2.167 -11.254,-0.969 -15.257,3.034c-45.523,45.523 -143.645,143.645 -183.13,183.13Z"/></svg>
    </div>
    <div>
      <svg @click="handleRight" cursor="pointer" width="48" height="48" viewBox="0 0 512 512" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg"><path :fill="rightArrow.color" d="M240,352l0,94.201c0,12.134 7.309,23.073 18.52,27.716c11.21,4.644 24.113,2.077 32.693,-6.503c45.522,-45.522 143.645,-143.644 183.13,-183.13c15.621,-15.621 15.621,-40.947 0,-56.568l-183.13,-183.13c-8.58,-8.58 -21.483,-11.147 -32.693,-6.503c-11.211,4.643 -18.52,15.582 -18.52,27.716l0,94.201l-164.036,-0c-7.417,-0 -14.529,2.946 -19.774,8.19c-5.244,5.245 -8.19,12.357 -8.19,19.774c0,29.673 0,106.399 0,136.072c-0,7.417 2.946,14.529 8.19,19.774c5.245,5.244 12.357,8.19 19.774,8.19l164.036,-0Zm223.029,-112.971c9.373,9.373 9.373,24.569 0,33.942c-39.485,39.485 -137.607,137.607 -183.13,183.13c-4.003,4.003 -10.025,5.201 -15.257,3.034c-5.231,-2.167 -8.642,-7.272 -8.642,-12.934c0,-42.564 0,-110.201 0,-110.201l-180.036,0c-3.173,0 -6.216,-1.26 -8.46,-3.504c-2.244,-2.244 -3.504,-5.287 -3.504,-8.46l0,-136.072c-0,-3.173 1.26,-6.216 3.504,-8.46c2.244,-2.244 5.287,-3.504 8.46,-3.504l180.036,0l0,-110.201c0,-5.662 3.411,-10.767 8.642,-12.934c5.232,-2.167 11.254,-0.969 15.257,3.034c45.523,45.523 143.645,143.645 183.13,183.13Z"/></svg>    </div>
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
  cursor: pointer;
}
</style>
