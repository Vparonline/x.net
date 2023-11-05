const mongoose = require('mongoose');
const Schema = mongoose.Schema;

userSchema = new Schema( {
	kullaniciID: Number,
	username: String,
	email: String,
	password: String,
})
User = mongoose.model('User', userSchema);

module.exports = User;
