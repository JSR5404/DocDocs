const router = require("express").Router();
router.get("/", async (req, res) => {
  res.render("homepage");
});

router.get("/conditions", async (req, res) => {
  res.render("conditions");
});
router.get("/medications", async (req, res) => {
  res.render("medications");
});
router.get("/patients", async (req, res) => {
  res.render("patients");
});

module.exports = router;
