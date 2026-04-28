const logoutBtn = document.querySelector("#logoutBtn");

logoutBtn.addEventListener("click", () => {
  auth
    .signOut()
    .then(() => {
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error(error);
    });
});
