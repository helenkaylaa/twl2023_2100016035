<template>
  <header class="header">
    <div class="logo-container">
      <h1 class="logo">
        <span class="el-text">El</span> <span class="coffee-text">Coffee</span>
      </h1>
    </div>
    <div class="navigation">
      <div class="nav-button-container">
        <router-link to="/" class="nav-button" :class="{ 'active': currentRoute === '/' }" @click="handleHomeClick">Home</router-link>
      </div>
      <div class="nav-button-container">
        <router-link to="/menu" class="nav-button" :class="{ 'active': currentRoute === '/menu' }" @click="handleMenuClick">Menu</router-link>
      </div>
      <div class="nav-button-container">
        <router-link to="/pesanan" class="nav-button" :class="{ 'active': currentRoute === '/pesanan' }">Pesanan</router-link>
      </div>
      <div class="nav-button-container">
        <a class="nav-button" @click="logout()">Log Out</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MainNavbar',
  computed: {
    currentRoute() {
      return this.$route.path;
    }
  },
  methods: {
    logout(){
      localStorage.removeItem('token')
      location.reload();
    },

    handleHomeClick() {
      // Logika yang ingin Anda jalankan saat tombol Home diklik
      console.log('Tombol Home diklik');
    },
    handleMenuClick() {
      // Logika yang ingin Anda jalankan saat tombol Menu diklik
      console.log('Tombol Menu diklik');
    }
  }
};
</script>

<style scoped>
.header {
  background-color: #985E49;
  padding: 10px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  color: #fff;
  font-size: 24px;
  display: flex;
  align-items: center;
}

.el-text {
  font-family: 'New Font', sans-serif;
  font-size: 32px;
  color: black;
  margin-right: 5px;
}

.coffee-text {
  font-family: 'New Font', sans-serif;
  font-weight: normal;
  font-size: 32px;
}

.navigation {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.nav-button-container {
  padding: 10px;
  margin-left: 10px;
}

.nav-button {
  color: #fff;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
}

.nav-button.active {
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: center;
  }

  .navigation {
    margin-top: 20px;
    justify-content: center;
  }

  .nav-button-container {
    margin: 10px;
  }
}
</style>
