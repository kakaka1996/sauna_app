document.addEventListener("turbo:load", () => {
  document.addEventListener("click", (e) => {
    document.querySelectorAll("details").forEach((details) => {
      if (!details.contains(e.target)) details.removeAttribute("open");
    });
  });
});
