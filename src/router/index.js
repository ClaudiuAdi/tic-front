import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import DoctorDetail from "../views/doctors/DoctorDetail.vue";
import DoctorEdit from "../views/doctors/DoctorEdit.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/doctors/:id",
    name: "doctor-detail",
    component: DoctorDetail,
    props: true,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/doctors/:id/edit",
    name: "doctor-edit",
    component: DoctorEdit,
    props: true,
  },
  {
    path: "/add-doctor",
    name: "add-doctor",
    component: () => import("../views/doctors/AddDoctorView.vue"),
  },
  {
    path: "/doctors/:id/edit/:id/patient",
    name: "patient-edit",
    component: DoctorDetail,
    props: true,
  },
  {
    path: "/add-patients/:id",
    name: "add-patients",
    component: () => import("../views/patients/PatientAdd.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
