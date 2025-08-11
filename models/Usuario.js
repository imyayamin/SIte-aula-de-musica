const mongoose = require('mongoose');
const UsuarioSchema = new mongoose.Schema({
  email: String,
  senha: String, // Em produção, use hash de senha!
  progresso: {
    teclado: [String],
    piano: [String],
    acordeão: [String],
    violoncelo: [String]
  }
});
module.exports = mongoose.model('Usuario', UsuarioSchema);