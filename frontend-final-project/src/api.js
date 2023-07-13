const axios = require('axios');

const API_URL = 'http://localhost:3000/menu';

async function getMenuList() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching the menu list');
  }
}

async function addMenu(menu) {
  try {
    const response = await axios.post(API_URL, menu);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  getMenuList,
  addMenu
};
