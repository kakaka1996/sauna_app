
export function addSaunaForm () {
  let container = document.getElementById("set_form");
  let saunaSets = container.getElementsByClassName("sauna-set");
  document.getElementById("add-sauna-form").addEventListener("click", function() {
    // 非表示のフォームを検索し、最初の非表示フォームを表示する
    for (let i = 0; i < saunaSets.length; i++) {
      if (saunaSets[i].style.display === "none") {
        saunaSets[i].style.display = "flex";
        break;
      }
    }
  });
  document.getElementById("hide-sauna_form").addEventListener("click", function() {
    // let container = document.getElementById("sauna_log");
    // let saunaSet = container.getElementsByClassName("sauna_set");

    // 非表示のフォームを検索し、最初の表示されているフォームを非表示にする
    for (let i = 0; i < saunaSet.length; i++) {
      if (saunaSets[i].style.display !== "none") {
        saunaSets[i].style.display = "none";
        break;
      }
    }
  });
}