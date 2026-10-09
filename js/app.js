/* Chop Chop — front-end app
   No backend. The bag is saved in localStorage so it survives a refresh. */

const STORAGE_KEY = "chopchop-cart";

/* Products live in one array so you can add or change dishes later. */
const PRODUCTS = [
  {
    id: "benachin",
    name: "Benachin",
    kitchen: "Mama Binta's Kitchen",
    location: "Westfield",
    tag: "Popular",
    tagType: "default",
    price: 250,
    image: "assets/benachin.svg",
    photo: "https://images.unsplash.com/photo-1604329760661-e71dc83f2ca7?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "domoda",
    name: "Domoda",
    kitchen: "Katchik Corner",
    location: "Kololi",
    tag: "Popular",
    tagType: "default",
    price: 200,
    image: "assets/domoda.svg",
    photo: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "yassa",
    name: "Chicken yassa",
    kitchen: "Senegambia Grill",
    location: "Bakau",
    tag: "Spicy",
    tagType: "default",
    price: 350,
    image: "assets/yassa.svg",
    photo: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "afra",
    name: "Afra",
    kitchen: "Night Market",
    location: "Bakau",
    tag: "Spicy",
    tagType: "default",
    price: 400,
    image: "assets/afra.svg",
    photo: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "superkanja",
    name: "Superkanja",
    kitchen: "Auntie Haddy’s",
    location: "Serrekunda",
    tag: "Vegetarian",
    tagType: "veg",
    price: 180,
    image: "assets/superkanja.svg",
    photo: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "tapalapa",
    name: "Tapalapa and egg",
    kitchen: "Morning Street",
    location: "Bakau",
    tag: "Breakfast",
    tagType: "default",
    price: 75,
    image: "assets/tapalapa.svg",
    photo: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80"
  }
];

const AREAS = {
  Serrekunda: { minutes: 25, fee: 25 },
  Bakau: { minutes: 30, fee: 30 },
  Kololi: { minutes: 35, fee: 35 },
  Brusubi: { minutes: 40, fee: 40 },
  Banjul: { minutes: 45, fee: 45 },
  Lamin: { minutes: 45, fee: 45 }
};

const DEFAULT_FEE = 35;

const INFO = {
  kitchen: {
    title: "Join as a kitchen",
    html: "<p>Chop Chop partners with forty kitchens from Westfield to Brusubi. If you cook benachin, yassa, afra or a family recipe people already queue for, we want you on the map.</p><p>Email kitchens@chopchop.gm with your opening hours and a sample menu. There is no joining fee. We take a small cut of each completed order.</p>"
  },
  ride: {
    title: "Ride with us",
    html: "<p>Riders on scooters and motorbikes cover Serrekunda, Bakau, Kololi, Brusubi, Banjul and Lamin. You keep your tips. Fuel support is paid weekly.</p><p>Bring a valid licence and a phone that can run the Chop Chop rider app. Write to ride@chopchop.gm and we will set a start date.</p>"
  },
  contact: {
    title: "Contact",
    html: "<p>Customer care: +220 200 1000 · hello@chopchop.gm</p><p>Hours: 10:00–23:00, seven days. If a rider is late, open the order in the app and tap Help — we will call the kitchen and the rider for you.</p>"
  },
  terms: {
    title: "Terms",
    html: "<p>Chop Chop is a fictional food-delivery company built for a class project. Orders placed on this page do not go to a real kitchen and no payment is taken.</p><p>Prices are in Gambian Dalasi. Delivery fees follow the area you pick at checkout. Your bag is stored only in this browser.</p>"
  }
};

/* ---------- cart storage ---------- */

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn("Could not read the saved bag.", error);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function getProduct(id) {
  return PRODUCTS.find(function (item) {
    return item.id === id;
  });
}

function cartCount(cart) {
  return cart.reduce(function (sum, line) {
    return sum + line.qty;
  }, 0);
}

function calculateSubtotal(cart) {
  return cart.reduce(function (sum, line) {
    const product = getProduct(line.id);
    return product ? sum + product.price * line.qty : sum;
  }, 0);
}

function calculateDeliveryFee(areaName) {
  if (areaName && AREAS[areaName]) {
    return AREAS[areaName].fee;
  }
  return DEFAULT_FEE;
}

function calculateTotal(cart, areaName) {
  if (!cart.length) {
    return 0;
  }
  return calculateSubtotal(cart) + calculateDeliveryFee(areaName);
}

function formatDalasi(amount) {
  return "D" + amount;
}

/* ---------- render dishes ---------- */

