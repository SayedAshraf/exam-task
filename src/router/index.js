import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: "/questions/:id",
    name: "Question",
    component: () => import('@/views/Question.vue'),
  },
  {
    path: "/results",
    name: "results",
    component: () => import("@/views/Result.vue"),
    beforeEnter: (to, from, next) => {
      if(store.state.quizCompleted) {
        next();
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
