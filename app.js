/* =============================================
   SOLE STORE — app.js
   ============================================= */
(function () {
  "use strict";

  /* ── CUSTOM CURSOR ── */
  const cursor = document.getElementById("cursor");
  const cursorDot = document.getElementById("cursorDot");
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });
  (function animCursor() {
    cx += (mx - cx) * 0.15;
    cy += (my - cy) * 0.15;
    if (cursor) cursor.style.transform = `translate(${cx - 18}px, ${cy - 18}px)`;
    if (cursorDot) cursorDot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
    requestAnimationFrame(animCursor);
  })();

  /* ── NAV SCROLL ── */
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  });

  /* ── SCROLL REVEAL ── */
  const revealObs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add("revealed"), delay);
        revealObs.unobserve(e.target);
      }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll("[data-reveal], .shoe-card, .testi, .dest-card").forEach(el => revealObs.observe(el));

  /* ── SHOE DATA ── */
  const shoes = {
    1:  { name: "Arena Classic",        cat: "Low · Casual",       img: "shoe01.png", old: "$119.990", price: "$71.994" },
    2:  { name: "Auto Max Infrared",    cat: "Tech · Running",     img: "shoe02.png", old: "$149.990", price: "$89.994" },
    3:  { name: "DT Max Black Gold",    cat: "High · Basketball",  img: "shoe03.png", old: "$139.990", price: "$83.994" },
    4:  { name: "Wheat Coffee Low",     cat: "Low · Lifestyle",    img: "shoe04.png", old: "$129.990", price: "$77.994" },
    5:  { name: "Noir Rose Low",        cat: "Low · Premium",      img: "shoe05.png", old: "$134.990", price: "$80.994" },
    6:  { name: "Olive Fire Low",       cat: "Low · Collab",       img: "shoe06.png", old: "$154.990", price: "$92.994" },
    7:  { name: "Dark Mocha Low",       cat: "Low · Luxury",       img: "shoe07.png", old: "$144.990", price: "$86.994" },
    8:  { name: "Black Gum Low",        cat: "Low · Street",       img: "shoe08.png", old: "$124.990", price: "$74.994" },
    9:  { name: "Cream Luxe Low",       cat: "Low · Premium",      img: "shoe09.png", old: "$139.990", price: "$83.994" },
    10: { name: "UNDFTD Ocean Low",     cat: "Low · Collab",       img: "shoe10.png", old: "$169.990", price: "$101.994" },
    11: { name: "Wheat Flax Low",       cat: "Low · Lifestyle",    img: "shoe11.png", old: "$129.990", price: "$77.994" },
    12: { name: "Pixel Black Low",      cat: "Low · Femenino",     img: "shoe12.png", old: "$134.990", price: "$80.994" },
    13: { name: "Jordan 1 High Spark",  cat: "High · Basketball",  img: "shoe13.png", old: "$179.990", price: "$107.994" },
    14: { name: "Jordan 1 Low Elevated",cat: "Low · Femenino",     img: "shoe14.png", old: "$159.990", price: "$95.994" },
  };

  /* ── MODAL ── */
  window.openModal = function(id) {
    const s = shoes[id];
    if (!s) return;
    document.getElementById("modalImg").src = s.img;
    document.getElementById("modalImg").alt = s.name;
    document.getElementById("modalCat").textContent = s.cat;
    document.getElementById("modalName").textContent = s.name;
    document.getElementById("modalOld").textContent = s.old;
    document.getElementById("modalPrice").textContent = s.price;

    // build size grid
    const grid = document.getElementById("modalSizeGrid");
    grid.innerHTML = "";
    [35,36,37,38,39,40,41,42,43,44,45,46].forEach(sz => {
      const btn = document.createElement("button");
      btn.className = "size-btn";
      btn.textContent = sz;
      btn.onclick = () => {
        grid.querySelectorAll(".size-btn").forEach(b => b.classList.remove("sel"));
        btn.classList.add("sel");
      };
      grid.appendChild(btn);
    });

    document.getElementById("modalOverlay").classList.add("open");
    document.body.style.overflow = "hidden";
  };

  window.closeModal = function() {
    document.getElementById("modalOverlay").classList.remove("open");
    document.body.style.overflow = "";
    const buyBtn = document.getElementById("modalBuy");
    buyBtn.textContent = "🛒 Agregar al carrito";
    buyBtn.style.background = "";
  };

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  const modalBuy = document.getElementById("modalBuy");
  if (modalBuy) {
    modalBuy.addEventListener("click", () => {
      const sel = document.querySelector("#modalSizeGrid .size-btn.sel");
      if (!sel) {
        const grid = document.getElementById("modalSizeGrid");
        grid.style.outline = "2px solid #D93F3F";
        grid.style.borderRadius = "10px";
        setTimeout(() => { grid.style.outline = ""; grid.style.borderRadius = ""; }, 1200);
        return;
      }
      modalBuy.textContent = "✓ ¡Agregado al carrito!";
      modalBuy.style.background = "#2A7D4F";
      setTimeout(() => {
        modalBuy.textContent = "🛒 Agregar al carrito";
        modalBuy.style.background = "";
        closeModal();
      }, 1800);
    });
  }

  /* ── COUNTDOWN ── */
  let totalSecs = 8 * 3600 + 45 * 60;
  function updateCountdown() {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    const pad = n => String(n).padStart(2, "0");
    const elH = document.getElementById("cd-h");
    const elM = document.getElementById("cd-m");
    const elS = document.getElementById("cd-s");
    if (elH) elH.textContent = pad(h);
    if (elM) elM.textContent = pad(m);
    if (elS) elS.textContent = pad(s);
    if (totalSecs > 0) totalSecs--;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ── STOCK COUNTER ── */
  let stock = 37;
  const stockEl = document.getElementById("stockNum");
  setInterval(() => {
    if (Math.random() < 0.25 && stock > 8) {
      stock--;
      if (stockEl) stockEl.textContent = stock;
    }
  }, 20000);

  /* ── NOTIFICATION ── */
  const notif = document.getElementById("notif");
  const cities = ["Buenos Aires","Córdoba","Rosario","Mendoza","La Plata","Mar del Plata","Tucumán","Salta","Neuquén","Santa Fe"];
  const shoeNames = Object.values(shoes).map(s => s.name);

  function showNotif() {
    if (!notif) return;
    const city = cities[Math.floor(Math.random() * cities.length)];
    const shoe = shoeNames[Math.floor(Math.random() * shoeNames.length)];
    document.getElementById("notifCity").textContent = `Alguien de ${city}`;
    document.getElementById("notifText").textContent = `compró ${shoe}`;
    notif.classList.add("show");
    setTimeout(() => notif.classList.remove("show"), 3800);
  }

  setTimeout(showNotif, 3500);
  setInterval(showNotif, 22000);

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

})();
