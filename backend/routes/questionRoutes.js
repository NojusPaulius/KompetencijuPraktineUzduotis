const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const authController = require("../controllers/authController");


router.use(authController.protect); // padaro, kad visi routes butu apsaugoti nuo neprisijungusiu vartotoju
router
    .route("/")
    .get(authController.restrictTo("user", "admin"), questionController.getAllQuestions)
    .post(authController.restrictTo("admin", "user"), questionController.createQuestion);

router
    .route("/:id")
    .get(authController.restrictTo("user", "admin"), questionController.getQuestionById)
    .post(authController.restrictTo("user", "admin"), questionController.updateLikes)
    .delete(authController.restrictTo("user", "admin"), questionController.deleteQuestion)

router
    .route("/update/:id")
    .post(authController.restrictTo("admin", "user"), questionController.updateQuestion)


module.exports = router;