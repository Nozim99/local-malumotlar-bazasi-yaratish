const exphbs = require("express-handlebars");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const homeRoutes = require("./routes/home");
const notebooksRoutes = require("./routes/notebooks");
const addRoutes = require("./routes/add");

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

// exphbs ni ro'yhatdan o'tkazish
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
// birinchi "views" ko'rishni bildiradi. ikkinchisi esa fayl nomini bildiradi
app.set("views", "views");

app.use(express.static("public"));

// Formdan ma'lumot olish uchun quyidagini true qilish kerak
app.use(express.urlencoded({ extended: true }));

// sahifani yozmasa ham bo'ladi. app.use(homeRoutes)
app.use("/", homeRoutes);
app.use("notebooks", notebooksRoutes);
app.use("/add", addRoutes);

app.get("/notebooks", (req, res) => {
  res.render("notebooks", { title: "Notebooks", isNotebooks: true });
});
app.get("/add", (req, res) => {
  res.render("add", { title: "Add Notebook", isAdd: true });
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
