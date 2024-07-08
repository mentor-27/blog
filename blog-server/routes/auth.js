const { Router } = require('express');
const { login, register } = require('../controllers/user');
const mapUser = require('../helpers/mapUser');

const router = Router({ mergeParams: true });

router.post('/register', async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);

    res.cookie('token', token, { httpOnly: true }).json({ error: null, user: mapUser(user) });
  } catch (e) {
    res.json({ error: e.message || 'Unknown error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);

    res.cookie('token', token, { httpOnly: true }).json({ error: null, user: mapUser(user) });
  } catch (e) {
    res.json({ error: e.message || 'Unknown error' });
  }
});

router.post('/logout', async (req, res) => {
  res.cookie('token', '', { httpOnly: true }).send({ error: null });
});

module.exports = router;
