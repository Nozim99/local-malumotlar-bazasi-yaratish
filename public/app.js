function toCurrency(price) {
  return new Intl.NumberFormat("us-US", {
    currency: "usd",
    style: "currency",
  }).format(price);
}

document.querySelectorAll(".price").forEach((item) => {
  item.textContent = toCurrency(item.textContent);
});

document.querySelectorAll(".card-title").forEach((e) => {
  if (e.textContent.length > 30) {
    e.textContent = e.textContent.slice(0, 30) + "...";
  }
});

// $ - node elementligini bildiradi
const $card = document.querySelector("#card");
if ($card) {
  $card.addEventListener("click", (e) => {
    // contains "js-remove" clasi bor bo'lsa true yo'q bo'lsa false qaytaradi
    if (e.target.classList.contains("js-remove")) {
      const id = e.target.dataset.id;

      fetch("/card/remove/" + id, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((card) => {
          // Basketda user tomonidan o'zgartirish kiritilsa sahifada o'zgarish bo'lmaydi lekin ma'lumotlar bazasida o'zgarish bo'ladi
          // Sahifada ham o'zgarish bo'lishi uchun quyidagicha dinamik o'zgartirish kerak. User tomonidan ma'lumot o'chirilsa yoki qo'shilsa
          // quyidagi yozilgan ko'dlar bo'yicha sahifada ko'rinadi. Bu oldingi ko'd bilan bir xil
          if (card.notebooks.length) {
            const dynamicHtml = card.notebooks
              .map((c) => {
                return `
              <tr>
                <td>${c.title}</td>
                <td>${c.count}</td>
                <td>
                  <button class="btn btn-small js-remove" data-id="${c.id}">Delete</button>
                </td>
              </tr>
            `;
              })
              .join("");
            $card.querySelector("tbody").innerHTML = dynamicHtml;
            $card.querySelector(".price").textContent = card.price;
          } else {
            $card.innerHTML = `<div class="basket-empy__page">
            <img
              src="https://i.imgur.com/dCdflKN.png"
              width="130"
              height="130"
              class="img-fluid mb-4 mr-3"
            />
            <h3><strong>Your Cart is Empty</strong></h3>
            <h4>Add something to make me happy :)</h4>
            <a
              href="/notebooks"
              class="btn btn-primary mt-1"
              data-abc="true"
            >continue shopping</a>
          </div>
            `;
          }
        });
    }
  });
}
