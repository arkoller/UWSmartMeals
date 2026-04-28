const signupForm = document.querySelector("#signupForm");
const signupMessage = document.querySelector("#signupMessage");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get user input
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const username = document.querySelector("#username").value;
  const email = document.querySelector("#email").value.toLowerCase();
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirmPassword").value;

  // Validation
  if (password !== confirmPassword) {
    signupMessage.textContent = "Passwords do not match.";
    return;
  }

  try {
    // Create user in Firebase Auth
    const userInfo = await auth.createUserWithEmailAndPassword(email, password);
    const user = userInfo.user;

    // Store additional user data in Firestore
    await db.collection("user_accounts").doc(user.uid).set({
      uid: user.uid,
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      role: "student",
    });

    signupMessage.textContent = "Account created successfully!";

    // Redirect
    window.location.href = "login.html";
  } catch (error) {
    signupMessage.textContent = error.message;
    console.error(error);
  }
});
