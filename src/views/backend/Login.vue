<script>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const router = useRouter() 
        const username = ref('')
        const password = ref('')
        const linkUrl = ref('/sign-up')
        const loginMessage = ref('')
        const validationMessage = ref({ username: '', password: '' })

        const handleLogin = async () => {

            validationMessage.value.username = ''
            validationMessage.value.password = ''

            
            if (!username.value) {
                validationMessage.value.username = 'Tên đăng nhập không được để trống.'
            }
            if (!password.value) {
                validationMessage.value.password = 'Mật khẩu không được để trống.'
            }

            if (!username.value || !password.value) return;

            try {
                const res = await axios.post('http://localhost:5039/api/Login/Login', {
                    taikhoan: username.value,
                    matkhau: password.value
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (res.status === 200) {
                    alert("Đăng nhập thành công");
                    router.push('/admin');
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    loginMessage.value = "Dữ liệu không hợp lệ.";
                } else {
                    alert("Tài khoản hoặc mật khẩu không đúng");
                }
            }
        }

        return {
            username,
            password,
            linkUrl,
            loginMessage,
            validationMessage,
            handleLogin
        }
    }
}
</script>

<template>
    <div class="login-container">
        <div class="login-wrapper">
            <div class="login-header">
                <h2 class="header-1">Đăng nhập</h2>
            </div>
            <div class="login-body">
                <div class="form-row mb-20">
                    <div class="label">Tên đăng nhập</div>
                    <input type="text" v-model="username" class="input-text">
                    <p v-if="validationMessage.username" class="error-message">{{ validationMessage.username }}</p>
                </div>
                <div class="form-row mb-5">
                    <div class="label">
                        <div class="uk-flex uk-flex-between">
                            <span>Mật khẩu</span>
                            <a href="" class="Forgot">Quên mật khẩu?</a>
                        </div>
                    </div>
                    <input type="password" v-model="password" class="input-text">
                    <p v-if="validationMessage.password" class="error-message">{{ validationMessage.password }}</p>
                </div>
                <div class="form-row mb-20">
                    <div class="uk-flex uk-flex-middle">
                        <input type="checkbox" name="remember" class="input-checkbox" id="forgot">
                        <label for="forgot">Ghi nhớ mật khẩu?</label>
                    </div>
                </div>
                <div class="form-row mb-5">
                    <div class="uk-flex uk-flex-middle">
                        <button @click="handleLogin" class="btn-login uk-button">Đăng nhập</button>
                    </div>
                </div>
            </div>

            <div class="login-footer">
                <p>copyright nhatlong0319@gmail.com</p>
                <a :href="linkUrl" class="sign-up">Tạo tài khoản</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
body{
  height: 100%;
  margin: 0;
  background: #f0f1f7;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 400;
}
.login-container {
    padding-top: 100px;
}
.login-wrapper {
    width: 345px;
    margin: 0 auto;    
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    padding: 48px 48px 24px;
    background: #fff;
}

.login-wrapper .header-1 {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 24px;
}

.login-wrapper .login-header{
    text-align: center;
    margin-bottom: 30px;
}

.btn-login {
    background: rgb(132,90,223);
    width: 100%;
    border-radius: 5px;
    height: 40px;
    color: #fff;
}

.login-wrapper .login-footer{
    text-align: center;
}

.login-wrapper .label {
    font-weight: 600;
    margin-bottom: 5px;
    color: #000;
}

.form-row .forgot{
    color: rgb(230,83,60);
    font-size: 13px;
}

.login-footer{
    margin-top: 20px;
}

.sign-up{
    color: rgb(132,90,223);
    font-size: 13px;
}

.sign-up:hover{
    text-decoration: none;
    cursor: pointer;
}

.error-message {
    color: red;
    font-size: 13px;
    margin-top: 5px;
}
</style>
