const { Router } = require("express");
const { requireAuth } = require("../middleware/authMiddleware");

const router = Router();

router.get("/", (req, res) => res.render("home"));
router.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));

module.exports = router;
