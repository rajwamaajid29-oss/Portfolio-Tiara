// =========================
// ACTIVE NAVBAR ON SCROLL
// =========================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;

    if(scrollY >= sectionTop){
      current = section.getAttribute("id");
    }

  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if(link.getAttribute("href") === `#${current}`){
      link.classList.add("active");
    }

  });

});
// =========================
// FILTER GALLERY
// =========================
const filterButtons = document.querySelectorAll(".gallery-filter button");
const galleryCards = document.querySelectorAll(".gallery-card");

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    // ACTIVE BUTTON
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    // FILTER
    const filter = button.getAttribute("data-filter");

    galleryCards.forEach(card => {

      if(filter === "all"){
        card.classList.remove("hide");
      }
      else{
        if(card.getAttribute("data-category") === filter){
          card.classList.remove("hide");
        }
        else{
          card.classList.add("hide");
        }
      }

    });

  });

});

// =========================
// SHOW ALL BUTTON
// =========================
const showAllBtn = document.getElementById("showAllBtn");

showAllBtn.addEventListener("click", () => {

  galleryCards.forEach(card => {
    card.classList.remove("hide");
  });

  filterButtons.forEach(btn => {
    btn.classList.remove("active");
  });

  document
    .querySelector('[data-filter="all"]')
    .classList.add("active");

});

// =========================
// POPUP IMAGE
// =========================
const popup = document.getElementById("popupImage");
const popupImg = document.getElementById("popupImg");
const closePopup = document.getElementById("closePopup");

galleryCards.forEach(card => {

  const image = card.querySelector("img");

  image.addEventListener("click", () => {

    popup.classList.add("show");

    popupImg.src = image.src;

  });

});

// CLOSE
closePopup.addEventListener("click", () => {
  popup.classList.remove("show");
});

// CLOSE WHEN CLICK BACKGROUND
popup.addEventListener("click", (e) => {

  if(e.target === popup){
    popup.classList.remove("show");
  }

});

// =========================
// TESTIMONI
// =========================
const testimoniWrapper =
document.getElementById("testimoniWrapper");

const testimoniForm =
document.getElementById("testimoniForm");

// DATA AWAL
let testimoniData = [

  {
    nama: "Rizky Pratama",
    pesan:
      "Lukisan yang dibuat sangat detail dan elegan. Ruangan jadi terasa lebih hidup."
  },

  {
    nama: "Dewi Lestari",
    pesan:
      "Pelayanan sangat ramah dan hasil karya benar-benar premium."
  },

  {
    nama: "Ahmad Fauzan",
    pesan:
      "Saya sangat puas dengan hasil custom painting yang dibuat."
  }

];

// RENDER TESTIMONI
function renderTestimoni(){

  testimoniWrapper.innerHTML = "";

  testimoniData.forEach(item => {

    testimoniWrapper.innerHTML += `
    
      <div class="testimoni-card">

        <p>
          "${item.pesan}"
        </p>

        <div class="testimoni-user">

          <h4>${item.nama}</h4>

          <span>Customer</span>

        </div>

      </div>

    `;

  });

}

// TAMBAH TESTIMONI
testimoniForm.addEventListener("submit", e => {

  e.preventDefault();

  const nama =
  document.getElementById("nama").value;

  const pesan =
  document.getElementById("pesan").value;

  testimoniData.unshift({
    nama,
    pesan
  });

  renderTestimoni();

  testimoniForm.reset();

});

// JALANKAN
renderTestimoni();