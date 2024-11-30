document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  // Buat container untuk alert jika belum ada
  let alertContainer = document.querySelector(".alert-container");
  if (!alertContainer) {
    alertContainer = document.createElement("div");
    alertContainer.className = "alert-container";
    document.body.appendChild(alertContainer);
  }

  function showAlert(type, title, message) {
    const alertElement = document.createElement("div");
    alertElement.className = `alert ${type}`;

    alertElement.innerHTML = `
        <div class="alert-icon">
          <i class="material-icons">${
            type === "success"
              ? "check_circle"
              : type === "warning"
              ? "warning"
              : "error"
          }</i>
        </div>
        <div class="alert-content">
          <h6 class="alert-title">${title}</h6>
          <p class="alert-message">${message}</p>
        </div>
        <button class="alert-close" onclick="this.closest('.alert').remove()">
          <i class="material-icons" style="font-size: 18px;">close</i>
        </button>
      `;

    alertContainer.appendChild(alertElement);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      alertElement.style.animation = "fadeOut 0.3s ease forwards";
      setTimeout(() => {
        alertElement.remove();
      }, 300);
    }, 4000);
  }

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("rememberMe").checked;

    // Validasi input
    if (!username || !password) {
      showAlert("warning", "Peringatan", "Username dan password harus diisi!");
      return;
    }

    try {
      // Simulasi login API call
      const response = await simulateLogin(username, password);

      if (response.success) {
        showAlert(
          "success",
          "Berhasil",
          "Login berhasil! Anda akan dialihkan..."
        );

        // Simpan token jika remember me dicentang
        if (rememberMe) {
          localStorage.setItem("userToken", response.token);
        } else {
          sessionStorage.setItem("userToken", response.token);
        }

        // Redirect setelah 2 detik
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 2000);
      } else {
        showAlert(
          "error",
          "Gagal",
          response.message || "Username atau password salah!"
        );
      }
    } catch (error) {
      showAlert(
        "error",
        "Error",
        "Terjadi kesalahan pada server. Silakan coba lagi nanti."
      );
      console.error("Login error:", error);
    }
  });

  // Fungsi simulasi login (ganti dengan actual API call)
  async function simulateLogin(username, password) {
    // Simulasi network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulasi kredensial
    if (username === "admin" && password === "admin123") {
      return {
        success: true,
        token: "dummy_token_" + Math.random(),
        message: "Login berhasil",
      };
    }

    return {
      success: false,
      message: "Username atau password salah",
    };
  }
});
