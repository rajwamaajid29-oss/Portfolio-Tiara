import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getDatabase, 
  ref, 
  push, 
  onValue 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// =========================
// CONFIG
// =========================
const firebaseConfig = {
  apiKey: "AIzaSyCxdF3SXuwkbfV6OurlL3cOe7YXQJCHvRM",
  authDomain: "portfolio-54671.firebaseapp.com",
  databaseURL: "https://portfolio-54671-default-rtdb.firebaseio.com",
  projectId: "portfolio-54671",
  storageBucket: "portfolio-54671.firebasestorage.app",
  messagingSenderId: "512462640108",
  appId: "1:512462640108:web:b80ee196e91f88c55826c9"
};

// =========================
// INIT
// =========================
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// =========================
// ELEMENT
// =========================
const form = document.getElementById("testimoniForm");
const wrapper = document.getElementById("testimoniWrapper");
const testimoniRef = ref(db, "testimoni");

// =========================
// SUBMIT TESTIMONI
// =========================
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const pesan = document.getElementById("pesan").value.trim();

  if (!nama || !pesan) return;

  push(testimoniRef, {
    nama,
    pesan,
    createdAt: Date.now()
  })
  .then(() => console.log("Testimoni terkirim"))
  .catch((err) => console.error("Error:", err));

  form.reset();
});

// =========================
// RENDER REALTIME
// =========================
onValue(testimoniRef, (snapshot) => {
  wrapper.innerHTML = "";

  const data = snapshot.val();

  if (!data) {
    wrapper.innerHTML = "<p>Belum ada testimoni.</p>";
    return;
  }

  const items = Object.values(data);

  // terbaru di atas
  items.sort((a, b) => b.createdAt - a.createdAt);

  items.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("testimoni-card");

    div.innerHTML = `
      <p>"${item.pesan}"</p>

      <div class="testimoni-user">
        <h4>${item.nama}</h4>
        <span>Customer</span>
      </div>
    `;

    wrapper.appendChild(div);
  });
});

console.log("Firebase connected ✔");

const popup = document.getElementById("popupImage");
const popupImg = document.getElementById("popupImg");
const closePopup = document.getElementById("closePopup");

// ambil semua gambar di gallery
const galleryImages = document.querySelectorAll(".gallery-card img");

// buka popup
galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    popup.classList.add("show");
    popupImg.src = img.src;
  });
});

// tutup popup (klik tombol X)
if (closePopup) {
  closePopup.addEventListener("click", () => {
    popup.classList.remove("show");
  });
}

// tutup popup (klik background)
if (popup) {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove("show");
    }
  });
}
const filterButtons = document.querySelectorAll(".gallery-filter button");
const galleryCards = document.querySelectorAll(".gallery-card");

// FILTER BUTTON CLICK
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {

    // active button UI
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    galleryCards.forEach((card) => {

      const category = card.getAttribute("data-category");

      if (filter === "all") {
        card.style.display = "block";
      } 
      else {
        if (category === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      }

    });

  });
});