function renderProducts() {
  const grid = document.getElementById("dish-grid");
  grid.innerHTML = PRODUCTS.map(function (dish) {
    const badgeClass = dish.tagType === "veg" ? "badge badge-veg" : "badge";
    return (
      "<li class=\"dish-card reveal\">" +
        "<img src=\"" + dish.image + "\" alt=\"\">" +
        "<div class=\"dish-top\">" +
          "<div>" +
            "<h3>" + dish.name + "</h3>" +
            "<p class=\"kitchen\">" + dish.kitchen + " · " + dish.location + "</p>" +
          "</div>" +
          "<span class=\"" + badgeClass + "\">" + dish.tag + "</span>" +
        "</div>" +
        "<div class=\"dish-row\">" +
          "<p class=\"price\">" + formatDalasi(dish.price) + "</p>" +
          "<button class=\"add-btn\" type=\"button\" data-add=\"" + dish.id + "\">Add</button>" +
        "</div>" +
      "</li>"
    );
  }).join("");

  /* If a photo cannot load, swap in the local illustration. */
  grid.querySelectorAll("img[data-fallback]").forEach(function (img) {
    img.addEventListener("error", function () {
      img.src = img.getAttribute("data-fallback");
      img.removeAttribute("data-fallback");
    });
  });
}

/* ---------- bag UI ---------- */

let cart = loadCart();
let chosenArea = "";

function addToCart(id) {
  const existing = cart.find(function (line) {
    return line.id === id;
  });
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: id, qty: 1 });
  }
  saveCart(cart);
  updateCartUI();
  const product = getProduct(id);
  showToast(product.name + " added to your bag");
}

function changeQty(id, delta) {
  cart = cart.map(function (line) {
    if (line.id === id) {
      return { id: id, qty: line.qty + delta };
    }
    return line;
  }).filter(function (line) {
    return line.qty > 0;
  });
  saveCart(cart);
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(function (line) {
    return line.id !== id;
  });
  saveCart(cart);
  updateCartUI();
}

function renderCartItems() {
  const box = document.getElementById("cart-items");
  const footer = document.getElementById("cart-footer");

  if (!cart.length) {
    box.innerHTML = "<p class=\"cart-empty\">Your bag is empty. Add a dish from Popular this week.</p>";
    footer.hidden = true;
    return;
  }

  footer.hidden = false;
  box.innerHTML = cart.map(function (line) {
    const product = getProduct(line.id);
    if (!product) {
      return "";
    }
    return (
      "<article class=\"cart-line\">" +
        "<img src=\"" + product.image + "\" alt=\"\">" +
        "<div>" +
          "<h3>" + product.name + "</h3>" +
          "<p class=\"kitchen\">" + formatDalasi(product.price) + " · " + product.kitchen + "</p>" +
          "<div class=\"qty-row\">" +
            "<button class=\"qty-btn\" type=\"button\" data-qty=\"" + product.id + "\" data-delta=\"-1\" aria-label=\"Decrease\">−</button>" +
            "<span>" + line.qty + "</span>" +
            "<button class=\"qty-btn\" type=\"button\" data-qty=\"" + product.id + "\" data-delta=\"1\" aria-label=\"Increase\">+</button>" +
            "<button class=\"remove-btn\" type=\"button\" data-remove=\"" + product.id + "\">Remove</button>" +
          "</div>" +
        "</div>" +
        "<p class=\"price\">" + formatDalasi(product.price * line.qty) + "</p>" +
      "</article>"
    );
  }).join("");
}

function updateCartUI() {
  const count = cartCount(cart);
  const badge = document.getElementById("cart-count");
  badge.textContent = String(count);
  badge.hidden = count === 0;

  const subtotal = calculateSubtotal(cart);
  const fee = cart.length ? calculateDeliveryFee(chosenArea) : 0;
  const total = cart.length ? subtotal + fee : 0;

  document.getElementById("cart-subtotal").textContent = formatDalasi(subtotal);
  document.getElementById("cart-delivery").textContent = formatDalasi(fee);
  document.getElementById("cart-total").textContent = formatDalasi(total);
  document.getElementById("checkout-pay").textContent = formatDalasi(total);
  renderCartItems();
}

function openOverlay(id) {
  const overlay = document.getElementById(id);
  overlay.hidden = false;
  requestAnimationFrame(function () {
    overlay.classList.add("is-open");
  });
  document.body.classList.add("modal-open");
}

function closeOverlay(id) {
  const overlay = document.getElementById(id);
  overlay.classList.remove("is-open");
  overlay.hidden = true;
  if (!document.querySelector(".overlay:not([hidden])")) {
    document.body.classList.remove("modal-open");
  }
}

function openCart() {
  updateCartUI();
  openOverlay("cart-overlay");
}

function closeCart() {
  closeOverlay("cart-overlay");
}

/* ---------- checkout ---------- */

function openCheckout() {
  if (!cart.length) {
    return;
  }
  closeCart();
  updateCartUI();
  openOverlay("checkout-overlay");
}

