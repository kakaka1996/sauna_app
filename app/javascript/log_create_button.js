export function addSaunaForm() {
  const addBtn = document.getElementById("add-sauna_form");
  const hideBtn = document.getElementById("hide-sauna_form");

  // 番号を1から振り直す共通の関数
  const updateNumbers = () => {
    const sets = document.querySelectorAll(".sauna-set");
    let count = 1;
    sets.forEach((set) => {
      if (set.style.display !== "none") {
        const span = set.querySelector(".set-number");
        if (span) span.textContent = count;
        count++;
      }
    });
  };

  // サウナ記録追加ボタンの動作
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const sets = document.querySelectorAll(".sauna-set");
      for (const set of sets) {
        if (set.style.display === "none") {
          set.style.display = "block";
          updateNumbers(); 
          break; 
        }
      }
    });
  } 

  // サウナ記録削除ボタンの動作
  if (hideBtn) {
    hideBtn.addEventListener("click", () => {
      const sets = document.querySelectorAll(".sauna-set");
      for (let i = sets.length - 1; i >= 0; i--) {
        if (sets[i].style.display !== "none") {
          sets[i].style.display = "none";
         
          updateNumbers(); // 隠した後に番号を更新
          break;
        }
      }
    });
  }
}

// サウナ飯ボタン
export function addSaunaMealForm() {
  const addBtn = document.getElementById("add_sauna_meal_form");
  const hideBtn = document.getElementById("hide_sauna_meal_form");

 
  // サウナ飯追加ボタンの動作
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const sets = document.querySelectorAll(".sauna_meal_log");
      for (const set of sets) {
        if (set.style.display === "none") {
          set.style.display = "block";
          break; 
        }
      }
    });
  } 

  // サウナ飯削除ボタンの動作
  if (hideBtn) {
    hideBtn.addEventListener("click", () => {
      const sets = document.querySelectorAll(".sauna_meal_log");
      for (let i = sets.length - 1; i >= 0; i--) {
        if (sets[i].style.display !== "none") {
          sets[i].style.display = "none";
          break;
        }
      }
    });
  }
}