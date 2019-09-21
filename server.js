const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'szu',
    password : 'test123',
    database : 'face-detect'
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.json(`it's working`));

app.put('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt, salt));

app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db));

app.put('/image', (req, res) => image.imageHandle(req, res, db));

app.post('/imageurl', (req, res) => image.imageUrlHandle(req, res));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`nasłuchuję kanału ${PORT}`));