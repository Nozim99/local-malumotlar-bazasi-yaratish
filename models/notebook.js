const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

class Notebook {
  constructor(title, price, img, descr) {
    this.title = title;
    this.price = price;
    this.img = img;
    this.descr = descr;
    this.id = uuidv4();
  }

  // Ma'lumotlar bazasiga quyidagi nomlar orqali saqlanadi
  // this bilan berilgan foydalanuvchi orqali kiritilgan ma'lumot hisoblanadi
  toJSON() {
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      descr: this.descr,
      id: this.id,
    };
  }

  // Ma'lumotni o'zgartirish
  static async update(notebook) {
    const notebooks = await Notebook.getAll();

    // id orqali ma'lumot bazasidagi index raqamini aniqlaydi
    const idx = notebooks.findIndex((c) => c.id === notebook.id);
    // Ma'lumotlar bazasida index orqali belgilangan qiymatni yangilangan qiymatga
    // tenglashtirildi (o'zgartirildi)
    notebooks[idx] = notebook;

    // Yuqoridagi amallardan so'ng quyidagi ko'd ishga tushadi
    // belgilangan qiymatni o'zgartiradi
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "notebooks.json"),
        JSON.stringify(notebooks),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  // Ma'lumotlarni saqlaydi
  async save() {
    const notebooks = await Notebook.getAll();
    // Ma'lumotlar bazasiga saqlaydi
    // Yangilangan ma'lumotlarni ohiridan qo'shib boradi
    // Diqqat! Ma'lumotni boshidan qo'shish (unshift) maslahat berilmaydi aks holda
    // Diqqat! hamma elementlarga boshidan index raqam berilib kechikishga olib keladi
    notebooks.push(this.toJSON());
    console.log("Notebooks", notebooks);

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "notebooks.json"),
        JSON.stringify(notebooks),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  // data/notebooks.json dan ma'lumotlarni oladi
  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "notebooks.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(content));
          }
        }
      );
    });
  }

  // id orqali bitta elementni topib qaytaradi
  static async getById(id) {
    const notebooks = await Notebook.getAll();
    return notebooks.find((c) => c.id === id);
  }
}

module.exports = Notebook;
