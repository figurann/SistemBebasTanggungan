document.addEventListener("DOMContentLoaded", function () {
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");

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

  forgotPasswordForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validasi input
    if (!username || !newPassword || !confirmPassword) {
      showAlert("warning", "Peringatan", "Semua field harus diisi!");
      return;
    }

    // Validasi password match
    if (newPassword !== confirmPassword) {
      showAlert(
        "error",
        "Error",
        "Password baru dan konfirmasi password tidak cocok!"
      );
      return;
    }

    // Validasi password strength
    if (newPassword.length < 8) {
      showAlert("warning", "Peringatan", "Password harus minimal 8 karakter!");
      return;
    }

    try {
      // Simulasi reset password API call
      const response = await simulateResetPassword(username, newPassword);

      if (response.success) {
        showAlert(
          "success",
          "Berhasil",
          "Password berhasil direset! Anda akan dialihkan ke halaman login..."
        );

        // Redirect ke halaman login setelah 2 detik
        setTimeout(() => {
          window.location.href = "login.php";
        }, 2000);
      } else {
        showAlert(
          "error",
          "Gagal",
          response.message || "Gagal mereset password!"
        );
      }
    } catch (error) {
      showAlert(
        "error",
        "Error",
        "Terjadi kesalahan pada server. Silakan coba lagi nanti."
      );
      console.error("Reset password error:", error);
    }
  });

  // Fungsi simulasi reset password (ganti dengan actual API call)
  async function simulateResetPassword(username, newPassword) {
    // Simulasi network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulasi validasi username (ganti dengan validasi actual)
    if (username === "mahasiswa") {
      return {
        success: true,
        message: "Password berhasil direset",
      };
    }

    return {
      success: false,
      message: "Username tidak ditemukan",
    };
  }
});
