const { Router } = require("express");
const { requireAuth } = require("../middleware/authMiddleware");

const router = Router();

router.get("/", (req, res) => res.render("pages/home"));
router.get("/smoothies", requireAuth, (req, res) =>
  res.render("pages/smoothies")
);

module.exports = router;
