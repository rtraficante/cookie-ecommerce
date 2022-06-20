const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const { requireToken, isAdmin } = require("./gateKeeperMiddleware");
module.exports = router;

router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "firstName", "lastName"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//may not need this
// router.get("/:id", requireToken, isAdmin, async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.id, {
//       attributes: ["id", "username", "email", "firstName", "lastName"],
//     });
//     res.json(user);
//   } catch (err) {
//     next(err);
//   }
// });
