const router = require('express').Router();
const {
  models: { User },
} = require('../db');
const { requireToken, isAdmin } = require('./gateKeeperMiddleware');
module.exports = router;

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
