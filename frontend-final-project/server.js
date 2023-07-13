const express = require('express');
const app = express();
const { getMenuList, addMenu } = require('./api');

// Menentukan port server
const port = 3000;

app.use(express.json());

app.get('/menu', async (req, res) => {
  try {
    const menu = await getMenuList();
    res.json(menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/menu', async (req, res) => {
  const { body } = req;
  try {
    const newMenu = await addMenu(body);
    res.status(201).json(newMenu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Menjalankan server API
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
