export function addSaunaForm() {
  console.log("addSaunaFormが読み込まれました"); // これを追加！
  const addBtn = document.getElementById("add-sauna_form");
  const hideBtn = document.getElementById("hide-sauna_form");

  // if (document.body.dataset.saunaFormInitialized) return
  // document.body.dataset.saunaFormInitialized = "true"

  const updateNumbers = () => {
    const sets = document.querySelectorAll(".sauna-set");
    let count = 1;
    sets.forEach((set) => {
      // 表示されているもの（noneでないもの）に番号を振る
      if (set.style.display !== "none") {
        const span = set.querySelector(".set-number");
        if (span) span.textContent = count;
        count++;
      }
    });
  };

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const sets = document.querySelectorAll(".sauna-set");
      for (const set of sets) {
        // style属性が空、もしくはnoneを含む場合に表示する
        if (set.classList.contains("hidden")) {
          set.classList.remove("hidden");
          updateNumbers();
          break;
        }
      }
    });
  }

  if (hideBtn) {
    hideBtn.addEventListener("click", () => {
      const sets = document.querySelectorAll(".sauna-set");
      for (let i = sets.length - 1; i >= 0; i--) {
        if (!sets[i].classList.contains("hidden")) {
          sets[i].classList.add("hidden");
          updateNumbers();
          break;
        }
      }
    });
  }
}

export function addSaunaMealForm() {
  const addBtn = document.getElementById("add-sauna_meal_form");
  const hideBtn = document.getElementById("hide-sauna_meal_form");

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const sets = document.querySelectorAll(".sauna-meal");
      for (const set of sets) {
        if (!set.style.display || set.style.display.includes("none")) {
          set.style.display = "block";
          break;
        }
      }
    });
  }

  if (hideBtn) {
    hideBtn.addEventListener("click", () => {
      const sets = document.querySelectorAll(".sauna-meal");
      for (let i = sets.length - 1; i >= 0; i--) {
        if (sets[i].style.display !== "none") {
          sets[i].style.display = "none";
          break;
        }
      }
    });
  }
}


// export function addSaunaForm() {
//   // 重複防止チェック
//   if (document.body.dataset.saunaFormInitialized) return
//   document.body.dataset.saunaFormInitialized = "true"

//   // 番号更新機能
//   const updateNumbers = () => {
//     const sets = document.querySelectorAll(".sauna-set")
//     let count = 1
//     sets.forEach((set) => {
//       if (set.style.display !== "none") {
//         const span = set.querySelector(".set-number")
//         if (span) span.textContent = count
//         count++
//       }
//     })
//   }

//   // イベント委譲でボタンのクリックを検知
//   document.addEventListener("click", (e) => {
//     // 追加ボタン
//     if (e.target.id === "add-sauna_form") {
//       e.preventDefault()
//       const sets = document.querySelectorAll(".sauna-set")
//       for (const set of sets) {
//         if (set.style.display !== "block") {
//           set.style.display = "block"
//           updateNumbers()
//           break
//         }
//       }
//     }

//     // 非表示ボタン
//     if (e.target.id === "hide-sauna_form") {
//       e.preventDefault()
//       const sets = document.querySelectorAll(".sauna-set")
//       for (let i = sets.length - 1; i >= 0; i--) {
//         if (sets[i].style.display !== "none") {
//           sets[i].style.display = "none"
//           updateNumbers()
//           break
//         }
//       }
//     }
//   })
// }