const { Router } = require("express");
const controller = require("../controllers/users.controller");
const validate = require("../middleware/validate");
const {
  createUserRules,
  updateUserRules,
  userIdParamRule,
} = require("../validators/user.validators");

const router = Router();

router.get("/", controller.listUsers);
router.get("/:id", userIdParamRule, validate, controller.getUser);
router.post("/", createUserRules, validate, controller.createUser);
router.patch("/:id", [...userIdParamRule, ...updateUserRules], validate, controller.updateUser);
router.delete("/:id", userIdParamRule, validate, controller.deleteUser);

module.exports = router;
