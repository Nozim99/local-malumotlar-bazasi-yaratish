const path = require("path");
const fs = require("fs");

// ma'lumot bazasi(card.json)ga yo'lanish
const pathToDb = path.join(__dirname, "..", "data", "card.json");

class Card {
  static async add(notebook) {
    const card = await Card.fetch();

    // kerakli ma'lumot - foydalanuvchi tomonidan tanlagan ma'lumot
    // kerakli ma'lumotni id ma'lumoti orqali index raqamini topish
    const idx = card.notebooks.findIndex((c) => c.id === notebook.id);
    // Topilgan index raqami orqali kerakmi la'lumot belgilab olindi
    const candidate = card.notebooks[idx];

    if (candidate) {
      // notebook karobkada bor
      candidate.count++;
      card.notebooks[idx] = candidate;
    } else {
      // Notebook qoshish kerak
      notebook.count = 1;
      card.notebooks.push(notebook);
    }

    // haridlarning jami narxi hisoblanib boradi
    card.price += +notebook.price;

    // amallar bajarilgandan keyin quyidagi ko'd ishga tushib
    // malumot bazasiga ma'lumot qo'shiladi
    return new Promise((resolve, reject) => {
      fs.writeFile(pathToDb, JSON.stringify(card), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static async remove(id) {
    const card = await Card.fetch();

    if (card.notebooks.length) {
      const idx = card.notebooks.findIndex((c) => c.id === id);
      const notebook = card.notebooks[idx];

      if (notebook) {
        if (notebook.count === 1) {
          // delete
          // belgilangan elementdan boshqa barchasi qaytadan saqlanadi
          card.notebooks = card.notebooks.filter((c) => c.id !== id);
        } else {
          // edit quantity
          card.notebooks[idx].count--;
        }

        card.price -= notebook.price;

        return new Promise((resolve, reject) => {
          fs.writeFile(pathToDb, JSON.stringify(card), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(card);
            }
          });
        });
      }
    }
  }

  // Ma'lumot bazasi(card.json)dan ma'lumotlarni qaytaradi
  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(pathToDb, "utf-8", (err, content) => {
        if (err) {
          reject(err);
        } else {
          // obyektga o'tkazadi
          resolve(JSON.parse(content));
        }
      });
    });
  }
}

module.exports = Card;
