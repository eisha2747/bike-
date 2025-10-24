const PRODUCTS = [
  { id: 1, name: "Honda Hornet 2.0", category: "sports bike", price: 185000, img: "Honda Hornet 2.0.jpeg.jpg" },
  { id: 2, name: "Yamaha MT-15", category: "street fighter", price: 62000, img: "IYamaha MT 15 V2.jpg" },
  { id: 3, name: "KTM 390", category: "sports bike", price: 51000, img: "KTM 390.jpg" },
  { id: 4, name: "Royal Enfield Classic 350", category: "crusier", price: 295000, img: "Royal Enfield Classic 350.jpg" },
  { id: 5, name: "TVS Apache RR 310", category: "crusier", price: 295000, img: "TVS Apache RR 310.jpg" },
  { id: 6, name: "BMW G310 RR", category: "sports bike", price:329879, img: "BMW G310.jpeg" },
   { id: 7, name: "JAVA 42", category: "cruiser", price:191202, img: "java 42.jpeg" },
];

let cart = [];

const productsEl = document.getElementById("products");
const searchEl = document.getElementById("search");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const cartItemsEl = document.getElementById("cartItems");
const drawer = document.getElementById("drawer");
const modal = document.getElementById("orderForm");

// Render products
function renderProducts(filter = "all", search = "") {
  productsEl.innerHTML = "";
  const filtered = PRODUCTS.filter(
    p => (filter === "all" || p.category === filter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  filtered.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p><strong>₹${p.price.toLocaleString()}</strong></p>
      <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
      <button class="btn secondary" onclick="buyNow(${p.id})">Buy Now</button>
    `;
    productsEl.appendChild(div);
  });
}

// Add to cart
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  updateCart();
}

// Buy Now → open order form
function buyNow(id) {
  modal.style.display = "flex";
  modal.dataset.buyId = id;
}

// Update cart
function updateCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.innerHTML = `${item.name} x${item.qty} - ₹${item.price * item.qty}`;
    cartItemsEl.appendChild(div);
  });
  cartCount.textContent = cart.length;
  cartTotal.textContent = "₹" + total.toLocaleString();
}

// Category filter
document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.cat, searchEl.value);
  });
});

// Search
searchEl.addEventListener("input", () => {
  const activeCat = document.querySelector(".cat-btn.active").dataset.cat;
  renderProducts(activeCat, searchEl.value);
});

// Cart drawer toggle
document.getElementById("openCart").addEventListener("click", () => {
  drawer.style.display = drawer.style.display === "block" ? "none" : "block";
});

document.getElementById("clearCart").addEventListener("click", () => {
  cart = [];
  updateCart();
});

document.getElementById("checkout").addEventListener("click", () => {
  alert("Checkout process coming soon!");
});

// Order Form Buttons
document.getElementById("closeForm").addEventListener("click", () => {
  modal.style.display = "none";
});

document.getElementById("placeOrder").addEventListener("click", () => {
  const name = document.getElementById("custName").value;
  const address = document.getElementById("custAddress").value;
  const mobile = document.getElementById("custMobile").value;
  const payment = document.getElementById("custPayment").value;
  const productId = modal.dataset.buyId;
  const product = PRODUCTS.find(p => p.id == productId);

  if (!name || !address || !mobile) {
    alert("Please fill all details!");
    return;
  }

  alert(`✅ Order Placed!\n\nCustomer: ${name}\nBike: ${product.name}\nAmount: ₹${product.price}\nPayment: ${payment}`);
  modal.style.display = "none";
});

window.onclick = function(e) {
  if (e.target == modal) modal.style.display = "none";
};

renderProducts();