function closeCheckout() {
  closeOverlay("checkout-overlay");
}

function placeOrder(event) {
  event.preventDefault();
  const form = event.target;
  const error = document.getElementById("checkout-error");
  error.hidden = true;

  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const area = form.area.value;
  const address = form.address.value.trim();
  const notes = form.notes.value.trim();
  const payment = form.payment.value;

  if (!name || !phone || !area || !address || !payment) {
    error.textContent = "Please fill in your name, phone, area, address and payment method.";
    error.hidden = false;
    return;
  }

  if (!/^[0-9+\s]{6,}$/.test(phone)) {
    error.textContent = "Enter a phone number the rider can call, digits only.";
    error.hidden = false;
    return;
  }

  const orderId = "CC-" + Date.now().toString().slice(-6);
  const minutes = AREAS[area].minutes;
  const total = calculateTotal(cart, area);
  const payLabel = payment === "cash" ? "cash at the gate" : "mobile money";

  cart = [];
  saveCart(cart);
  updateCartUI();
  form.reset();
  chosenArea = "";
  closeCheckout();

  document.getElementById("confirm-copy").textContent =
    "Thanks, " + name + ". Your food is heading to " + address + " in " + area +
    ". Typical arrival is about " + minutes + " minutes. You will pay " +
    formatDalasi(total) + " by " + payLabel + "." +
    (notes ? " Note for the kitchen: " + notes : "");
  document.getElementById("confirm-id").textContent = "Order " + orderId;
  openOverlay("confirm-overlay");
}

/* ---------- extras: menu, toast, info ---------- */

function setMenuOpen(open) {
  const drawer = document.getElementById("menu-drawer");
  const toggle = document.getElementById("menu-toggle");
  const openIcon = toggle.querySelector(".icon-open");
  const closeIcon = toggle.querySelector(".icon-close");

  drawer.hidden = !open;
  drawer.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  openIcon.hidden = open;
  closeIcon.hidden = !open;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(function () {
    toast.hidden = true;
  }, 2200);
}

function openInfo(key) {
  const page = INFO[key];
  if (!page) {
    return;
  }
  document.getElementById("info-title").textContent = page.title;
  document.getElementById("info-body").innerHTML = page.html;
  openOverlay("info-overlay");
}

/* ---------- start the page ---------- */

function init() {
  renderProducts();
  updateCartUI();

  document.getElementById("dish-grid").addEventListener("click", function (event) {
    const button = event.target.closest("[data-add]");
    if (button) {
      addToCart(button.getAttribute("data-add"));
    }
  });

  document.getElementById("cart-items").addEventListener("click", function (event) {
    const qtyBtn = event.target.closest("[data-qty]");
    const removeBtn = event.target.closest("[data-remove]");
    if (qtyBtn) {
      changeQty(qtyBtn.getAttribute("data-qty"), Number(qtyBtn.getAttribute("data-delta")));
    }
    if (removeBtn) {
      removeFromCart(removeBtn.getAttribute("data-remove"));
    }
  });

  document.getElementById("open-cart").addEventListener("click", openCart);
  document.getElementById("close-cart").addEventListener("click", closeCart);
  document.getElementById("cart-overlay").addEventListener("click", function (event) {
    if (event.target.id === "cart-overlay") {
      closeCart();
    }
  });
  document.getElementById("go-checkout").addEventListener("click", openCheckout);
  document.getElementById("close-checkout").addEventListener("click", closeCheckout);
  document.getElementById("checkout-form").addEventListener("submit", placeOrder);
  document.getElementById("checkout-form").area.addEventListener("change", function (event) {
    chosenArea = event.target.value;
    updateCartUI();
  });
  document.getElementById("confirm-done").addEventListener("click", function () {
    closeOverlay("confirm-overlay");
  });

  const menuToggle = document.getElementById("menu-toggle");
  menuToggle.addEventListener("click", function () {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    setMenuOpen(open);
  });
  document.querySelector(".menu-scrim").addEventListener("click", function () {
    setMenuOpen(false);
  });
  document.querySelectorAll("#menu-drawer a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenuOpen(false);
    });
  });

  document.querySelectorAll("[data-download]").forEach(function (button) {
    button.addEventListener("click", function () {
      const store = button.getAttribute("data-download") === "iphone" ? "the App Store" : "Google Play";
      showToast("Chop Chop is coming soon on " + store + ".");
    });
  });

  document.querySelectorAll("[data-info]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      openInfo(link.getAttribute("data-info"));
    });
  });
  document.getElementById("close-info").addEventListener("click", function () {
    closeOverlay("info-overlay");
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setMenuOpen(false);
      closeCart();
      closeCheckout();
      closeOverlay("confirm-overlay");
      closeOverlay("info-overlay");
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
