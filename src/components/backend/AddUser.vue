<template>
    <div class="item-content">
        <div class="item-header">
            <span class="task-icon">
                <a @click.prevent="goToManager"><i class="bx bx-chevron-left"></i></a>
            </span>
            <h2>Add User</h2>
        </div>
        <div class="form-group">
           <div class="form-row">
                <label for="name" class="text">First Name *</label>
                <input type="text" id="name" class="input-text">
           </div>
           <div class="form-row">
                <label for="name" class="text">Last Name *</label>
                <input type="text" id="name" class="input-text">
           </div>
           <div class="form-row">
                <label for="name" class="text">Email *</label>
                <input type="text" id="name" class="input-text">
           </div>
           <div class="form-row">
                <label for="name" class="text">Phone</label>
                <input type="text" id="name" class="input-text">
           </div>
           <div class="form-row">
                <label for="name" class="text">Address</label>
                <input type="text" id="name" class="input-text">
           </div>
           <div class="form-row">
                <button class="btn_create">
                    <i class="bx bx-plus"></i>
                    Create
                </button>
           </div>
        </div>
    </div>
</template>


<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToManager() {
    router.push({ name: 'manager' })
}

</script>

<style scoped>
.item-content {
    padding: 20px;
    background-color: #f5f5f5;
    flex: 1;
}
h2 {
    font-weight: 700;
    font-style: bold;
    color: #000;
    width: 100%;
    margin: 0;
}

.form-group {
    margin-top: 20px;
    border: 1px solid #000;
    padding: 20px 40px 0 20px;
}

.form-row {
    display: flex;
    align-items: center; 
    margin-bottom: 30px; 
}
.form-row label {
    width: 150px; 
    margin-right: 10px; 
    font-weight: bold; 
}

.input-text {
    width: 100%; 
    padding: 10px;
    border: 1px solid #000;
    border-radius: 10px;
    height: 30px;
    margin-top: 10px;
}

.item-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px; 
}

.task-icon {
    font-size: 24px; 
    margin-right: 10px; 
}

.task-icon a {
    color: #000; 
}
   
.btn_create {
    background: rgb(20, 145, 20);
    border: none;
    width: 124px;
    border-radius: 5px;
    height: 31.5px;
    color: #fff;
    display: flex;
    align-items: center; 
    justify-content: center; 
    font-size: 14px; 
}

.btn_create i {
    font-size: 20px; 
    margin-right: 5px; 
}

.text{
    color: rgb(212, 16, 16);
}

</style>
