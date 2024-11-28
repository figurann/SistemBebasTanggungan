function showAlert(title, message, type = "error") {
  const existingAlert = document.querySelector(".alert-overlay");
  if (existingAlert) {
    existingAlert.remove();
  }

  const isSuccess = type === "success";
  const iconClass = isSuccess ? "success" : "";
  const buttonClass = isSuccess ? "success" : "";

  const alertHTML = `
        <div class="alert-overlay">
            <div class="alert-box">
                <div class="alert-icon ${iconClass}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        ${
                          isSuccess
                            ? '<path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.177-7.86l-2.765-2.767L7 12.431l3.119 3.121a1 1 0 001.414 0l5.952-5.95-1.062-1.062-5.6 5.6z"/>'
                            : '<path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"/>'
                        }
                    </svg>
                </div>
                <h4 class="alert-title">${title}</h4>
                <p class="alert-message">${message}</p>
                <button class="alert-button ${buttonClass}">OK</button>
            </div>
        </div>
    `;

  document.body.insertAdjacentHTML("beforeend", alertHTML);

  const alertButton = document.querySelector(".alert-button");
  alertButton.addEventListener("click", function () {
    document.querySelector(".alert-overlay").remove();
  });
}
