import { createWebHistory, createRouter } from "vue-router";
import TareasComponent from "@/components/TareasComponent.vue";
import CreateComponent from "@/components/CreateComponent.vue";
import ModifyComponent from "@/components/ModifyComponent.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: TareasComponent,
  },
  {
    path: "/Create",
    name: "Createcomponent",
    component: CreateComponent,
  },
  {
    path: "/modify/:id",
    name: "Modifycomponent",
    component: ModifyComponent,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;