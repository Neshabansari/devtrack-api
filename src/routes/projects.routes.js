const { Router } = require("express");
const controller = require("../controllers/projects.controller");
const validate = require("../middleware/validate");
const {
  createProjectRules,
  updateProjectRules,
  projectIdParamRule,
} = require("../validators/project.validators");

const router = Router();

router.get("/", controller.listProjects);
router.get("/:id", projectIdParamRule, validate, controller.getProject);
router.post("/", createProjectRules, validate, controller.createProject);
router.patch(
  "/:id",
  [...projectIdParamRule, ...updateProjectRules],
  validate,
  controller.updateProject
);
router.delete("/:id", projectIdParamRule, validate, controller.deleteProject);

module.exports = router;
