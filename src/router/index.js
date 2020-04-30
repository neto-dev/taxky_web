import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/store.js";


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
    meta: {
      goDash: true
    },
    component: () => import("../views/users/Signup.vue"),
  },
  {
    path: "/ingresa",
    name: "Login",
    meta: {
      goDash: true
    },
    component: () => import("../views/users/Login.vue"),
  },

  // Rutas del dashboard del usuario

  {
    path: "/dashboard",
    name: "Dashboard",
    meta: {
      requiresAuth: true
    },
    component: () => import("../views/dashboard/Home.vue"),
  },

  {
    path: "/dashboard/personajes",
    name: "Characters",
    meta: {
      requiresAuth: true
    },
    component: () => import("../views/dashboard/characters/Home.vue"),
  },

  {
    path: "/dashboard/premios",
    name: "Awards",
    meta: {
      requiresAuth: true
    },
    component: () => import("../views/dashboard/awards/Home.vue"),
  },

  {
    path: "/dashboard/tareas",
    name: "Tasks",
    meta: {
      requiresAuth: true
    },
    component: () => import("../views/dashboard/tasks/Home.vue"),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/ingresa");
  } else if (to.matched.some(record => record.meta.goDash)) {
    if (store.getters.isLoggedIn) {
      next("/dashboard");
      return;
    }
    next();
    return;
  } else {
    next();
  }
});

export default router;
