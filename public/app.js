const priceNotebooks = document.querySelectorAll(".price");
const cardTitle = document.querySelectorAll(".card-title");

priceNotebooks.forEach((item) => {
  item.textContent = new Intl.NumberFormat("us-US", {
    currency: "usd",
    style: "currency",
  }).format(item.textContent);
});

cardTitle.forEach((e) => {
  if (e.textContent.length > 30) {
    e.textContent = e.textContent.slice(0, 30) + "...";
  }
});
