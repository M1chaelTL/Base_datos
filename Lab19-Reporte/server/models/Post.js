const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  titulo: String,
  texto: String,
  autor: String,
  fecha: { type: Date, default: Date.now },
  comentarios: [{
    usuario: String,
    texto: String,
    fecha: { type: Date, default: Date.now }
  }]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
