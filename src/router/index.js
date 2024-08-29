import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/backend/Login.vue';
import SignUp from '../views/backend/SignUp.vue';
import Admin from '../views/backend/Admin.vue';
import AddUser from '@/components/backend/AddUser.vue';
import EditUser from '@/components/backend/EditUser.vue';
import Manager from '@/components/backend/Manager.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    children: [
      {
        path: 'items/manager',
        name: 'manager',
        component: Manager
      },
      {
        path: 'items/add-user',
        name: 'add-user',
        component: AddUser
      },
      {
        path: 'items/edit-user/:id', 
        name: 'edit-user',
        component: EditUser
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
