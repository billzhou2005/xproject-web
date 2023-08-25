<script setup>
import { ref } from 'vue'
import { defineEmits } from 'vue'

defineProps({
  data: Array,
})

const emit = defineEmits(['clickContact'])
const clickContact=(index)=>{
  emit('clickContact',index)
}

</script>

<template>
  <div class="contact" v-for = "contact,index in data">
    <div class="content-left">
      <img class="avatar" src="./avatar2.jpg" alt="avatar" @click="clickContact(index)" />
      <span @click="clickContact(index)"> {{ contact.name }} </span>
    </div>
  </div>
</template>

<style scoped>
.content-left {
  text-align: left;
}
.content-left span,img{
    padding-left:0;
    vertical-align:middle;
    display:inline-block;
    float: none;
    cursor: default;
}
.avatar {
  height: 40px;
  width: 60px;
  padding: 3px 12px 3px 12px;
}
</style>
