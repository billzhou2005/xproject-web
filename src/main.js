import { createApp } from 'vue'
import router from "@/router";
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia).use(router)
app.mount('#app')

function checkRouter(path) {
    let hasCheck = router.getRoutes().filter(route => route.path == path).length
    return hasCheck
  }
router.beforeEach((to, from, next) => {
//store.commit('getToken')
let user= JSON.parse(localStorage.user)
console.log("localStorage.user:", user)
const isLogin = user.isLogin;
console.log("router.beforeEach isLogin:", isLogin)
console.log("from.name:", from.name)
// console.log("to.name:", to.name)
if (!isLogin) {
    if (to.name === 'guest' || to.name === 'registration') {
        next()
        console.log("to.name:",to.name)
        console.log("branch-1")
    } else {
        next({ name: 'guest' })
        console.log("to.name:",to.name)
        console.log("branch-2")
    }
} else if (!checkRouter(to.path)) {
    next({ name: 'home' })
    console.log("to.name:",to.name)
    console.log("branch-3")
} else {
    next()
}
// console.log("to.name:", to.name)
// if (!token && to.name !== 'guest') {
//     next({ name: 'guest' })
// } else if (!checkRouter(to.path)) {
//     next({ name: 'home' })
// } else {
//     next()
// }
})