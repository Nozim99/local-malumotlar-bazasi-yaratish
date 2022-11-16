const { Router } = require("express");
const router = Router();

router.get("/notebooks", (req, res) => {
  res.render("notebooks", { title: "Notebooks", isNotebooks: true });
});

module.exports = router;