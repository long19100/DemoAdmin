<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const users = ref([]);
const selectedUserIds = ref([]);
const currentPage = ref(1);
const itemsPerPage = 6;

const fetchUsers = async () => {
    try {
        const response = await axios.get('http://localhost:5039/api/UserManager/GetUsers');
        users.value = response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return users.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(users.value.length / itemsPerPage));

const goToItem = () => router.push({ name: 'add-user' });

const goToEdit = (userId) => router.push({ name: 'edit-user', params: { id: userId } });

const handleCheckboxChange = (userId, event) => {
    if (event.target.checked) {
        if (!selectedUserIds.value.includes(userId)) {
            selectedUserIds.value.push(userId);
        }
    } else {
        selectedUserIds.value = selectedUserIds.value.filter(id => id !== userId);
    }
};

const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`http://localhost:5039/api/UserManager/DeleteUser/${userId}`);
        if (response.status === 204) {
            users.value = users.value.filter(user => user.userId !== userId);
        } else {
            console.error(`Failed to delete user. Status code: ${response.status}`);
        }
    } catch (error) {
        console.error('Error deleting user:', error.response ? error.response.data : error.message);
    }
};

const deleteSelectedUsers = async () => {
    try {
        for (const userId of selectedUserIds.value) {
            await deleteUser(userId);
        }
        selectedUserIds.value = [];
    } catch (error) {
        console.error('Error deleting selected users:', error);
    }
};

const toggleAllCheckboxes = (event) => {
    const isChecked = event.target.checked;
    selectedUserIds.value = isChecked ? users.value.map(user => user.userId) : [];
};

const changePage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages.value) {
        currentPage.value = pageNumber;
    }
};

onMounted(fetchUsers);
</script>

<template>
    <div class="item-content">
        <div class="item-header">
            <h2>User Manager</h2>
        </div>
        <div class="form-group">
            <div class="grid-container">
                <div class="item-list">
                    <div class="form-item">
                        <label for="name" class="text">Name</label>
                        <input type="text" id="name" class="input-text short-input">
                    </div>
                    <div class="form-item">
                        <label for="phone" class="text">Phone</label>
                        <input type="text" id="phone" class="input-text short-input">
                    </div>
                </div>
                <div class="item-list">
                    <div class="form-item">
                        <label for="email" class="text">Email</label>
                        <input type="text" id="email" class="input-text long-input">
                    </div>
                    <div class="form-item">
                        <label for="address" class="text">Address</label>
                        <input type="text" id="address" class="input-text long-input">
                    </div>
                </div>
            </div>
            <div class="button-type">
                <div class="button-group">
                    <div class="form-row">
                        <button class="btn-style bg_red" @click="deleteSelectedUsers">
                            <i class="bx bx-minus"></i>
                            Delete
                        </button>
                    </div>
                    <div class="form-row">
                        <button class="btn-style bg_green" @click="goToItem">
                            <i class="bx bx-plus"></i>
                            Create
                        </button>
                    </div>
                </div>
                <div class="form-row">
                    <button class="btn-style bg_blue">Search</button>
                </div>
            </div>
        </div>

        <div class="table-responsive">
            <table class="user-table">
                <thead>
                    <tr>
                        <th><input type="checkbox" @change="toggleAllCheckboxes"></th>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="users.length === 0">
                        <td colspan="7">No users found.</td>
                    </tr>
                    <tr v-for="user in paginatedUsers" :key="user.userId">
                        <td><input type="checkbox" :value="user.userId" @change="handleCheckboxChange(user.userId, $event)"></td>
                        <td>{{ user.userId }}</td>
                        <td>{{ user.Name }}</td>
                        <td>{{ user.Email }}</td>
                        <td>{{ user.Phone }}</td>
                        <td>{{ user.Address }}</td>
                        <td><button @click="goToEdit(user.userId)"><i class="bx bx-edit"></i></button></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="pagination">
            <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">Next</button>
        </div>
    </div>
</template>


<style scoped>
.item-content {
    padding: 20px;
    background-color: #f5f5f5;
    flex: 1;
    box-sizing: border-box; 
}

h2 {
    font-weight: 700;
    color: #000;
    width: 100%;
    margin: 0;
}

.form-group {
    margin-top: 20px;
    padding: 20px;
    box-sizing: border-box; 
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.item-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.form-item {
    display: flex;
    align-items: center;
}

.form-item label {
    flex: 0 0 100px;
    font-weight: bold;
    margin-right: 5px;
}

.input-text {
    padding: 10px;
    border: 1px solid #000;
    border-radius: 10px;
    height: 30px;
    box-sizing: border-box; 
}

.short-input {
    width: 200px;
}

.long-input {
    width: 100%;
}

.btn-style {
    border: none;
    width: 124px;
    border-radius: 5px;
    height: 31.5px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    cursor: pointer;
}

.btn-style i {
    font-size: 20px;
    margin-right: 5px;
}

.text {
    color: #000;
}

.button-type {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button-group {
    display: flex;
    gap: 10px;
}

.user-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: #fff;
    text-align: left;
    font-size: 14px;
}

.user-table th,
.user-table td {
    padding: 12px;
    border: 1px solid #ddd;
    box-sizing: border-box; 
}

.user-table th {
    background-color: #f4f4f4;
    font-weight: bold;
}

.user-table tr:nth-child(even) {
    background-color: #f9f9f9;
}

.table-responsive {
    overflow-x: auto;
}

button {
    cursor: pointer;
}

.pagination {
    margin-top: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    gap: 10px;
}

.pagination button {
    background-color: #007bff;
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>


