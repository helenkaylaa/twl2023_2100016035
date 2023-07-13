<template>
  <div class="pesanan-list-container">
    <Navbar />
    <div class="content">
      <h1 class="title">Pesanan Anda</h1>
      <div class="pesanan-scroll-container">
        <ul class="pesanan-row">
          <li v-for="(pesanan, pesananId) in pesananList" :key="pesananId" class="pesanan-item">
            <div class="pesanan-item-container">
              <div class="pesanan-details">
                <h3>{{ pesanan.name }}</h3>
                <p>Harga: Rp {{ pesanan.price }}</p>
                <p>Jumlah: {{ pesanan.quantity }}</p>
              </div>
              <div class="pesanan-remove-wrapper">
                <span class="pesanan-remove" @click="deletePesanan(pesanan._id)">&times;</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/MainNavbar.vue';
import axios from 'axios';

export default {
  name: 'PesananList',
  components: {
    Navbar
  },
  data() {
    return {
      pesananList: []
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:8009/menu');
        console.log(response.data);
        this.pesananList = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    getPesananName(pesananId) {
      const pesanan = this.pesananList[pesananId];
      return pesanan ? pesanan.name : '';
    },

    getPesananPrice(pesananId) {
      const pesanan = this.pesananList[pesananId];
      return pesanan ? pesanan.price : '';
    },

    async deletePesanan(id) {
      try {
        const apiEndpoint = `http://localhost:8009/menu/${id}`;
        await axios.delete(apiEndpoint);

        // Remove the deleted item from the pesananList
        this.pesananList = this.pesananList.filter((pesanan) => pesanan._id !== id);
      } catch (error) {
        console.error('Error deleting pesanan:', error);
      }
    },

    addPesanan(pesanan) {
      const existingPesanan = this.pesananList.find(item => item._id === pesanan._id);
      if (existingPesanan) {
        existingPesanan.quantity++;
      } else {
        pesanan.quantity = 1;
        this.pesananList.push(pesanan);
      }
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.pesanan-list-container {
  background-color: #f1f1f1;
  padding: 20px;
  min-height: 91vh;
}

.content {
  margin-top: 20px;
  text-align: left;
}

.title {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

.pesanan-scroll-container {
  overflow-x: auto;
  width: 100%;
}

.pesanan-row {
  display: flex;
  flex-direction: column;
  list-style: none;
  /* Menghilangkan bullet */
  justify-content: center;
}

.pesanan-item {
  margin-bottom: 20px;
  margin-right: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  width: 400px;
  /* Ubah lebar sesuai kebutuhan */
  position: relative;
}

.pesanan-item-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.pesanan-image-container {
  width: 100px;
  height: 100px;
  margin-right: 10px;
}

.pesanan-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.pesanan-details {
  flex-grow: 1;
}

.pesanan-remove-wrapper {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
}

.pesanan-remove {
  font-weight: bold;
  font-size: 175%;
  color: black;
  cursor: pointer;
  margin-right: 25px;
}

/* Responsiveness */
@media (max-width: 768px) {
  .pesanan-row {
    justify-content: center;
  }

  .pesanan-item {
    margin-right: 0;
  }
}
</style>
