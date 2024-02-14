const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Post = require('./models/Post'); // Modelo de datos para las publicaciones

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/NoSQL')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Ruta para obtener todas las publicaciones
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();    
    res.json(posts);
  } catch (err) {
    console.error('Error al obtener las publicaciones:', err);
    res.status(500).json({ message: 'Error al obtener las publicaciones' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

// Exportar la aplicación Express y los datos de la base de datos
module.exports = { app, Post };
