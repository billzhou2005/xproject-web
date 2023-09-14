import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from '../components/DefaultLayout.vue';
import GuestLayout from '../components/GuestLayout.vue';
import RegistrationLayout from '../components/RegistrationLayout.vue';

import Home from '../views/Home.vue'
import MealsByIngredient from '../views/MealsByIngredient.vue'
import MealsByLetter from '../views/MealsByLetter.vue'
import MealsByName from '../views/MealsByName.vue'
import MealDetails from '../views/MealDetails.vue'
import Personal from '../views/Personal.vue'
import Chats from '../views/Chats.vue'
import Game from '../views/Game.vue'
import FriendDetails from '../views/FriendDetails.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
      },
      {
        path: "/friend/:userId",
        name: "friendDetails",
        component: FriendDetails,
      },      
      {
        path: "/chats/:userId",
        name: "chats",
        component: Chats,
      },      
      {
        path: "/game",
        name: "game",
        component: Game,
      },      
      {
        path: "/by-name/:name?",
        name: "byName",
        component: MealsByName,
      },
      {
        path: "/by-letter/:letter?",
        name: "byLetter",
        component: MealsByLetter,
      },
      {
        path: "/personal",
        name: "personal",
        component: Personal,
      },
      {
        path: "/by-ingredient/:ingredient",
        name: "byIngredient",
        component: MealsByIngredient,
      },
      {
        path: '/meal/:id',
        name: 'mealDetails',
        component: MealDetails
      }
    ]
  },
  {
    path: '/guest',
    name: 'guest',
    component: GuestLayout
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationLayout
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
