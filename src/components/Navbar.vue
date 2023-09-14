<template>
  <header class="bg-white shadow h-16 flex justify-between items-stretch">
    <router-link
      :to="{ name: 'home' }"
      class="inline-flex items-center h-full px-5 text-orange-500 font-bold"
    >
      首页
    </router-link>
    <div class="flex items-center gap-1">
      <router-link
        :to="{ name: 'chats', params: { userId: 'test2023' } }"
        class="inline-flex items-center px-2 h-full transition-colors hover:bg-orange-500 hover:text-white"
      >
        U聊
      </router-link>
      <router-link
        :to="{ name: 'game'}"
        class="inline-flex items-center px-2 h-full transition-colors hover:bg-orange-500 hover:text-white"
      >
        Game
      </router-link>
      <router-link
        :to="{ name: 'personal' }"
        class="inline-flex items-center px-2 h-full transition-colors hover:bg-orange-500 hover:text-white"
      >
        个人信息
      </router-link>
    </div>
  </header>
</template>
