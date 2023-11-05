const express = require('express');
const elchavopy = express.Router();
const session = require('express-session');
const User = require('./models/user');

elchavopy.use(session({
	secret: 'çalışın amk',
	resave: true,
	saveUninitialized: true
  }));
  

elchavopy.get('/', (req, res, next) => {
			return res.render('login.ejs');
});

elchavopy.get('/register', (req, res, next) => {
			return res.render('register.ejs');
});

elchavopy.get('/login', (req, res, next) => {
	return res.render('login.ejs');
});

elchavopy.post('/login', (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;
  
	User.findOne({ username: req.body.username }, (err, user) => {
		if (user) {
		  if (user.password === password) {
			req.session.userId = user.kullaniciID;
			res.redirect('/index');
		  } else {
			res.send({ "Pass": "Girilen Şifre Geçersiz!" });
		  }
		} else {
		  res.redirect('/login');
		}
	  }
	)
});

  elchavopy.get('/index', (req, res, next) => {
	User.findOne({ kullaniciID: req.session.userId }, (err, data) => {
	  if (!data) {
		res.redirect('/login');
	  } else {
		 res.render('index.ejs', { "Kullanıcı": data.username})
	  }
	});
  });

module.exports = elchavopy;
