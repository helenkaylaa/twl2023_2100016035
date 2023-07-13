<template>
  <div class="menu-list-container">
    <Navbar />
    <div class="content">
      <h1 class="title">Daftar Menu</h1>
      <div class="menu-scroll-container">
        <ul class="menu-row">
          <li v-for="menu in displayedMenus" :key="menu.id" class="menu-item">
            <div class="menu-item-container">
              <div class="menu-image-container">
                <img :src="menu.image" alt="Menu Image" class="menu-image" />
              </div>
              <h3>{{ menu.name }}</h3>
              <p>{{ menu.description }}</p>
              <p>Harga: Rp {{ menu.price }}</p>
              <button @click="addToCart(menu)" class="add-to-cart">Pesan</button>
            </div>
          </li>
        </ul>
      </div>
      <div class="pagination">
        <button @click="previousPage" :disabled="currentPage === 1" class="pagination-button">Previous</button>
        <div class="page-list">
          <button v-for="pageNumber in totalPages" :key="pageNumber" @click="goToPage(pageNumber)"
            :class="{ 'active': pageNumber === currentPage }" class="pagination-button">{{ pageNumber }}</button>
        </div>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button">Next</button>
      </div>
    </div>

    <!-- Pop-up Pesanan Berhasil Ditambahkan -->
    <div v-if="showSuccessPopup" class="success-popup">
      <div class="success-content">
        <h3>Pesanan Berhasil Ditambahkan!</h3>
        <button @click="hideSuccessPopup" class="close-button">Tutup</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '@/components/MainNavbar.vue';

export default {
  name: 'MenuList',
  components: {
    Navbar
  },
  data() {
    return {

      menus: [
        { id: 1, name: 'Aren Latte', price: 21000, image: require('@/assets/menu1.jpeg') },
        { id: 2, name: 'Caramel Latte', price: 22000, image: require('@/assets/menu2.jpeg') },
        { id: 3, name: 'Cafe Latte', price: 20000, image: require('@/assets/menu3.jpg') },
        { id: 4, name: 'Creamy Latte', price: 22000, image: require('@/assets/menu4.jpg') },
        { id: 5, name: 'Butterscotch Latte', price: 22000, image: require('@/assets/menu5.jpg') },
        { id: 6, name: 'White Latte', price: 20000, image: require('@/assets/menu6.jpeg') },
        { id: 7, name: 'Caramel Macchiato', price: 24000, image: require('@/assets/menu7.jpg') },
        { id: 8, name: 'Hazelnut Latte', price: 22000, image: require('@/assets/menu8.jpg') },
        { id: 9, name: 'Cafe Mocha', price: 22000, image: require('@/assets/menu9.jpg') },
        { id: 10, name: 'Regal Latte', price: 24000, image: require('@/assets/menu10.jpg') },
        { id: 11, name: 'Vanilla Latte', price: 22000, image: require('@/assets/menu11.jpeg') },
        { id: 12, name: 'Americano', price: 17000, image: require('@/assets/menu12.jpeg') },
      ],
      currentPage: 1,
      pageSize: 4,
      showSuccessPopup: false,
    };
  },
  computed: {
    displayedMenus() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.menus.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.menus.length / this.pageSize);
    },
  },
  methods: {
    addToCart(menu) {
      const selectedData = {
        id: menu.id,
        name: menu.name,
        price: menu.price,
      };

      axios
        .post('http://localhost:8009/menu', selectedData)
        .then(response => {
          // Handle the response if needed
          this.response = response;
          this.showSuccessPopup = true;
          setTimeout(() => {
            this.hideSuccessPopup();
          }, 2000);
        })
        .catch(error => {
          // Handle any errors that occur during the request
          console.error(error);
        });
    },

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
    },
    hideSuccessPopup() {
      this.showSuccessPopup = false;
    },
  },
};
</script>


<style scoped>
.menu-list-container {
  background-color: #f1f1f1;
  padding: 20px;
  min-height: 91vh;
}

.content {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

.menu-scroll-container {
  overflow-x: auto;
  width: 100%;
}

.menu-row {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: center;
}

.menu-item {
  margin-bottom: 20px;
  margin-right: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
}

.menu-item-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.menu-image-container {
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
}

.menu-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination-button {
  padding: 5px 10px;
  margin: 0 5px;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-list {
  display: flex;
}

.add-to-cart {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #985E49;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}

.add-to-cart:hover {
  background-color: #784832;
}

.active {
  background-color: #985E49;
  color: #fff;
}

/* Responsiveness */
@media (max-width: 768px) {
  .menu-row {
    justify-content: center;
  }

  .menu-item {
    margin-right: 0;
  }
}

/* Pop-up Styling */
.success-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.success-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.close-button {
  padding: 5px 10px;
  background-color: #985E49;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}

.close-button:hover {
  background-color: #784832;
}
</style>