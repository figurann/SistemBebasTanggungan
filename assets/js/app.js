// Toggle Password Visibility
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const passwordIcon = document.getElementById("passwordIcon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordIcon.textContent = "visibility";
  } else {
    passwordInput.type = "password";
    passwordIcon.textContent = "visibility_off";
  }
}

// Form Validation and Submit
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Validasi form
  if (!username && !password) {
    showAlert("Peringatan!", "Username dan password harus diisi!");
    return;
  }

  if (!username) {
    showAlert("Peringatan!", "Username harus diisi!");
    return;
  }

  if (!password) {
    showAlert("Peringatan!", "Password harus diisi!");
    return;
  }

  // Simulasi login berhasil (ganti dengan logika login yang sebenarnya)
  if (username === "admin" && password === "admin123") {
    showAlert(
      "Berhasil!",
      "Login sukses. Anda akan dialihkan ke dashboard...",
      "success"
    );

    // Redirect ke dashboard setelah 2 detik
    setTimeout(() => {
      window.location.href = "dashboard.html"; // Sesuaikan dengan URL dashboard
    }, 2000);
  } else {
    showAlert("Gagal!", "Username atau password salah!");
  }
});
