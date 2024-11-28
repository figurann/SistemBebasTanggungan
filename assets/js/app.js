// Form Validation and Submit
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username");
  const password = document.getElementById("password");

  // Reset previous errors
  username.classList.remove("is-invalid");
  password.classList.remove("is-invalid");

  // Validasi form
  if (!username.value && !password.value) {
    username.classList.add("is-invalid");
    password.classList.add("is-invalid");
    showAlert("Peringatan!", "Username dan Password harus diisi!", "error");
    return;
  }

  if (!username.value) {
    username.classList.add("is-invalid");
    showAlert("Peringatan!", "Username harus diisi!", "error");
    return;
  }

  if (!password.value) {
    password.classList.add("is-invalid");
    showAlert("Peringatan!", "Password harus diisi!", "error");
    return;
  }

  // Simulasi login berhasil
  if (username.value === "admin" && password.value === "admin") {
    showAlert(
      "Cihuy!",
      "Login telah berhasil! Anda akan dialihkan ke Dashboard..",
      "success"
    );

    // Redirect ke Dashboard setelah 2 detik
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 2000);
  } else {
    showAlert("Maaf..", "Username atau Password salah!", "error");
  }
});

// Tambahkan event listener untuk input fields
document.getElementById("username").addEventListener("input", function () {
  this.classList.remove("is-invalid");
});

document.getElementById("password").addEventListener("input", function () {
  this.classList.remove("is-invalid");
});

// Toggle Password Visibility
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", function () {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  // Toggle icon
  this.textContent = type === "password" ? "visibility_off" : "visibility";
});
