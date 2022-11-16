const { Router } = require("express");
const router = Router();
const Notebook = require("../models/notebook");

// index.js da "/add" yozilgani uchun bu yerda "/" yozish kifoya
// Bu yerda "/add" yozilganda index.js da "/" yozish kerak bo'lardi
router.get("/", (req, res) => {
  res.render("add", { title: "Add Notebook", isAdd: true });
});

router.post("/", async (req, res) => {
  const notebook = new Notebook(req.body.title, req.body.price, req.body.img);
  await notebook.save();
  res.redirect("/notebooks");
});

module.exports = router;
