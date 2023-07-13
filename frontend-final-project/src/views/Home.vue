<template>
    <div >
      <div class="home">
        <Navbar />
        <div class="content">
          <p>Temukan kopi favoritmu dan nikmati pengalaman kopi yang menyenangkan.</p>
          <div class="image-container">
            <img src="@/assets/image1.jpg" alt="Gambar 1" class="image" />
            <img src="@/assets/image2.jpg" alt="Gambar 2" class="image" />
            <img src="@/assets/image3.jpg" alt="Gambar 3" class="image" />
          </div>
          <div class="button-container">
            <router-link to="/menu" class="cta-button">Pesan Sekarang</router-link>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
import Navbar from '@/components/MainNavbar.vue';


export default {
  name: 'HomePage',
  components: {
    Navbar,
  },


};
</script>

<style scoped>
.home {
  background-color: #f1f1f1;
  padding: 20px;
  min-height: 91vh;
}

.content {
  margin-bottom: 40px;
}

p {
  color: black;
  font-size: 18px;
}

.image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin: 0 10px;
}

.button-container {
  margin-top: 40px;
}

.cta-button {
  background-color: #985E49;
  color: #fff;
  padding: 10px 20px;
  font-size: 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
}

.cta-button:hover {
  background-color: #784832;
}

@media (max-width: 768px) {
  .content {
    padding: 0 10px;
  }

  p {
    font-size: 16px;
  }

  .image-container {
    flex-wrap: wrap;
    justify-content: center;
  }

  .image {
    width: 150px;
    height: 150px;
    margin: 10px;
  }

  .button-container {
    text-align: center;
  }

  .cta-button {
    font-size: 16px;
    padding: 8px 16px;
  }
}
</style>
