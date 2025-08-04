const mongoose = require('mongoose');
const UsuarioSchema = new mongoose.Schema({
  email: String,
  senha: String // Em produção, use hash de senha!
});
module.exports = mongoose.model('Usuario', UsuarioSchema);