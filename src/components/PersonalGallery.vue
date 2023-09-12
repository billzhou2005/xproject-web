<script setup>
import { ref, computed, reactive, toRefs, onMounted } from "vue";
import ImageUpload from "./ImageUpload.vue";
const props = defineProps({
  personalInfo: Object,
});

const { personalInfo } = toRefs(props);
const emit = defineEmits(["changeImageUpload"]);
const isImageUpload = ref(false);
const handleIsImageUpload = () => {
  isImageUpload.value = !isImageUpload.value;
  emit("changeImageUpload", isImageUpload.value);
};
// const images = ref([
//   "http://1.116.14.156:5186/uploads/samples/img_lights.jpg",
//   "http://1.116.14.156:5186/uploads/samples/img_mountains.jpg",
//   "http://1.116.14.156:5186/uploads/samples/img_nature.jpg",
//   "http://1.116.14.156:5186/uploads/samples/img_snow.jpg",
//   "http://1.116.14.156:5186/uploads/samples/img_mountains.jpg",
//   "http://1.116.14.156:5186/uploads/samples/img_nature.jpg",
//   "http://1.116.14.156:5186/uploads/samples/zmb01.png",
// ]);
const imgUrl = import.meta.env.VITE_IMG_URL;
const fullWidthImageIndex = ref(null);
const imgMaxLen = computed(() => {
  if (personalInfo.value.photos !== undefined) {
    if (personalInfo.value.photos.length > 4) {
      return 4;
    } else {
      return personalInfo.value.photos.length;
    }
  }
});

const getImageClass = (i) => {
  return {
    fullWidthImage: fullWidthImageIndex.value === i,
  };
};
const onImageClick = (i) => {
  if (fullWidthImageIndex.value === i) {
    fullWidthImageIndex.value = null;
  } else {
    fullWidthImageIndex.value = i;
  }
  console.log("onImageClick", i);
};
const imageStart = reactive({ count: 0 });
const leftArrow = reactive({ type: "info-left" });
const rightArrow = reactive({ type: "info-right" });

const handleLeft = () => {
  if (imageStart.count > 0) {
    imageStart.count -= 1;
  }
  if (personalInfo.value.photos.length - imageStart.count > 4) {
    rightArrow.type = "primary-right";
  } else {
    rightArrow.type = "info-right";
  }
  if (imageStart.count > 0) {
    leftArrow.type = "primary-left";
  } else {
    leftArrow.type = "info-left";
  }
};
const handleRight = () => {
  if (personalInfo.value.photos.length < 5) {
    return;
  }
  if (personalInfo.value.photos.length - imageStart.count < 5) {
    rightArrow.type = "info-right";
    return;
  }
  imageStart.count += 1;
  if (personalInfo.value.photos.length - imageStart.count > 4) {
    rightArrow.type = "primary-right";
  } else {
    rightArrow.type = "info-right";
  }
  if (imageStart.count > 0) {
    leftArrow.type = "primary-left";
  } else {
    leftArrow.type = "info-left";
  }
};
onMounted(() => {
  if (
    personalInfo.value === undefined ||
    personalInfo.value.photos === undefined
  ) {
    return;
  }
  if (personalInfo.value.photos.length > 4) {
    rightArrow.type = "primary-right";
  }
});
</script>

<template>
  <ImageUpload v-if="isImageUpload" @finishImageUpload="handleIsImageUpload" />
  <div
    v-if="personalInfo.photos !== undefined && !isImageUpload"
    class="mx-10 grid grid-cols-4 gap-2"
  >
    <div
      class="img_image"
      v-for="(img, i) in personalInfo.photos.slice(
        imageStart.count,
        imageStart.count + imgMaxLen
      )"
    >
      <img
        :src="imgUrl + img"
        class="h-48 object-fill hover:scale-125 transition duration-500 cursor-pointer"
        @click="onImageClick(i + imageStart.count)"
      />
    </div>
  </div>
  <div v-if="!isImageUpload" class="flex justify-center items-center py-2">
    <div class="inline-flex">
      <button @click="handleLeft" :class="leftArrow.type">
        <svg
          class="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z"
          />
        </svg>
      </button>
      <button :class="rightArrow.type" @click="handleRight">
        <svg
          class="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"
          />
        </svg>
      </button>
      <button class="plus" @click="handleIsImageUpload">
        <svg
          class="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M4 12H20M12 4V20"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>
    </div>
  </div>
  <div
    v-if="fullWidthImageIndex !== null && !isImageUpload"
    class="flex justify-center items-center py-2"
  >
    <img
      :src="imgUrl + personalInfo.photos[fullWidthImageIndex]"
      class="object-fill transition duration-500"
    />
  </div>
</template>

<style scoped>
.fullWidthImage {
  position: fixed;
  left: 20%;
  top: 20%;
  width: 60%;
  z-index: 100;
}
.img_image img {
  @apply object-fill cursor-pointer;
}

.plus {
  @apply bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold mx-2 py-2 px-4;
}
.primary-left {
  @apply bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l;
}
.info-left {
  @apply bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l opacity-50 cursor-not-allowed;
}
.primary-right {
  @apply bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r;
}
.info-right {
  @apply bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r opacity-50 cursor-not-allowed;
}
</style>
