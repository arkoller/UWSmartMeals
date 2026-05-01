const loginForm = document.querySelector("#signupForm");
const loginMessage = document.querySelector("#loginMessage");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.querySelector("#loginEmail").value.toLowerCase();
  const password = document.querySelector("#loginPassword").value;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    loginMessage.textContent = "Login successful!";

    const userDoc = await db
      .collection("user_accounts")
      .doc(userCredential.user.uid)
      .get();
    if (userDoc.exists && userDoc.data().isAdmin === true) {
      window.location.href = "admin.html";
    } else {
      window.location.href = "meal-plans.html";
    }
  } catch (error) {
    switch (error.code) {
      case "auth/user-not-found":
        loginMessage.textContent = "No account found with this email.";
        break;

      case "auth/wrong-password":
        loginMessage.textContent = "Incorrect password.";
        break;

      default:
        loginMessage.textContent =
          "Email or Password incorrect. Please try again.";
    }
    console.error(error);
  }
});
