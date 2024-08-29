<template>
    <div id="page-wrapper" class="dashboard">
      <Sidebar />
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from '@/components/backend/Sidebar.vue'
  </script>
  
  <style scoped>
  #page-wrapper {
    display: flex;
    height: 100vh;
  }
  
  .main-content {
    flex: 1;
    padding: 20px;
    background-color: #f5f5f5;
  }
  </style>
  