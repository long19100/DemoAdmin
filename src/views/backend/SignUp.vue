<script>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const router = useRouter()
        const username = ref('')
        const password = ref('')
        const confirmPassword = ref('')
        const hoten = ref('')
        const diachi = ref('')
        const gioitinh = ref('')
        const linkUrl = ref('/')
        const registerMessage = ref('')

        const handleRegister = async () => {
            if (password.value !== confirmPassword.value) {
                registerMessage.value = "Mật khẩu và xác nhận mật khẩu không khớp.";
                return;
            }

            try {
                const res = await axios.post('http://localhost:5039/api/Login/Register', {
                    taikhoan: username.value,
                    matkhau: password.value,
                    hoten: hoten.value,
                    diachi: diachi.value,
                    gioitinh: gioitinh.value
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (res.status === 200) {
                    alert("Đăng ký thành công. Đang chuyển hướng đến trang đăng nhập...");
                    setTimeout(() => {
                        router.push('/')
                    }, 2000);
                }
            } catch (error) {
                if (error.response) {
                    switch (error.response.status) {
                        case 400:
                            registerMessage.value = "Dữ liệu không hợp lệ.";
                            break;
                        case 409:
                            registerMessage.value = "Tài khoản đã tồn tại.";
                            break;
                        default:
                            registerMessage.value = "Có lỗi xảy ra, vui lòng thử lại.";
                            break;
                    }
                } else {
                    registerMessage.value = "Có lỗi xảy ra, vui lòng kiểm tra kết nối mạng.";
                }
            }
        }

        return {
            username,
            password,
            confirmPassword,
            hoten,
            diachi,
            gioitinh,
            linkUrl,
            registerMessage,
            handleRegister
        }
    }
}
</script>

<template>
    <div class="login-container">
        <div class="login-wrapper">
            <div class="login-header">
                <h2 class="header-1">Đăng ký</h2>
            </div>
            <div class="login-body">
                <div class="form-row">
                    <div class="label">Tên đăng nhập</div>
                    <input type="text" v-model="username" class="input-text">
                </div>
                <div class="form-row">
                    <div class="label">Mật khẩu</div>
                    <input type="password" v-model="password" class="input-text">
                </div>
                <div class="form-row">
                    <div class="label">Xác nhận mật khẩu</div>
                    <input type="password" v-model="confirmPassword" class="input-text">
                </div>
                <div class="form-row">
                    <div class="label">Họ và tên</div>
                    <input type="text" v-model="hoten" class="input-text">
                </div>
                <div class="form-row">
                    <div class="label">Địa chỉ</div>
                    <input type="text" v-model="diachi" class="input-text">
                </div>
                <div class="form-row">
                    <div class="label">Giới tính</div>
                    <input type="text" v-model="gioitinh" class="input-text">
                </div>
                <div class="form-row">
                    <button @click="handleRegister" class="btn-login">Đăng ký</button>
                </div>
                <div class="form-row mt-20">
                    <a :href="linkUrl">Bạn đã có tài khoản?</a>
                </div>
                <div class="form-row">
                    <p v-if="registerMessage" class="register-message">{{ registerMessage }}</p>
                </div>
            </div>
            <div class="login-footer">
                <p>© nhatlong0319@gmail.com</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login-container {
    display: flex;
    background: #f0f1f7;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
}

.login-wrapper {
    width: 100%;
    max-width: 345px;
    background: #fff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header-1 {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
    text-transform: uppercase;
}

.label {
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
}

.input-text {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    margin-bottom: 20px;
}

.btn-login {
    width: 100%;
    background-color: #845ADF;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    text-transform: uppercase;
}

.btn-login:hover {
    background-color: #7053D3;
}

.register-message {
    color: red;
    font-size: 14px;
    text-align: center;
    margin-top: 10px;
}

.login-footer {
    text-align: center;
    margin-top: 20px;
    font-size: 12px;
    color: #aaa;
}
.login-footer p{
    margin: 0;
}
</style>

