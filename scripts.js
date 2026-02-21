// data store variable

let thrivingList = [];
let struggleList = [];
let currentStatus = "all";

// select Dom Element

const totalCountEi = document.getElementById("total");
const thrivingCount = document.getElementById("thrivingCount");
const strugglingCount = document.getElementById("strugglingCount");

// select btn

const allFilterBtn = document.getElementById("all-filter-btn");
const thrivingFilterBtn = document.getElementById("thriving-filter-btn");
const strugglingFilterBtn = document.getElementById("struggling-filter-btn");

// select section

const allCardSection = document.getElementById("allCards");
const mainContainer = document.querySelector("main");

// update count

function calculateCount() {
  totalCountEi.innerText = allCardSection.children.length;
  thrivingCount.innerText = thrivingList.length;
  strugglingCount.innerText = struggleList.length;
}

calculateCount();

// btn style and section toggle

// function toggleStyle(id) {
//   currentStatus = id;

//   // reset all btn style

//     [allFilterBtn, thrivingFilterBtn, strugglingFilterBtn].forEach((btn) => {
//       btn.className =
//         "px-6 py-2 rounded-xl backdrop-blur-md transition-all duration-300 border border-white/20";
//       if (btn.id === id) {
//         btn.classList.add(
//           "bg-white/40",
//           "text-white",
//           "shadow-lg",
//           "scale-110",
//         );
//       } else {
//         btn.classList.add("bg-white/10", "text-white/60", "hover:bg-white/20");
//       }
//     });

//   // show filtered card

//   const allCards = document.querySelectorAll(".card");
//   allCards.forEach((card) => {
//     const statusText = card.querySelector(".status").innerText;

// // show animation

//       let shouldShow = false;
//       if (id === "all-filter-btn") shouldShow = true;
//       else if (id === "thriving-filter-btn")
//         shouldShow = statusText === "Thrive";
//       else if (id === "struggling-filter-btn")
//         shouldShow = statusText === "Struggle";

//       if (shouldShow) {
//         card.style.display = "flex";
//         setTimeout(() => {
//           card.style.opacity = "1";
//           card.style.transform = "translateY(0)";
//         }, 10);
//       } else {
//         card.style.opacity = "0";
//         card.style.transform = "translateY(20px)";
//         setTimeout(() => {
//           card.style.display = "none";
//         }, 500);
//       }
//   });
// }

function toggleStyle(id) {
  currentStatus = id;

  // reset all btn style

  [allFilterBtn, thrivingFilterBtn, strugglingFilterBtn].forEach((btn) => {
    btn.className =
      "px-8 py-3 rounded-2xl backdrop-blur-lg transition-all duration-300 border border-white/10 font-bold";
    if (btn.id === id) {
      btn.classList.add(
        "bg-blue-600/40",
        "text-white",
        "border-blue-400/50",
        "shadow-[0_0_20px_rgba(59,130,246,0.3)]",
        "scale-105",
      );
    } else {
      btn.classList.add("bg-white/5", "text-white/40", "hover:bg-white/10");
    }
  });

  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    const statusText = card.querySelector(".status").innerText;
    let shouldShow =
      id === "all-filter-btn" ||
      (id === "thriving-filter-btn" && statusText === "Thrive") ||
      (id === "struggling-filter-btn" && statusText === "Struggle");

    if (shouldShow) {
      card.style.display = "block";
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0) scale(1)";
      }, 10);
    } else {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px) scale(0.95)";
      setTimeout(() => {
        card.style.display = "none";
      }, 400);
    }
  });
}

// working btn

mainContainer.addEventListener("click", function (event) {
  const target = event.target;
  const card = target.closest(".card");

  if (!card) return;
  const plantName = card.querySelector(".plantName").innerText;
  const statusEi = card.querySelector(".status");

  // if click thrive btn
  if (target.classList.contains("thriving-btn")) {
    statusEi.innerText = "Thrive";
     card.classList.remove("struggle-active");
     card.classList.add("thrive-active");
     statusEi.className =
       "status px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-bold uppercase tracking-[2px] text-emerald-400";
    // thrivingList update

    if (!thrivingList.includes(plantName)) {
      thrivingList.push(plantName);
    }

    // delete another list

    struggleList = struggleList.filter((name) => name !== plantName);
  } // if click struggling btn
  else if (target.classList.contains("struggling-btn")) {
    statusEi.innerText = "Struggle";
    
   


    card.classList.remove("thrive-active");
    card.classList.add("struggle-active");
    statusEi.className =
      "status px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-[10px] font-bold uppercase tracking-[2px] text-rose-400";

    // struggleList update

    if (!struggleList.includes(plantName)) {
      struggleList.push(plantName);
    }

    // delete another list
    thrivingList = thrivingList.filter((name) => name !== plantName);
  }

  // the end count and filter views update

  calculateCount();
  toggleStyle(currentStatus);
});
