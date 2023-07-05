const express = require('express');
const { createUser } = require('../db/createUser');
const { loginUser } = require('../db/loginUser');
const { logoutUser } = require('../db/logoutUser');
const { logoutUserFromAll } = require('../db/logoutUserFromAll');
const { getUserByEmail } = require('../db/getUserByEmail');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/users', (req, res) => {
  createUser(req.body)
    .then((result) => {
      res.status(201).send('Sucksex!');
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post('/users/login', async (req, res) => {
  try {
    const userData = await loginUser(req.body);

    console.log(userData);

    res.send(userData);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/users/me', auth, async (req, res) => {
  try {
    const user = await getUserByEmail(req.email);

    if (user) {
      res.send(user);
    } else {
      throw new Error({ error: 'No such user' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/users/me/logout', auth, async (req, res) => {
  try {
    const email = req.email;
    const token = req.token;

    await logoutUser(email, token);

    res.status(200).send({ message: 'Success' });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/users/me/logoutall', auth, async (req, res) => {
  try {
    await logoutUserFromAll(req.email);
    res.status(200).send({ message: 'Success' });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
