import { createWebHistory, createRouter } from "vue-router";
import TareasComponent from "@/components/TareasComponent.vue";

const routes = [
  {
    path: "/hola",
    name: "Home",
    component: TareasComponent,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;