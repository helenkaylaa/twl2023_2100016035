<template>
  <div class="register-container">
    <div class="register-content">
      <div class="register-left">
        <div class="background-image">El Coffee</div>
        <img src="@/assets/image4.png" alt="Register Image" class="enlarged-image" />
      </div>
      <div class="register-right">
        <h2>Register</h2>
        <form @submit.prevent="register">
          <div>
            <label for="fullname">Full Name:</label>
            <input type="text" id="fullname" v-model="registrationData.fullname" placeholder="Full Name" />
          </div>
          <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="registrationData.email" placeholder="Email" />
          </div>
          <div>
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="registrationData.username" placeholder="Username" />
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="registrationData.password" placeholder="Password" />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      registrationData: {
        fullname: "",
        email: "",
        username: "",
        password: "",
      }
    };
  },
  methods: {
    redirectToLogin() {
      // Redirect to the login page
      this.$emit('switch-mode', 'login')
    },
    register() {
      // Write if statement to check if the registration data is valid
      // If the data is invalid, show a toast message and return early
      if (this.registrationData.fullname == '' || this.registrationData.email == '' || this.registrationData.username == '' || this.registrationData.password == '') {
        alert('Mohon isi semua data', "Registrasi Gagal");
        return;
      }
      if (!this.registrationData.email.includes('@') || !this.registrationData.email.includes('.')) {
        alert('Email tidak valid', "Registrasi Gagal");
        return;
      }
      if (this.registrationData.password.length < 8) {
        alert('Password harus lebih dari 8 karakter', "Registrasi Gagal");
        return;
      }

      axios.post('http://localhost:8009/register', this.registrationData)
        .then(response => {
          // Handle the successful registration response
          alert(response.data.message, "Registrasi Berhasil");
          this.redirectToLogin();
        })
        .catch(error => {
          // Handle the registration error
          alert(error.response.data.message);
        });
    },
  },
};
</script>

<style scoped>
.register-container {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 91vh;
  background-color: #f7efe9;
}

.register-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 800px;
}

.register-left {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #985e49;
}

.enlarged-image {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.register-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: auto;
}

h2 {
  text-align: center;
  color: #985e49;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
}

label {
  margin-bottom: 10px;
  color: #985e49;
}

input {
  padding: 5px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 1px solid #985e49;
  width: 100%;
}

button {
  padding: 10px 20px;
  /* Increase the horizontal padding to widen the button */
  background-color: #985e49;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #784935;
}

button:active {
  background-color: #5c3726;
}

.register-options {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.register-options button {
  margin-bottom: 10px;
  color: #985e49;
  text-decoration: none;
}
</style>
