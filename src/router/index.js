import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/registrate",
    name: "SignUp",
    component: () => import("../views/users/Signup.vue"),
  },
  {
    path: "/ingresa",
    name: "Login",
    component: () => import("../views/users/Login.vue"),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
