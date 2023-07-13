<template>
  <div id="app" v-if="hasToken">
    <router-view></router-view>
  </div>
  <div v-else>
    <div class="flex justify-center items-center min-h-screen bg">
      <div class="bg-white p-8 rounded shadow-lg login-section">
        <template v-if="mode === 'login'">
          <LoginForm @switch-mode="switchMode" />
        </template>
        <template v-else-if="mode === 'registration'">
          <RegistrationForm @switch-mode="switchMode" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue';
import RegistrationForm from './components/registerForm.vue'

export default {
  components: {
    LoginForm,
    RegistrationForm
  },
  setup() {
    const hasToken = localStorage.getItem('token')
    return {
      hasToken
    }
  },

  data() {
    return {
      mode: 'login'
    }
  },

  methods: {
    switchMode(mode) {
      this.mode = mode;
    }
  },

}
</script>


<style>
#app {
  text-align: center;
}
</style>
