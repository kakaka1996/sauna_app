// console.log("log_create_button.js が正常に読み込まれました");

// セット番号の表示を更新する関数
const updateSaunaNumbers = () => {
  const sets = document.querySelectorAll(".sauna-set");
  let count = 1;
  sets.forEach((set) => {
    // Tailwindの hidden クラスを持っていないものを有効なセットとみなす
    if (!set.classList.contains("hidden")) {
      const span = set.querySelector(".set-number");
      if (span) span.textContent = count;
      count++;
    }
  });
};

// ページ読み込み時（またはバリデーションエラー後の再描写時）に番号を振る
document.addEventListener("turbo:load", updateSaunaNumbers);
document.addEventListener("turbo:render", updateSaunaNumbers);

/**
 * イベント委譲によるクリック判定
 */
document.addEventListener("click", (e) => {
  // 1. サウナセット追加
  const addSaunaBtn = e.target.closest("#add-sauna_form");
  if (addSaunaBtn) {
    e.preventDefault();
    const sets = document.querySelectorAll(".sauna-set");
    for (const set of sets) {
      if (set.classList.contains("hidden")) {
        set.classList.remove("hidden"); // hiddenクラスを削除して表示
        updateSaunaNumbers();
        break;
      }
    }
  }

  // 2. サウナセット非表示（最後の一つを消す）
  const hideSaunaBtn = e.target.closest("#hide-sauna_form");
  if (hideSaunaBtn) {
    e.preventDefault();
    const sets = Array.from(document.querySelectorAll(".sauna-set")).reverse();
    for (const set of sets) {
      if (!set.classList.contains("hidden")) {
        set.classList.add("hidden"); // hiddenクラスを付与して非表示
        updateSaunaNumbers();
        break;
      }
    }
  }

  // 3. サウナ飯追加
  const addMealBtn = e.target.closest("#add-sauna_meal_form");
  if (addMealBtn) {
    e.preventDefault();
    const meals = document.querySelectorAll(".sauna-meal");
    for (const meal of meals) {
      if (meal.classList.contains("hidden")) {
        meal.classList.remove("hidden");
        break;
      }
    }
  }

  // 4. サウナ飯非表示
  const hideMealBtn = e.target.closest("#hide-sauna_meal_form");
  if (hideMealBtn) {
    e.preventDefault();
    const meals = Array.from(document.querySelectorAll(".sauna-meal")).reverse();
    for (const meal of meals) {
      if (!meal.classList.contains("hidden")) {
        meal.classList.add("hidden");
        break;
      }
    }
  }
});

const showFirstForm = () => {
  const firstSet = document.querySelector(".sauna-set");
  if (firstSet) firstSet.classList.remove("hidden");

  const firstMeal = document.querySelector(".sauna-meal");
  if (firstMeal) firstMeal.classList.remove("hidden");
};

// ページ読み込み時と、エラー等の再描画（render）時の両方で実行する
document.addEventListener("turbo:load", showFirstForm);
document.addEventListener("turbo:render", showFirstForm);