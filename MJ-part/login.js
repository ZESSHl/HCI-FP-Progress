 const toggleLink = document.getElementById("toggleLink");
    const nameField = document.getElementById("nameField");
    const forgotLink = document.getElementById("forgotLink");
    const forgotButton = document.getElementById("forgotButton");
    const mainButton = document.getElementById("mainButton");
    const authForm = document.getElementById("authForm");
    const messageEl = document.getElementById("message");
    const togglePassword = document.getElementById("togglePassword");

    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");

    let isSignup = true;

    function getUsers() {
      return JSON.parse(localStorage.getItem("users")) || [];
    }

    function saveUsers(users) {
      localStorage.setItem("users", JSON.stringify(users));
    }

    function findUser(email) {
      return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
    }

    function showError(msg) {
      messageEl.textContent = msg;
      messageEl.className = "error-message";
    }

    function showSuccess(msg) {
      messageEl.textContent = msg;
      messageEl.className = "success-message";
    }

    function clearMessage() {
      messageEl.textContent = "";
      messageEl.className = "";
    }

    // ---------- Toggle Password Visibility ----------
    togglePassword.addEventListener("click", () => {
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;
      togglePassword.classList.toggle("fa-eye-slash");
    });

    // ---------- Switch Sign up / Log in ----------
    toggleLink.addEventListener("click", () => {
      isSignup = !isSignup;

      clearMessage();

      if (isSignup) {
        nameField.style.display = "block";
        forgotLink.style.display = "none";
        mainButton.textContent = "Sign up";
        toggleLink.textContent = "Log in";
      } else {
        nameField.style.display = "none";
        forgotLink.style.display = "block";
        mainButton.textContent = "Log in";
        toggleLink.textContent = "Sign up";
      }
    });

    forgotLink.style.display = "none";

    // ---------- Forgot Password ----------
    forgotButton.addEventListener("click", () => {
      const email = prompt("Enter your email address:");
      if (!email) return;

      const user = findUser(email);

      if (!user) {
        alert("No account found with this email.");
        return;
      }

      alert("Your password is: " + user.password);
    });

    // ---------- Form Submit ----------
    authForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearMessage();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email || !password || (isSignup && !name)) {
        showError("All fields are required.");
        return;
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        showError("Invalid email format.");
        return;
      }

      if (password.length < 6) {
        showError("Password must be at least 6 characters.");
        return;
      }

      if (isSignup) {
        if (findUser(email)) {
          showError("This email is already registered.");
          return;
        }

        const users = getUsers();
        users.push({ name, email, password });
        saveUsers(users);
        showSuccess("Account created! You can now log in.");

        isSignup = false;
        nameField.style.display = "none";
        forgotLink.style.display = "block";
        mainButton.textContent = "Log in";
        toggleLink.textContent = "Sign up";
      } else {
        const user = findUser(email);

        if (!user || user.password !== password) {
          showError("Incorrect email or password.");
          return;
        }

        showSuccess("Login successful! Redirecting...");

        setTimeout(() => {
          window.location.href = "home_MamyJean.html";
        }, 700);
      }
    });

