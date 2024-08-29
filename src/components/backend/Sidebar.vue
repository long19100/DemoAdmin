<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToManager() {
    router.push({ name: 'manager' })
}
</script>
<template>
    <aside id="sidebar" class="app-sidebar">
        <div class="aside-head">
            <span class="image img-cover profile-image"><img src="@/assets/Backend/img/tải xuống.jpg" alt=""></span>
            <div class="name">Nguyễn Nhật Long</div>
            <div class="role">Quản trị viên</div>
        </div>
        <div class="aside-body">
            <ul class="uk-list uk-clearfix task-list">
                <li class="task-item">
                    <span class="task-name">Main</span>
                </li>
                <li>
                    <a href="" @click.prevent="goToManager">
                        <div class="uk-flex uk-flex-middle">
                            <span class="task-icon">
                                <i class="bx bx-cart"></i>
                            </span>
                            <span class="nav-label">Order</span>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="" @click.prevent="goToManager">
                        <div class="uk-flex uk-flex-middle">
                            <span class="task-icon">
                                <i class="bx bxl-apple"></i>
                            </span>
                            <span class="nav-label">Items</span>
                        </div>
                    </a>
                </li>
                <li>
                    <a rout href="">
                        <div class="uk-flex uk-flex-middle">
                            <span class="task-icon">
                                <i class="bx bx-user"></i>
                            </span>
                            <span class="nav-label">User</span>

                        </div>
                    </a>
                </li>
                <li>
                    <a href="">
                        <div class="uk-flex uk-flex-middle">
                            <span class="task-icon">
                                <i class="bx bx-credit-card"></i>
                            </span>
                            <span class="nav-label">Import CSV</span>

                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <div class="aside-footer">

        </div>
    </aside>
</template>
  
<style scoped>
.app-sidebar {
    height: 100%;
    width: 240px;
    background: #111c43;
    color: #a3aed1;
}

.app-sidebar .aside-head {
    padding: 20px;
}

.profile-image {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: inline-block;
    margin-bottom: 5px;
}

.profile-image img {
    border-radius: 50%;
}

.aside-head .name {
    font-weight: 500;
    color: #fff;
    margin-bottom: 7px;
}

.aside-head .role {
    font-size: 13px;
}

.app-sidebar .aside-body {
    padding: 0 10px;
}

.app-sidebar .task-list {
    list-style-type: none; 
    padding: 0; 
    margin: 0; 
}

.app-sidebar .task-list li {
    position: relative; 
}

.app-sidebar .task-list li a {
    display: block;
    padding: 13px 12px;
    text-decoration: none;
    font-size: 14px;
    border-radius: 8px;
    color: #a3aed1;
    font-weight: 500;
    position: relative;
    padding-left: 40px;
}

.app-sidebar .task-list li a.router-link-active,
.app-sidebar .task-list li a.active {
    color: #fff;
    background: rgba(255, 255, 255, .05);
}

.app-sidebar .task-list li a:hover {
    color: #fff;
    background: rgba(255, 255, 255, .05);
}

.app-sidebar .task-list li>a .task-icon {
    font-size: 18px;
    position: absolute;
    top: 13px;
    left: 10px;
}

.app-sidebar .task-list li>a .arrow {
    right: 10px;
    left: initial;
}

.task-name {
    text-transform: uppercase;
    color: #57638b !important;
    font-weight: 700 !important;
    font-size: 11px !important;
    padding-left: 10px !important;
}
</style>